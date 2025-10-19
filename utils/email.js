const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_USER,
  },
};
const transporter = nodemailer.createTransport(transport);
transporter.verify((error, succes) => {
  if (error) {
    console.error(error);
  } else {
    console.log("success ");
  }
});

module.exports = transporter;
