const { sendMail } = require("./email");

const sendResetEmail = async (userEmail, resetToken) => {
  try {
    const resetUrl = `https://vounis-project.vercel.app/${resetToken}`;
    const mailOptions = {
      to: userEmail,
      subject: "Password Reset Request",
      html: `
      <div style:"max-width:580px; border:1px solid #19bea3ff";
      margin:20px auto; padding:25px; text-align:center; >
              <h4>Vounis Center</h4>
            <p> You requested a password reset.</p>
            <p> click this link to set a new password :</p>
            <a href="${resetUrl}" > Reset Password</a>
                <p> this link is valid for 1 hour. </p>
        </div>  
                `,
    };
    await sendMail(mailOptions.to, mailOptions.subject, mailOptions.html);
    console.log("Reset password sent successfully!");
  } catch (error) {
    console.log("error to send reset email", error);
  }
};

module.exports = sendResetEmail;
