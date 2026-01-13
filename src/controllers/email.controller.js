const {
  recordFailure,
  recordSuccess,
} = require("../core/apiSentinel");

const { callEmailAPI } = require("../services/email.service");
const { EMAIL } = require("../constants/apiNames");

async function sendEmail(req, res) {
  try {
    const response = await callEmailAPI();
    await recordSuccess(EMAIL);
    return res.json(response.data);
  } catch {
    await recordFailure(EMAIL);
    return res.status(500).json({
      message: "Email service temporarily unavailable",
    });
  }
}

module.exports = { sendEmail };
