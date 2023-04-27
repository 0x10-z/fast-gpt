"use client"

import { useState } from 'react'
import ChatInput from './ChatInput'
import Message from './Message'

function ChatWindow() {

  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = async (message: string) => {
    // Envía el mensaje a la API
    const response = await fetch('http://localhost:5000/?message=' + message, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ message }),
    })
    if (response.ok) {
      const data = await response.json()
      if (data.success){
        // Agrega la respuesta al estado de los mensajes
        setMessages([...messages, createMessage(message, 'user'), createMessage(data.last_response, 'bot')])
      }else{
        alert("Error: "+data.error)
      }
    } else {
      console.error('Error sending message:', response.status, response.statusText)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4  w-full">
          {messages.map((message, index) => (
            //<div key={index} className={message.sender === 'user' ? 'text-right' : ''}>
            //  <span className={message.sender === 'user' ? 'text-gray-400' : 'text-gray-600'}>{message.content}</span>
            //</div>

            <div className={`chat-message ${message.sender === "user" ? "user" : "bot"} text-center`}>
            <div className="message p-2">
              <p>{message.content}</p>
            </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  )
}

function createMessage(content: string, sender: 'user' | 'bot'): Message {
  return {
    id: new Date().getTime(),
    content,
    sender,
    timestamp: new Date(),
  };
}


export default ChatWindow
