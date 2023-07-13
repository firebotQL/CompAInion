import { Message } from "ai";
import { FC } from "react";
import { ChatBlob } from "./ChatBlob.component";

interface ConversationAreaProps {
  messages: Message[];
}

export const ConversationArea: FC<ConversationAreaProps> = ({
  messages,
}: ConversationAreaProps) => {
  return (
    <div className="flex flex-col rounded-lg px-2 sm:p-4 sm:border border-neutral-300">
      {messages.map((message, index) => (
        <div key={index} className="my-1 sm:my-1.5">
          <ChatBlob message={message} />
        </div>
      ))}
    </div>
  );
};
