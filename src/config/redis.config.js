const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => {
    console.error("Redis error", err);
});

(async () => {
    await redisClient.connect();
    console.log("Redis Connected");
})();

module.exports = redisClient;
