import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";

interface ChatInputProps {
  isLoading: boolean;
  limit?: number;
  askAI: (message: string) => void;
}

export const ChatInputBox: FC<ChatInputProps> = ({
  isLoading,
  limit = 4000,
  askAI,
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

    askAI(message);
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
