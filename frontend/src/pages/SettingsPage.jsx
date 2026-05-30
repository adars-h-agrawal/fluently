import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingsIcon } from "lucide-react";
import toast from "react-hot-toast";
import ThemeSelector from "../components/ThemeSelector.jsx";
import useAuthUser from "../hooks/useAuthUser.js";
import { updateProfile } from "../lib/api.js";
import { getErrorMessage } from "../lib/getErrorMessage.js";

const SettingsPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [learningGoals, setLearningGoals] = useState(authUser?.learningGoals || "");

  const mutation = useMutation({
    mutationFn: () => updateProfile({ learningGoals }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Profile updated");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header>
        <div className="flex items-center gap-2 text-primary mb-1">
          <SettingsIcon className="size-5" />
          <span className="text-xs uppercase tracking-widest font-medium">Settings</span>
        </div>
        <h1 className="page-header">Preferences</h1>
      </header>

      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold">Appearance</h2>
        <ThemeSelector />
      </section>

      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold">Learning profile</h2>
        <div className="flex items-center gap-4">
          <img src={authUser?.profilePic} alt="" className="w-14 h-14 rounded-2xl" />
          <div>
            <p className="font-medium">{authUser?.fullName}</p>
            <p className="text-sm text-base-content/60">{authUser?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="stat-pill justify-center py-2">Native: {authUser?.nativeLanguage}</div>
          <div className="stat-pill justify-center py-2">Learning: {authUser?.learningLanguage}</div>
        </div>
        <label className="form-control">
          <span className="label-text font-medium">Learning goals</span>
          <textarea
            className="textarea textarea-bordered rounded-xl bg-base-100/30 mt-1"
            rows={3}
            placeholder="e.g. Become conversational for travel in 6 months"
            value={learningGoals}
            onChange={(e) => setLearningGoals(e.target.value)}
          />
        </label>
        <button
          type="button"
          className="btn btn-primary rounded-xl"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          Save goals
        </button>
      </section>

      <section className="glass-card p-6">
        <h2 className="font-semibold mb-2">AI configuration</h2>
        <p className="text-sm text-base-content/70">
          Fluently uses local Ollama at <code className="text-primary">localhost:11434</code> with model{" "}
          <code className="text-primary">qwen2.5:7b</code>. Run{" "}
          <code className="text-xs">ollama pull qwen2.5:7b</code> before using AI features.
        </p>
      </section>
    </div>
  );
};

export default SettingsPage;
