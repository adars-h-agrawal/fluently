import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpenIcon, PlusIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import {
  deleteVocabularyItem,
  getVocabulary,
  reviewVocabularyItem,
  saveVocabularyItem,
} from "../lib/api.js";
import { getErrorMessage } from "../lib/getErrorMessage.js";

const VocabularyPage = () => {
  const queryClient = useQueryClient();
  const [newText, setNewText] = useState("");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["vocabulary"],
    queryFn: getVocabulary,
  });

  const saveMutation = useMutation({
    mutationFn: saveVocabularyItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["learningStats"] });
      setNewText("");
      toast.success("Saved to vocabulary");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteVocabularyItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
      toast.success("Removed");
    },
  });

  const reviewMutation = useMutation({
    mutationFn: ({ id, masteryLevel }) => reviewVocabularyItem(id, masteryLevel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
      setShowMeaning(false);
      setReviewIndex((i) => (i + 1) % Math.max(items.length, 1));
    },
  });

  const reviewItem = items[reviewIndex];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <div className="flex items-center gap-2 text-primary mb-1">
          <BookOpenIcon className="size-5" />
          <span className="text-xs uppercase tracking-widest font-medium">Vocabulary</span>
        </div>
        <h1 className="page-header">Your word bank</h1>
        <p className="page-subtitle">Words, phrases, and corrections saved from practice and chat</p>
      </header>

      <form
        className="glass-card p-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (newText.trim()) saveMutation.mutate({ text: newText.trim(), autoEnrich: true });
        }}
      >
        <input
          className="input input-bordered flex-1 rounded-xl bg-base-100/30"
          placeholder="Add a word or phrase..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary rounded-xl gap-2" disabled={saveMutation.isPending}>
          <PlusIcon className="size-4" />
          Save
        </button>
      </form>

      {items.length > 0 && (
        <section className="glass-panel-strong p-6 rounded-2xl ambient-glow">
          <h2 className="font-semibold mb-4">Review cards</h2>
          {reviewItem && (
            <div className="text-center space-y-4">
              <p className="text-3xl font-bold">{reviewItem.text}</p>
              {reviewItem.pronunciation && (
                <p className="text-sm text-base-content/60">{reviewItem.pronunciation}</p>
              )}
              {showMeaning ? (
                <p className="text-base-content/80 max-w-lg mx-auto">{reviewItem.meaning || "No meaning yet"}</p>
              ) : (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowMeaning(true)}>
                  Show meaning
                </button>
              )}
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  className="btn btn-outline btn-sm rounded-xl"
                  onClick={() =>
                    reviewMutation.mutate({
                      id: reviewItem._id,
                      masteryLevel: Math.max(0, (reviewItem.masteryLevel || 0) - 10),
                    })
                  }
                >
                  Hard
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm rounded-xl"
                  onClick={() =>
                    reviewMutation.mutate({
                      id: reviewItem._id,
                      masteryLevel: Math.min(100, (reviewItem.masteryLevel || 0) + 15),
                    })
                  }
                >
                  Got it
                </button>
              </div>
              <div className="w-full bg-base-300/30 rounded-full h-1.5 max-w-xs mx-auto">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all"
                  style={{ width: `${reviewItem.masteryLevel || 0}%` }}
                />
              </div>
            </div>
          )}
        </section>
      )}

      <section>
        <h2 className="font-semibold mb-4">Saved items ({items.length})</h2>
        {isLoading ? (
          <span className="loading loading-spinner loading-lg" />
        ) : items.length === 0 ? (
          <div className="glass-card p-8 text-center text-base-content/60">
            Save words from chat or add them above.
          </div>
        ) : (
          <div className="grid gap-3">
            {items.map((item) => (
              <div key={item._id} className="glass-card p-4 flex gap-4 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.text}</span>
                    <span className="badge badge-xs badge-outline">{item.type}</span>
                  </div>
                  {item.meaning && (
                    <p className="text-sm text-base-content/70 mt-2 line-clamp-3">{item.meaning}</p>
                  )}
                  {item.context && (
                    <p className="text-xs text-base-content/50 mt-1">{item.context}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-primary mb-2">{item.masteryLevel ?? 0}% mastered</p>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => deleteMutation.mutate(item._id)}
                  >
                    <Trash2Icon className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default VocabularyPage;
