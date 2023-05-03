import { useState, useRef, useEffect, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import ChatInput from "components/ChatInput";
import MessagesList from "components/MessagesList";
import Footer from "components/Footer";
import { Message, Sender } from "models/Message";
import { ApiService } from "services/ApiService";
import { User } from "models/User";

const apiService = new ApiService();

interface ChatWindowProps {
  user: User;
}

function ChatWindow({ user }: ChatWindowProps ) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(user.messages);
  const [loading, setLoading] = useState<boolean>(false);

  const addMessageToState = useCallback((message: Message) => {
    setMessages((prevState) => [...prevState.slice(0, -1), message]);
  }, []);

  const scrollToLastMessage = useCallback(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastMessageRef]);

  useEffect(() => {
    scrollToLastMessage();
  }, [messages, scrollToLastMessage]);

  const handleClick = useCallback(() => {
    const selectedText = window.getSelection()?.toString();
    if (!selectedText && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);


  const sendMessage = useCallback(
    async (message: string) => {
      try {
        setLoading(true);
        const userMessage = Message.createMessage(message, Sender.User);
        setMessages((prevState) => [...prevState, userMessage]);
        const temporalAssistantMessage = Message.createMessage("#...", Sender.Assistant);
        setMessages((prevState) => [...prevState, temporalAssistantMessage]);
        const assistantMessage = await apiService.chatGpt(message, user);
        addMessageToState(assistantMessage);
      } catch (error: any) {
        const errorMessage = Message.createMessage(error.message, Sender.Assistant);
        addMessageToState(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [addMessageToState, user]
  );
  
  return (
    <div className="flex flex-col h-screen" onClick={handleClick}>
      <div className="flex flex-col flex-grow overflow-y-auto">
        <MessagesList loading={loading} lastMessageRef={lastMessageRef} messages={messages} />
      </div>
      <div className="mt-auto py-2">
        <ChatInput onSendMessage={sendMessage} inputRef={inputRef} />
        <Footer />
      </div>
    </div>
  );
}



export default ChatWindow;
