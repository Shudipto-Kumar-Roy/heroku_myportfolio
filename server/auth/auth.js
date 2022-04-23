const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const ErrorHandeler = require("../utils/errorhandeler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Check the login user
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandeler("Please login to access the resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const rootUser = await User.findById(decodedData.id);
  req.user = rootUser;
  req.token = token;
  next();
});

// Check the authorized admin
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userRole)) {
      return next(
        new ErrorHandeler(
          `Role : ${req.user.userRole} is not allowed to access this resource`,
          401
        )
      );
    }
    next();
  };
};
