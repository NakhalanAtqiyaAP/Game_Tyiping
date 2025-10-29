import React, { useEffect, useRef } from 'react'; 
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, isTyping }) {
  const messagesEndRef = useRef(null); 
  const isMounted = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {

    if (!isMounted.current) {
      isMounted.current = true;
      return; 
    }

    scrollToBottom();
  }, [messages]); 

  return (

    <div className="w-full bg-white p-4 flex-grow flex flex-col gap-3">
      {messages.map((msg, i) => (
        <MessageBubble key={i} sender={msg.sender} text={msg.text} />
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-2xl border-2 border-black text-sm shadow-[2px_2px_0_#000] animate-pulse">
            💬 sedang mengetik...
          </div>
        </div>
      )}

      <div ref={messagesEndRef} /> 
    </div>
  );
}