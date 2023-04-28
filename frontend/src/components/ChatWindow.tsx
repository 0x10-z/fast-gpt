import { useState, useRef } from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";

function ChatWindow() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (message: string) => {
    const response = await fetch("http://localhost:5000/?message=" + message, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ message }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Agrega la respuesta al estado de los mensajes
        setMessages([
          ...messages,
          createMessage(message, "user"),
          createMessage(data.last_response, "assistant"),
        ]);
      } else {
        alert("Error: " + data.error);
      }
    } else {
      console.error(
        "Error sending message:",
        response.status,
        response.statusText
      );
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen" onClick={handleClick}>
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4  w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              custom-timestamp={message.timestamp}
              className={`chat-message ${
                message.sender === "user" ? "user" : "assistant"
              } text-center`}>
              <div className="message p-2">
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <ChatInput onSendMessage={sendMessage} inputRef={inputRef} />
      </div>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-gray-600 dark:text-gray-300 md:px-4 md:pt-3 md:pb-6">
        <span>
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts.{" "}
          <a
            href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
            target="_blank"
            rel="noreferrer"
            className="underline">
            ChatGPT Mar 23 Version
          </a>
        </span>
      </div>
    </div>
  );
}

function createMessage(content: string, sender: "user" | "assistant"): Message {
  return {
    id: "",
    content,
    sender,
    timestamp: new Date(),
  };
}

export default ChatWindow;
