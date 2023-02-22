const express = require("express");
require("dotenv").config();

const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 8000;
const emailService = process.env.EMAIL_SERVICE;
const userEmail = process.env.USER;
const userPass = process.env.PASS;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const transporter = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: userEmail,
    pass: userPass,
  },
});

app.get("/subscribe", async (req, res) => {
  var mailOptions = {
    from: userPass,
    to: userPass,
    subject: "Test email",
    text: `Testing email service.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent succesfully!");
    res.send("Subscribed!");
  } catch (err) {
    console.log("Error while sending email: ", err);
  }
});

app.listen(port, () => {
  console.log("Email server listening at http://localhost:" + port);
});
