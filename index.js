const express = require("express");
require("dotenv").config();

const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 8000;
const emailService = process.env.EMAIL_HOST;
const emailPort = process.env.EMAIL_PORT;
const userEmail = process.env.USER;
const userPass = process.env.APP_PASS;

console.log("ENV return:: ", process.env.EMAIL_PORT);

app.use(express.json());

// Set up the CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const transporter = nodemailer.createTransport({
  host: emailService,
  port: emailPort,
  secure: true,
  auth: {
    user: userEmail,
    pass: userPass,
  },
});

// Preflight request
app.options("/subscribe", function (req, res) {
  res.sendStatus(200);
});

app.post("/subscribe", async (req, res) => {
  const email = req.body.email;
  console.log("Request param: ", req.body);

  var mailOptions = {
    from: userEmail,
    to: "zarir.destinyawaits@gmail.com",
    subject: "DGXP Website:: New Email droppeed for Demo",
    text:
      `Customer Email: 
        ` + email,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent succesfully!");
    res.send("Subscribed!");
  } catch (err) {
    console.log("Error while sending email: ", err);
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log("Request params: ", req.body);

  var mailOptions = {
    from: userEmail,
    to: userEmail,
    subject: "DGXP Website:: New Message from Contact Form",
    text:
      `Customer Email: 
        ` +
      email +
      `\n\nCustomer Name: 
        ` +
      name +
      `\n\nCustomer Phone Number: 
        ` +
      phone +
      `\n\nCustomer Message: 
        ` +
      message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent succesfully!");
    res.send("Contact Form Submitted!");
  } catch (err) {
    console.log("Error while sending email: ", err);
  }
});

app.listen(port, () => {
  console.log("Email server listening at http://localhost:" + port);
});
