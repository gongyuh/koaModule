import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
async function send() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.qq.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user:'', // generated ethereal user
//       pass: '', // generated ethereal password
//     },
//   });

  //
  let sendInfo = {
      code:'1234',
      expire:'2021-05-30',
      email:'to-somebody',
      user:'someone'
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"认证邮件" <2736498007@qq.com>', // sender address
    to: "sendInfo.email", // list of receivers
    subject: "sendInfo.user !== ''? `你好${sendInfo.user},你的注册码是` : 无名你的注册码是 ", // Subject line
    text: "`${sendInfo.code},过期时间是${sendInfo.expire}`", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  return "Message sent: %s", info.messageId
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
export default {
    send
}
