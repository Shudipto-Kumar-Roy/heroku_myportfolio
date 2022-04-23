const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandeler = require("../utils/errorhandeler");
const File = require("../model/fileModel");

exports.uploadFileController = catchAsyncError(async (req, res, next) => {
  const contentType = req.body.base64File
    .split(",")
    .shift()
    .split(";")
    .shift()
    .split(":")
    .pop();
  if (contentType !== "application/pdf") {
    return next(new ErrorHandeler("Only pdf is allowed", 400));
  }
  const file = await File.create({ file: req.body.base64File });
  res.status(201).json({
    message: "Successfully Uploaded file",
    file: file,
  });
});

exports.getFileController = catchAsyncError(async (req, res, next) => {
  const file = await File.findOne();
  if (!file) {
    return next(new ErrorHandeler("File not found", 404));
  }
  res.status(200).json({
    message: "File get success",
    file: file,
  });
});

exports.deleteFileController = catchAsyncError(async (req, res, next) => {
  let file = await File.findById(req.params.id);
  if (!file) {
    return next(new ErrorHandeler("File not found", 404));
  }
  await file.remove();
  res.status(200).json({
    message: "File deleted successfully",
  });
});
