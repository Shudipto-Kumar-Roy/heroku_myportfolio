const Skill = require("../model/skillModel");
const ErrorHandeler = require("../utils/errorhandeler");
const catchAsyncError = require("../middleware/catchAsyncError");

// create skill
exports.skillcreateController = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const skill = await Skill.create(data);
  res.status(201).json({
    message: "Skill Created Successfully",
    skill: skill,
  });
});

// get all skills
exports.getSkillDataController = catchAsyncError(async (req, res, next) => {
  const skills = await Skill.find();
  if (!skills) {
    return next(new ErrorHandeler("Skills not found", 404));
  }
  res.status(200).json({
    message: "Skill Data getting Successfully",
    skills: skills,
  });
});

// delete single skill
exports.deleteskillController = catchAsyncError(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return next(new ErrorHandeler("Skill not found", 404));
  }
  await skill.delete();
  res.status(200).json({
    message: "Skill Deleted successfully",
    skill: skill,
  });
});

// update skill
exports.skillupdateController = catchAsyncError(async (req, res, next) => {
  const data = req.body;

  let skill = await Skill.findById(req.params.id);
  if (!skill) {
    return next(new ErrorHandeler("Skill not found", 404));
  }
  skill = await Skill.findByIdAndUpdate(req.params.id, data);
  res.status(200).json({
    message: "Skill Data Updated successfull",
    skill: skill,
  });
});

// get single skill
exports.getSingleSkillController = catchAsyncError(async (req, res, next) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    return next(new ErrorHandeler("Skill not found", 404));
  }
  res.status(200).json({
    message: "Skill Data getting successfull",
    skill: skill,
  });
});
