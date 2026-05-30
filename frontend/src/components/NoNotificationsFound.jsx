import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="card bg-base-200/75 border border-base-300/70 flex flex-col items-center justify-center py-16 text-center">
      <div className="size-16 rounded-full bg-base-300 flex items-center justify-center mb-4">
        <BellIcon className="size-8 text-base-content opacity-40" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
      <p className="text-base-content opacity-70 max-w-md">
        Incoming requests and new connections will show up here as you meet more learners.
      </p>
    </div>
  );
}

export default NoNotificationsFound;