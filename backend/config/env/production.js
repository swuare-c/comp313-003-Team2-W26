module.exports = {
    env: "production",
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    clientOrigin: process.env.CLIENT_ORIGIN, // Set this to your Vercel URL in dashboard
    openaiApiKey: process.env.OPENAI_API_KEY,
};