const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.PASS_USER,
    },
    tls: {
      rejectUnauthorized: false,
    },
    // Render (and several cloud hosts) resolve smtp.gmail.com to an IPv6
    // address by default, which then hangs/times out. Forcing IPv4 fixes it.
    family: 4,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });
  const mailData = {
    from: `"Vounis Center" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
module.exports = sendMail;
