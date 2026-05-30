import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  deleteVocabulary,
  getVocabulary,
  reviewVocabulary,
  saveVocabulary,
  updateVocabulary,
} from "../controllers/vocabulary.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getVocabulary);
router.post("/", saveVocabulary);
router.put("/:id", updateVocabulary);
router.delete("/:id", deleteVocabulary);
router.post("/:id/review", reviewVocabulary);

export default router;
