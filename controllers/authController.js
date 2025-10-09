const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const {
    name,
    lastName,
    email,
    password,
    phoneNumber,
    profilePhoto,
    role,
    isAdmin,
    description,
  } = req.body;
  try {
    // check if email already exist
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).send({ message: "email already exist" });
    }

    // create new user
    const newUser = new User({
      name,
      lastName,
      email,
      password,
      phoneNumber,
      profilePhoto,
      role,
      isAdmin,
      description,
    });

    // hash the password before save the user
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    //generate a token for REGISTER:
    const payload = {
      _id: newUser._id,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: 14000,
    });

    // save the new user
    await newUser.save();
    res
      .status(201)
      .send({ user: newUser, message: "user added", token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).send({ error, msg: "can not save the user" });
  }
};

// login the user

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if email already exist
    const searchdUser = await User.findOne({ email });
    if (!searchdUser) {
      return res.status(401).send({ msg: "Bad credentials" });
    }
    // compare the password with hash pswrd
    const isMatch = await bcrypt.compare(password, searchdUser.password);
    if (!isMatch) {
      return res.status(401).send({ msg: "Bad credentials" });
    }
    //generate a token for LOGIN:
    const payload = {
      _id: searchdUser._id,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: 14000,
    });
    // send the user if the password is match
    res.status(201).send({
      user: searchdUser,
      msg: "user logged in successfully",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).send({ msg: "cannot get the user", error });
  }
};

// get cuurent user
exports.currentUser = async (req, res) => {
  res.status(201).send({ user: req.user });
};
