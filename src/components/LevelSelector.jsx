// components/LevelSelector.js
import React from 'react';

// components/LevelSelector.js - Update levels array
const levels = [
  {
    id: 1,
    name: "Level 1: Marahan Ringan",
    description: "Pacar sedikit kesal karena kamu telat bales chat",
    difficulty: "Mudah",
    timeMultiplier: 1.0,
    patienceDrain: 1.0,
    scoreMultiplier: 1.0,
    locked: false,
    scenarioId: 1
  },
  {
    id: 2,
    name: "Level 2: Cemburu Buta",
    description: "Pacar cemburu karena kamu like foto mantan",
    difficulty: "Sedang",
    timeMultiplier: 0.8,
    patienceDrain: 1.2,
    scoreMultiplier: 1.5,
    locked: false,
    scenarioId: 2
  },
  {
    id: 3,
    name: "Level 3: Anniversary Lupa",
    description: "Kamu lupa anniversary relationship kalian",
    difficulty: "Sulit",
    timeMultiplier: 0.6,
    patienceDrain: 1.5,
    scoreMultiplier: 1.0,
    locked: false,
    scenarioId: 3
  },
  {
    id: 4,
    name: "Level 4: Ghosting Mode",
    description: "Kamu menghilang selama 3 hari tanpa kabar",
    difficulty: "Expert",
    timeMultiplier: 0.5,
    patienceDrain: 2.0,
    scoreMultiplier: 1.0,
    locked: false,
    scenarioId: 4
  },
  {
    id: 5,
    name: "Level 5: Ultimate Test",
    description: "Semua kesalahan dalam satu percakapan",
    difficulty: "Impossible",
    timeMultiplier: 0.4,
    patienceDrain: 2.5,
    scoreMultiplier: 1.0,
    locked: false,
    scenarioId: 5
  },
  {
    id: 6,
    name: "Level 6: Happy Ending",
    description: "Setelah semua perjuangan, akhirnya proposal!",
    difficulty: "Romantis",
    timeMultiplier: 1.2,
    patienceDrain: 0.5,
    scoreMultiplier: 1.0,
    locked: false,
    scenarioId: 6
  }
];

// Tambahkan difficulty color untuk "Romantis"
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Mudah': return 'bg-green-100 text-green-800 border-green-300';
    case 'Sedang': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Sulit': return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'Expert': return 'bg-red-100 text-red-800 border-red-300';
    case 'Impossible': return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'Romantis': return 'bg-pink-100 text-pink-800 border-pink-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const getDifficultyIcon = (difficulty) => {
  switch (difficulty) {
    case 'Mudah': return '😊';
    case 'Sedang': return '😐';
    case 'Sulit': return '😰';
    case 'Expert': return '😨';
    case 'Impossible': return '💀';
    case 'Romantis': return '💖';
    default: return '❓';
  }
};

export default function LevelSelector({ currentLevel, onLevelSelect, playerStats }) {
  return (
    <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0_#000] p-6 w-full lg:max-w-sm">
      <h2 className="text-2xl font-extrabold text-[#6A0DAD] mb-4 border-b-2 border-black pb-2 text-center">
        🎯 Level Selector
      </h2>
      
      {/* Player Stats */}
      {playerStats && (
        // Wrapper Statistik: Pastikan wrapper ini punya lebar yang terdefinisi (misal: max-w-xs)
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-dashed border-blue-200 w-full max-w-xs">
          <h3 className="font-bold text-lg text-[#6A0DAD] mb-2 text-center">📊 Statistik Kamu</h3>
          
          <div className="grid grid-cols-1 gap-2 text-sm"> {/* Diubah ke grid-cols-1 untuk centering yang lebih rapi jika hanya 1 item */}
            <div className="text-center">
              <div className="font-bold text-gray-700">Skor Tertinggi</div>
              <div className="text-4xl font-extrabold text-[#FF6347]">{playerStats.highScore || 0}</div>
            </div>
          </div>
        </div>
      )}

      {/* Levels List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
              level.locked
                ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
                : level.id === currentLevel
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-400 shadow-[2px_2px_0_#000]'
                : 'bg-white border-gray-300 hover:border-purple-400 hover:shadow-[2px_2px_0_#000] hover:translate-y-[-2px]'
            }`}
            onClick={() => !level.locked && onLevelSelect(level)}
          >
            {/* Level Header */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {level.completed ? '✅' : level.locked ? '🔒' : '🎯'}
                </span>
                <h3 className={`font-bold ${
                  level.locked ? 'text-gray-500' : 'text-gray-800'
                }`}>
                  {level.name}
                </h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(level.difficulty)}`}>
                {getDifficultyIcon(level.difficulty)} {level.difficulty}
              </span>
            </div>

            {/* Level Description */}
            <p className="text-sm text-gray-600 mb-3">
              {level.description}
            </p>

            {/* Level Stats */}
            
        <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center bg-blue-50 rounded p-2 border border-blue-200 shadow-sm">
                <div className="font-bold text-blue-700">⏱️ Waktu</div>
                <div className="text-lg font-extrabold text-blue-800">{level.timeMultiplier || 1}x</div>
            </div>
            <div className="text-center bg-red-50 rounded p-2 border border-red-200 shadow-sm">
                <div className="font-bold text-red-700">❤️ Kesabaran</div>
                <div className="text-lg font-extrabold text-red-800">{level.patienceDrain || 1}x</div>
            </div>
        </div>
            {/* <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center bg-blue-50 rounded p-1">
                <div className="font-bold text-blue-700">⏱️ Waktu</div>
                <div className="text-blue-800">{level.timeMultiplier}x</div>
              </div>
              <div className="text-center bg-red-50 rounded p-1">
                <div className="font-bold text-red-700">❤️ Kesabaran</div>
                <div className="text-red-800">{level.patienceDrain}x</div>
              </div>
              <div className="text-center bg-green-50 rounded p-1">
                <div className="font-bold text-green-700">🏆 Skor</div>
                <div className="text-green-800">{level.scoreMultiplier}x</div>
              </div>
            </div> */}

            {/* Locked Message */}
            {/* {level.locked && (
              <div className="mt-2 text-xs text-center text-gray-500 bg-gray-200 rounded p-1">
                🔒 Selesaikan level sebelumnya untuk membuka
              </div>
            )} */}

            {/* Current Level Indicator */}
            {level.id === currentLevel && !level.locked && (
              <div className="mt-2 text-xs text-center text-green-600 bg-green-100 rounded p-1 font-bold">
                Sedang Dipilih
              </div>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
}