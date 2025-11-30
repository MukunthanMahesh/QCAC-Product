import React from 'react';

export default function LoadingScreen({ showPresents }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-hero text-white z-50">
      <div className="relative flex items-center justify-center w-full">
        <div
          className={`transition-transform duration-400 ease-out ${
            showPresents ? '-translate-y-8 sm:-translate-y-10' : ''
          }`}
        >
          <img
            src="/brand/Manora_Logo_White.svg"
            alt="Manora"
            className="h-8 w-auto"
          />
        </div>
        <p
          className={`absolute text-xs sm:text-sm text-white/70 tracking-[0.2em] uppercase transition-opacity duration-500 ease-out ${
            showPresents ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Presents&hellip;
        </p>
      </div>
    </div>
  );
}
