const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => {
  console.log("Redis Client Error", err.message);
});

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis Connected");
  }
}

module.exports = {
  redisClient,
  connectRedis,
};
