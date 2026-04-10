const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
