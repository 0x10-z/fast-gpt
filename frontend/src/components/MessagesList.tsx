import { Message } from "models/Message";
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import { useEffect } from "react";
import 'highlight.js/styles/github-dark.css';
import LoadingSpinner from "./LoadingSpinner";

/* eslint react/no-danger: 0 */

interface MessagesListProps {
  loading: boolean;
  messages: Message[];
  lastMessageRef: React.RefObject<HTMLDivElement>;
};

function MessagesList({ loading, messages, lastMessageRef }: MessagesListProps) {
  const getImageSrc = (role: string) => {
    return role === "user" ? "user.png" : "chatgpt.png";
  };

  const getImageAlt = (role: string) => {
    return role === "user" ? "user avatar" : "chatgpt avatar";
  };

  const getMessageClass = (message: Message) => {
    return message.role === "user" ? "user bg-gray-200" : "assistant";
  }

  useEffect(() => {
    hljs.highlightAll();
  }, [messages]);

  const renderMessage = (message: Message, index: number) => {
    const isLastMessage = index === messages.length - 1;

    return (
      <div key={index} className={getMessageClass(message)}>
        <div custom-timestamp={message.timestamp} className="flex flex-row justify-center py-4 w-full max-w-[700px] mx-auto my-5 h-auto">
          <div className="pb-2 w-10 flex flex-row items-start mx-5">
            <img className="ring-2 ring-black w-full object-cover"
              alt={getImageAlt(message.role)}
              src={getImageSrc(message.role)} />
          </div>
          <div ref={isLastMessage ? lastMessageRef : null} className="flex justify-start items-center flex bg-gray w-full h-full">
            {isLastMessage && loading ? (
              <div className="flex mb-10 justify-center items-center bg-gray-300 bg-opacity-50">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="w-full mr-10">
                <ReactMarkdown
                  className="text-sm md:text-base lg:text-base xl:text-base sm:max-w-[500px] md:max-w-[525px] lg:max-w-[550px] xl:max-w-[550px]"
                  children={message.content} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 w-full" id="scroll-container">
      {messages?.map((message, index) => renderMessage(message, index))}
    </div>
  );
}


export default MessagesList;
