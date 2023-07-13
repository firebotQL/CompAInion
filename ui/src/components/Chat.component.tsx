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
import { useState } from "react";
import "./Chat.component.css";
import { ChatInputBox } from "./ChatInput.component";
import { ConversationArea } from "./ChatMessageArea.component";

const aiURL = "";
const aiAuthorization = "";

function Chat() {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: aiURL,
    headers: { Authorization: aiAuthorization },
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
          <Button variant="outline">CompAInion</Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-none lg:w-1/3 sm:w-[540px]">
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
