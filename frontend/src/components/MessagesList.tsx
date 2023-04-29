import { Message } from "./Message";
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import { useEffect } from "react";
import 'highlight.js/styles/github-dark.css';
import rehypeRaw from 'rehype-raw'
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
    <div className="flex flex-col overflow-y-auto space-y-4 w-full" id="scroll-container">
      {messages.map((message, index) => (
        <div
          key={index}
          custom-timestamp={message.timestamp}
          className={`flex flex-row ${
            message.sender === "user" ? "user bg-gray-200 h-40" : "assistant"
          }`}>
          <div className="ml-40 pb-2 m-6 w-[40px] flex flex-row  items-start">
            <img className="ring-2 ring-black"
                  alt={message.sender === "user" ? "user avatar" : "chatgpt avatar"}
                  src={message.sender === "user" ? "user.png" : "chatgpt.png"}/>
          </div>
          <div ref={lastMessageRef} className="flex ml-10 my-5 mr-40 justify-start items-start flex bg-gray w-full h-full">
            {index === messages.length - 1 && loading ? (
              <div className="flex justify-center items-center bg-gray-300 bg-opacity-50">
                {<Loader />}
              </div>
            ) : (
              <div className="">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} children={message.content} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessagesList;
