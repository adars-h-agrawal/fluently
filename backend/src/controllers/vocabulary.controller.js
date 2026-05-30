import Vocabulary from "../models/Vocabulary.js";
import User from "../models/User.js";
import { runAiAction } from "../services/ai.service.js";

export async function getVocabulary(req, res) {
  try {
    const items = await Vocabulary.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error in getVocabulary:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function saveVocabulary(req, res) {
  try {
    const { text, type, meaning, pronunciation, context, notes, autoEnrich } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    let enrichedMeaning = meaning || "";
    let enrichedPronunciation = pronunciation || "";

    if (autoEnrich && !meaning) {
      try {
        const explanation = await runAiAction("explain", text.trim(), req.user);
        enrichedMeaning = explanation;
      } catch {
        // continue without AI enrichment
      }
    }

    const item = await Vocabulary.create({
      user: req.user._id,
      text: text.trim(),
      type: type || "word",
      meaning: enrichedMeaning,
      pronunciation: enrichedPronunciation,
      context: context || "",
      notes: notes || "",
    });

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "learningStats.vocabularyCount": 1 },
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("Error in saveVocabulary:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateVocabulary(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const item = await Vocabulary.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Vocabulary item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error in updateVocabulary:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteVocabulary(req, res) {
  try {
    const { id } = req.params;

    const item = await Vocabulary.findOneAndDelete({ _id: id, user: req.user._id });

    if (!item) {
      return res.status(404).json({ message: "Vocabulary item not found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { "learningStats.vocabularyCount": -1 },
    });

    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error in deleteVocabulary:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function reviewVocabulary(req, res) {
  try {
    const { id } = req.params;
    const { masteryLevel } = req.body;

    const item = await Vocabulary.findOneAndUpdate(
      { _id: id, user: req.user._id },
      {
        masteryLevel: Math.min(100, Math.max(0, masteryLevel ?? 10)),
        lastReviewedAt: new Date(),
      },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Vocabulary item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error in reviewVocabulary:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
