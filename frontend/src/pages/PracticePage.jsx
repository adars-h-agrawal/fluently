import { useQuery } from "@tanstack/react-query";
import { FlameIcon, RefreshCwIcon, TargetIcon } from "lucide-react";
import { getLearningStats, getPracticeContent } from "../lib/api.js";
import useAuthUser from "../hooks/useAuthUser.js";

const PracticePage = () => {
  const { authUser } = useAuthUser();

  const { data: stats } = useQuery({
    queryKey: ["learningStats"],
    queryFn: getLearningStats,
  });

  const {
    data: practice,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["practice"],
    queryFn: getPracticeContent,
    staleTime: 60_000,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <div className="flex items-center gap-2 text-primary mb-1">
          <TargetIcon className="size-5" />
          <span className="text-xs uppercase tracking-widest font-medium">Practice</span>
        </div>
        <h1 className="page-header">Daily practice mode</h1>
        <p className="page-subtitle">
          AI-generated exercises for {authUser?.learningLanguage || "your language"}
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card p-4 text-center ambient-glow">
          <FlameIcon className="size-6 mx-auto text-orange-400 mb-2" />
          <p className="text-2xl font-bold">{stats?.streak ?? 0}</p>
          <p className="text-xs text-base-content/60">Day streak</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{stats?.totalPracticeSessions ?? 0}</p>
          <p className="text-xs text-base-content/60">Sessions</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-secondary">{stats?.vocabularyCount ?? 0}</p>
          <p className="text-xs text-base-content/60">Vocabulary</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold">{authUser?.learningLanguage?.slice(0, 3) || "—"}</p>
          <p className="text-xs text-base-content/60">Focus</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="btn btn-outline btn-sm rounded-xl gap-2"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCwIcon className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          New exercise
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <>
          <section className="glass-panel-strong p-6 rounded-2xl ambient-glow">
            <h2 className="font-semibold text-primary mb-3">Today&apos;s exercise</h2>
            <p className="whitespace-pre-wrap leading-relaxed text-base-content/90">
              {practice?.exercise || "Generate a new exercise to begin."}
            </p>
          </section>

          <section className="glass-card p-6">
            <h2 className="font-semibold mb-3">Conversation starters</h2>
            <p className="whitespace-pre-wrap text-sm text-base-content/80 leading-relaxed">
              {practice?.conversationStarters || "—"}
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default PracticePage;
