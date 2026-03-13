// app/models/reflection.js
const mongoose = require("mongoose");

const reflectionSchema = new mongoose.Schema(
  {
    // Which user this message pair belongs to
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // What the user typed
    userText: { type: String, required: true },

    // Single reply from the AI companion (paraphrase + gentle question)
    replyText: { type: String, required: true },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

module.exports = mongoose.model("Reflection", reflectionSchema);