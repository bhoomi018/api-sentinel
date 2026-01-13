# API Sentinel

API Sentinel is a backend reliability system designed to protect applications from unstable or failing external APIs.

It implements a Redis-backed circuit breaker to detect repeated failures, temporarily block traffic during outages, and automatically recover after a cooldown period.

Each external API is isolated with its own independent circuit state, preventing cascading failures across the system.  
An optional AI-based risk analysis layer provides runtime observability by classifying behavior as **LOW**, **MEDIUM**, or **HIGH**, while all critical reliability decisions remain strictly rule-based.

**Tech Stack:** Node.js, Express.js, Redis, JavaScript, Hugging Face Inference API

---

## Running the Application

The project uses standard npm scripts for execution.

### Start the Application
```bash
npm start
