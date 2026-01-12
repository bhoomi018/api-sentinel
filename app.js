require("dotenv").config({ quiet: true });
const express = require("express");

const { connectRedis } = require("./src/config/redis.config");
const emailRoutes = require("./src/routes/email.routes");
const paymentRoutes = require("./src/routes/payment.routes");

const app = express();
app.use(express.json());

app.use("/email", emailRoutes);
app.use("/payment", paymentRoutes);

const PORT = 3000;

app.listen(PORT, async () => {
  await connectRedis();
  console.log(`Server running on port ${PORT}`);
});
