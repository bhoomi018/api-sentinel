const express = require("express");
const axios = require("axios");
const { recordFailure, recordSuccess } = require("../sentinel/sentinel");
const router = express.Router();

router.get("/test-api", async(req, res) => {
    try {
        // external api call
        const response = await axios.get("https://jsonplaceholder.typicode.com/postsssss");

        recordSuccess();

        return res.json({
            success: true,
            data: response.data,
        });

    } catch {

        recordFailure();

        return res.status(500).json({
            success: false,
            message: "External Api failed"
        });
    }
})

module.exports = router;