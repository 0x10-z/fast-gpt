import Message from "./Message";
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import { useEffect } from "react";
import 'highlight.js/styles/github-dark.css';
import rehypeRaw from 'rehype-raw'

/* eslint react/no-danger: 0 */

type MessagesListProps = {
  messages: Message[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
};

function MessagesList({ messages, lastMessageRef }: MessagesListProps) {
  useEffect(() => {
    hljs.highlightAll();
  });
 
  return (
    <div className="flex flex-col overflow-y-auto space-y-4 w-full">
      {messages.map((message, index) => (
        <div
          key={index}
          custom-timestamp={message.timestamp}
          className={`flex flex-row ${
            message.sender === "user" ? "user bg-gray-200 h-40" : "assistant"
          }`}>
          <div className="ml-40 m-8 w-[40px] flex flex-row  items-start">
            <img className="ring-2 ring-black"
                  alt={message.sender === "user" ? "user avatar" : "chatgpt avatar"}
                  src={message.sender === "user" ? "user.png" : "chatgpt.png"}/>
          </div>
          <div ref={lastMessageRef} className="flex ml-10 mt-5 mr-40 justify-start items-start flex bg-gray w-full h-full">
            <div className="">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} children={message.content} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessagesList;
