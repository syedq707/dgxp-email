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
  res.send("Incorrect Endpoint.");
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

/* ------------For DigitalGxP------------ */
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
    res.send({ data: "Subscribed!" });
  } catch (err) {
    console.log("Error while sending email: ", err);
  }
});

// Preflight request
app.options("/contact", function (req, res) {
  res.sendStatus(200);
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
    res.send({ data: "Contact Form Submitted!" });
  } catch (err) {
    console.log("Error while sending email: ", err);
  }
});

/* ------------For RBot------------ */
// Preflight request
app.options("/contact", function (req, res) {
  res.sendStatus(200);
});

app.post("/rbot/book-a-call", async (req, res) => {
  const { restaurantName, email, phone } = req.body;
  console.log("Request params: ", req.body);

  var mailOptions = {
    from: userEmail,
    to: "zarir.destinyawaits@gmail.com, syedw.minds@gmail.com",
    subject: "RBOT Website:: New Book A Call Request",
    text:
      `Restaurant Name: 
        ` +
      restaurantName +
      `\n\nCustomer Email: 
        ` +
      email +
      `\n\nCustomer Phone Number: 
        ` +
      phone,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Rbot book a call!");
    res.send({
      data: "Your booking request has been submitted. We will contact you soon to schedule a call.",
    });
  } catch (err) {
    console.log("Error while sending email: ", err);
  }
});

app.listen(port, () => {
  console.log("Email server listening at http://localhost:" + port);
});
