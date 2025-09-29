const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/passport");
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

// register a new user
router.post("/register", registerRules(), validate, registerUser);
// login the user
router.post("/login", loginRules(), validate, loginUser);

// get cuurent user
router.get("/current", isAuth(), currentUser);

const authUser = router;
module.exports = authUser;
