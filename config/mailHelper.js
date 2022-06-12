const nodemailer = require('nodemailer');


const mailHelper = async(user, req)=>{
    var transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
       /* For sending emails from a Gmail account you need to do the following:
       1. Enable less secure apps - https://www.google.com/settings/security/lesssecureapps
       2. Disable Captcha temporarily so you can connect the new device/server - https://accounts.google.com/b/0/displayunlockcaptcha
      */
    const message = {
        from: '"Upcloud Technology" <upcloudtech@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Please Verify Your Email', // Subject line
        html: `<h2>${user.name}! thanks for registering to our site</h2>
                <h4>Please Verify Your mail to continue</h4>
                <a href="https://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify Your Email</a>`
    }
    await transporter.sendMail(message, (error, info) => {
        if(error){
            console.log(error);
        }else{
            console.log('Verification Email is sent')
        }
    });

}

module.exports = mailHelper;