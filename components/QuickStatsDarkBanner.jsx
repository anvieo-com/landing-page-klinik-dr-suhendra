'use client';

import React from 'react';
import { Users, Stethoscope, Bed, Award } from 'lucide-react';

export default function QuickStatsDarkBanner() {
  const stats = [
    {
      icon: Users,
      value: "500.000+",
      label: "Pasien Terlayani",
      desc: "Kepercayaan keluarga di seluruh wilayah Bogor"
    },
    {
      icon: Stethoscope,
      value: "20+",
      label: "Dokter & Paramedis",
      desc: "Tenaga medis berdedikasi & profesional"
    },
    {
      icon: Bed,
      value: "7",
      label: "Kamar Rawat Inap",
      desc: "Fasilitas bersih, tenang & terawat higienis"
    },
    {
      icon: Award,
      value: "10+ Tahun",
      label: "Dedikasi & Pengalaman",
      desc: "Melayani dengan etika & ketulusan hati"
    }
  ];

  return (
    <section className="bg-navy-950 text-white py-14 lg:py-20 relative overflow-hidden bg-medical-pattern border-y border-navy-900">

      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-navy-800/80">

          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0 group"
              >
                {/* Flat Outline Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-navy-900/80 border border-navy-700/60 flex items-center justify-center text-blue-300 group-hover:text-white group-hover:bg-blue-600/30 transition-all duration-300 mb-4 shadow-inner">
                  <Icon className="w-7 h-7 stroke-[1.75]" />
                </div>

                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none mb-2">
                  {item.value}
                </p>

                <h4 className="text-sm sm:text-base font-bold text-slate-200">
                  {item.label}
                </h4>

                <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
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
