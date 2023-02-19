const express = require("express");
require("dotenv").config();

const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/email/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Email server listening at http://localhost:" + port);
});
