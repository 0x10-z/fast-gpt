import { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

function ChatInput({ onSendMessage }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-row items-center">
      <input
        ref={inputRef}
        type="text"
        className="flex-1 w-full h-10 px-4 text-gray-600 bg-gray-100 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Escribe aquí tu mensaje..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={handleSendMessage}
      >
        Enviar
      </button>
    </div>
  )
}

export default ChatInput