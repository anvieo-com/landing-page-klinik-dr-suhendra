'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // Matikan loader saat rute halaman berhasil berpindah
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  // Pasang listener klik link navigasi agar loader langsung muncul seketika (0ms)
  useEffect(() => {
    const handleLinkClick = (e) => {
      // Cari elemen <a> terdekat
      const target = e.target.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Hanya tangani link internal halaman (bukan hash #, bukan tel:, bukan mailto:, bukan external)
      const isInternal = href.startsWith('/') && !href.startsWith('//');
      const isHash = href.startsWith('#') || href.includes('#');
      const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

      if (isInternal && !isHash && !isModified && target.target !== '_blank') {
        const targetPath = href.split('?')[0];
        const currentPath = window.location.pathname;

        // Jika rute tujuan berbeda dengan rute saat ini, aktifkan loader
        if (targetPath !== currentPath) {
          setLoading(true);

          // Safety timeout agar loader otomatis hilang jika terjadi pembatalan
          setTimeout(() => {
            setLoading(false);
          }, 3500);
        }
      }
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm animate-in fade-in duration-150"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex items-center justify-center">
        {/* Subtle spinning outer ring */}
        <div className="w-20 h-20 rounded-full border-3 border-slate-200 border-t-navy-900 animate-spin"></div>
        
        {/* Pulsing glow ring */}
        <div className="absolute w-16 h-16 rounded-full bg-blue-600/15 animate-ping"></div>

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
