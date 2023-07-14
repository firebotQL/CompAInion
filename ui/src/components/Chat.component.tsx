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
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

import companionButtonImg from "../assets/compainion-button.png";
import { ChatInputBox } from "./ChatInput.component";
import { ConversationArea } from "./ChatMessageArea.component";

function Chat() {
  const [serverUrl, setServerUrl] = useState("");
  const [authorizationHeader, setAuthHeader] = useState("");

  useEffect(() => {
    chrome.storage.sync.get(
      ["compainion-serverUrl", "compainion-authHeader"],
      (result) => {
        if (result["compainion-serverUrl"]) {
          setServerUrl(result["compainion-serverUrl"]);
        }
        if (result["compainion-authHeader"]) {
          setAuthHeader(result["compainion-authHeader"]);
        }
      }
    );
  }, []);

  console.log("aiURL", serverUrl);
  console.log("aiAuthorization", authorizationHeader);
  const [isLoading, setIsLoading] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: serverUrl,
    headers: { Authorization: authorizationHeader },
  });

  // user/assistant
  // TODO:
  // - add a loading indicator for the assistant setIsLoading(true);

  // const chatContainerRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop =
  //       chatContainerRef.current.scrollHeight;
  //   }
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [chatHistory]);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="ml-4 mb-4 w-8 h-8">
            <img
              className="h-auto max-w-max rounded-lg" // TODO: Fix height of img as it's clashing with default
              alt="CompAInion"
              src={chrome.runtime.getURL(companionButtonImg)}
            />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-none lg:w-1/3 sm:w-[540px] overflow-auto">
          <SheetHeader>
            <SheetTitle className="items-center">
              Welcome to CompAInion
            </SheetTitle>
            <SheetDescription>
              {messages?.length > 0
                ? "Chat history: "
                : "Please feel free to ask me anything!"}
            </SheetDescription>
          </SheetHeader>
          {messages?.length > 0 && <ConversationArea messages={messages} />}
          <SheetFooter>
            <div className="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
              <ChatInputBox
                isLoading={isLoading}
                handleChatInputChange={handleInputChange}
                handleChatSubmit={handleSubmit}
              />
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Chat;
