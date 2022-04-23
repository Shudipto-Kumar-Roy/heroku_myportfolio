const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../auth/auth");
const { createFeedbackController } = require("../controller/feedbackController");

router.post("/user/feedback", isAuthenticatedUser, createFeedbackController);

module.exports = router;