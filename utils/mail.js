const nodemailer = require("nodemailer");

exports.generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp = otp + randVal;
  }
  return otp;
};

exports.mailTransport = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

exports.generateEmailTemplate = (code) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Email</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333333;
        background-color: #f7f7f7;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 40px;
      }
      .logo {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo img {
        max-width: 100%;
        height: auto;
      }
      .heading {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
        text-align: center;
      }
      .otp-code {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 30px;
      }
      .note {
        font-size: 14px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="https://res.cloudinary.com/dq9wvmljt/image/upload/v1683555760/business_name_no_backg_lqievo.png" alt="Logo" />
      </div>
      <div class="heading">Your OTP</div>
      <div class="otp-code">${code}</div>
      <div class="note">
        This OTP is valid for 5 minutes. Please do not share it with anyone.
      </div>
    </div>
  </body>
</html>
`;
};

exports.plainEmailTemplate = (heading, message) => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>OTP Email</title>
    <style>
      /* Base */
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.4;
        color: #333;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
      }
      p {
        margin: 0 0 1em 0;
      }

      /* Header */
      .header {
        background-color: #f8f8f8;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }

      /* Body */
      .body {
        padding: 20px;
        background-color: #ffffff;
        border-bottom: 1px solid #eeeeee;
      }
      .body h2 {
        font-size: 20px;
        font-weight: bold;
        color: #333;
        margin: 0 0 10px 0;
      }
      .body p {
        font-size: 16px;
        line-height: 1.4;
        color: #333;
        margin: 0 0 10px 0;
      }

      /* Footer */
      .footer {
        background-color: #f8f8f8;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Confirmation Email</h1>
    </div>
    <div class="body">
      <h2>${heading}</h2>
      <p>${message}</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} CampApp</p>
    </div>
  </body>
</html>
    
    `;
};

exports.generatePasswordResetTemplate = (url) => {
  return `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #f7f7f7;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        margin: auto;
        overflow: hidden;
        padding: 30px;
      }
      h1 {
        color: #008cba;
        margin-top: 0;
      }
      p {
        color: #333;
        font-size: 16px;
        line-height: 1.5;
        margin: 0 0 15px;
      }
      a {
        background-color: #008cba;
        border: none;
        border-radius: 5px;
        color: #fff;
        display: inline-block;
        font-size: 16px;
        margin-top: 20px;
        padding: 10px 20px;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      a:hover {
        background-color: #00657b;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>Hello,</p>
      <p>We have received a request to reset your password. Please click the button below to reset your password:</p>
      <a href="${url}">Reset Password</a>
      <p>If you did not request to reset your password, please ignore this email.</p>
      <p>Thank you,</p>
      <p>The Camp-App Team</p>
    </div>
  </body>
</html>

      `;
};
