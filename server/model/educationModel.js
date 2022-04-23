const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    degreeinshort: {
      type: String,
      required: [true, "Please enter degree in short"],
    },
    degree: {
      type: String,
      required: [true, "Please enter degree name"],
    },
    institution: {
      type: String,
      required: [true, "Please enter institution name"],
      unique: true,
    },
    result: {
      type: String,
      required: [true, "Please enter result"],
    },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
