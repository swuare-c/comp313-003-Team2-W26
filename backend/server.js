// process.env.OPENAI_API_KEY available everywhere in the backend
require("dotenv").config();

const config = require("./config/config");
const app = require("./config/express");
const connectDB = require("./config/mongoose");

const authRoutes = require("./app/routes/authRoutes");
const reflectRoutes = require("./app/routes/reflectRoutes");

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/reflect", reflectRoutes);

const start = async () => {
    await connectDB();

    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
};

start();