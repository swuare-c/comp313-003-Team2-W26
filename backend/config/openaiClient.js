const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
    console.warn(
        "OPENAI_API_KEY is not set. The reflect endpoint will fall back to local mock responses."
    );
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = openai;