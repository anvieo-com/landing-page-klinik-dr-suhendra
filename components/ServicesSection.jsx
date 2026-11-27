'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Stethoscope, 
  Ambulance, 
  Bed, 
  Microscope, 
  Baby, 
  Pill, 
  ArrowRight 
} from 'lucide-react';
import { services } from '@/data/clinicData';

export default function ServicesSection({ onSelectService }) {
  const iconMap = {
    Stethoscope: Stethoscope,
    Ambulance: Ambulance,
    Bed: Bed,
    Microscope: Microscope,
    Baby: Baby,
    Pill: Pill,
  };

  return (
    <section id="layanan" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout 2 Kolom: Kiri Judul & Penjelasan, Kanan Kotak Layanan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          
          {/* Kolom Kiri: Header Model Garis, Judul Besar dengan Coretan Oranye, & Deskripsi */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Header Model Garis di Kiri (Tanpa Badge) */}
            <div className="flex items-center gap-3">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                LAYANAN MEDIS KAMI
              </span>
            </div>

            {/* Judul Besar Seperti Header dengan Coretan Stabilo Oranye pada 'Layanan Kesehatan' */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.1rem] font-black text-navy-950 tracking-tight leading-[1.26] sm:leading-[1.22]">
              <span className="coretan-oranye text-navy-950">
                Layanan Kesehatan
              </span>{' '}
              Terpadu untuk Anda & Keluarga
            </h2>

            {/* Paragraf Penjelasan */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Didukung peralatan medis berstandar dan tenaga medis berpengalaman untuk memastikan diagnosa akurat, tindakan medis sigap, serta kenyamanan pasien di seluruh 6 cabang kami.
            </p>

            {/* Status 24 Jam & Info Cabang */}
            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 w-fit">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Siaga IGD & Poli 24 Jam di Seluruh Cabang</span>
              </div>
            </div>

            {/* Tombol Selengkapnya ke Halaman Layanan */}
            <div className="pt-2">
              <Link
                href="/layanan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-bold text-white bg-navy-900 hover:bg-navy-950 active:scale-95 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <span>Lihat Detail Layanan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Kolom Kanan: Kotak Penjelasan Layanan (Hanya Icon, Judul, dan Keterangan Singkat; Poli Umum Berwarna Biru Dongker) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || Stethoscope;
                const isPoliUmum = service.id === 'poli-umum' || service.title.toLowerCase().includes('poli umum');

                return (
                  <div
                    key={service.id}
                    onClick={() => onSelectService && onSelectService(service)}
                    className={`rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-start group cursor-pointer ${
                      isPoliUmum
                        ? 'bg-navy-950 text-white border border-navy-900 shadow-lg shadow-navy-950/20 hover:shadow-xl hover:shadow-navy-950/30 hover:-translate-y-1'
                        : 'bg-white text-navy-950 border border-slate-200 hover:border-slate-300 shadow-soft hover:shadow-card hover:-translate-y-1'
                    }`}
                  >
                    {/* Icon Saja */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 ${
                        isPoliUmum
                          ? 'bg-white/10 border border-white/20 text-white'
                          : 'bg-blue-50 border border-blue-100 text-blue-600 group-hover:bg-navy-900 group-hover:border-navy-900 group-hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                    </div>

                    {/* Judul Saja */}
                    <h3
                      className={`text-lg sm:text-xl font-extrabold mb-2.5 tracking-tight transition-colors ${
                        isPoliUmum
                          ? 'text-white'
                          : 'text-navy-950 group-hover:text-blue-600'
                      }`}
                    >
                      {service.title}
                    </h3>

                    {/* Keterangan Singkat Saja */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-normal ${
                        isPoliUmum
                          ? 'text-slate-300'
                          : 'text-slate-600'
                      }`}
                    >
                      {service.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
