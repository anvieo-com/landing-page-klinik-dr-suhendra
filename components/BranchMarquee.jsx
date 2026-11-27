'use client';

import React from 'react';
import { branches } from '@/data/clinicData';

export default function BranchMarquee() {
  const branchList = [
    { name: "Klinik dr. Suhendra Bojong Jengkol (Pusat)", hours: "24 Jam" },
    { name: "Klinik Medika Tapos", hours: "24 Jam" },
    { name: "Klinik Medika Karihkil", hours: "24 Jam" },
    { name: "Klinik dr. Suhendra Ciampea Udik", hours: "07.00 - 22.00" },
    { name: "Klinik Medika Cihideung", hours: "08.00 - 21.00" },
    { name: "Klinik Medika Ps. Rebo", hours: "24 Jam" },
  ];

  return (
    <div className="bg-[#123154] text-white py-3.5 border-t border-slate-200 border-b-0 overflow-hidden relative z-20">
      <div className="overflow-hidden w-full relative">
        <div className="animate-marquee-right flex items-center">
          
          {/* Set 1 */}
          {branchList.map((branch, idx) => (
            <div key={idx} className="flex items-center gap-3 px-6 sm:px-8 text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <span className="hover:text-white transition-colors">{branch.name}</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30">
                {branch.hours}
              </span>
            </div>
          ))}

          {/* Set 2 (for smooth infinite loop) */}
          {branchList.map((branch, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-3 px-6 sm:px-8 text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <span className="hover:text-white transition-colors">{branch.name}</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30">
                {branch.hours}
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
