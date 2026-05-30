import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CustomChatMessage from "../components/CustomChatMessage.jsx";
import ChatAiSuggestions from "../components/ChatAiSuggestions.jsx";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { getErrorMessage } from "../lib/getErrorMessage";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatError, setChatError] = useState("");

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });

  useEffect(() => {
    let activeClient = null;

    const initChat = async () => {
      if (!authUser || !targetUserId) return;

      if (!STREAM_API_KEY) {
        console.error("[chat] Missing VITE_STREAM_API_KEY");
        setChatError("Chat is not configured correctly. Missing Stream API key.");
        setLoading(false);
        return;
      }

      if (!tokenData?.token) return;

      try {
        setChatError("");
        console.log("[chat] Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);
        activeClient = client;

        if (client.userID && client.userID !== authUser._id) {
          console.log(`[chat] disconnecting previous Stream user ${client.userID}`);
          await client.disconnectUser();
        }

        console.log(`[chat] connecting user ${authUser._id}`);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");
        console.log(`[chat] preparing channel ${channelId}`);

        // you and me
        // if i start the chat => channelId: [myId, yourId]
        // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();
        console.log(`[chat] channel ready id=${currChannel.id} members=${currChannel.data?.members?.length || 0}`);

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("[chat] Error initializing chat:", error);
        const message = getErrorMessage(error, "Could not connect to chat. Please try again.");
        setChatError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (activeClient) {
        console.log(`[chat] disconnecting user ${activeClient.userID}`);
        activeClient.disconnectUser();
      }
    };
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel
        .sendMessage({
          text: `I've started a video call. Join me here: ${callUrl}`,
        })
        .then(() => {
          console.log("[chat] video call message sent");
          toast.success("Video call link sent successfully!");
        })
        .catch((error) => {
          console.error("[chat] failed to send video call message", error);
          toast.error(getErrorMessage(error, "Could not send call link."));
        });
    }
  };

  if (loading) return <ChatLoader />;

  if (chatError) {
    return (
      <div className="h-[93vh] flex items-center justify-center p-4">
        <div className="card bg-base-200 border border-error/30 max-w-xl w-full">
          <div className="card-body">
            <h2 className="card-title text-error">Chat connection failed</h2>
            <p className="text-sm opacity-80">{chatError}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-full flex flex-col p-3 sm:p-4 min-h-0">
      <Chat client={chatClient}>
        <Channel channel={channel} Message={CustomChatMessage}>
          <div className="w-full h-full flex flex-col min-h-0">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <ChatAiSuggestions />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
export default ChatPage;