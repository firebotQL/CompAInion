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
import { useEffect, useRef, useState } from "react";

import companionButtonImg from "../assets/compainion-button.png";
import { ChatInputBox } from "./ChatInput.component";
import { ConversationArea } from "./ChatMessageArea.component";

function Chat() {
  const [serverUrl, setServerUrl] = useState("");
  const [authorizationHeader, setAuthHeader] = useState("");
  const [notification, setNotification] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  useEffect(() => {
    // Function to handle changes in chrome storage
    const handleChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes["compainion-serverUrl"] || changes["compainion-authHeader"]) {
        if (changes["compainion-serverUrl"]) {
          setServerUrl(changes["compainion-serverUrl"].newValue);
        }
        if (changes["compainion-authHeader"]) {
          setAuthHeader(changes["compainion-authHeader"].newValue);
        }
        setNotification("");
      }
    };

    // Get initial value from chrome storage
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

    // Add event listener for chrome storage changes
    chrome.storage.onChanged.addListener(handleChange);

    // Cleanup event listener on component unmount
    return () => {
      chrome.storage.onChanged.removeListener(handleChange);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: serverUrl,
    headers: { Authorization: authorizationHeader },
    onError: (error) => {
      console.log(error);
      setNotification(
        "Unable to chat! Check if you specified Server URL/Auth Header correctly in the extension popup. For more error information, please check the console."
      );
    },
  });

  // user/assistant
  // TODO:
  // - add a loading indicator for the assistant setIsLoading(true);
  // remove: .border,
  //
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="default" className="ml-4 mb-4 w-8 h-8">
          <img
            className="h-auto max-w-max rounded-lg" // TODO: Fix height of img as it's clashing with default
            alt="CompAInion"
            src={chrome.runtime.getURL(companionButtonImg)}
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="sm:max-w-none lg:w-1/3 sm:w-[320px] overflow-auto"
        onInteractOutside={(event) => event.preventDefault()}
        ref={scrollRef}
      >
        <SheetHeader>
          <SheetTitle className="items-center">
            Welcome to CompAInion
          </SheetTitle>
          <SheetDescription>
            {messages?.length > 0
              ? "Chat history: "
              : "Please feel free to ask me anything!"}
            {notification && (
              <p className="mt-1 text-red-500">{notification}</p>
            )}
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
  );
}

export default Chat;
