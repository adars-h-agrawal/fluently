import { Link } from "react-router-dom";
import { BrainIcon, BookOpenIcon, SparklesIcon, TargetIcon } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import { getLearningStats } from "../lib/api.js";

const AiInsightsPanel = () => {
  const { authUser } = useAuthUser();

  const { data: stats } = useQuery({
    queryKey: ["learningStats"],
    queryFn: getLearningStats,
  });

  return (
    <aside className="hidden xl:flex w-80 flex-col glass-sidebar border-l border-white/8 m-3 ml-0 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-white/8">
        <div className="flex items-center gap-2">
          <SparklesIcon className="size-5 text-primary" />
          <h2 className="font-semibold">AI Insights</h2>
        </div>
        <p className="text-xs text-base-content/60 mt-1">Your learning companion</p>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        <div className="glass-card p-4 ambient-glow">
          <p className="text-xs uppercase tracking-wider text-base-content/50 mb-2">Focus</p>
          <p className="font-medium">{authUser?.learningLanguage || "Your target language"}</p>
          <p className="text-xs text-base-content/60 mt-1">
            Native: {authUser?.nativeLanguage || "—"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="glass-card p-3 text-center">
            <p className="text-2xl font-bold text-primary">{stats?.streak ?? 0}</p>
            <p className="text-xs text-base-content/60">Day streak</p>
          </div>
          <div className="glass-card p-3 text-center">
            <p className="text-2xl font-bold text-secondary">{stats?.vocabularyCount ?? 0}</p>
            <p className="text-xs text-base-content/60">Saved words</p>
          </div>
        </div>

        <div className="space-y-2">
          <Link to="/coach" className="btn btn-primary btn-sm w-full rounded-xl gap-2">
            <BrainIcon className="size-4" />
            Open AI Coach
          </Link>
          <Link to="/practice" className="btn btn-outline btn-sm w-full rounded-xl gap-2">
            <TargetIcon className="size-4" />
            Daily practice
          </Link>
          <Link to="/vocabulary" className="btn btn-ghost btn-sm w-full rounded-xl gap-2">
            <BookOpenIcon className="size-4" />
            Review vocabulary
          </Link>
        </div>

        <div className="glass-card p-4">
          <p className="text-xs font-medium text-primary mb-2">Tip of the day</p>
          <p className="text-sm text-base-content/80 leading-relaxed">
            Save words from chat with one click, then review them in spaced practice sessions.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AiInsightsPanel;
