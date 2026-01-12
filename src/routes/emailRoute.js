const express = require("express");
const axios = require("axios");
const {
  recordFailure,
  recordSuccess,
} = require("../sentinel/sentinel");

const router = express.Router();
const API_NAME = "email"; 

router.get("/email", async (req, res) => {
  //console.log("EMAIL API HIT");

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    
    await recordSuccess(API_NAME);

    return res.json(response.data);
  } catch (err) {

    await recordFailure(API_NAME);

    return res.status(500).json({
      message: "Email API failed",
    });
  }
});

module.exports = router;
