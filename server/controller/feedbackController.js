const sendfeedbackmail = require("../mail/sendfeedbackmail");
const Feedback = require("../model/feedbackModel");
const catchAsyncError = require("../middleware/catchAsyncError");

// create user feedback
exports.createFeedbackController = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const feedback = await Feedback.create(data);
  res.status(201).json({
    message: "Feedback Created Successfully",
    feedback: feedback,
  });
  sendfeedbackmail({
    email: data.feedbackemail,
    subject: "User Feedback",
    body: `<p>User Name : ${data.feedbackname}</p>
               <p>User Email : ${data.feedbackemail}</p>
               <p>User Feedback : ${data.feedback}</p>
       `,
  });
});
