import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconDots } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../types/chat-message.type";
import "./Chat.component.css";
import { ChatInputBox } from "./ChatInput.component";
import { ConversationArea } from "./ChatMessageArea.component";

const aiURL = "";
const aiAuthorization = "";

function Chat() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<ChatMessage>>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const askAI = async (message: string) => {
    const updatedChatHistory = [
      ...chatHistory,
      { source: "user", text: message } as ChatMessage,
      {
        source: "ai",
        content: <IconDots className="animate-pulse" />,
      } as ChatMessage,
    ];

    setChatHistory(updatedChatHistory);

    try {
      setIsLoading(true);

      const requestBody = JSON.stringify({ message: message });
      const response = await fetch(aiURL, {
        method: "POST",
        body: requestBody,
        headers: {
          "Content-Type": "application/json",
          Authorization: aiAuthorization,
        },
      });

      const responseBody = await response.json();
      const apiResponse = responseBody.reply;

      const updatedChatHistoryWithResponse = [...updatedChatHistory];
      updatedChatHistoryWithResponse[
        updatedChatHistoryWithResponse.length - 1
      ] = {
        source: "ai",
        text: apiResponse,
      };

      setChatHistory(updatedChatHistoryWithResponse);
      scrollToBottom();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">CompAInion</Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-none lg:w-1/3 sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="items-center">
              Welcome to CompAInion
            </SheetTitle>
            <SheetDescription>
              {chatHistory?.length > 0
                ? "Chat history: "
                : "Please feel free to ask me anything!"}
            </SheetDescription>
          </SheetHeader>
          {chatHistory?.length > 0 && (
            <ConversationArea messages={chatHistory} />
          )}
          <SheetFooter>
            <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
              <ChatInputBox isLoading={isLoading} askAI={askAI} />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Chat;
