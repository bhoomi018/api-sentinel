const express = require("express");
const router = express.Router();

const { apiSentinel } = require("../core/apiSentinel");
const { EMAIL } = require("../constants/apiNames");
const { sendEmail } = require("../controllers/email.controller");

router.get("/", apiSentinel(EMAIL), sendEmail);

module.exports = router;
