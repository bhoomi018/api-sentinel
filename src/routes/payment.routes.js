const express = require("express");
const router = express.Router();

const { apiSentinel } = require("../core/apiSentinel");
const { PAYMENT } = require("../constants/apiNames");
const { processPayment } = require("../controllers/payment.controller");

router.get("/", apiSentinel(PAYMENT), processPayment);

module.exports = router;
