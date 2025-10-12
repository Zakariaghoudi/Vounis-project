const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/email");
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

    // generate code otp
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    newUser.otp = otpCode;
    newUser.expiresOtp = Date.now() + 10 * 60 * 1000;

    // save the new user
    await newUser.save();

    // sent verfication code to  email :
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.email,
      subject: "Vounis - Verfication Code-",
      html: `
         <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code</title>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
        }
        td {
            padding: 0;
        }
        img {
            border: 0;
            -ms-interpolation-mode: bicubic;
        }
        a {
            text-decoration: none;
            color: #007bff;
        }

        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .full-width-table {
                width: 100% !important;
            }
            .content-padding {
                padding: 20px !important;
            }
            .header-text {
                font-size: 24px !important;
            }
            .otp-code {
                font-size: 36px !important;
                padding: 15px 25px !important;
            }
            .button {
                padding: 10px 20px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; color: #333333; font-family: Arial, sans-serif;">

    <center style="width: 100%; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto;">

            <!-- Preheader text (appears in inbox preview) -->
            <div style="font-size: 0px; color: #f4f4f4; opacity: 0; visibility: hidden; width: 0px; height: 0px; display: none;">
                Your verification code is here! Use it to complete your action.
            </div>

            <!-- Email Wrapper Table -->
            <table class="full-width-table" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-top: 20px; margin-bottom: 20px;">
                <tr>
                    <td class="content-padding" style="padding: 40px 30px 40px 30px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                            <tr>
                                <td style="padding-bottom: 20px; text-align: center;">
                                     <img src="../client/public/logo.png" alt="Vounis" width="150" style="display: block; border: 0;" />
                                    <span style="font-size: 28px; font-weight: bold; color: #007bff;">YourApp</span>
                                </td>
                            </tr>

                            <!-- Header -->
                            <tr>
                                <td style="padding-bottom: 20px; text-align: center;">
                                    <h1 class="header-text" style="margin: 0; font-size: 32px; line-height: 40px; color: #333333; font-weight: bold;">Verify Your Account</h1>
                                </td>
                            </tr>

                            <!-- Main Content -->
                            <tr>
                                <td style="padding-bottom: 20px; text-align: center; font-size: 16px; line-height: 24px; color: #555555;">
                                    <p style="margin: 0;">Hi ${this.currentUser.name},</p>
                                    <p style="margin: 15px 0 0;">You recently requested a verification code to complete your action. Please use the following code:</p>
                                </td>
                            </tr>

                            <!-- OTP Code Section -->
                            <tr>
                                <td style="padding: 20px 0; text-align: center;">
                                    <span class="otp-code" style="display: inline-block; background-color: #f0f8ff; border: 2px dashed #a0d8ff; border-radius: 8px; padding: 20px 30px; font-size: 42px; font-weight: bold; color: #007bff; letter-spacing: 5px;">
                                        ${otpCode}
                                    </span>
                                </td>
                            </tr>

                            <!-- Instructions -->
                            <tr>
                                <td style="padding-bottom: 30px; text-align: center; font-size: 16px; line-height: 24px; color: #555555;">
                                    <p style="margin: 0;">This code is valid for 10 minutes. Do not share this code with anyone.</p>
                                    <p style="margin: 15px 0 0;">If you did not request this code, please ignore this email.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-bottom: 30px; text-align: center;">
                                    <a href="#" class="button" target="_blank" 
                                    style="background-color: #007bff; color: #ffffff; padding: 12px 25px;
                                     border-radius: 5px; display: inline-block; font-size: 18px; font-weight: bold;
                                      text-decoration: none;">
                                        Verify Now
                                    </a>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center; font-size: 14px; line-height: 20px; color: #999999;">
                                    <p style="margin: 0;">&copy; 2025 Vounis. All rights reserved.</p>
                                    <p style="margin: 5px 0 0;">[Vounis, Tunis, Gabes, 6021]</p>
                                    <!-- <p style="margin: 5px 0 0;"><a href="#" style="color: #999999;">Unsubscribe</a></p> -->
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>

</body>
</html>
      `,
    });
    // save the new user
    await newUser.save();
    res
      .status(201)
      .send({ user: newUser, message: "Please verify your account" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: error.message, msg: "Can not register this account" });
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
    if (!searchdUser.isVerified) {
      return res
        .status(403)
        .send({ msg: "Account not verifid, please check your email" });
    }
    // compare the password with hash pswrd
    const isMatch = await bcrypt.compare(password, searchdUser.password);
    if (!isMatch) {
      return res.status(401).send({ msg: "Bad credentials" });
    }
    // generate token
    const payload = {
      _id: searchdUser._id,
      role: searchdUser.role,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: "4h",
    });
    return res.status(200).send({
      user: searchdUser,
      msg: "Logged in Successfully",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).send({ msg: "external failed ", error: error.message });
  }
};
// verify 2FA
exports.OtpVerify = async (req, res) => {
  const { email, otpCode } = req.body;
  if (!email || !otpCode) {
    return res.status(500).send({ msg: "invalid Email or Code" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(500).send({ msg: "utilisateur introuvable" });
    }
    // compare the OTP code
    const OTPisMatch = user?.otp.toString() === otpCode.toString();
    if (!OTPisMatch) {
      return res.status(401).send({ msg: "Bad verification code " });
    }
    // verification date de validation
    const isExpired = user.expiresOtp < Date.now();
    if (isExpired) {
      return res.status(440).send({ msg: "Your verification code  expired" });
    }

    // change to verified user && clean data from DB
    user.isVerified = true;
    user.otp = null;
    user.expiresOtp = null;
    await user.save();
    //generate a token for LOGIN:
    const payload = {
      _id: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: "4h",
    });
    res.status(201).send({
      user: user,
      msg: " account verified and logged in successfully",
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
