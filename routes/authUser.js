const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/passport");
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
    const {email} =req.body
    const user = await User.findOne({email});
    if (!user) {
      res.status(403).send("you don't have an account" );
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
    res.status(500).send("please try again", error);
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
    res.status(500).send("cannot update your password", error);
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
// get all users
router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).send(result, "users found");
  } catch (error) {
    res.status(401).send({ msg: "cannot get the users list", error });
  }
});

// update a user
router.put("/:id", async (req, res) => {
  try {
    const { password, ...otherUpdates } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      otherUpdates.password = await bcrypt.hash(password, salt);
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: otherUpdates },
      { new: true }
    );
    res.status(200).send(user, "user updated");
  } catch (error) {
    res.status(400).send({ msg: "cannot update the user", error });
  }
});

//delete a user
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    await res.status(200).send(result, "user deleted");
  } catch (error) {
    res.status(400).send({ msg: "cannot delete the user", error });
  }
});

const authUser = router;
module.exports = authUser;
