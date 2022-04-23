const Education = require("../model/educationModel");
const ErrorHandeler = require("../utils/errorhandeler");
const catchAsyncError = require("../middleware/catchAsyncError");

// create education
exports.educationcreateController = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const education = await Education.create(data);
  res.status(201).json({
    message: "Education Created Successfully",
    education: education,
  });
});

// get all education
exports.geteducationController = catchAsyncError(async (req, res, next) => {
  const educations = await Education.find();
  res.status(200).json({
    message: "Education data getting successfull",
    educations: educations,
  });
});

// delete education data
exports.deleteeducationController = catchAsyncError(async (req, res, next) => {
  const education = await Education.findById(req.params.id);
  if (!education) {
    return next(new ErrorHandeler("Education not found", 404));
  }
  await education.delete();
  res.status(200).json({
    message: "Education Deleted successfully",
    education: education,
  });
});

// update education data
exports.educationupdateController = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  let education = await Education.findById(req.params.id);
  if (!education) {
    return next(new ErrorHandeler("Education not found", 404));
  }
  education = await Education.findByIdAndUpdate(req.params.id, data);
  res.status(200).json({
    message: "Education Data Updated successfull",
    education: education,
  });
});

// get single education data
exports.getSingleEducationController = catchAsyncError(
  async (req, res, next) => {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return next(new ErrorHandeler("Education not found", 404));
    }
    res.status(200).json({
      message: "Education Data getting successfull",
      education: education,
    });
  }
);
