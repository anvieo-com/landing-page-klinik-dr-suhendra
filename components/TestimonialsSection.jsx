'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials as baseTestimonials } from '@/data/clinicData';

export default function TestimonialsSection() {
  const testimonials = [
    ...baseTestimonials,
    {
      name: "Ibu Rina Marlina (41 th)",
      branch: "Pasien Farmasi & Lab",
      category: "Farmasi & Obat",
      text: "Pelayanan obat dan resep di farmasi sangat cepat, tidak perlu menunggu berjam-jam. Apotekernya ramah dan menjelaskan aturan minum obat dengan sangat jelas.",
      rating: 5,
    },
    {
      name: "Bapak Agus Setiawan (38 th)",
      branch: "Pasien Poli Umum",
      category: "Poli Umum & Jaga",
      text: "Klinik yang sangat bersih, ruang tunggu ber-AC adem dan nyaman. Dokternya sangat komunikatif, teliti memeriksa keluhan, dan biaya berobat sangat transparan.",
      rating: 5,
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-play bergeser ke kanan satu per satu setiap 4.5 detik
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  return (
    <section id="testimoni" className="py-16 lg:py-24 bg-slate-100/80 border-y border-slate-200/90 overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Container - Tanpa Kotak, Align Center, Muncul 1 per 1 */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slider Viewport: Muncul Satu per Satu */}
          <div className="overflow-hidden py-2">
            <div 
              className="flex transition-transform duration-600 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="w-full flex-shrink-0 px-4 sm:px-12 flex flex-col items-center text-center"
                >
                  {/* Ikon Tanda Petik Grey Besar Sebagai Background / Watermark Elegan (Tanpa Kotak) */}
                  <div className="pointer-events-none select-none text-slate-300/50 mb-2" aria-hidden="true">
                    <Quote className="w-16 h-16 sm:w-20 sm:h-20 fill-slate-200/60 stroke-[1.25]" />
                  </div>

                  {/* Rating Bintang Emas */}
                  <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Teks Ulasan: Ukuran besar, elegan, align center */}
                  <blockquote className="text-base sm:text-xl lg:text-2xl text-slate-800 font-medium leading-relaxed italic max-w-3xl mx-auto">
                    "{t.text}"
                  </blockquote>

                  {/* Garis Aksen Pembatas Halus */}
                  <span className="w-12 h-0.5 bg-blue-600/30 rounded-full my-6" />

                  {/* Profil Pasien (Tanpa Badge Verified) */}
                  <div className="flex flex-col items-center">
                    <h4 className="text-base sm:text-lg font-black text-navy-950">
                      {t.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                      {t.branch}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Navigasi Kiri & Kanan (Desktop Floating di Sisi Kiri & Kanan) */}
          <button
            onClick={prevSlide}
            aria-label="Testimoni Sebelumnya"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-11 h-11 rounded-full border border-slate-200 bg-white/90 hover:bg-navy-950 hover:border-navy-950 text-navy-900 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hidden sm:flex z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Testimoni Selanjutnya"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-11 h-11 rounded-full border border-slate-200 bg-white/90 hover:bg-navy-950 hover:border-navy-950 text-navy-900 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer hidden sm:flex z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Navigasi Bawah: Tombol Prev/Next untuk Mobile & Dots Pagination */}
          <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
            <button
              onClick={prevSlide}
              aria-label="Testimoni Sebelumnya"
              className="sm:hidden w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-navy-950 text-navy-900 hover:text-white flex items-center justify-center transition-all shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots Pagination */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Lihat testimoni ke-${dotIdx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === dotIdx
                      ? 'w-8 bg-blue-600'
                      : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Testimoni Selanjutnya"
              className="sm:hidden w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-navy-950 text-navy-900 hover:text-white flex items-center justify-center transition-all shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
