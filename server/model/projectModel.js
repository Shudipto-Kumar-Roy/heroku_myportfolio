const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter project name "],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please enter project description "],
    },
    picture: {
      type: String,
      required: [true, "Please enter project image"],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
