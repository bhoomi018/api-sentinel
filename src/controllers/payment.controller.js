const {
  recordFailure,
  recordSuccess,
} = require("../core/apiSentinel");

const { callPaymentAPI } = require("../services/payment.service");
const { PAYMENT } = require("../constants/apiNames");

async function processPayment(req, res) {
  try {
    const response = await callPaymentAPI();
    await recordSuccess(PAYMENT);
    return res.json(response.data);
  } catch {
    await recordFailure(PAYMENT);
    return res.status(500).json({
      message: "Payment service temporarily unavailable",
    });
  }
}

module.exports = { processPayment };
