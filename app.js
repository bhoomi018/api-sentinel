const express = require("express");
const app = express();
const { apiSentinel } = require("./sentinel/sentinel");
const testRoute = require("./routes/testRoute");

app.use(express.json());

// Api sentinel middleware
app.use(apiSentinel);

// Routes
app.use(testRoute);

//test route
app.get("/", (req,res) => {
    res.send("API Sentinel is running");
})

module.exports = app;