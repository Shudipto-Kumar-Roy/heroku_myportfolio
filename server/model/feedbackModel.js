const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    feedbackname: {
      type: String,
      required: [true, "Please enter your name"],
    },
    feedbackemail: {
      type: String,
      required: [true, "Please enter your email"],
    },
    feedback: {
      type: String,
      required: [true, "Please enter your feedback"],
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
