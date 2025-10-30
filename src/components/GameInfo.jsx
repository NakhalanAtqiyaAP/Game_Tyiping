import React from 'react';

export default function GameInfoFooter() {
  return (

    <div className="w-full max-w-lg mt-8 p-6 bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0_#000]">
      
      <h2 className="text-2xl font-extrabold text-[#6A0DAD] mb-4 border-b-2 border-dashed border-gray-300 pb-2">
        🕹️ Cara Bermain
      </h2>

      <ol className="list-decimal list-inside space-y-3 text-lg text-gray-800 font-medium">
        <li>
        Ketik dengan cepat!  
        </li>
        <li>
        Ketik dengan tepat!
        </li>
        <li>
        Sayangi pacarmu!
        </li>
        <li>
        Kalo ga punya pacar, sayangi dirimu sendiri :3
        </li>
      </ol>

      <hr className="my-6 border-t-2 border-dashed border-gray-300" />
      
      {/* Footer Kredit */}
      <footer className="text-center text-sm text-gray-600">
        <p className="font-bold text-black mb-1">
            "My Pacar Ku Ngambek" - Typing Game
        </p>
        <p>
            Dibuat dengan ❤️ oleh Nakhalan Atqiya | 2025
        </p>
      </footer>
    </div>
  );
}