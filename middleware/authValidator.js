const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("name", "name is required").notEmpty(),
  check("lastName", "lastName is required").notEmpty(),
  check("email", "email is required").notEmpty(),
  check("email", "email is not an email").isEmail(),
  check("password", "password Should be Alphanumeric").matches(
    /(?=.*[a-zA-Z])(?=.*[0-9])/
  ),
  check("password", "password Should be a least 6 characters").isLength({
    min: 6,
    max: 20,
  }),
];
exports.loginRules = () => [
  check("email", "email is required").notEmpty(),
  check("email", "email is not an email").isEmail(),
  check("password", "password Should be Alphanumeric").matches(
    /(?=.*[a-zA-Z])(?=.*[0-9])/
  ),
  check("password", "password Should be a least 6 characters").isLength({
    min: 6,
    max: 20,
  }),
];


exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((el) => el.msg) });
  }
  return next();
};


