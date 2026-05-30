import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CompassIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
} from "../lib/api.js";
import DiscoverCard from "../components/DiscoverCard.jsx";
import FriendCard from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";

const DiscoverPage = () => {
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  useEffect(() => {
    const outgoingIds = new Set();
    outgoingFriendReqs?.forEach((req) => outgoingIds.add(req.recipient._id));
    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingFriendReqs]);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header>
        <div className="flex items-center gap-2 text-primary mb-1">
          <CompassIcon className="size-5" />
          <span className="text-xs uppercase tracking-widest font-medium">Smart Discovery</span>
        </div>
        <h1 className="page-header">Find your perfect language partner</h1>
        <p className="page-subtitle">
          AI-ranked matches based on language goals, fluency fit, and activity
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <UsersIcon className="size-5 text-primary" />
            Your partners
          </h2>
          <Link to="/messages" className="btn btn-ghost btn-sm rounded-xl">
            Open messages
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Recommended for you</h2>

        {loadingUsers ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : recommendedUsers.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <h3 className="font-semibold text-lg mb-2">No recommendations yet</h3>
            <p className="text-base-content/60">Check back soon for new learners.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {recommendedUsers.map((user) => (
              <DiscoverCard
                key={user._id}
                user={user}
                hasRequestBeenSent={outgoingRequestsIds.has(user._id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DiscoverPage;
