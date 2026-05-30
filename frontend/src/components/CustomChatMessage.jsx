import { MessageSimple, useMessageContext } from "stream-chat-react";
import ChatMessageActions from "./ChatMessageActions.jsx";

const CustomChatMessage = () => {
  const { isMyMessage } = useMessageContext();
  const mine = typeof isMyMessage === "function" ? isMyMessage() : isMyMessage;

  return (
    <div className="group mb-1">
      <MessageSimple />
      <ChatMessageActions />
    </div>
  );
};

export default CustomChatMessage;
