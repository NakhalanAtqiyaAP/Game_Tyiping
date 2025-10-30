// App.js - Perbaikan bagian getProcessedScenario
import React, { useEffect, useState } from 'react';
import { FaPlay, FaSyncAlt } from "react-icons/fa"

import { scenarios } from './data/dialogue';
import ProfileHeader from './components/ProfileHeader';
import ChatWindow from './components/ChatWindow';
import TypingInput from './components/TypingInput';
import StatsBar from './components/StatsBar'; 
import GameInfoFooter from './components/GameInfo';
import SetupForm from './components/SetupForm';
import LevelSelector from './components/LevelSelector';

// =========================================================================
// SETUP SOUND EFFECTS GAME OVER
// =========================================================================
const goodEndSound = new Audio('../assets/goodEnd.mp3'); 
const badEndSound = new Audio('../assets/badEnd.mp3');   

const playGoodEndSound = () => {
    goodEndSound.currentTime = 0;
    goodEndSound.play().catch(e => console.error("Error playing Good End sound:", e));
};

const playBadEndSound = () => {
    badEndSound.currentTime = 0;
    badEndSound.play().catch(e => console.error("Error playing Bad End sound:", e));
};

// =========================================================================
// LOCAL STORAGE KEYS
// =========================================================================
const STORAGE_KEYS = {
  PROFILE: 'typing_game_profile',
  PLAYER_STATS: 'typing_game_stats',
  CURRENT_LEVEL: 'typing_game_current_level'
};

