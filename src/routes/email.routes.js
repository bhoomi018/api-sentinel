const express = require("express");
const router = express.Router();

const {
  apiSentinel,
  recordFailure,
  recordSuccess,
} = require("../core/apiSentinel");

const { callEmailAPI } = require("../services/email.service");
const { EMAIL } = require("../constants/apiNames");

router.get("/", apiSentinel(EMAIL),
  async (req, res) => {
    try {
      const response = await callEmailAPI();
      await recordSuccess(EMAIL);
      res.json(response.data);
    } catch {
      await recordFailure(EMAIL);
      res.status(500).json({
        message: "Email service temporarily unavailable",
      });
    }
  }
);

module.exports = router;
