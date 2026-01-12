const express = require("express");
const router = express.Router();

const {
  apiSentinel,
  recordFailure,
  recordSuccess,
} = require("../core/apiSentinel");

const { callPaymentAPI } = require("../services/payment.service");
const { PAYMENT } = require("../constants/apiNames");

router.get("/", apiSentinel(PAYMENT),
  async (req, res) => {
    try {
      const response = await callPaymentAPI();
      await recordSuccess(PAYMENT);
      res.json(response.data);
    } catch {
      await recordFailure(PAYMENT);
      res.status(500).json({
        message: "Payment service temporarily unavailable",
      });
    }
  }
);

module.exports = router;