export default function App() {
  // Hapus baseScenario, langsung gunakan scenarios array
  const [index, setIndex] = useState(0);
  
  // Load profile dari localStorage atau gunakan default
  const [customProfile, setCustomProfile] = useState(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return savedProfile ? JSON.parse(savedProfile) : {
      name: "",
      photoUrl: ""
    };
  });
  
  // Load setupComplete dari localStorage
  const [setupComplete, setSetupComplete] = useState(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return !!savedProfile;
  });
  
  const [gameStarted, setGameStarted] = useState(false); 
  const [gameOver, setGameOver] = useState(false);

  // Load currentLevel dari localStorage
  const [currentLevel, setCurrentLevel] = useState(() => {
    const savedLevel = localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL);
    return savedLevel ? parseInt(savedLevel) : 1;
  });

  // Load playerStats dari localStorage
  const [playerStats, setPlayerStats] = useState(() => {
    const savedStats = localStorage.getItem(STORAGE_KEYS.PLAYER_STATS);
    return savedStats ? JSON.parse(savedStats) : {
      currentLevel: 1,
      highScore: 0,
      levelsCompleted: 0,
      highestWPM: 0
    };
  });

  const [messages, setMessages] = useState([]); 
  const [timer, setTimer] = useState(0);
  const [patience, setPatience] = useState(100);
  const [score, setScore] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingStartTime, setTypingStartTime] = useState(Date.now()); 
  const [totalWPM, setTotalWPM] = useState(0); 
  const [totalAccuracy, setTotalAccuracy] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0); 

  // =========================================================================
  // Save to localStorage ketika state berubah
  // =========================================================================
  useEffect(() => {
    if (setupComplete) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(customProfile));
    }
  }, [customProfile, setupComplete]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_LEVEL, currentLevel.toString());
  }, [currentLevel]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLAYER_STATS, JSON.stringify(playerStats));
  }, [playerStats]);

  // =========================================================================
  // Handler untuk reset profile
  // =========================================================================
  const handleResetProfile = () => {
    if (window.confirm('Apakah Anda yakin ingin mengubah profile? Semua progress akan direset.')) {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.PLAYER_STATS);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_LEVEL);
      
      setCustomProfile({
        name: "",
        photoUrl: ""
      });
      setSetupComplete(false);
      setGameStarted(false);
      setGameOver(false);
      setCurrentLevel(1);
      setPlayerStats({
        currentLevel: 1,
        highScore: 0,
        levelsCompleted: 0,
        highestWPM: 0
      });
      setMessages([]);
      setScore(0);
      setPatience(100);
    }
  };

  // =========================================================================
  // Handler untuk ganti level
  // =========================================================================
  const handleLevelSelect = (level) => {
    if (level.locked) return;
    
    setCurrentLevel(level.id);
    setGameStarted(false);
    setGameOver(false);
    setIndex(0);
    setScore(0);
    setPatience(100);
    setMessages([]);
    setTotalWPM(0);
    setTotalAccuracy(0);
    setTotalMessages(0);
  };

  // =========================================================================
  // Process scenario dengan nama custom - DIPERBAIKI
  // =========================================================================
    const getProcessedScenario = () => {
    if (!setupComplete) return scenarios[0];
    
    const selectedScenario = scenarios.find(scenario => scenario.id === currentLevel) || scenarios[0];
    
    const processText = (text) => {
      if (!customProfile.name) return text;
      
      // Ganti semua variasi placeholder dengan nama custom
      return text
        .replace(/{name}/g, customProfile.name)
        .replace(/\[PACAR_NAME\]/g, customProfile.name)
        .replace(/\[NAME\]/g, customProfile.name)
        .replace(/<name>/g, customProfile.name);
    };

    const processedMessages = selectedScenario.messages.map(msg => ({
      ...msg,
      expected: processText(msg.expected),
      // Juga process text message jika ada placeholder
      text: processText(msg.text),
      timeLimit: Math.floor(msg.timeLimit * getCurrentLevelMultiplier().timeMultiplier)
    }));

    return {
      ...selectedScenario,
      profile: {
        ...selectedScenario.profile,
        name: customProfile.name,
        avatar: customProfile.photoUrl
      },
      messages: processedMessages
    };
  };
  // =========================================================================
  // Get current level multiplier - DIPERBAIKI untuk level 6
  // =========================================================================
  const getCurrentLevelMultiplier = () => {
    const levelData = {
      1: { timeMultiplier: 1.0, patienceDrain: 1.0, scoreMultiplier: 1.0 },
      2: { timeMultiplier: 0.8, patienceDrain: 1.2, scoreMultiplier: 1.5 },
      3: { timeMultiplier: 0.6, patienceDrain: 1.5, scoreMultiplier: 2.0 },
      4: { timeMultiplier: 0.5, patienceDrain: 2.0, scoreMultiplier: 3.0 },
      5: { timeMultiplier: 0.4, patienceDrain: 2.5, scoreMultiplier: 5.0 },
      6: { timeMultiplier: 1.2, patienceDrain: 0.5, scoreMultiplier: 10.0 } // Level happy ending
    };
    return levelData[currentLevel] || levelData[1];
  };

  // =========================================================================
  // Calculate final score dengan penalty kesabaran
  // =========================================================================
  const calculateFinalScore = (baseScore, finalPatience) => {
    if (finalPatience >= 100) {
      return Math.round(baseScore * 1.2);
    }
    
    const patiencePenalty = (100 - finalPatience) / 100;
    const penaltyMultiplier = 1 - (patiencePenalty * 0.5);
    
    return Math.round(baseScore * Math.max(penaltyMultiplier, 0.5));
  };

  const scenario = getProcessedScenario();
  const currentMsg = scenario.messages[index];

  // =========================================================================
  // Initialize messages setelah setup complete - DIPERBAIKI
  // =========================================================================
  useEffect(() => {
    if (setupComplete && messages.length === 0) {
      setMessages([{ sender: 'pacar', text: scenario.messages[0].text }]);
      setTimer(scenario.messages[0].timeLimit);
    }
  }, [setupComplete, scenario.messages, currentLevel]); // Tambah currentLevel ke dependency

  // =========================================================================
  // Costume Profile Handler
  // =========================================================================
  const handleSetupComplete = (setupData) => {
    setCustomProfile(setupData);
    setSetupComplete(true);
  };

  const currentProfile = setupComplete ? {
    name: customProfile.name,
    avatar: customProfile.photoUrl,
    status: "online"
  } : {
    name: "Waifu",
    avatar: "",
    status: "online"
  };

  // =========================================================================
  // Perhitungan Metrik
  // =========================================================================
  const calculateMetrics = (input, expected, startTime) => {
      if (!startTime) return { wpm: 0, accuracy: 100 };

      const endTime = Date.now();
      const durationInMinutes = (endTime - startTime) / 60000;
      
      const wordsCount = expected.split(' ').length;
      const calculatedWPM = Math.round(wordsCount / durationInMinutes);
      
      let correctChars = 0;
      for (let i = 0; i < Math.min(input.length, expected.length); i++) {
          if (input[i] === expected[i]) {
              correctChars++;
          }
      }
      const calculatedAccuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

      return { wpm: calculatedWPM, accuracy: calculatedAccuracy };
  };

  // =========================================================================
  // LOGIC METRIK AKHIR (Rata-rata)
  // =========================================================================
  const updateFinalMetrics = () => {
    let finalScore = score;
    let finalWPM = 0;
    let finalAccuracy = 0;

    if (totalMessages > 0) {
        const avgWPM = Math.round(totalWPM / totalMessages);
        const avgAccuracy = Math.round(totalAccuracy / totalMessages);
        finalWPM = avgWPM;
        finalAccuracy = avgAccuracy;
        
        finalScore = calculateFinalScore(score, patience);
        
        const newStats = {
          ...playerStats,
          currentLevel: Math.max(playerStats.currentLevel, currentLevel),
          highScore: Math.max(playerStats.highScore, finalScore),
          highestWPM: Math.max(playerStats.highestWPM, finalWPM)
        };
        
        if (patience > 0) {
          newStats.levelsCompleted = Math.max(playerStats.levelsCompleted, currentLevel);
        }
        
        setPlayerStats(newStats);
        setTotalWPM(finalWPM);
        setTotalAccuracy(finalAccuracy);
    }
    
    setScore(finalScore);
    setGameOver(true);
  };

  // =========================================================================
  // LOGIC TIMER UTAMA
  // =========================================================================
  useEffect(() => {
    if (gameOver || !gameStarted || !setupComplete) return; 
    if (index >= scenario.messages.length) {
      return updateFinalMetrics();
    }

    if (timer <= 0) {
      handleTimeout();
      return;
    }
    const t = setTimeout(() => {
        if (timer > 0) setTimer((t) => t - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [timer, gameOver, index, gameStarted, setupComplete]); 
  
  // =========================================================================
  // LOGIC: SOUND EFFECT GAME OVER
  // =========================================================================
  useEffect(() => {
    if (gameOver) {
        if (patience > 0) {
            playGoodEndSound();
        } else {
            playBadEndSound();
        }
    }
  }, [gameOver, patience]); 

  // =========================================================================
  // HANDLER: Waktu Habis
  // =========================================================================
  const handleTimeout = () => {
    const multiplier = getCurrentLevelMultiplier();
    setPatience((p) => Math.max(p - 20 * multiplier.patienceDrain, 0)); 
    
    if (patience - 20 * multiplier.patienceDrain <= 0) {
        return updateFinalMetrics(); 
    }

    setMessages((m) => [...m, { sender: 'system', text: '⏰ Waktu Habis! -20 Kesabaran' }]);
    
    if (index < scenario.messages.length - 1) {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            nextMessage();
        }, 1500); 
    } else {
        updateFinalMetrics();
    }
  };

  // =========================================================================
  // HANDLER: Input Pemain
  // =========================================================================
  const handlePlayerInput = (input) => {
    if (!gameStarted || gameOver || !setupComplete) return; 

    if (input === currentMsg.expected) {
      const { wpm, accuracy } = calculateMetrics(input, currentMsg.expected, typingStartTime);
      
      setTotalWPM(prevWPM => prevWPM + wpm);
      setTotalAccuracy(prevAcc => prevAcc + accuracy);
      setTotalMessages(prevCount => prevCount + 1);

      const multiplier = getCurrentLevelMultiplier();
      
      setMessages((m) => [...m, { sender: 'player', text: input }]);
      setScore((s) => s + Math.round(timer * 5 * multiplier.scoreMultiplier));
      setPatience((p) => Math.min(p + 15, 100));
      setTypingStartTime(null); 

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        nextMessage();
      }, 1000); 
      
    } else {
      const multiplier = getCurrentLevelMultiplier();
      setMessages((m) => [...m, { sender: 'system', text: `❌ SALAH KETIK! Jawaban harus: "${currentMsg.expected}"` }]);
      setPatience((p) => Math.max(p - 15 * multiplier.patienceDrain, 0));
      if (patience - 15 * multiplier.patienceDrain <= 0) {
          return updateFinalMetrics(); 
      }
      setTimer(currentMsg.timeLimit);
    }
  };

  // =========================================================================
  // LOGIC: Pesan Berikutnya
  // =========================================================================
  const nextMessage = () => {
    const nextIndex = index + 1;
    const next = scenario.messages[nextIndex];

    if (!next) {
      return updateFinalMetrics(); 
    }
    
    setIndex(nextIndex);
    setMessages((m) => [...m, { sender: 'pacar', text: next.text }]);
    setTimer(next.timeLimit);
    setTypingStartTime(Date.now()); 
  };
  
  // =========================================================================
  // HANDLER: Mulai Game
  // =========================================================================
  const startGame = () => {
    setGameStarted(true);
    setTypingStartTime(Date.now()); 
  };

  // =========================================================================
  // LAYAR GAME OVER
  // =========================================================================
  if (gameOver)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center bg-gradient-to-br from-purple-100 to-pink-100 p-4">
        <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0_#000] p-8 max-w-md w-full">
          <h1 className="text-4xl font-extrabold text-[#6A0DAD] mb-4 border-b-4 border-black pb-2">
              {patience <= 0 ? `💔 ${customProfile.name} Ngambek & Pergi!` : "🎉 Chat Selesai, Berhasil!"}
          </h1>
          
          <div className="mb-4 p-3 rounded-lg border-2 border-dashed bg-gradient-to-r from-yellow-50 to-orange-50">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-700">Level:</span>
              <span className="font-bold text-gray-700">{scenario.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="font-bold text-gray-700">Skor Awal:</span>
              <span className="font-bold text-gray-700">{score}</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="font-bold text-gray-700">Kesabaran Akhir:</span>
              <span className={`font-bold ${patience >= 80 ? 'text-green-600' : patience >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {patience}%
              </span>
            </div>
            {patience >= 100 && (
              <div className="mt-2 text-green-600 font-bold text-sm bg-green-100 rounded p-1">
                ✅ Bonus 20%! Kesabaran penuh!
              </div>
            )}
            {patience < 100 && patience > 0 && (
              <div className="mt-2 text-orange-600 font-bold text-sm bg-orange-100 rounded p-1">
                ⚠️ Penalty: -{Math.round((100 - patience) / 2)}% dari skor
              </div>
            )}
            {patience <= 0 && (
              <div className="mt-2 text-red-600 font-bold text-sm bg-red-100 rounded p-1">
                ❌ Game Over! Kesabaran habis!
              </div>
            )}
          </div>

          <p className="text-xl font-bold text-black my-4">
            Skor Akhir: <span className="text-[#FF6347]">{score}</span>
          </p>
          
          <div className="mt-6 p-4 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50">
            <h3 className="text-xl font-bold mb-2 text-[#6A0DAD]">Statistics:</h3>
            <p className="text-lg text-black">Rata-rata WPM: <span className="font-extrabold text-[#FF6347]">{totalWPM}</span></p>
            <p className="text-lg text-black">Akurasi Rata-rata: <span className="font-extrabold text-[#FF6347]">{totalAccuracy}%</span></p>
            <p className="text-lg text-black">Pesan Diselesaikan: <span className="font-extrabold text-[#FF6347]">{totalMessages}</span></p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-[#FFC300] text-black font-bold text-lg px-6 py-3 rounded-2xl border-4 border-black hover:bg-[#FFD700] transition-all shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:translate-y-[-2px]"
            >
              Main Lagi
            </button>
            <button
              onClick={handleResetProfile}
              className="flex-1 bg-gray-500 text-white font-bold text-lg px-6 py-3 rounded-2xl border-4 border-black hover:bg-gray-600 transition-all shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:translate-y-[-2px] flex items-center justify-center gap-2"
            >
              <FaSyncAlt />
              Ganti Profile
            </button>
          </div>
        </div>
      </div>
    );

  if (!setupComplete) {
      return (
          <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
              <h2 className="text-3xl font-extrabold text-[#6A0DAD] mb-6 drop-shadow-md">My Waifu Ku Ngambek</h2>
              <SetupForm onSetupComplete={handleSetupComplete} />
          </div>
      );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 gap-6">
      
      <div className="w-full lg:w-auto lg:max-w-sm">
        <GameInfoFooter />
      </div>

      <div className="flex flex-col w-full max-w-md h-[700px] bg-white rounded-3xl shadow-[12px_12px_0_#000] overflow-hidden border-4 border-black relative">
          
          <div className="bg-gradient-to-r from-green-500 to-green-700 border-b-4 border-black relative z-30">
            <ProfileHeader profile={currentProfile} isTyping={isTyping} />
          </div>

          <div className="relative z-20">
            <StatsBar score={score} timer={timer} patience={patience} />
          </div>

          <div className="pt- 10relative flex-1 overflow-hidden" style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%239C92AC\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
            backgroundSize: 'cover'
          }}>
            {!gameStarted && (
              <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center z-40 p-6 rounded-b-2xl">
                <h2 className="text-4xl font-extrabold text-white mb-6 text-center text-shadow-lg">
                  {scenario.name}
                </h2>

                <button
                  onClick={startGame}
                  className="flex items-center gap-3 bg-[#FFC300] text-black font-extrabold text-xl px-8 py-4 rounded-2xl border-4 border-black hover:bg-[#FFD700] transition-all shadow-[6px_6px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-y-[-2px] transform active:shadow-[4px_4px_0_#000] active:translate-y-0"
                >
                  <FaPlay size={24} className="text-black" />
                  Start Game
                </button>

                <p className="text-white mt-6 text-sm font-medium text-center max-w-xs">
                  Tekan untuk memulai level: {scenario.name}
                </p>
              </div>
            )}
          
            <div className={`h-full overflow-y-auto ${!gameStarted ? 'blur-sm' : ''}`}>
              <ChatWindow messages={messages} isTyping={isTyping} />
            </div>
          </div>
      
          <div className={!gameStarted ? 'opacity-50 pointer-events-none blur-sm' : ''}>
            <TypingInput onSubmit={handlePlayerInput} targetText={currentMsg.expected} />
          </div>
          
      </div>

      <div className="w-full lg:w-auto lg:max-w-sm">
        <div className="mb-4">
          <button
            onClick={handleResetProfile}
            className="w-full bg-gray-500 text-white font-bold text-lg px-6 py-3 rounded-2xl border-4 border-black hover:bg-gray-600 transition-all shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:translate-y-[-2px] flex items-center justify-center gap-2"
          >
            <FaSyncAlt />
            Ganti Profile
          </button>
        </div>
        <LevelSelector 
          currentLevel={currentLevel}
          onLevelSelect={handleLevelSelect}
          playerStats={playerStats}
        />
      </div>
    </div>
  );
}