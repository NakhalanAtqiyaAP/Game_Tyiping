import React from 'react';

export default function MessageBubble({ sender, text }) {
  const isPlayer = sender === 'player';
  const isSystemError = sender === 'system';

  const baseStyle = `relative px-4 pt-3 pb-6 pr-12 max-w-[85%] text-sm font-medium
    shadow-[3px_3px_0_#000] border-2 border-black
    transition-all duration-100 ease-in-out`;
    
  let bubbleStyle = '';

  if (isPlayer) {
    bubbleStyle = `bg-green-400 text-black rounded-t-2xl rounded-bl-2xl
    hover:shadow-[5px_5px_0_#000] hover:scale-[1.02]`;
  } else if (isSystemError) {
    bubbleStyle = `bg-red-400 text-white rounded-2xl text-center shadow-[3px_3px_0_#A00]`;
  } else {
    bubbleStyle = `bg-yellow-300 text-black rounded-t-2xl rounded-br-2xl
      hover:shadow-[5px_5px_0_#000] hover:scale-[1.02]`;
  }

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex ${isPlayer || isSystemError ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`
          ${baseStyle} ${bubbleStyle}
          ${isSystemError ? 'max-w-full' : ''}
          ${isSystemError && 'justify-center items-center'} 
      `}>
        {text}
        {!isSystemError && (
          <span 
            className={`absolute bottom-1.5 right-2 text-[10px] 
            ${isPlayer ? 'text-gray-700' : 'text-gray-600'} 
            opacity-80 font-normal`}
          >
            {time}
          </span>
        )}
      </div>
    </div>
  );
}