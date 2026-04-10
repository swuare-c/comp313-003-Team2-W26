// process.env.OPENAI_API_KEY available everywhere in the backend
require("dotenv").config();

const config = require("./config/config");
const app = require("./config/express");

const authRoutes = require("./app/routes/authRoutes");
const reflectRoutes = require("./app/routes/reflectRoutes");

app.get("/api/health", (req, res) => res.json({ ok: true, env: config.env }));

app.use("/api/auth", authRoutes);
app.use("/api/reflect", reflectRoutes);

if (process.env.NODE_ENV !== "production") {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

module.exports = app;