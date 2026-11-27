'use client';

import React from 'react';
import { Users, Stethoscope, Building2, Award } from 'lucide-react';

export default function QuickStatsHeroBar() {
  const stats = [
    {
      icon: Users,
      value: "25.000+",
      label: "Pasien Terlayani"
    },
    {
      icon: Stethoscope,
      value: "20+",
      label: "Dokter & Paramedis"
    },
    {
      icon: Building2,
      value: "6 Cabang",
      label: "Wilayah Bogor & Sekitarnya"
    },
    {
      icon: Award,
      value: "99%",
      label: "Kepuasan Pasien"
    }
  ];

  return (
    <section className="bg-slate-100 pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pt-10 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-sm p-5 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className={`flex items-center gap-3.5 sm:gap-4 ${idx !== 0 ? 'sm:pl-6 lg:pl-8 pt-4 sm:pt-0' : ''}`}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center flex-shrink-0 text-navy-950 shadow-2xs">
                    <Icon className="w-5 h-5 text-navy-900" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-none">
                      {item.value}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
