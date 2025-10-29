// components/ProfileHeader.js
import React from 'react';

export default function ProfileHeader({ profile, isTyping }) {
  return (
    <div className="flex items-center gap-3 p-4 text-white">
      <div className="relative">
        <img
          src="https://i.pinimg.com/originals/f0/00/53/f00053d3b96afd3e59389da0840050fc.jpg"
          alt={profile.name}
          className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      
      <div className="flex-1">
        <h2 className="font-bold text-lg">{profile.name}</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm opacity-90">
            {isTyping ? 'mengetik...' : 'online'}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
          📞
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors">
          ⋮
        </button>
      </div>
    </div>
  );
}