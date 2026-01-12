const redisClient = require("../config/redis.config");
const { getRisk } = require("../ai/riskAnalyzer");

const FAILURE_THRESHOLD = 3;
const FAILURE_WINDOW = 120; // seconds
const CIRCUIT_TTL = 60; // seconds

function keys(apiName) {
  return {
    failures: `api:${apiName}:failures`,
    circuit: `api:${apiName}:circuit`,
  };
}

// Middleware
function apiSentinel(apiName) {
  return async (req, res, next) => {
    const { circuit } = keys(apiName);
    const state = await redisClient.get(circuit);

    if (state === "OPEN") {
      return res.status(503).json({
        message: `Service '${apiName}' temporarily unavailable`,
      });
    }

    next();
  };
}

// Failure handler
async function recordFailure(apiName) {
  const { failures, circuit } = keys(apiName);

  const circuitState = await redisClient.get(circuit);
  if (circuitState === "OPEN") return;

  const count = await redisClient.incr(failures);
  await redisClient.expire(failures, FAILURE_WINDOW);

  console.log(`[${apiName}] Failures: ${count}`);

  // Rule-based circuit open
  if (count >= FAILURE_THRESHOLD) {
    await redisClient.set(circuit, "OPEN", { EX: CIRCUIT_TTL });
    console.log(`[${apiName}] Circuit OPENED (rule)`);
    return;
  }

  // AI risk (advisory only)
  const aiRisk = await getRisk(
    `${apiName} API had ${count} failures`,
    count
  );

  console.log(`[${apiName}] AI risk: ${aiRisk}`);
}

// Success handler
async function recordSuccess(apiName) {
  const { failures } = keys(apiName);
  await redisClient.del(failures);
  console.log(`[${apiName}] Failures reset (SUCCESS)`);
}

module.exports = {
  apiSentinel,
  recordFailure,
  recordSuccess,
};
