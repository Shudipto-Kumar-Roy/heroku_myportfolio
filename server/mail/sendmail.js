const nodeMailer = require("nodemailer");

const sendmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST_FORGOTPASSWORD,
    port: process.env.SMTP_PORT_FORGOTPASSWORD,
    auth: {
      user: process.env.SMTP_USER_FORGOTPASSWORD,
      pass: process.env.SMTP_PASS_FORGOTPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER_FORGOTPASSWORD,
    to: options.email,
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
module.exports = sendmail;
