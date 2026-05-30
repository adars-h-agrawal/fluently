import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const userId = req.user?.id || req.user?._id?.toString();
    console.log(`[chat] token request for user=${userId}`);

    const token = generateStreamToken(userId);
    if (!token) {
      console.error(`[chat] failed to generate token for user=${userId}`);
      return res.status(500).json({ message: "Could not generate Stream token" });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}