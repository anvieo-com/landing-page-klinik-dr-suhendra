'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Komponen Karakter Dera AI (Revisi Sesuai Request)
 * - Bulatan utama putih kebiruan bulat biasa (tanpa gelombang, bulat sempurna)
 * - Bulatan lebih besar & jelas di navbar
 * - Tanpa kotak pembungkus, tanpa wording teks di sampingnya, tanpa icon bulat hijau
 * - Tanpa mulut & tanpa retina dalam
 * - 2 layer gelombang di sekitarnya berwarna biru lebih pekat & tegas, ukuran sama persis tapi animasi berbeda & berlawanan arah
 * - Mata biru doff bergerak mengikuti kursor mouse & berkedip alami
 */
export default function DeraSlimeAvatar({
  size = 'sm', // 'sm' (navbar), 'md' (header chat), 'lg' (detail)
  isSpeaking = false,
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

      // Jangkauan gerak mata proporsional
      const maxRadius = size === 'sm' ? 2.2 : size === 'md' ? 2.8 : 3.8;
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

  // Pengaturan dimensi: Bulatan utama lebih besar & gelombang mengitari pas di sekitarnya
  const dimensions = {
    sm: {
      container: 'w-11 h-11 sm:w-12 sm:h-12',
      body: 'w-9 h-9 sm:w-10 sm:h-10', // Bulatan utama besar & tegas (~36px - 40px)
      wave: 'w-11 h-11 sm:w-12 sm:h-12', // Sedikit lebih besar dari bulatan utama (~44px - 48px)
      eye: 'w-2 h-3 sm:w-2.2 sm:h-3.4',
      gap: 'gap-1.5 sm:gap-2',
    },
    md: {
      container: 'w-12 h-12 sm:w-13 sm:h-13',
      body: 'w-10 h-10 sm:w-11 sm:h-11',
      wave: 'w-12.5 h-12.5 sm:w-13.5 sm:h-13.5',
      eye: 'w-2.2 h-3.4 sm:w-2.4 sm:h-3.8',
      gap: 'gap-2',
    },
    lg: {
      container: 'w-18 h-18 sm:w-20 sm:h-20',
      body: 'w-15 h-15 sm:w-16.5 sm:h-16.5',
      wave: 'w-18 h-18 sm:w-20 sm:h-20',
      eye: 'w-3.2 h-5 sm:w-3.6 sm:h-5.5',
      gap: 'gap-3',
    },
  }[size] || {
    container: 'w-11 h-11 sm:w-12 sm:h-12',
    body: 'w-9 h-9 sm:w-10 sm:h-10',
    wave: 'w-11 h-11 sm:w-12 sm:h-12',
    eye: 'w-2 h-3 sm:w-2.2 sm:h-3.4',
    gap: 'gap-1.5 sm:gap-2',
  };

  return (
    <div
      ref={avatarRef}
      onClick={onClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${dimensions.container} ${className}`}
      title="Dera AI — Asisten Kesehatan Keluarga Klinik dr. Suhendra"
    >
      {/* =========================================================
          GELOMBANG 2 (Ukuran sama persis, arah berlawanan, transparant biru doff ~35%)
         ========================================================= */}
      <div
        className={`absolute bg-[#1d4ed8]/35 pointer-events-none z-0 animate-wave-layer2 transition-all duration-300 ${dimensions.wave} ${
          isSpeaking ? 'scale-125 bg-blue-600/55' : ''
        }`}
      />

      {/* =========================================================
          GELOMBANG 1 (Ukuran sama persis, searah jarum jam, transparant biru doff ~35%)
         ========================================================= */}
      <div
        className={`absolute bg-[#2563eb]/35 pointer-events-none z-0 animate-wave-layer1 transition-all duration-300 ${dimensions.wave} ${
          isSpeaking ? 'scale-120 bg-blue-500/55' : ''
        }`}
      />

      {/* =========================================================
          BULATAN UTAMA PUTIH KEBIRUAN (Bulat Biasa Saja, Lebih Besar, Di Depan Gelombang)
         ========================================================= */}
      <div
        className={`relative rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-active:scale-95 z-10 ${dimensions.body}`}
        style={{
          background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f8fafc 60%, #e0ecff 90%, #bfdbfe 100%)',
          boxShadow: '0 4px 12px -2px rgba(30, 58, 138, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(147, 197, 253, 0.45)',
          border: '1.5px solid rgba(219, 234, 254, 0.95)',
        }}
      >
        {/* Kilau Specular Halus di Kiri Atas */}
        <div
          className="absolute top-1 left-1.5 w-2 h-1 rounded-full bg-white/90 pointer-events-none rotate-[-30deg]"
        />

        {/* =========================================================
            MATA DERA AI (Biru Doff Utuh, Mengikuti Mouse & Berkedip Alami)
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
            {/* Mata Kiri (Biru Doff solid) */}
            <div
              className={`rounded-full bg-[#1e3a8a] shadow-inner animate-slime-blink ${dimensions.eye}`}
            />

            {/* Mata Kanan (Biru Doff solid) */}
            <div
              className={`rounded-full bg-[#1e3a8a] shadow-inner animate-slime-blink ${dimensions.eye}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
