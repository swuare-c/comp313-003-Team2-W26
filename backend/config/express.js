const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config");

const app = express();

const connectDB = require("./mongoose");
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: config.clientOrigin,
        credentials: true,
    })
);

app.get("/", (req, res) => {
    res.send(`API running (${config.env} mode)`);
});

module.exports = app;
