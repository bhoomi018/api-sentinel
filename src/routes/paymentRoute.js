const express = require("express");
const axios = require("axios");
const { recordFailure, recordSuccess } = require("../sentinel/sentinel");
const router = express.Router();
const API_NAME = "payment";

router.get("/payment", async(req, res) => {
    try {
        // external api call
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

        await recordSuccess(API_NAME);

        res.json(response.data);

    } catch (err) {

        await recordFailure(API_NAME);

        res.status(500).json({ message: "Payment API failed" });

    }
})

module.exports = router;