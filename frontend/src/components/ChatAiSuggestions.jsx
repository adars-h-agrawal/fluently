import { useState } from "react";
import { SparklesIcon } from "lucide-react";
import toast from "react-hot-toast";
import { runAiAction } from "../lib/api.js";
import { getErrorMessage } from "../lib/getErrorMessage.js";

const insertSuggestion = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied — paste into the message box");
  } catch {
    toast(text, { icon: "📋" });
  }
};

const ChatAiSuggestions = () => {
  const [loading, setLoading] = useState(false);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const data = await runAiAction("suggest", "Help me continue this conversation naturally.");
      await insertSuggestion(data.result);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not load suggestions"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2 border-t border-white/5 bg-base-200/30">
      <span className="text-xs text-base-content/50 self-center mr-1">AI assist</span>
      <button
        type="button"
        className="ai-chip"
        onClick={loadSuggestions}
        disabled={loading}
      >
        <SparklesIcon className="size-3" />
        {loading ? "Thinking..." : "Suggest replies"}
      </button>
      <button
        type="button"
        className="ai-chip"
        onClick={() => insertSuggestion("¡Hola! ¿Cómo estás hoy?")}
      >
        Conversation starter
      </button>
      <button
        type="button"
        className="ai-chip"
        onClick={() => insertSuggestion("Could you help me practice speaking today?")}
      >
        Practice request
      </button>
    </div>
  );
};

export default ChatAiSuggestions;
