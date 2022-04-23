const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the skill name"],
      unique: true,
    },
    value: {
      type: Number,
      required: [true, "Please enter the skill value"],
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
