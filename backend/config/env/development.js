module.exports = {
    env: "development",
    port: 5000,
    mongoUri: "mongodb://127.0.0.1:27017/chatgpt_companion_db",
    jwtSecret: process.env.JWT_SECRET,
    clientOrigin: "http://localhost:5173",
    // OPENAI_API_KEY: "your_api_key_here"
};

