// components/ChatWindow.js (Final Tanpa Scroll Manual)

import React, { useEffect, useRef } from 'react'; 
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, isTyping }) {
  const messagesEndRef = useRef(null); 
  const isMounted = useRef(false);

  // --- SCRIPT UNTUK SCROLL OTOMATIS (Ini harus dipertahankan) ---
  const scrollToBottom = () => {
    // Scroll Into View adalah script yang menyebabkan scroll
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Logic untuk memblokir scroll pada render awal
    if (!isMounted.current) {
      isMounted.current = true;
      return; 
    }
    
    // Panggil scroll otomatis saat pesan baru masuk
    scrollToBottom();
  }, [messages]); 
  // ----------------------------------------------------------------

  return (
    // PERUBAHAN UTAMA DI SINI:
    // Hapus 'h-[420px]' dan 'overflow-y-auto'.
    // Ganti dengan 'flex-grow' agar mengambil sisa ruang dari parent.
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