import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());

app.use(
  cors()
);

app.get('/', (req, res) => {
  res.status(200).send('Hello from server');
});

app.post('/api/send-email', async (req, res) => {
  const { fname, lname, email, phone, message } = req.body;
  console.log('Request body:', req.body); // Log request body for debugging

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bhandarirepository2003@gmail.com',
        pass: 'amzn wyde jruv njoh', // Use environment variables for sensitive data
      },
    });

    const mailOptions = {
      from: 'bhandarirepository2003@gmail.com',
      to: 'bhandarirepository2003@gmail.com', // Replace with your email
      subject: `Contact Form Submission from ${fname} ${lname}`,
      text: `
        First Name: ${fname}\n
        Last Name: ${lname}\n
        Email: ${email}\n
        Phone: ${phone}\n
        Message: ${message}\n`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    res.status(200).send({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('Error sending email:', error); // Log error details
    res.status(500).send({ success: false, error: error.message });
  }
});

export default app;
