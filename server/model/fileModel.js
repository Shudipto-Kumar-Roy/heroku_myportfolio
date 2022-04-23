const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  file: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("File", fileSchema, "files", {
  capped: true,
  max: 1,
});
