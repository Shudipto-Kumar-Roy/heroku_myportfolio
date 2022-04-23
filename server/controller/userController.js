const sendmail = require("../mail/sendmail");
const User = require("../model/userModel");
const crypto = require("crypto");
const sendTokenToCookie = require("../sendTokenToCookie");
const ErrorHandeler = require("../utils/errorhandeler");
const catchAsyncError = require("../middleware/catchAsyncError");

// signup user
exports.signUpController = catchAsyncError(async (req, res, next) => {
  const { signUpName, signUpEmail, signUpPassword, signUpConfirmPassword } =
    req.body;

  const userExist = await User.findOne({ email: signUpEmail });
  if (userExist) {
    return next(new ErrorHandeler("User already Exists with this email", 409));
  }
  const user = await User.create({
    name: signUpName,
    email: signUpEmail,
    password: signUpPassword,
    confirmPassword: signUpConfirmPassword,
  });
  sendTokenToCookie(user, 201, res);
});

// login user
exports.loginController = catchAsyncError(async (req, res, next) => {
  const { loginEmail, loginPassword } = req.body;
  const user = await User.findOne({
    email: loginEmail,
  }).select("+password");

  if (!user) {
    return next(new ErrorHandeler("User not found", 404));
  }

  const isPasswordMatched = await user.comparePassword(loginPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandeler("Invalid Credential", 401));
  }
  sendTokenToCookie(user, 200, res);
});

// logout user
exports.logoutController = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// exports.createProjectController = async (req, res, next) => {
//   res.status(200).json({ rootUser: req.user });
// };

// load admin screen
exports.adminScreenController = (req, res, next) => {
  if (req.user) {
    res.status(200).json({ rootUser: req.user });
  } else {
    return next(
      new ErrorHandeler("Only login admin can access this resource", 401)
    );
  }
};

// load navbar
exports.navbarController = (req, res, next) => {
  if (req.user) {
    res.status(200).json({ rootUser: req.user });
  } else {
    return next(new ErrorHandeler("Only login user can show his name", 401));
  }
};

// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandeler("User not found"));
  }
  // Get Reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save();
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
  const message = `Your reset password token is : ${resetPasswordUrl}`;
  const body = `<h3>Instructions : </h3> \n
  <p>Use the reset password link to reset your password , otherwise you can skip..</p> 
  ${message}
  `;
  try {
    await sendmail({
      email: user.email,
      subject: "Password Recovery",
      message: message,
      body: body,
    });
    res.status(200).json({
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandeler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandeler(
        "Reset Password token is invalid or has been expired ",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandeler("Password Does not match"));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendTokenToCookie(user, 200, res);
});
