'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with ssr: false for Leaflet OpenStreetMap
const InteractiveBranchMap = dynamic(() => import('./InteractiveBranchMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[620px] bg-slate-100 flex flex-col items-center justify-center text-slate-400 gap-3">
      <div className="w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xs font-bold uppercase tracking-wider text-navy-900">Memuat Peta Persebaran Cabang...</p>
    </div>
  ),
});

export default function BranchLocations({ onOpenBooking }) {
  return (
    <section id="cabang" className="py-14 lg:py-20 bg-white border-b border-slate-200/80 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
            JARINGAN KLINIK
          </span>
          <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mt-3 tracking-tight">
          <span className="coretan-oranye text-navy-950">6 Lokasi Cabang</span> Klinik dr. Suhendra
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Peta interaktif persebaran fasilitas kesehatan kami di Bogor. Klik pin lokasi atau pilih cabang untuk melihat foto bangunan, jadwal dokter, dan rute navigasi.
        </p>
      </div>

      {/* Full-width fit kiri kanan OpenStreetMap Section with isolated stacking context */}
      <div className="w-full relative isolate z-0 border-y border-slate-200 shadow-inner">
        <InteractiveBranchMap onOpenBooking={onOpenBooking} />
      </div>
    </section>
  );
}
