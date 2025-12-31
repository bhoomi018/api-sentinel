const express = require("express");

let failureCount = 0;
// false means api allowed, true means api blocked
let circuitOpen = false;

function apiSentinel (req, res, next) {
    if(circuitOpen) {
      return res.status(503).json({
        messgae: "Circuit is OPEN. Try again later",
      })
    }

    next();
}

function recordFailure () {
    failureCount++;
    console.log("Failures:", failureCount);

    if(failureCount >= 3) {
        console.log("Circuit Opened");
    }
}

function recordSuccess () {
    failureCount = 0;
    console.log("Failures Reset");
}

module.exports = { apiSentinel, recordFailure, recordSuccess };