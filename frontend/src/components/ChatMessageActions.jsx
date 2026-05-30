import { useState } from "react";
import { useMessageContext } from "stream-chat-react";
import { LanguagesIcon, LightbulbIcon, SparklesIcon, Wand2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { runAiAction, saveVocabularyItem } from "../lib/api.js";
import { getErrorMessage } from "../lib/getErrorMessage.js";
import AIResultCard from "./AIResultCard.jsx";

const ACTIONS = [
  { id: "improve", label: "Improve", icon: Wand2Icon },
  { id: "translate", label: "Translate", icon: LanguagesIcon },
  { id: "explain", label: "Explain", icon: LightbulbIcon },
  { id: "natural", label: "Natural", icon: SparklesIcon },
];

const ChatMessageActions = () => {
  const { message } = useMessageContext();
  const text = message?.text?.trim();

  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const [result, setResult] = useState("");

  if (!text || message?.type !== "regular") return null;

  const handleAction = async (action) => {
    setActiveAction(action);
    setLoading(true);
    setResult("");

    try {
      const data = await runAiAction(action, text);
      setResult(data.result);
    } catch (error) {
      toast.error(getErrorMessage(error, "AI action failed. Is Ollama running?"));
      setActiveAction(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await saveVocabularyItem({
        text,
        type: "correction",
        meaning: result,
        context: `From chat · ${activeAction}`,
        autoEnrich: false,
      });
      toast.success("Saved to vocabulary");
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not save"));
    }
  };

  return (
    <div className="mt-1.5 ml-1">
      <div className="flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {ACTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className="ai-chip gap-1"
            onClick={() => handleAction(id)}
            disabled={loading}
          >
            <Icon className="size-3" />
            {label}
          </button>
        ))}
      </div>

      {(loading || result) && (
        <AIResultCard
          action={activeAction}
          result={result}
          loading={loading}
          onClose={() => {
            setResult("");
            setActiveAction(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ChatMessageActions;
