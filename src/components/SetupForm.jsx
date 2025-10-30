import React, { useState, useRef } from 'react';

export default function SetupForm({ onSetupComplete }) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Gunakan nilai default jika input kosong
    const finalName = name.trim() || 'Komi-san';
    
    // Jika tidak ada foto yang diupload, gunakan default
    let finalPhotoUrl = 'https://i.pinimg.com/originals/f0/00/53/f00053d3b96afd3e59389da0840050fc.jpg';
    
    // Jika ada foto yang diupload, convert ke base64
    if (photo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onSetupComplete({
          name: finalName,
          photoUrl: e.target.result
        });
      };
      reader.readAsDataURL(photo);
      return;
    }

    // Panggil fungsi di App.js untuk menyimpan data dan memulai game
    onSetupComplete({
      name: finalName,
      photoUrl: finalPhotoUrl
    });
  };

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      
      // Buat preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (JPEG, PNG, etc.)');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview('');
  };

  return (
    <div className="p-6 bg-white rounded-2xl border-4 border-black shadow-[6px_6px_0_#000] w-full max-w-sm">
      <h3 className="text-xl font-extrabold text-[#6A0DAD] mb-4 text-center">⚙️ Kustomisasi Waifu</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Input Nama */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">
            Nama Pacar (Default: Komi-san)
          </label>
          <input
            id="name"
            type="text"
            className="text-black w-full p-2 border-2 border-gray-400 rounded-lg focus:border-purple-500 focus:ring-purple-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama..."
            maxLength={20}
          />
        </div>
        
        {/* Upload Foto */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Foto Profil (Default: Komi-san)
          </label>
          
          {/* Area Upload Drag & Drop */}
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
              isDragging 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-400 hover:border-purple-400 hover:bg-purple-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            {photoPreview ? (
              <div className="space-y-2">
                <div className="relative inline-block">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-purple-500 mx-auto"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto();
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-green-600 font-medium">
                  ✓ Foto berhasil diupload
                </p>
                <p className="text-xs text-gray-500">
                  Klik untuk ganti foto
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-3xl text-gray-400">📷</div>
                <p className="text-sm text-gray-600 font-medium">
                  Drag & drop foto di sini
                </p>
                <p className="text-xs text-gray-500">
                  atau klik untuk memilih file
                </p>
                <p className="text-xs text-gray-400">
                  Format: JPEG, PNG, GIF (max 5MB)
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-[#FFC300] text-black font-extrabold text-lg px-6 py-3 rounded-xl border-4 border-black hover:bg-[#FFD700] transition-all shadow-[4px_4px_0_#000] active:shadow-[2px_2px_0_#000] active:translate-y-0.5"
        >
          Konfirmasi
        </button>
      </form>
    </div>
  );
}