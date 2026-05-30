import { Link } from "react-router-dom";
import { MessageCircleIcon, PhoneIcon } from "lucide-react";
import { LANGUAGE_TO_FLAG } from "../constants/index.js";
import useAuthUser from "../hooks/useAuthUser.js";

const FriendCard = ({ friend }) => {
  const { authUser } = useAuthUser();
  const channelId = authUser?._id
    ? [authUser._id, friend._id].sort().join("-")
    : "";

  return (
    <div className="glass-card p-4 group">
      <div className="flex items-center gap-3 mb-3">
        <div className="avatar">
          <div className="w-12 rounded-xl ring-2 ring-primary/20">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
          <p className="text-xs text-success flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-success" />
            Partner
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="stat-pill text-xs">
          {getLanguageFlag(friend.nativeLanguage)}
          {friend.nativeLanguage}
        </span>
        <span className="stat-pill text-xs border-primary/30">
          → {friend.learningLanguage}
        </span>
      </div>

      <div className="flex gap-2">
        <Link to={`/chat/${friend._id}`} className="btn btn-primary btn-sm flex-1 rounded-xl gap-1">
          <MessageCircleIcon className="size-4" />
          Message
        </Link>
        {channelId && (
          <Link to={`/call/${channelId}`} className="btn btn-ghost btn-sm btn-square rounded-xl">
            <PhoneIcon className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
