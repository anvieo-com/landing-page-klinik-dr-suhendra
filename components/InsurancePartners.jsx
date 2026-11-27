'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { insurancePartners } from '@/data/clinicData';

export default function InsurancePartners() {
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
              JAMINAN & KEMUDAHAN PEMBAYARAN
            </span>
            <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy-950 mt-1">
            <span className="coretan-oranye text-navy-950">Mitra Asuransi</span> & Penjamin Kesehatan
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {insurancePartners.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-200 hover:border-navy-900 transition-all text-center flex flex-col items-center justify-center group"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-navy-900 mb-2 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-navy-950 block">
                {item.logoText}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                {item.supported}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
