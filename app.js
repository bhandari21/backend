import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
    

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
  }));

  app.use('/', (req,res)=>{
    res.status(200).send("hello from server")
  })

  app.post('/api/send-email', (req, res) => {
    const { fname, lname, email, phone, message } = req.body;
    console.log("Request body:", req.body); // Log request body for debugging
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "bhandarirepository2003@gmail.com",
        pass: "rjcm kqbb ayte qtfe",
      },
    });
  
    const mailOptions = {
      from: "bhandarirepository2003@gmail.com",
      to: "bhandarirepository2003@gmail.com", // replace with your emailpra
      subject: `Contact Form Submission from ${fname + " " + lname}`,
      text: `
      fname: ${fname} \n\n
      lname: ${lname} \n\n
      email: ${email} \n\n
      phone: ${phone} \n\n
      Message: ${message} \n\n`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error); // Log error details
        return res.status(500).send({ success: false, error: error.message });
      }
      console.log("Email sent successfully:", info.response);
      res.status(200).send({ success: true, message: 'Email sent!' });
    });
  });
  

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
