import { Message } from "./Message";
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import { useEffect } from "react";
import 'highlight.js/styles/github-dark.css';
import Loader from "./Loader";

/* eslint react/no-danger: 0 */

interface MessagesListProps {
  loading: boolean;
  messages: Message[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
};

function MessagesList({ loading, messages, lastMessageRef }: MessagesListProps) {
  useEffect(() => {
    hljs.highlightAll();
  });
 
  return (
    <div className="flex flex-col space-y-4 w-full " id="scroll-container">
  {messages.map((message, index) => (
    <div
      key={index}
      custom-timestamp={message.timestamp}
      className={`flex flex-row justify-center py-4 ${
        message.sender === "user" ? "user bg-gray-200 h-40" : "assistant"
      }`}
    >
      <div className="pb-2 w-10 flex flex-row items-start mx-5">
        <img
          className="ring-2 ring-black w-full object-cover"
          alt={message.sender === "user" ? "user avatar" : "chatgpt avatar"}
          src={message.sender === "user" ? "user.png" : "chatgpt.png"}
        />
      </div>
      <div
        ref={lastMessageRef}
        className="flex justify-start items-center flex bg-gray w-full h-full"
      >
        {index === messages.length - 1 && loading ? (
          <div className="flex justify-center items-center bg-gray-300 bg-opacity-50">
            {<Loader />}
          </div>
        ) : (
          <div className="w-full justify-center mr-10">
            <ReactMarkdown children={message.content} />
          </div>
        )}
      </div>
    </div>
  ))}
</div>


  );
}

export default MessagesList;
