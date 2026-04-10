// app/controllers/reflectController.js
const openai = require("../../config/openaiClient");
const Reflection = require("../models/reflection");
const config = require("../../config/config");

// Local fallback if OpenAI is not configured or fails
function fallbackReply(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) {
    return "It sounds like it’s hard to put this into words right now, and that’s okay. I’m here to read whatever you’d like to share.";
  }

  return (
    "It sounds like this has been weighing on you, and you’ve been carrying a lot around this. " +
    "What feels most important about this for you right now?"
  );
}

// POST /api/reflect  (protected)
exports.reflect = async (req, res) => {
  const text = req.body?.text;
  const userId = req.userId; // set by authMiddleware

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (!text || !String(text).trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    // 🔹 Fetch user settings to adjust AI behavior
    const User = require("../models/user");
    const user = await User.findById(userId);
    const depth = user?.settings?.reflectionDepth || "standard";

    // 🔹 Build dynamic instructions based on depth
    let depthInstructions = "";
    if (depth === "brief") {
      depthInstructions = "Keep your reply extremely concise (1-2 sentences). Focus only on mirroring the core emotion. Do not ask follow-up questions.";
    } else if (depth === "in-depth") {
      depthInstructions = "Provide a more detailed reflection (4-5 sentences). Explore nuances in the user's words and ask 1-2 probing, gentle follow-up questions to encourage deep exploration.";
    } else {
      // standard
      depthInstructions = "Provide a balanced reflection (2-3 sentences). Briefly paraphrase and ask one gentle follow-up question.";
    }

    let reply;
    let source;

    // If there's no key or no client, use fallback so the app still works
    if (!config.openaiApiKey || !openai) {
      reply = fallbackReply(text);
      source = "fallback_no_api_key";
    } else {
      // Call OpenAI Responses API
      const response = await openai.responses.create({
        model: "gpt-4o-mini",
        instructions:
          `You are a calm, neutral listening companion having a multi-turn conversation with the user. ${depthInstructions}\n` +
          "Guidelines:\n" +
          "1. Briefly paraphrase what the user seems to be feeling.\n" +
          "2. Do NOT give advice, solutions, or instructions. Do NOT diagnose any mental health conditions.\n" +
          "3. Avoid mentioning self-harm, suicide, or crises. If the user brings them up, gently encourage them to talk to a trusted person or professional without giving instructions.\n" +
          "4. Keep replies under 100 words.\n" +
          "5. Respond ONLY as valid JSON with this exact format:\n" +
          '{ "reply": "..." }',
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: text,
              },
            ],
          },
        ],
        temperature: 0.6,
      });

      const raw = response.output_text; // string that should be JSON
      let parsed = null;

      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        console.error("Failed to parse OpenAI JSON. Raw output:", raw);
      }

      reply =
        parsed && typeof parsed.reply === "string"
          ? parsed.reply
          : fallbackReply(text);
      source = parsed ? "openai" : "fallback_parse_error";
    }

    // 🔹 Save userText + replyText to MongoDB
    try {
      await Reflection.create({
        user: userId,
        userText: text,
        replyText: reply,
      });
    } catch (dbErr) {
      console.error("Failed to save reflection:", dbErr);
      // do NOT fail the request just because DB failed;
      // user should still see the reply
    }

    return res.json({ reply, source });
  } catch (err) {
    console.error("OpenAI reflect error:", err);

    // Quota / insufficient credits → fallback but still 200
    const isQuotaError =
      err?.code === "insufficient_quota" ||
      err?.status === 429 ||
      err?.error?.code === "insufficient_quota";

    const reply = fallbackReply(text);

    if (isQuotaError) {
      console.warn("OpenAI quota exceeded. Using fallback replies.");

      // still try to save the fallback reply
      try {
        if (req.userId && text) {
          await Reflection.create({
            user: req.userId,
            userText: text,
            replyText: reply,
          });
        }
      } catch (dbErr) {
        console.error("Failed to save fallback reflection:", dbErr);
      }

      return res.status(200).json({
        reply,
        source: "fallback_quota_exceeded",
      });
    }

    // Any other error → still fallback so the UX is smooth
    try {
      if (req.userId && text) {
        await Reflection.create({
          user: req.userId,
          userText: text,
          replyText: reply,
        });
      }
    } catch (dbErr) {
      console.error("Failed to save fallback reflection:", dbErr);
    }

    return res.status(200).json({
      reply,
      source: "fallback_other_error",
    });
  }
};

// GET /api/reflect/history  (protected)
exports.getHistory = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const reflections = await Reflection.find({ user: userId }).sort({
      createdAt: 1,
    });

    return res.json({
      history: reflections.map((r) => ({
        id: r._id,
        userText: r.userText,
        replyText: r.replyText,
        createdAt: r.createdAt,
      })),
    });
  } catch (err) {
    console.error("getHistory error:", err);
    return res.status(500).json({ message: "Failed to load history." });
  }
};

// DELETE /api/reflect/history  (protected) — clear all reflections for this user
exports.clearHistory = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Reflection.deleteMany({ user: userId });

    return res.json({ message: "Your chat history has been cleared." });
  } catch (err) {
    console.error("clearHistory error:", err);
    return res.status(500).json({ message: "Failed to clear history." });
  }
};