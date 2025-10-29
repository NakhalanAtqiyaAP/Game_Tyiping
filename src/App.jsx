import React, { useEffect, useState } from 'react';
import { FaPlay } from "react-icons/fa"

import { scenarios } from './data/dialogue';
import ProfileHeader from './components/ProfileHeader';
import ChatWindow from './components/ChatWindow';
import TypingInput from './components/TypingInput';
import StatsBar from './components/StatsBar'; 
import GameInfoFooter from './components/GameInfo';

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


export default function App() {
  const scenario = scenarios[0];
  const [index, setIndex] = useState(0);
  const [messages, setMessages] = useState([{ sender: 'pacar', text: scenario.messages[0].text }]); 
  const [timer, setTimer] = useState(scenario.messages[0].timeLimit);
  const [patience, setPatience] = useState(100);
  const [score, setScore] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); 
  
  const [typingStartTime, setTypingStartTime] = useState(Date.now()); 
  const [totalWPM, setTotalWPM] = useState(0); 
  const [totalAccuracy, setTotalAccuracy] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0); 

  const currentMsg = scenario.messages[index];

  
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
    if (totalMessages > 0) {
        const avgWPM = Math.round(totalWPM / totalMessages);
        const avgAccuracy = Math.round(totalAccuracy / totalMessages);
        setTotalWPM(avgWPM);
        setTotalAccuracy(avgAccuracy);
    }
    setGameOver(true);
  };


  // =========================================================================
  // LOGIC TIMER UTAMA
  // =========================================================================
  useEffect(() => {
    if (gameOver || !gameStarted) return; 
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
  }, [timer, gameOver, index, gameStarted]); 
  
  // =========================================================================
  // LOGIC: SOUND EFFECT GAME OVER (BARU)
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
    setPatience((p) => Math.max(p - 20, 0)); 
    
    if (patience - 20 <= 0) {
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
    if (!gameStarted || gameOver) return; 

    if (input === currentMsg.expected) {
      const { wpm, accuracy } = calculateMetrics(input, currentMsg.expected, typingStartTime);
      
      setTotalWPM(prevWPM => prevWPM + wpm);
      setTotalAccuracy(prevAcc => prevAcc + accuracy);
      setTotalMessages(prevCount => prevCount + 1);

      setMessages((m) => [...m, { sender: 'player', text: input }]);
      setScore((s) => s + Math.round(timer * 5));
      setPatience((p) => Math.min(p + 15, 100));
      setTypingStartTime(null); 

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        nextMessage();
      }, 1000); 
      
    } else {
      setMessages((m) => [...m, { sender: 'system', text: `❌ SALAH KETIK! Jawaban harus: "${currentMsg.expected}"` }]);
      setPatience((p) => Math.max(p - 15, 0));
      if (patience - 15 <= 0) {
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
              {patience <= 0 ? "💔 Komi-san Ngambek & Pergi!" : "🎉 Chat Selesai, Berhasil!"}
          </h1>
          <p className="text-xl font-bold text-black my-4">Skor Akhir: <span className="text-[#FF6347]">{score}</span></p>
          
          <div className="mt-6 p-4 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50">
            <h3 className="text-xl font-bold mb-2 text-[#6A0DAD]">Statistics:</h3>
            <p className="text-lg text-black">Rata-rata WPM: <span className="font-extrabold text-[#FF6347]">{totalWPM}</span></p>
            <p className="text-lg text-black">Akurasi Rata-rata: <span className="font-extrabold text-[#FF6347]">{totalAccuracy}%</span></p>
            <p className="text-lg text-black">Pesan Diselesaikan: <span className="font-extrabold text-[#FF6347]">{totalMessages}</span></p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-[#FFC300] text-black font-bold text-lg px-6 py-3 rounded-2xl border-4 border-black hover:bg-[#FFD700] transition-all shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:translate-y-[-2px]"
          >
            Main Lagi
          </button>
        </div>
      </div>
    );

  return (
  <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">

    <div className="flex flex-col w-full max-w-md h-[700px] bg-white rounded-3xl shadow-[12px_12px_0_#000] overflow-hidden border-4 border-black">
        
        <div className="bg-gradient-to-r from-green-500 to-green-700 border-b-4 border-black z-20">
          <ProfileHeader profile={scenario.profile} isTyping={isTyping} />
        </div>
        <StatsBar score={score} timer={timer} patience={patience} />

        <div className="relative flex-1" style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%239C92AC\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
          backgroundSize: 'cover'
        }}>
         {!gameStarted && (
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center z-30 p-4"> 
            <h2 className="text-3xl font-extrabold text-white mb-6 text-shadow-lg">My Pacar Ku Ngambek</h2>

            <button
              onClick={startGame}
              className="flex items-center gap-3 bg-[#FFC300] text-black font-extrabold text-xl px-8 py-4 rounded-2xl border-4 border-black hover:bg-[#FFD700] transition-all shadow-[6px_6px_0_#000] hover:shadow-[8px_8px_0_#000] hover:translate-y-[-2px] transform active:shadow-[4px_4px_0_#000] active:translate-y-0"
            >
              <FaPlay size={24} className="text-black" />
              Start
            </button>

            <p className="text-white mt-4 text-sm font-medium italic">Tekan untuk memulai game.</p>
          </div>
        )}
          <div className={`${!gameStarted ? 'opacity-50 pointer-events-none' : ''} flex-1 overflow-y-auto flex flex-col justify-end`}>
            <ChatWindow messages={messages} isTyping={isTyping} />
          </div>

        </div>

        <div className={!gameStarted ? 'opacity-50 pointer-events-none' : ''}>
            <TypingInput onSubmit={handlePlayerInput} targetText={currentMsg.expected} />
        </div>
    </div>
    <GameInfoFooter />
    
  </div>
);
}