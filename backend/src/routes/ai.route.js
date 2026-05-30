import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  aiCoachChat,
  getPracticeContent,
  processAiAction,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/action", processAiAction);
router.post("/coach", aiCoachChat);
router.get("/practice", getPracticeContent);

export default router;
