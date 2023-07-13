import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ChatRequestOptions } from "ai";
import { FC, useState } from "react";

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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value: message },
    } = event;
    if (message.length > limit) {
      alert(`Message must be less than ${limit} characters.`); // TODO: Add error notifications for this rather than alert
      return;
    }
    setMessage(message);
    handleChatInputChange(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
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
          className="flex-grow mr-2"
          placeholder="Type your message here."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      )}
      {isLoading && (
        <Textarea className="flex-grow mr-2" disabled>
          Loading...
        </Textarea>
      )}
      <Button
        onClick={handleSend}
        className="flex-none w-1/10"
        disabled={isLoading}
      >
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Send
      </Button>
    </div>
  );
};
