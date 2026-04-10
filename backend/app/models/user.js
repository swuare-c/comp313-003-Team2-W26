const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        displayName: {
            type: String,
            trim: true,
            default: "",
        },
        occupation: {
            type: String,
            trim: true,
            default: "",
        },
        gender: {
            type: String,
            enum: ["", "Male", "Female", "Non-binary", "Other", "Prefer not to say"],
            default: "",
        },
        passwordHash: {
            type: String,
            required: true,
        },
        settings: {
            theme: { type: String, enum: ["light", "dark"], default: "light" },
            reflectionDepth: { type: String, enum: ["standard", "brief", "in-depth"], default: "standard" },
        },
        // fields for password reset
        passwordResetToken: { type: String },
        passwordResetExpires: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
