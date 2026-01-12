require("dotenv").config({ quiet: true });

/*// Suppress Hugging Face noisy logs ONLY
const originalLog = console.log;
console.log = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("Defaulting to 'auto'") ||
      args[0].includes("Auto selected provider"))
  ) {
    return;
  }
  originalLog(...args);
};
*/
const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// http://localhost:3000/payment