import Message from "./Message";

type MessagesListProps = {
  messages: Message[];
};

function MessagesList({ messages }: MessagesListProps) {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 w-full">
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
  );
}

export default MessagesList;
