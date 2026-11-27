'use client';

import React from 'react';
import Image from 'next/image';
import {
  Calendar,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

export default function HeroSection({ onOpenBooking }) {
  return (
    <section
      id="hero"
      className="relative bg-slate-100 overflow-hidden flex items-center min-h-[580px] lg:h-[calc(100vh-100px)] lg:max-h-[740px] pb-6 sm:pb-8 lg:pb-10"
    >
      {/* 1. Full Background Image Layer - Disimpan langsung di div paling atas background tanpa scale bertingkat agar top tidak terpotong */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <Image
          src="/assets/hero-doctor-new.jpg"
          alt="Layanan Medis Profesional Klinik dr. Suhendra"
          fill
          className="object-cover object-[78%_bottom] lg:object-contain lg:object-right-bottom select-none"
          priority
        />

        {/* Shading Atas: Lembut agar batas atas foto menyatu mulus dengan header */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-b from-slate-100 via-slate-100/70 to-transparent z-[1]" />

        {/* Shading Kiri: Melindungi teks agar tetap kontras & tajam */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-4/5 lg:w-[54%] bg-gradient-to-r from-slate-100 via-slate-100/90 to-transparent z-[1]" />

        {/* Shading Bawah: Transisi lembut di dasar section */}
        <div className="absolute inset-x-0 bottom-0 h-10 sm:h-14 lg:h-16 bg-gradient-to-t from-slate-100 via-slate-100/70 to-transparent z-[1]" />
      </div>

      {/* 3. Hero Content Container - Kolom tulisan dilebarkan sedikit ke kanan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="max-w-3xl lg:max-w-[740px] space-y-5 text-center lg:text-left">

          {/* Header Line Model (Tanpa badge & tanpa icon) */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
              Kesehatan Anda, Prioritas Utama Kami
            </span>
          </div>

          {/* Headline - Menggunakan coretan stabilo/marker oranye sesuai contoh */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.55rem] font-black text-navy-950 tracking-tight leading-[1.28] sm:leading-[1.16]">
            Pelayanan Medis Terbaik <br />
            untuk{' '}
            <span className="coretan-oranye text-navy-950">
              Kesehatan Anda
            </span>{' '}
            <br />
            & Keluarga Tercinta
          </h1>

          {/* Subtitle / Description - Dikurangi lebih ringkas */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
            Pelayanan kesehatan humanis, terpercaya, dan terjangkau didukung dokter berpengalaman serta apotek siaga 24 jam untuk Anda dan keluarga.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
            <a
              href="https://wa.me/6282311188250?text=Halo%20Klinik%20dr.%20Suhendra,%20saya%20ingin%20membuat%20janji%20temu/pendaftaran%20online."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-navy-900 hover:bg-navy-950 active:scale-95 rounded-xl shadow-navy transition-all duration-200"
            >
              <Calendar className="w-5 h-5 text-white" strokeWidth={2} />
              <span>Buat Janji Temu</span>
              <ArrowRight className="w-4 h-4 text-white/80" strokeWidth={2} />
            </a>

            <a
              href="#layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-navy-950 bg-white/90 hover:bg-white border-2 border-slate-200 hover:border-navy-900 rounded-xl transition-all duration-200 shadow-sm"
            >
              <Stethoscope className="w-5 h-5 text-navy-900" strokeWidth={1.75} />
              <span>Lihat Layanan Medis</span>
            </a>
          </div>

          {/* Fast Features Under Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>IGD & Rawat Inap Siaga 24 Jam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-navy-900"></div>
              <span>6 Cabang Aktif di Bogor</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
