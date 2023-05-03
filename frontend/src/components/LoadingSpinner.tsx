import { FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";

interface LoadingSpinnerProps {
  messages ?: string[];
}

const possibleMessages = ["Un segundo...",
                          "Dame un momento...",
                          "Parece que estoy tardando un poco...",
                          "Lo tengo en la punta de la lengua...",
                          "Dejame pensar...",
                          ]

function LoadingSpinner({ messages = possibleMessages }: LoadingSpinnerProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    console.log(messageIndex);
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin h-5 w-5 mr-3" />
      <span>{messages[messageIndex]}</span>
    </div>
  );
}

export default LoadingSpinner;
