'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-200">
      <div className="relative flex items-center justify-center">
        {/* Subtle spinning outer ring */}
        <div className="w-20 h-20 rounded-full border-3 border-slate-200 border-t-navy-900 animate-spin"></div>
        
        {/* Pulsing glow ring */}
        <div className="absolute w-16 h-16 rounded-full bg-blue-600/10 animate-ping"></div>

        {/* Logo Klinik di tengah */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/assets/logo.png"
            alt="Logo Klinik dr. Suhendra"
            className="w-10 h-10 object-contain select-none"
          />
        </div>
      </div>

      {/* Brand & Loading Label */}
      <div className="mt-5 text-center space-y-0.5">
        <p className="text-xs font-black tracking-widest text-navy-950 uppercase">
          KLINIK dr. SUHENDRA
        </p>
        <p className="text-[11px] font-semibold text-slate-400 animate-pulse">
          Memuat halaman...
        </p>
      </div>
    </div>
  );
}
