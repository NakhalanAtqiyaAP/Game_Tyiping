import React from 'react';

export default function StatsBar({ score, timer, patience }) {
  const getPatienceColor = (value) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTimerColor = (time) => {
    if (time > 15) return 'text-green-600';
    if (time > 8) return 'text-yellow-600';
    return 'text-red-600 font-bold';
  };

  return (
    <div className="w-full bg-gradient-to-r from-yellow-100 to-orange-100 border-b-2 border-black px-4 py-3 relative z-20">
      <div className="flex justify-between items-center mb-2">
        {/* Skor */}
        <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-lg border border-black/20">
          <span className="font-bold text-black text-sm">🏆 Skor: </span>
          <span className="font-extrabold text-[#6A0DAD]">{score}</span>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-lg border border-black/20">
          <span className="font-bold text-black text-sm">⏱️ </span>
          <span className={`font-extrabold text-sm ${getTimerColor(timer)}`}>
            {timer}s
          </span>
        </div>
      </div>

      {/* Patience Bar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 min-w-[120px] bg-white/80 px-2 py-1 rounded-lg border border-black/20">
          <span className="text-xs font-bold text-gray-700 whitespace-nowrap">❤️ Kesabaran:</span>
          <span className="text-xs font-bold text-gray-700">{patience}%</span>
        </div>
        
        <div className="flex-1 bg-gray-300 rounded-full h-3 overflow-hidden border border-black shadow-inner">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${getPatienceColor(patience)}`}
            style={{ width: `${patience}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}