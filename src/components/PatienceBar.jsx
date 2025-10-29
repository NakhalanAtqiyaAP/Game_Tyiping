
import React from 'react';

export default function PatienceBar({ patience }) {
  const getColor = (value) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full bg-gray-200 h-5 px-4 py-1 border-y-2 border-black bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-1">
        <span>❤️ Kesabaran Dinda:</span>
        <span>{patience}%</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden border border-black shadow-inner">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getColor(patience)}`}
          style={{ width: `${patience}%` }}
        ></div>
      </div>
    </div>
  );
}