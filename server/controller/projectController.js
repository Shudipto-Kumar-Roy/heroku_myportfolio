const Project = require("../model/projectModel");
const ErrorHandeler = require("../utils/errorhandeler");
const catchAsyncError = require("../middleware/catchAsyncError");

// creating new project
exports.projectcreateController = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const project = await Project.create(data);
  res.status(201).json({
    message: "Project Created Successfully",
    project: project,
  });
});

// getting all the project data
exports.getProjectDataController = catchAsyncError(async (req, res, next) => {
  const projects = await Project.find();
  if (!projects) {
    return next(new ErrorHandeler("Projects not found", 404));
  }
  res.status(200).json({
    message: "Project Data getting successfull",
    projects: projects,
  });
});

// getting the single project
exports.getSingleProjectController = catchAsyncError(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new ErrorHandeler("Project not found", 404));
  }
  res.status(200).json({
    message: "Project Data getting successfull",
    project: project,
  });
});

// update the single project
exports.projectupdateController = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  let project = await Project.findById(req.params.id);
  if (!project) {
    return next(new ErrorHandeler("Project not found", 404));
  }
  project = await Project.findByIdAndUpdate(req.params.id, data);
  res.status(200).json({
    message: "Project Data Updated successfull",
    project: project,
  });
});

// delete the single project
exports.deleteprojectController = catchAsyncError(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new ErrorHandeler("Project not found", 404));
  }
  await project.delete();
  res.status(200).json({
    message: "Project Deleted successfully",
    project: project,
  });
});
