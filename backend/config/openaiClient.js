const OpenAI = require("openai");
const config = require("./config");

let openai = null;

if (!config.openaiApiKey) {
    console.warn(
        "OPENAI_API_KEY is not set. The reflect endpoint will fall back to local mock responses."
    );
} else {
    openai = new OpenAI({
        apiKey: config.openaiApiKey,
    });
}

module.exports = openai;