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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        body: requestBody,
        headers: { "Content-Type": "application/json" },
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
    <div className="chat-container" ref={chatContainerRef}>
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
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="chat-input"
          disabled={isLoading}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
