import { useState } from "react";
import Input from "./Input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

function ChatInput({ onSendMessage, inputRef }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-row items-center">
      <Input
        inputRef={inputRef}
        message={message}
        setMessage={setMessage}
        handleKeyDown={handleKeyDown}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default ChatInput;
