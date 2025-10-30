import React from 'react';

export default function ProfileHeader({ profile, isTyping }) {
  return (
    <div className="flex items-center gap-3 p-4 text-white relative z-30">
      <div className="relative">
        <img
          src={profile.avatar} 
          alt={profile.name}
          className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      <div className="flex-1">
        <h2 className="font-bold text-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">{profile.name}</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]"></div>
          <span className="text-sm opacity-90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            {isTyping ? 'mengetik...' : 'online'}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          📞
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          ⋮
        </button>
      </div>
    </div>
  );
}