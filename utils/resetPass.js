const transporter = require("./email");

const sendResetEmail = async (userEmail, resetToken) => {
  try {
    const resetUrl = `https://vounis-project.vercel.app/${resetToken}`;
    const mailOptions = {
      form: "Vounis Center",
      to: userEmail,
      subject: "Password Reset Request",
      html: `
            <p> You requested a password reset.</p>
            <p> click this link to set a new password :</p>
            <a href="${resetUrl}" > Reset Password</a>
                <p> this link is valid for 1 hour. </p>
                  `,
    };
    await transporter.sendMail(mailOptions);
    console.log("Reset password sent successfully!");
  } catch (error) {
    console.log("error to send reset email", error);
  }
};

module.exports = sendResetEmail;
