import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { ChatRequestOptions } from "ai";
import { FC, useEffect, useRef, useState } from "react";

interface ChatInputProps {
  isLoading: boolean;
  limit?: number;
  handleChatInputChange: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChatSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
}

export const ChatInputBox: FC<ChatInputProps> = ({
  isLoading,
  limit = 4000,
  handleChatInputChange,
  handleChatSubmit,
}) => {
  // 4000 characters/tokens?
  const [message, setMessage] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Create a ref

  useEffect(() => {
    // Function to handle changes in chrome storage
    const handleChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes["selectedUseText"]) {
        setMessage((prevValue) => {
          if (prevValue) {
            return `${prevValue}\n${changes["selectedUseText"].newValue}`;
          }
          return changes["selectedUseText"].newValue;
        });
      }
    };

    // Get initial value from chrome storage
    chrome.storage.sync.get("selectedUseText", (result) => {
      setMessage((prevValue) => {
        if (prevValue) {
          return `${prevValue}\n${result["selectedUseText"]}`;
        }
        return result["selectedUseText"];
      });
    });

    // Add event listener for chrome storage changes
    chrome.storage.onChanged.addListener(handleChange);

    // Cleanup event listener on component unmount
    return () => {
      chrome.storage.onChanged.removeListener(handleChange);
    };
  }, []);

  const scrollTextAreaToBottom = () => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight; // Scroll to the bottom
    }
  };

  useEffect(() => {
    const pseudoEvent = {
      target: { value: message },
    } as React.ChangeEvent<HTMLTextAreaElement>; // Or HTMLTextAreaElement
    handleChatInputChange(pseudoEvent);

    scrollTextAreaToBottom();
  }, [handleChatInputChange, message]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value: message },
    } = event;
    if (message.length > limit) {
      alert(`Message must be less than ${limit} characters.`); // TODO: Add error notifications for this rather than alert
      return;
    }
    setMessage(message);
  };

  const clearMessage = () => {
    if (message === "" || message === undefined) return;
    setMessage("");
  };

  const handleSend = async () => {
    if (message === "" || message === undefined) {
      alert("Message cannot be empty.");
      return;
    }

    setMessage("");

    const event = generateSyntheticFormEventWithInput(message);

    handleChatSubmit(event as React.FormEvent<HTMLFormElement>);
  };

  const generateSyntheticFormEventWithInput = (input: string) => {
    // Create a temporary form and input elements
    const tempForm = document.createElement("form");
    const tempInput = document.createElement("input");

    // Set the value of the temporary input element to your input value
    tempInput.value = input;

    // Append the temporary input to the temporary form
    tempForm.appendChild(tempInput);

    // Create a synthetic event
    return {
      currentTarget: tempForm,
      preventDefault: () => {},
      stopPropagation: () => {},
    };
  };

  return (
    <div className="flex w-full">
      {!isLoading && (
        <Textarea
          ref={textareaRef}
          className="flex-grow mr-2"
          placeholder="Type your message here."
          value={message}
          onChange={handleInputChange}
        />
      )}
      {isLoading && (
        <Textarea className="flex-grow mr-2" disabled>
          Loading...
        </Textarea>
      )}
      <div className="w-1/6">
        <Button
          onClick={handleSend}
          className="flex-none w-full mb-2"
          disabled={isLoading}
        >
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Send
        </Button>
        <Button
          onClick={clearMessage}
          className="flex-none w-full"
          disabled={isLoading || !message}
        >
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          <TrashIcon className="mr-2 h-4 w-4" /> Clear
        </Button>
      </div>
    </div>
  );
};
