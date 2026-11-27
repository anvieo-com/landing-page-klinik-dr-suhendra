'use client';

import React from 'react';
import { 
  Clock, 
  Stethoscope, 
  Building2, 
  HeartHandshake 
} from 'lucide-react';

export default function ClinicHighlightsSection() {
  const pillars = [
    {
      icon: Clock,
      title: "Siaga IGD & 24 Jam Nonstop",
      desc: "Layanan gawat darurat dan dokter jaga siap siaga setiap hari tanpa libur untuk menangani keluhan medis darurat.",
    },
    {
      icon: Stethoscope,
      title: "Dokter & Tenaga Medis Ahli",
      desc: "Ditangani oleh dokter berpengalaman dengan standar medis yang teliti, ramah, dan mengedepankan empati pasien.",
    },
    {
      icon: Building2,
      title: "Jaringan 6 Cabang Terintegrasi",
      desc: "Menjangkau wilayah Bogor dan sekitarnya dengan sistem rekam medis digital terpadu antar cabang klinik.",
    },
    {
      icon: HeartHandshake,
      title: "Biaya Transparan & Ramah",
      desc: "Melayani pasien umum dengan biaya yang jelas dan terjangkau serta terhubung dengan berbagai mitra penjamin kesehatan.",
    }
  ];

  return (
    <section className="bg-slate-50/70 border-b border-slate-200/90 py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Model Garis Pembatas Vertikal (Bukan Kotak/Card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col items-center sm:items-start text-center sm:text-left px-5 sm:px-6 lg:px-8 py-8 sm:py-2 transition-all duration-300 hover:bg-white/90 rounded-2xl sm:rounded-none"
              >
                {/* Icon Agak Besaran dan Diposisikan di Bagian Atas */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-navy-900 group-hover:bg-navy-950 group-hover:text-white group-hover:border-navy-950 group-hover:-translate-y-1 shadow-2xs group-hover:shadow-md transition-all duration-300 shrink-0">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.8} />
                </div>

                {/* Judul Keunggulan */}
                <h3 className="text-base sm:text-lg font-extrabold text-navy-950 mt-5 group-hover:text-blue-600 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Garis Aksen Pembatas Halus */}
                <span className="w-10 h-0.5 bg-blue-600/30 rounded-full mt-3 mb-2.5 group-hover:w-14 group-hover:bg-blue-600 transition-all duration-300" />

                {/* Deskripsi */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
