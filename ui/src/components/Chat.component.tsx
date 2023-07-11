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
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import "./Chat.component.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ source: string; text?: string; content?: string }>
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = async () => {
    if (message === "" || message === undefined) return;

    setMessage("");

    const updatedChatHistory = [
      ...chatHistory,
      { source: "User", text: message },
      { source: "API", content: "..." },
    ];

    setChatHistory(updatedChatHistory);

    try {
      setIsLoading(true);

      const requestBody = JSON.stringify({ message: message });
      const response = await fetch("https://compainion-server.vercel.app", {
        method: "POST",
        body: requestBody,
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      });

      const responseBody = await response.json();
      const apiResponse = responseBody.reply;

      const updatedChatHistoryWithResponse = [...updatedChatHistory];
      updatedChatHistoryWithResponse[
        updatedChatHistoryWithResponse.length - 1
      ] = {
        source: "API",
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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Welcome to CompAInion</SheetTitle>
            <SheetDescription>
              Please feel free to ask me anything!
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={
                  message.source === "User"
                    ? "chat-user-message message-box"
                    : "chat-api-message message-box"
                }
              >
                <p>{message.content || message.text}</p>
              </div>
            ))}
            {!isLoading && (
              <Textarea
                placeholder="Type your message here."
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            )}
            {isLoading && <Textarea disabled>Loading...</Textarea>}
          </div>
          <SheetFooter>
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* <div className="chat-container" ref={chatContainerRef}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={
              message.source === "User"
                ? "chat-user-message message-box"
                : "chat-api-message message-box"
            }
          >
            <p>{message.content || message.text}</p>
          </div>
        ))}
        <div className="input-container">
          {!isLoading && (
            <Textarea
              placeholder="Type your message here."
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          )}
          {!isLoading && <Button onClick={handleSend}>Button</Button>}

          {isLoading && <Textarea disabled>Loading...</Textarea>}
          {isLoading && (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default Chat;
