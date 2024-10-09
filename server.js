import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv'

const app = express();
app.use(express.json());
dotenv.config()
app.use(cors({
    origin: ['http://localhost:3000','https://manishportfolio-32d3882b9f87.herokuapp.com'],
    credentials:true
}))

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.email,
        pass: process.env.password, // Use App Password if you have 2FA enabled
    },
});

// Endpoint to send an email
app.post('/sendMail', async (req, res) => {
    const { username, userEmail, message } = req.body;

    const mailOptions = {
        from: userEmail, // Your email address
        to: process.env.email, // Your email address
        subject: `Message from ${username}`, // Subject of the email
        text: message, // The actual message content
        replyTo: userEmail, // Set the reply-to field to the user's email
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send email.' });
    }
});

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
