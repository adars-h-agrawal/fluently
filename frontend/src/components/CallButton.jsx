import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3 border-b border-base-300/70 bg-base-200/80 backdrop-blur flex items-center justify-end">
      <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white rounded-xl">
        <VideoIcon className="size-5" />
        Start call
      </button>
    </div>
  );
}

export default CallButton;