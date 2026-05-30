import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["word", "phrase", "correction"],
      default: "word",
    },
    meaning: {
      type: String,
      default: "",
    },
    pronunciation: {
      type: String,
      default: "",
    },
    context: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    masteryLevel: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    lastReviewedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);

export default Vocabulary;
