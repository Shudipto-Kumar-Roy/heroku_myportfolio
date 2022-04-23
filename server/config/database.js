const mongoose = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");
const connectToDatabase = catchAsyncError(async () => {
  const data = await mongoose.connect(process.env.DB_URL);
  console.log(`Database connected with the server ${data.connection.host}`);
});
module.exports = connectToDatabase;
