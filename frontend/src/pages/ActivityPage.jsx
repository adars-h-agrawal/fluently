import { useQuery } from "@tanstack/react-query";
import { ActivityIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { getFriendRequests, getLearningStats } from "../lib/api.js";
import { capitialize } from "../lib/utils.js";

const ActivityPage = () => {
  const { data: stats } = useQuery({
    queryKey: ["learningStats"],
    queryFn: getLearningStats,
  });

  const { data: friendData, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const incoming = friendData?.incomingReqs || [];
  const accepted = friendData?.acceptedReqs || [];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <div className="flex items-center gap-2 text-primary mb-1">
          <ActivityIcon className="size-5" />
          <span className="text-xs uppercase tracking-widest font-medium">Activity</span>
        </div>
        <h1 className="page-header">Your learning activity</h1>
        <p className="page-subtitle">Progress, requests, and recent updates</p>
      </header>

      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-primary">{stats?.vocabularyCount ?? 0}</p>
          <p className="text-xs text-base-content/60">Words saved</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold">{stats?.totalPracticeSessions ?? 0}</p>
          <p className="text-xs text-base-content/60">Practice runs</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-xl font-bold text-secondary">{incoming.length}</p>
          <p className="text-xs text-base-content/60">Pending requests</p>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Friend requests</h2>
          <Link to="/notifications" className="btn btn-ghost btn-xs rounded-lg">
            View all
          </Link>
        </div>

        {isLoading ? (
          <span className="loading loading-spinner" />
        ) : incoming.length === 0 && accepted.length === 0 ? (
          <div className="glass-card p-6 text-center text-base-content/60 text-sm">
            No recent social activity.
          </div>
        ) : (
          <div className="space-y-2">
            {incoming.map((req) => (
              <div key={req._id} className="glass-card p-4 flex items-center gap-3">
                <img src={req.sender.profilePic} alt="" className="w-10 h-10 rounded-xl" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{req.sender.fullName} sent a request</p>
                  <p className="text-xs text-base-content/60">
                    Speaks {capitialize(req.sender.nativeLanguage)}
                  </p>
                </div>
                <span className="badge badge-warning badge-sm">Pending</span>
              </div>
            ))}
            {accepted.map((req) => (
              <div key={req._id} className="glass-card p-4 flex items-center gap-3">
                <img src={req.recipient.profilePic} alt="" className="w-10 h-10 rounded-xl" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{req.recipient.fullName} accepted your request</p>
                </div>
                <span className="badge badge-success badge-sm">Connected</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ActivityPage;
