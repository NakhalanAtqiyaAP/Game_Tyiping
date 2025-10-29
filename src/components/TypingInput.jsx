// components/TypingInput.js
import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

// =========================================================================
// 1. Definisikan Audio Objects di luar komponen
// =========================================================================
// Pastikan path './assets/...' ini benar di struktur folder proyek Anda
const correctSound = new Audio('../assets/ohmygod.mp3'); // Suara Benar/Sempurna
const errorSound = new Audio('../assets/wrong.mp3');   // Suara Salah/Error

// =========================================================================
// 2. Gunakan Objek Audio untuk Membuat Fungsi Pemutar Suara ASLI
// =========================================================================
const playCorrectSound = () => {
    // Memastikan suara diputar dari awal setiap kali dipanggil
    correctSound.currentTime = 0;
    correctSound.play().catch(e => console.error("Error playing correct sound:", e));
    // Kita tidak lagi perlu console.log di sini karena kita ingin suaranya keluar
};

const playErrorSound = () => {
    // Memastikan suara diputar dari awal setiap kali dipanggil
    errorSound.currentTime = 0;
    errorSound.play().catch(e => console.error("Error playing error sound:", e));
    // Kita tidak lagi perlu console.log di sini
};
// =========================================================================


export default function TypingInput({ onSubmit, targetText }) {
  const [input, setInput] = useState("");
  const [typedText, setTypedText] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null); // 'correct' | 'error' | null

  // =========================================================================
  // LOGIC: Memutar Suara Setelah Status Submit Diperbarui
  // =========================================================================
  useEffect(() => {
    if (submitStatus === 'correct') {
      playCorrectSound();
    } else if (submitStatus === 'error') {
      // Catatan: Suara error di sini hanya akan diputar jika
      // pengguna mengirimkan teks yang SALAH.
      playErrorSound();
    }
    // Reset status setelah diputar
    setSubmitStatus(null); 
  }, [submitStatus]);


  // =========================================================================
  // HANDLER: Submit Input
  // (Logic ini tetap sama, hanya memicu setSubmitStatus)
  // =========================================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (trimmedInput) {
      onSubmit(trimmedInput);
      
      // Tentukan status submit untuk memicu suara
      if (trimmedInput === targetText) {
        setSubmitStatus('correct');
      } else {
        setSubmitStatus('error');
      }
      
      setInput("");
      setTypedText("");
    }
  };

  // ... (Sisa fungsi render dan perhitungan tetap sama)
  // Fungsi untuk render target text dengan warna berdasarkan ketikan
  const renderTargetText = () => {
    return Array.from(targetText).map((char, index) => {
      let className = "text-gray-400"; 
      
      if (index < typedText.length) {
        if (typedText[index] === char) {
          className = "text-green-600 font-bold bg-green-50 px-0.5 rounded"; 
        } else {
          className = "text-red-600 font-bold bg-red-50 px-0.5 rounded"; 
        }
      }
      
      return (
        <span key={index} className={`text-lg ${className}`}>
          {char}
        </span>
      );
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setTypedText(value);
  };

  // Hitung persentase ketikan benar
  const calculateAccuracy = () => {
    if (typedText.length === 0) return 0;
    
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === targetText[i]) {
        correctChars++;
      }
    }
    
    return Math.round((correctChars / typedText.length) * 100);
  };

  const accuracy = calculateAccuracy();
  const isComplete = typedText.length === targetText.length;

  return (
    <div className="w-full bg-white p-4 border-t-2 border-gray-300 bg-gradient-to-t from-white to-gray-50">
      {/* Target Text Display */}
      <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-dashed border-purple-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <span className="font-bold text-gray-700">TARGET TEXT:</span>
          </div>
          {typedText.length > 0 && (
            <div className={`text-sm font-bold px-2 py-1 rounded-full ${
              accuracy >= 80 ? 'bg-green-100 text-green-700' : 
              accuracy >= 60 ? 'bg-yellow-100 text-yellow-700' : 
              'bg-red-100 text-red-700'
            }`}>
              Akurasi: {accuracy}%
            </div>
          )}
        </div>
        
        {/* Target Text dengan Highlight */}
        <div className="font-mono text-lg leading-8 whitespace-pre-wrap break-words min-h-[40px] bg-white/50 rounded-lg p-2 border">
          {renderTargetText()}
          
          {/* Cursor blinking di akhir */}
          {!isComplete && typedText.length < targetText.length && (
            <span className="ml-1 w-1 h-6 bg-purple-500 animate-pulse inline-block align-middle"></span>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2 border">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                accuracy >= 80 ? 'bg-green-500' : 
                accuracy >= 60 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`}
              style={{ width: `${(typedText.length / targetText.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600 mt-1 text-right">
            {typedText.length}/{targetText.length} karakter
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full p-4 text-lg rounded-2xl bg-white border-2 border-gray-400 text-black focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200 shadow-sm"
            placeholder="Ketik jawabanmu di sini..."
            value={input}
            onChange={handleInputChange}
            autoFocus
          />
        </div>
        
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-gradient-to-br from-green-500 to-green-600 w-14 h-14 flex items-center justify-center rounded-2xl border-2 border-green-700 text-white hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <FaPaperPlane className="text-lg" />
        </button>
      </form>

      {/* Quick Stats */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
        
        {isComplete && accuracy === 100 && (
          <div className="flex items-center gap-1 text-green-600 font-bold">
            <span>✅ Sempurna!</span>
          </div>
        )}
      </div>
    </div>
  );
}