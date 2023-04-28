import { useState, useRef } from "react";
import ChatInput from "./ChatInput";
import MessagesList from "./MessagesList";
import Footer from "./Footer";
import Message from "./Message";
import { toast } from "react-toastify";
import { ApiManager } from "../utils/ApiManager";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const apiManager = new ApiManager();

function ChatWindow() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleResponse = async (response: Response, message: string) => {
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        addMessageToState(message, data.last_response);
      } else {
        throw new Error(data.error);
      }
    } else {
      throw new Error(
        `Error sending message: ${response.status} ${response.statusText}`
      );
    }
  };

  const addMessageToState = (message: string, response: string) => {
    setMessages([
      ...messages,
      createMessage(message, "user"),
      createMessage(response, "assistant"),
    ]);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const sendMessage = async (message: string) => {
    try {
      setLoading(true);
      const response = await apiManager.chatGpt(message);
      setLoading(false);
      await handleResponse(response, message);
    } catch (error: any) {
      showErrorNotification("El backend parece no estar funcionando...");
      setMessages([...messages, createMessage(error.message, "assistant")]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen" onClick={handleClick}>
      <MessagesList messages={messages} />
      <div className="p-4">
        <ChatInput onSendMessage={sendMessage} inputRef={inputRef} />
      </div>
      <Footer />
      {loading && (
        <div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-gray-300 bg-opacity-50">
          <Loader />
        </div>
      )}
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

function showErrorNotification(errorMessage: string) {
  toast.error(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
}

export default ChatWindow;
