'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Komponen Karakter Dera AI
 * - Bulatan utama putih kebiruan bulat biasa (tanpa gelombang pada bodi utama)
 * - 2 layer gelombang di belakang berukuran sama, sedikit lebih besar dari bulatan utama
 *   (layer 1 dan layer 2 bergerak berbeda dan berlawanan arah)
 * - Mata biru doff (tanpa retina dalam), bergerak mengikuti kursor mouse dan bisa mengedip
 * - Tanpa mulut
 */
export default function DeraSlimeAvatar({
  size = 'md', // 'sm' (navbar), 'md' (header chat), 'lg' (dialog/detail)
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

      // Jangkauan gerak mata
      const maxRadius = size === 'sm' ? 2.4 : size === 'md' ? 3.0 : 4.0;
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

  // Pengaturan dimensi proporsional
  const dimensions = {
    sm: {
      container: 'w-8 h-8 sm:w-9 sm:h-9',
      body: 'w-7 h-7 sm:w-7.5 sm:h-7.5',
      wave: 'w-8 h-8 sm:w-8.5 sm:h-8.5', // Ukuran sama persis, sedikit lebih besar dari bulatan utama
      eye: 'w-1.5 h-2.5',
      gap: 'gap-1.5',
      badge: 'w-2.5 h-2.5',
    },
    md: {
      container: 'w-10 h-10',
      body: 'w-8.5 h-8.5',
      wave: 'w-10 h-10',
      eye: 'w-2 h-3.2',
      gap: 'gap-1.5',
      badge: 'w-3 h-3',
    },
    lg: {
      container: 'w-16 h-16 sm:w-20 sm:h-20',
      body: 'w-13 h-13 sm:w-16 sm:h-16',
      wave: 'w-15 h-15 sm:w-18.5 sm:h-18.5',
      eye: 'w-3 h-4.5 sm:w-3.5 sm:h-5',
      gap: 'gap-2.5 sm:gap-3',
      badge: 'w-3.5 h-3.5',
    },
  }[size] || {
    container: 'w-10 h-10',
    body: 'w-8.5 h-8.5',
    wave: 'w-10 h-10',
    eye: 'w-2 h-3.2',
    gap: 'gap-1.5',
    badge: 'w-3 h-3',
  };

  return (
    <div
      ref={avatarRef}
      onClick={onClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${dimensions.container} ${className}`}
      title="Dera AI — Asisten Kesehatan Keluarga Klinik dr. Suhendra"
    >
      {/* =========================================================
          GELOMBANG 2 (Ukuran sama persis, arah berlawanan, lebih transparan ~20%)
         ========================================================= */}
      <div
        className={`absolute rounded-full bg-[#1e3a8a]/20 pointer-events-none animate-wave-layer2 transition-transform duration-500 ${dimensions.wave} ${
          isSpeaking ? 'scale-115 bg-blue-700/30' : ''
        }`}
      />

      {/* =========================================================
          GELOMBANG 1 (Ukuran sama persis, arah searah jarum jam, transparan ~38%)
         ========================================================= */}
      <div
        className={`absolute rounded-full bg-[#1e40af]/38 pointer-events-none animate-wave-layer1 transition-transform duration-500 ${dimensions.wave} ${
          isSpeaking ? 'scale-110 bg-blue-800/45' : ''
        }`}
      />

      {/* =========================================================
          BULATAN UTAMA PUTIH KEBIRUAN (Bulat Biasa Saja, Tanpa Gelombang)
         ========================================================= */}
      <div
        className={`relative rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-active:scale-95 z-10 ${dimensions.body}`}
        style={{
          background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f8fafc 55%, #e2e8f0 85%, #dbeafe 100%)',
          boxShadow: size === 'lg'
            ? '0 6px 18px -2px rgba(30, 58, 138, 0.22), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -2px 5px rgba(147, 197, 253, 0.45)'
            : '0 2px 8px -1px rgba(30, 58, 138, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 3px rgba(147, 197, 253, 0.35)',
          border: '1px solid rgba(191, 219, 254, 0.9)',
        }}
      >
        {/* Kilau Halus di Sudut Kiri Atas */}
        <div
          className={`absolute rounded-full bg-white/85 pointer-events-none rotate-[-30deg] ${
            size === 'lg' ? 'top-1.5 left-2 w-3 h-1.5' : 'top-0.5 left-1 w-1.5 h-0.5'
          }`}
        />

        {/* =========================================================
            MATA DERA AI (Biru Doff Utuh, Mengikuti Mouse & Bisa Mengedip)
            - Tanpa retina dalam
            - Tanpa mulut
           ========================================================= */}
        <div
          className="flex items-center justify-center transition-transform duration-75 ease-out z-20"
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
          }}
        >
          <div className={`flex items-center justify-center ${dimensions.gap}`}>
            {/* Mata Kiri (Biru Doff solid, mengedip alami) */}
            <div
              className={`rounded-full bg-[#1e3a8a] shadow-inner animate-slime-blink ${dimensions.eye}`}
            />

            {/* Mata Kanan (Biru Doff solid, mengedip alami) */}
            <div
              className={`rounded-full bg-[#1e3a8a] shadow-inner animate-slime-blink ${dimensions.eye}`}
            />
          </div>
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
