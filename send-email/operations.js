const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nodemailer transporter setup
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mail@gmail.com", // Your email address
    pass: "password", // Your password
  },
});

// Endpoint to handle form submission
app.post("/send-email", (req, res) => {
  const email = req.body.email;
  const answer = req.body.answer;

  // Email content
  let mailOptions = {
    from: "mail@gmail.com", // Sender email
    to: email, // Recipient email
    subject: "Your Answer",
    text: `Your answer: ${answer}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
