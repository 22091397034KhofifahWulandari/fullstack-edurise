// utils/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'; // Untuk membaca variabel lingkungan

dotenv.config(); // Memuat variabel lingkungan dari .env

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // misal: 'smtp.gmail.com' atau 'smtp.mailtrap.io'
    port: process.env.EMAIL_PORT, // misal: 587 atau 465
    secure: process.env.EMAIL_SECURE === 'true', // true untuk 465, false untuk port lain seperti 587
    auth: {
        user: process.env.EMAIL_USER, // user email Anda
        pass: process.env.EMAIL_PASS // password email Anda atau "app password" untuk Gmail
    }
});

const sendEmail = async (to, subject, htmlContent) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM, // Email pengirim
            to: to,
            subject: subject,
            html: htmlContent
        });
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Gagal mengirim email reset password.');
    }
};

export default sendEmail;