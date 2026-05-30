import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MessageCircleIcon } from "lucide-react";
import { getUserFriends } from "../lib/api.js";
import { getLanguageFlag } from "../components/FriendCard.jsx";

const MessagesPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="page-header">Messages</h1>
        <p className="page-subtitle">Continue conversations with your language partners</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : friends.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <MessageCircleIcon className="size-10 mx-auto text-primary/60 mb-3" />
          <p className="text-base-content/70">Add partners from Discover to start messaging.</p>
          <Link to="/discover" className="btn btn-primary btn-sm mt-4 rounded-xl">
            Discover partners
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/chat/${friend._id}`}
              className="glass-card flex items-center gap-4 p-4 hover:border-primary/30"
            >
              <div className="avatar">
                <div className="w-12 rounded-xl">
                  <img src={friend.profilePic} alt="" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{friend.fullName}</p>
                <p className="text-xs text-base-content/60 flex gap-2 mt-0.5">
                  {getLanguageFlag(friend.nativeLanguage)}
                  {friend.nativeLanguage} → {friend.learningLanguage}
                </p>
              </div>
              <span className="badge badge-primary badge-outline">Open chat</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
