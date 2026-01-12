const express = require("express");
const { apiSentinel } = require("./sentinel/sentinel");

const paymentRoute = require("./routes/paymentRoute");
const emailRoute = require("./routes/emailRoute");

const app = express();
app.use(express.json());

app.use("/payment", apiSentinel("payment"));
app.use("/email", apiSentinel("email"));

app.use(paymentRoute);
app.use(emailRoute);

module.exports = app;
