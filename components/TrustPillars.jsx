'use client';

import React from 'react';
import { Users, HeartPulse, ShieldCheck, Award, Stethoscope, Building2 } from 'lucide-react';
import { valuePillars, clinicInfo } from '@/data/clinicData';

export default function TrustPillars() {
  const iconMap = {
    Users: Users,
    HeartPulse: HeartPulse,
    ShieldCheck: ShieldCheck,
    Award: Award,
  };

  return (
    <section className="bg-white py-12 lg:py-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quick Stats Pill Bar */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="flex items-center gap-3 px-2 sm:px-4">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-navy-900 shadow-2xs">
                <Users className="w-5 h-5 text-navy-900" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-none">
                  {clinicInfo.totalPatients}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  Pasien Terlayani
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 sm:px-4 pt-4 sm:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-navy-900 shadow-2xs">
                <Stethoscope className="w-5 h-5 text-navy-900" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-none">
                  {clinicInfo.totalDoctors}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  Dokter & Paramedis
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 sm:px-4 pt-4 sm:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-navy-900 shadow-2xs">
                <Building2 className="w-5 h-5 text-navy-900" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-none">
                  {clinicInfo.totalBranches} Cabang
                </p>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  Wilayah Bogor & Sekitarnya
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 sm:px-4 pt-4 sm:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-navy-900 shadow-2xs">
                <Award className="w-5 h-5 text-navy-900" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight leading-none">
                  {clinicInfo.satisfactionRate}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  Kepuasan Pasien
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Prinsip Pelayanan
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mt-3 tracking-tight">
            Komitmen Kami untuk Kesembuhan Anda
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Standar pelayanan medis holistik yang diterapkan di seluruh jaringan cabang Klinik dr. Suhendra.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePillars.map((pillar) => {
            const IconComponent = iconMap[pillar.icon] || ShieldCheck;
            return (
              <div 
                key={pillar.id}
                className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-navy-900 hover:shadow-card transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 group-hover:bg-navy-900 group-hover:border-navy-900 group-hover:text-white transition-colors duration-300 flex items-center justify-center text-navy-900 mb-5 shadow-2xs">
                    <IconComponent className="w-7 h-7 stroke-[1.75]" />
                  </div>

                  <h3 className="text-lg font-bold text-navy-950 group-hover:text-navy-900 transition-colors mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="w-8 h-1 bg-transparent group-hover:bg-navy-900 rounded-full mt-5 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
