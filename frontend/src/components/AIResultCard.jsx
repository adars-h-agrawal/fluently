import { BookmarkPlusIcon, Loader2Icon, SparklesIcon, XIcon } from "lucide-react";

const ACTION_LABELS = {
  improve: "Improved",
  translate: "Translation",
  explain: "Explanation",
  natural: "Natural version",
  grammar: "Grammar fix",
  tone: "Tone improved",
  suggest: "Suggestions",
};

const AIResultCard = ({ action, result, loading, onClose, onSave }) => {
  if (!loading && !result) return null;

  return (
    <div className="ai-result-card">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-primary font-medium text-xs">
          {loading ? (
            <Loader2Icon className="size-3.5 animate-spin" />
          ) : (
            <SparklesIcon className="size-3.5" />
          )}
          {loading ? "AI thinking..." : ACTION_LABELS[action] || "AI Result"}
        </div>
        <div className="flex gap-1">
          {!loading && onSave && (
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-circle"
              onClick={onSave}
              title="Save to vocabulary"
            >
              <BookmarkPlusIcon className="size-3.5" />
            </button>
          )}
          {onClose && (
            <button type="button" className="btn btn-ghost btn-xs btn-circle" onClick={onClose}>
              <XIcon className="size-3.5" />
            </button>
          )}
        </div>
      </div>
      {!loading && <p className="whitespace-pre-wrap leading-relaxed">{result}</p>}
    </div>
  );
};

export default AIResultCard;
