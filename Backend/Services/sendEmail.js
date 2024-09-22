import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function sendEmail(email, firstname, lastname, otp = null) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        let mailOptions;
        if (otp) {
            mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your OTP Code',
                text: `Hello ${firstname} ${lastname},

                Here is your OTP code for verification: **${otp}**.

                Please enter this code to continue with your process. 

                If you did not request this code, please ignore this email.

                Best regards,
                Ganesh Patel
                Admin, MyApp
                If you have any questions, contact us at support@myapp.com.`,
            };
        } else {
            mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome to MyApp!',
                text: `Hello ${firstname} ${lastname},

                Thank you for signing up with MyApp! We're thrilled to have you on board.

                Your registration is now complete, and you can start exploring all the features we offer. If you have any questions or need assistance, feel free to reach out to us.

                Best regards,
                Ganesh Patel
                Admin, MyApp

                If you did not sign up for this account, please ignore this email or contact us at support@myapp.com to report any issues.`,
            };
        }

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', email);
        
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email. Please try again later.'); // Rethrow error for handling in the calling function
    }
}

export default sendEmail;
