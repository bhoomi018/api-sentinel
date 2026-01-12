# API Sentinel

## Project Summary

API Sentinel is a backend reliability system designed to protect applications from unstable or failing external APIs.

It uses a Redis-backed circuit breaker to monitor repeated failures, temporarily block traffic during outages, and automatically recover after a cooldown period.

Each external API is isolated with its own independent circuit state to prevent cascading failures across the system.  
An optional AI-based risk analysis layer provides runtime observability by classifying behavior as **LOW, MEDIUM, or HIGH**, while all critical reliability decisions remain strictly rule-based.

**Tech Stack:** Node.js, Express.js, Redis, JavaScript, Hugging Face Inference API
