module.exports = {
    env: "development",
    port: process.env.PORT || 5000,
    // Strictly use local MongoDB for development to avoid Atlas connection issues
    mongoUri: "mongodb://127.0.0.1:27017/chatgpt_companion_db",
    jwtSecret: process.env.JWT_SECRET || "dev_secret_only_for_local_testing",
    clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    openaiApiKey: process.env.OPENAI_API_KEY,
};

