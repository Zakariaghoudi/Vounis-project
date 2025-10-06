const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/passport");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/authController");

const {
  registerRules,
  loginRules,
  validate,
} = require("../middleware/authValidator");

//---------------methods-----------------
// register a new user
router.post("/register", registerRules(), validate, registerUser);
// login the user
router.post("/login", loginRules(), validate, loginUser);

// get cuurent user
router.get("/current", isAuth(), currentUser);

// get all users
router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).send({ users: result, message: "users found" });
  } catch (error) {
    res.status(401).send({ msg: "cannot get the users list", error });
  }
});


// update a user
router.put("/:id", async (req, res) => {
  try {
    const {password, ...otherUpdates} = req.body;
  if(password){
    const salt = await bcrypt.genSalt(10);
    otherUpdates.password = await bcrypt.hash(password, salt);
}
    const result = await User.findByIdAndUpdate(req.params.id,
      {$set: otherUpdates},
      {new: true}
    )
          res.status(200).send({ user: result, message: "user updated" });
  } catch (error) {
    res.status(400).send({ msg: "cannot update the user", error });
  }
});

//delete a user
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
      await res.status(200).send({ user: result, message: "user deleted" });
  } catch (error) {
    res.status(400).send({ msg: "cannot delete the user", error });
  }
});

const authUser = router;
module.exports = authUser;
