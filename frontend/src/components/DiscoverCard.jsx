import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, ZapIcon } from "lucide-react";
import { sendFriendRequest } from "../lib/api.js";
import { capitialize } from "../lib/utils.js";
import { getLanguageFlag } from "./FriendCard.jsx";

const FLUENCY_LABELS = {
  perfect: "Perfect exchange match",
  strong: "Strong match",
  good: "Good match",
};

const ACTIVITY_LABELS = {
  active: { text: "Active now", class: "text-success" },
  recent: { text: "Active this week", class: "text-warning" },
  away: { text: "Away", class: "text-base-content/50" },
};

const DiscoverCard = ({ user, hasRequestBeenSent, isPending }) => {
  const queryClient = useQueryClient();

  const { mutate: sendRequest } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  const activity = ACTIVITY_LABELS[user.activityStatus] || ACTIVITY_LABELS.away;

  return (
    <div className="glass-card p-5 space-y-4 relative overflow-hidden group">
      <div className="absolute -top-12 -right-12 size-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />

      <div className="flex items-start justify-between gap-3 relative">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-14 rounded-2xl ring-2 ring-primary/20">
              <img src={user.profilePic} alt={user.fullName} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{user.fullName}</h3>
            {user.location && (
              <div className="flex items-center text-xs text-base-content/60 mt-0.5">
                <MapPinIcon className="size-3 mr-1" />
                {user.location}
              </div>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{user.compatibility ?? 75}%</div>
          <p className="text-[10px] uppercase tracking-wide text-base-content/50">match</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 relative">
        <span className="stat-pill">
          {getLanguageFlag(user.nativeLanguage)}
          Native: {capitialize(user.nativeLanguage)}
        </span>
        <span className="stat-pill border-primary/30 text-primary">
          {getLanguageFlag(user.learningLanguage)}
          Learning: {capitialize(user.learningLanguage)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs relative">
        <span className="stat-pill gap-1">
          <ZapIcon className="size-3 text-primary" />
          {FLUENCY_LABELS[user.fluencyMatch] || "Language partner"}
        </span>
        <span className={`stat-pill ${activity.class}`}>{activity.text}</span>
      </div>

      {user.learningGoals && (
        <p className="text-xs text-base-content/70 bg-base-100/30 rounded-lg px-3 py-2 border border-white/5">
          <span className="font-medium text-primary">Goal:</span> {user.learningGoals}
        </p>
      )}

      {user.bio && <p className="text-sm text-base-content/70 line-clamp-2 relative">{user.bio}</p>}

      <button
        className={`btn w-full rounded-xl relative ${hasRequestBeenSent ? "btn-disabled" : "btn-primary"}`}
        onClick={() => sendRequest(user._id)}
        disabled={hasRequestBeenSent || isPending}
      >
        {hasRequestBeenSent ? (
          <>
            <CheckCircleIcon className="size-4" />
            Request Sent
          </>
        ) : (
          <>
            <UserPlusIcon className="size-4" />
            Connect
          </>
        )}
      </button>
    </div>
  );
};

export default DiscoverCard;
