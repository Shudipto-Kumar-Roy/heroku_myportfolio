const nodeMailer = require("nodemailer");

// send user feedback email to admin
const sendfeedbackmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: options.email,
    to: process.env.SMTP_USER,
    subject: options.subject,
    html: options.body,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};
module.exports = sendfeedbackmail;
