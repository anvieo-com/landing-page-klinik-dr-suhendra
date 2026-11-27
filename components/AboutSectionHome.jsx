'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutSectionHome() {
  return (
    <section id="tentang" className="relative bg-white border-b border-slate-100 overflow-hidden py-16 lg:py-24">

      {/* 1. Background Image Layer on Left - Menempel dari batas atas (top-0) hingga batas bawah (bottom-0) tanpa shading bawah */}
      <div className="absolute top-0 bottom-0 left-0 w-full lg:w-[56%] xl:w-[53%] h-[380px] sm:h-[440px] lg:h-full overflow-hidden z-0 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/assets/tentang-klinik-suhendra.jpg"
            alt="Lobby & Resepsionis Klinik dr. Suhendra"
            fill
            className="object-cover object-top select-none"
            priority
          />
        </div>

        {/* Shading Kanan: Membaur anggun ke latar putih teks di sebelah kanan */}
        <div className="absolute inset-y-0 right-0 w-28 sm:w-36 lg:w-48 bg-gradient-to-r from-transparent via-white/80 via-40% to-white z-[1]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Row Atas: Kolom Kiri Ruang Gambar & Kolom Kanan Teks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start min-h-[360px] lg:min-h-[460px]">

          {/* Kolom Kiri: Spacer untuk memberikan ruang pandang visual bagi background foto di sebelah kiri */}
          <div className="h-[320px] sm:h-[400px] lg:h-auto lg:min-h-[460px] lg:col-span-6 pointer-events-none" />

          {/* Kolom Kanan: Keterangan Tentang Kami (Latar Putih Bersih) */}
          <div className="lg:col-span-6 space-y-6 pt-1 lg:pt-2">

            {/* Tagline Model Garis di Kiri (Tanpa Badge & Tanpa Icon) */}
            <div className="flex items-center gap-3">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                TENTANG KLINIK DR. SUHENDRA
              </span>
            </div>

            {/* Judul Utama - Dilengkapi coretan stabilo oranye pada 'Kesehatan Anda' seperti di hero */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.55rem] font-black text-navy-950 tracking-tight leading-[1.24] sm:leading-[1.14]">
              Dedikasi Sepenuh Hati <br className="sm:hidden" />
              untuk{' '}
              <span className="coretan-oranye text-navy-950">
                Kesehatan Anda
              </span>{' '}
              & Keluarga
            </h2>

            {/* Paragraf Keterangan Ringkas */}
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Berawal dari komitmen tulus mendampingi kesehatan warga di wilayah Bogor Barat,{' '}
                <strong className="text-navy-950 font-bold">Klinik dr. Suhendra</strong> kini telah berkembang menjadi pusat layanan kesehatan primer terpercaya
                dengan <strong className="text-navy-950 font-bold">6 cabang aktif</strong> yang siap melayani masyarakat dengan standar medis profesional,
                fasilitas higienis, dan biaya yang transparan.
              </p>
            </div>

            {/* Tombol Selengkapnya di Bawah Paragraf */}
            <div className="pt-2">
              <Link
                href="/tentang"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-bold text-white bg-navy-900 hover:bg-navy-950 active:scale-95 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <span>Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
