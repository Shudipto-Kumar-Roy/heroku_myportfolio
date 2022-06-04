if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/.env" });
}

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const app = express();
const connectToDatabase = require("./config/database");
const PORT = process.env.PORT || 5000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(cookieParser());

// Handleing Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to Uncaught Exception");
  process.exit(1);
});

// Database connection
connectToDatabase();

// Route
const userRoute = require("./router/userRoute");
const projectRoute = require("./router/projectRoute");
const feedbackRoute = require("./router/feedbackRoute");
const skillRoute = require("./router/skillRoute");
const educationRoute = require("./router/educationRoute");
const fileRoute = require("./router/fileRoute");

app.use("/", userRoute);
app.use("/", projectRoute);
app.use("/", feedbackRoute);
app.use("/", skillRoute);
app.use("/", educationRoute);
app.use("/", fileRoute);

//last middleware for error
app.use(errorMiddleware);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });

}


const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Handeling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
