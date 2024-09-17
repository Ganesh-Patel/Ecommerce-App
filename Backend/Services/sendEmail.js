
import nodemailer from 'nodemailer';
import dotenv from 'dotenv/config'

async function sendEmail(email,firstname,lastname)
{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to MyApp!',
        text: `Hello ${firstname} ${lastname},
      
      Thank you for signing up with MyApp! We're thrilled to have you on board.
      
      Your registration is now complete, and you can start exploring all the features we offer. If you have any questions or need assistance, feel free to reach out to us.
      
      Best regards,
      Ganesh Patel
      Admin, MyApp
      
      If you did not sign up for this account, please ignore this email or contact us at support@myapp.com to report any issues.`
      };
      

    await transporter.sendMail(mailOptions);
}

export default sendEmail;