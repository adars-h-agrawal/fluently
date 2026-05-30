import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PhoneIcon, VideoIcon } from "lucide-react";
import { getUserFriends } from "../lib/api.js";
import useAuthUser from "../hooks/useAuthUser.js";

const CallsPage = () => {
  const { authUser } = useAuthUser();
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const getCallPath = (friendId) => {
    const channelId = [authUser._id, friendId].sort().join("-");
    return `/call/${channelId}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="page-header">Video calls</h1>
        <p className="page-subtitle">Practice speaking live with your partners</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : friends.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <VideoIcon className="size-10 mx-auto text-primary/60 mb-3" />
          <p className="text-base-content/70">Connect with partners first to start video practice.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {friends.map((friend) => (
            <div key={friend._id} className="glass-card flex items-center gap-4 p-4">
              <div className="avatar">
                <div className="w-12 rounded-xl">
                  <img src={friend.profilePic} alt="" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium">{friend.fullName}</p>
                <p className="text-xs text-base-content/60">Ready for a practice call</p>
              </div>
              <Link to={getCallPath(friend._id)} className="btn btn-primary btn-sm rounded-xl gap-2">
                <PhoneIcon className="size-4" />
                Start call
              </Link>
              <Link to={`/chat/${friend._id}`} className="btn btn-ghost btn-sm rounded-xl">
                Message first
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CallsPage;
