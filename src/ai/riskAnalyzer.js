const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_API_KEY);

async function getRisk(text, failureCount) {
  if (failureCount === 1) return "MEDIUM";
  if (failureCount >= 2) return "HIGH";

  try {
    const result = await hf.textClassification({
      model: "distilbert-base-uncased-finetuned-sst-2-english",
      inputs: text,
    });

    const label = result?.[0]?.label;
    if (label === "NEGATIVE") return "HIGH";
    if (label === "POSITIVE") return "LOW";

    return "MEDIUM";
  } catch {
    return "UNKNOWN";
  }
}

module.exports = { getRisk };
