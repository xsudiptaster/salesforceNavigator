var nodemailer = require("nodemailer");

const sendEmail = async (data) => {
   var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
         user: "xsudiptaster@gmail.com",
         pass: "aisxkjkrzociyjsw",
      },
   });
   var mailOptions = {
      sender: data.email,
      to: "xsudiptaster@gmail.com",
      subject: "NCONSOLE ERROR",
      text: "From :" + data.email + " ISSUE: " + data.body,
      attachments: data.attachments,
   };
   let response = await transporter.sendMail(mailOptions);
   return response;
};

module.exports = sendEmail;
