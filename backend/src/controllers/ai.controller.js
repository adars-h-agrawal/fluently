import {
  coachChat,
  generateConversationStarters,
  generatePracticePrompt,
  runAiAction,
} from "../services/ai.service.js";
import User from "../models/User.js";

const VALID_ACTIONS = [
  "improve",
  "translate",
  "explain",
  "natural",
  "grammar",
  "tone",
  "suggest",
];

export async function processAiAction(req, res) {
  try {
    const { action, text, targetLanguage } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    if (!VALID_ACTIONS.includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const result = await runAiAction(action, text.trim(), req.user, { targetLanguage });

    res.status(200).json({ action, result });
  } catch (error) {
    console.error("Error in processAiAction:", error.message);
    const isOllama =
      error.message.includes("Ollama") || error.message.includes("fetch failed");
    res.status(isOllama ? 503 : 500).json({
      message: isOllama
        ? "AI service unavailable. Make sure Ollama is running with qwen2.5:7b."
        : "Internal Server Error",
    });
  }
}

export async function aiCoachChat(req, res) {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "Messages array is required" });
    }

    const reply = await coachChat(messages, req.user);

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error in aiCoachChat:", error.message);
    const isOllama =
      error.message.includes("Ollama") || error.message.includes("fetch failed");
    res.status(isOllama ? 503 : 500).json({
      message: isOllama
        ? "AI service unavailable. Make sure Ollama is running with qwen2.5:7b."
        : "Internal Server Error",
    });
  }
}

export async function getPracticeContent(req, res) {
  try {
    const [exercise, starters] = await Promise.all([
      generatePracticePrompt(req.user),
      generateConversationStarters(req.user),
    ]);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last = req.user.learningStats?.lastPracticeDate
      ? new Date(req.user.learningStats.lastPracticeDate)
      : null;
    const lastDay = last
      ? new Date(last.getFullYear(), last.getMonth(), last.getDate())
      : null;

    let streak = req.user.learningStats?.streak || 0;
    if (!lastDay) {
      streak = 1;
    } else {
      const diffDays = Math.round((today - lastDay) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        // same day — keep streak
      } else if (diffDays === 1) {
        streak += 1;
      } else {
        streak = 1;
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: { "learningStats.totalPracticeSessions": 1 },
        $set: {
          "learningStats.lastPracticeDate": now,
          "learningStats.streak": streak,
        },
      },
      { new: true }
    ).select("learningStats");

    res.status(200).json({
      exercise,
      conversationStarters: starters,
      learningStats: user.learningStats,
    });
  } catch (error) {
    console.error("Error in getPracticeContent:", error.message);
    const isOllama =
      error.message.includes("Ollama") || error.message.includes("fetch failed");
    res.status(isOllama ? 503 : 500).json({
      message: isOllama
        ? "AI service unavailable. Make sure Ollama is running with qwen2.5:7b."
        : "Internal Server Error",
    });
  }
}
