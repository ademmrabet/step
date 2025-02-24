const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.Email_PASSWORD,
    },
});


const sendEmail = async (to, subject, htmlContent) => {
    try{
        const mailOptions = {
            from: `"Step Footwear" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:',info.messageId);
        return info;
    }catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;