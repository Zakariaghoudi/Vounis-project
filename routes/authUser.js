const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/passport");
const { isAdmin, isSelfOrAdmin } = require("../middleware/authorize");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendResetEmail = require("../utils/resetPass");
const {
  registerUser,
  loginUser,
  currentUser,
  OtpVerify,
} = require("../controllers/authController");

const {
  registerRules,
  loginRules,
  validate,
} = require("../middleware/authValidator");

//---------------methods-----------------
//forget password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).send("you don't have an account");
    }
    //generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    // send email
    await sendResetEmail(email, resetToken);
    res.status(200).send("email reintialisation  send successfully");
  } catch (error) {
    res.status(500).send({ msg: "please try again", error: error.message });
  }
});
//reset password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).send("invalid or expired reset link ");
    }
    const { password } = req.body;
    if (!password) {
      return res.status(400).send("password fields is required");
    }
    // crypted password and hash
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // remove the token after used
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).send("password has been updated successfully");
  } catch (error) {
    res.status(500).send({ msg: "cannot update your password", error: error.message });
  }
});
// register a new user
router.post("/register", registerRules(), validate, registerUser);
// login the user
router.post("/login", loginRules(), validate, loginUser);
//verification current useer
router.post("/verification", OtpVerify);
// get cuurent user
router.get("/current", isAuth(), currentUser);

// get all users - ADMIN ONLY (was public before, was leaking password hashes)
router.get("/", isAuth(), isAdmin, async (req, res) => {
  try {
    const result = await User.find().select("-password -otp -resetPasswordToken");
    res.status(200).send({ users: result, msg: "users found" });
  } catch (error) {
    res.status(500).send({ msg: "cannot get the users list", error: error.message });
  }
});

// update a user - only the user themself or an admin, and only an admin can change role/isAdmin
router.put("/:id", isAuth(), isSelfOrAdmin("id"), async (req, res) => {
  try {
    const { password, isAdmin: isAdminField, role, ...otherUpdates } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      otherUpdates.password = await bcrypt.hash(password, salt);
    }
    // block privilege escalation: only an admin can change role/isAdmin
    if (req.user.role === "admin") {
      if (role) otherUpdates.role = role;
      if (typeof isAdminField === "boolean") otherUpdates.isAdmin = isAdminField;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: otherUpdates },
      { new: true }
    ).select("-password -otp -resetPasswordToken");
    res.status(200).send({ user, msg: "user updated" });
  } catch (error) {
    res.status(400).send({ msg: "cannot update the user", error: error.message });
  }
});

//delete a user - only the user themself or an admin
router.delete("/:id", isAuth(), isSelfOrAdmin("id"), async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ user: result, msg: "user deleted" });
  } catch (error) {
    res.status(400).send({ msg: "cannot delete the user", error: error.message });
  }
});

const authUser = router;
module.exports = authUser;
