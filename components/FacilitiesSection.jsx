'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Building2, ShieldCheck, Ambulance } from 'lucide-react';
import { facilities } from '@/data/clinicData';

export default function FacilitiesSection() {
  return (
    <section id="fasilitas" className="py-16 lg:py-24 bg-navy-950 text-white relative overflow-hidden bg-medical-pattern border-b border-navy-900">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (matching Template 2) */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-navy-900 border border-navy-800 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" strokeWidth={2} />
            <span>Kenyamanan & Keamanan Pasien</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Fasilitas Modern untuk Perawatan Terbaik
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Lingkungan bersih, tenang, dan higienis serta dukungan peralatan medis terkini untuk menunjang proses pemulihan pasien dan ketenangan keluarga.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-navy-900/80 backdrop-blur-sm rounded-3xl border border-navy-800/80 hover:border-blue-500/50 overflow-hidden transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-navy-950">
                  <Image
                    src={fac.image}
                    alt={fac.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 bg-navy-950/90 text-blue-300 text-[11px] font-bold rounded-md border border-navy-800 shadow-sm">
                      {fac.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
              </div>

              {/* Status indicator */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-navy-800/60 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span>Terstandarisasi & Beroperasi Penuh</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
