'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Reusable Dera AI Slime Character Component
 * - Bulatan putih kebiruan organik (slime morph)
 * - Layer gelombang 1 di belakang (biru doff transparan ~40%)
 * - Layer gelombang 2 di belakang (biru doff lebih transparan ~20%)
 * - Mata biru doff berkedip dan pupil mengikuti kursor mouse
 */
export default function DeraSlimeAvatar({
  size = 'md', // 'sm' (navbar), 'md' (header chat), 'lg' (floating)
  isSpeaking = false,
  showBadge = true,
  className = '',
  onClick,
}) {
  const avatarRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      const maxRadius = size === 'sm' ? 2.2 : size === 'md' ? 2.6 : 3.4;
      if (distance === 0) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }

      const factor = Math.min(distance / 250, 1) * maxRadius;
      const angle = Math.atan2(deltaY, deltaX);

      setEyeOffset({
        x: Math.round(Math.cos(angle) * factor * 10) / 10,
        y: Math.round(Math.sin(angle) * factor * 10) / 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  // Pengaturan ukuran proporsional
  const dimensions = {
    sm: {
      container: 'w-8 h-8 sm:w-9 sm:h-9',
      wave2: 'w-11 h-11 sm:w-12 sm:h-12',
      wave1: 'w-10 h-10 sm:w-10.5 sm:h-10.5',
      body: 'w-8 h-8 sm:w-8.5 sm:h-8.5',
      eye: 'w-1.5 h-2.5',
      pupil: 'w-1 h-1.5',
      sparkle: 'w-0.5 h-0.5',
      gap: 'gap-1.5',
      smile: 'w-2 h-0.5',
      badge: 'w-2.5 h-2.5',
    },
    md: {
      container: 'w-10 h-10',
      wave2: 'w-13 h-13',
      wave1: 'w-11.5 h-11.5',
      body: 'w-9.5 h-9.5',
      eye: 'w-2 h-3',
      pupil: 'w-1.2 h-2',
      sparkle: 'w-0.5 h-0.5',
      gap: 'gap-1.5',
      smile: 'w-2 h-1',
      badge: 'w-3 h-3',
    },
    lg: {
      container: 'w-16 h-16 sm:w-20 sm:h-20',
      wave2: 'w-20 h-20 sm:w-24 sm:h-24',
      wave1: 'w-18 h-18 sm:w-21 sm:h-21',
      body: 'w-14 h-14 sm:w-16 sm:h-16',
      eye: 'w-2.5 h-3.5 sm:w-3 sm:h-4',
      pupil: 'w-1.5 h-2 sm:w-2 sm:h-2.5',
      sparkle: 'w-1 h-1',
      gap: 'gap-2.5 sm:gap-3',
      smile: 'w-2.5 sm:w-3 h-1',
      badge: 'w-3.5 h-3.5',
    },
  }[size] || dimensions.md;

  return (
    <div
      ref={avatarRef}
      onClick={onClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${dimensions.container} ${className}`}
      title="Dera AI — Asisten Kesehatan Keluarga Klinik dr. Suhendra"
    >
      {/* LAYER GELOMBANG 2 (Paling Belakang - Biru Doff Transparan ~20%) */}
      <div
        className={`absolute rounded-full bg-[#1e3a8a]/20 pointer-events-none animate-wave-layer2 transition-all duration-500 ${dimensions.wave2} ${
          isSpeaking ? 'scale-125 bg-blue-700/35' : ''
        }`}
      />

      {/* LAYER GELOMBANG 1 (Belakang Tengah - Biru Doff Agak Transparan ~40%) */}
      <div
        className={`absolute rounded-full bg-[#1e40af]/40 pointer-events-none animate-wave-layer1 transition-all duration-500 ${dimensions.wave1} ${
          isSpeaking ? 'scale-115 bg-blue-800/55' : ''
        }`}
      />

      {/* BULATAN PUTIH KEBIRUAN UTAMA (Slime Body) */}
      <div
        className={`relative rounded-full animate-slime-morph flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105 group-active:scale-95 ${dimensions.body}`}
        style={{
          background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f0f7ff 55%, #dbeafe 88%, #bfdbfe 100%)',
          boxShadow: size === 'lg'
            ? '0 10px 25px -4px rgba(30, 58, 138, 0.28), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -3px 6px rgba(147, 197, 253, 0.55)'
            : '0 3px 10px -2px rgba(30, 58, 138, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -2px 3px rgba(147, 197, 253, 0.45)',
          border: '1.5px solid rgba(191, 219, 254, 0.85)',
        }}
      >
        {/* Kilau Specular Highlight (Cahaya di Sudut Kiri Atas) */}
        <div
          className={`absolute rounded-full bg-white/90 pointer-events-none rotate-[-30deg] ${
            size === 'lg' ? 'top-2 left-2.5 w-3.5 h-2' : 'top-1 left-1.5 w-2 h-1'
          }`}
        />

        {/* WAJAH DERA AI (Mata Biru Doff + Pupil Ikut Mouse + Senyum) */}
        <div className="flex flex-col items-center justify-center w-full z-10">
          
          {/* Dua Mata Biru Doff */}
          <div className={`flex items-center justify-center ${dimensions.gap}`}>
            
            {/* Mata Kiri */}
            <div
              className={`rounded-full bg-[#1e3a8a] overflow-hidden relative animate-slime-blink shadow-inner ${dimensions.eye}`}
            >
              <div
                className={`rounded-full bg-[#0f2744] absolute transition-transform duration-75 ease-out top-0.5 left-0.5 ${dimensions.pupil}`}
                style={{
                  transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                }}
              >
                <div className={`rounded-full bg-white absolute top-0.5 left-0.5 ${dimensions.sparkle}`} />
              </div>
            </div>

            {/* Mata Kanan */}
            <div
              className={`rounded-full bg-[#1e3a8a] overflow-hidden relative animate-slime-blink shadow-inner ${dimensions.eye}`}
            >
              <div
                className={`rounded-full bg-[#0f2744] absolute transition-transform duration-75 ease-out top-0.5 left-0.5 ${dimensions.pupil}`}
                style={{
                  transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                }}
              >
                <div className={`rounded-full bg-white absolute top-0.5 left-0.5 ${dimensions.sparkle}`} />
              </div>
            </div>

          </div>

          {/* Senyum Kecil Imut Biru Doff */}
          <div
            className={`border-b-2 border-[#1e3a8a] rounded-b-full mx-auto mt-0.5 ${dimensions.smile} ${
              isSpeaking ? 'h-1.5 w-1.5 rounded-full border-2 border-[#1e3a8a] bg-[#1e3a8a]/20 animate-pulse' : ''
            }`}
          />
        </div>

        {/* Titik Hijau Status Online */}
        {showBadge && (
          <div
            className={`absolute -bottom-0.5 -right-0.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center ${dimensions.badge}`}
          >
            <span className="w-1 h-1 rounded-full bg-white animate-ping" />
          </div>
        )}
      </div>
    </div>
  );
}
