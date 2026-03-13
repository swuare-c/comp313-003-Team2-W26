const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config");
const reflectRoutes = require("../app/routes/reflectRoutes");


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: config.clientOrigin,
        credentials: true,
    })
);

app.use("/api/reflect", reflectRoutes);

app.get("/", (req, res) => {
    res.send(`API running (${config.env} mode)`);
});

module.exports = app;
