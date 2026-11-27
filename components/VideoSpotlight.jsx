'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  ArrowRight, 
  Volume2, 
  VolumeX 
} from 'lucide-react';

export default function VideoSpotlight() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const points = [
    {
      title: "Program Pengobatan Gratis Berkala",
      desc: "Menjangkau ratusan lansia dan keluarga prasejahtera di sekitar jaringan cabang."
    },
    {
      title: "Pelayanan Resepsionis & Medis yang Humanis",
      desc: "Komunikasi ramah, empati, dan teliti dalam mendengarkan setiap keluhan pasien."
    },
    {
      title: "Aksi Nyata & Kepedulian Sosial",
      desc: "Komitmen nyata dedikasi Klinik dr. Suhendra untuk senyum sehat masyarakat Bogor."
    }
  ];

  return (
    <section id="video-kegiatan" className="py-16 lg:py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* SISI KIRI: Video Reel Card (Vertical 9:16 Video Player Asli) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-slate-200 shadow-2xl bg-navy-950 group">
              
              <video
                ref={videoRef}
                src="/assets/clinic-video.mp4"
                poster="/assets/clinic-video-poster.jpg"
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover cursor-pointer select-none"
                onClick={togglePlay}
              />

              {/* Gradient Overlay saat Pause */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-black/40 flex flex-col items-center justify-between p-6 cursor-pointer transition-opacity"
                >
                  {/* Top Badge */}
                  <div className="self-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-extrabold text-navy-950 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Dokumentasi Asli Klinik</span>
                    </span>
                  </div>

                  {/* Big Play Button */}
                  <div className="w-16 h-16 rounded-full bg-white text-navy-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-navy-900 fill-navy-900 ml-1" />
                  </div>

                  {/* Bottom Caption */}
                  <div className="text-center text-white">
                    <p className="text-xs font-semibold text-slate-200">
                      Klik untuk Memutar Video
                    </p>
                    <p className="text-sm font-extrabold text-white mt-1">
                      Pengobatan Gratis Klinik dr. Suhendra
                    </p>
                  </div>
                </div>
              )}

              {/* Floating Quick Controls saat Playing */}
              {isPlaying && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-md"
                    title={isMuted ? "Aktifkan Suara" : "Bisukan"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-rose-400" strokeWidth={2} />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" strokeWidth={2} />
                    )}
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors shadow-md"
                    title="Jeda"
                  >
                    <Pause className="w-4 h-4 text-white" strokeWidth={2} />
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* SISI KANAN: Keterangan & Narasi Dedikasi Nyata */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Model Garis (Konsisten dengan Tentang Kami & Hero) */}
            <div className="flex items-center gap-3">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                AKSI NYATA & DOKUMENTASI KLINIK
              </span>
            </div>

            {/* Judul Utama */}
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight leading-tight">
              Senyum Sehat &{' '}
              <span className="coretan-oranye text-navy-950">
                Pengobatan Gratis
              </span>{' '}
              untuk Warga Bersama Klinik dr. Suhendra
            </h2>

            {/* Paragraf Keterangan */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Bagi kami, pelayanan kesehatan bukan sekadar rutinitas medis, melainkan panggilan nurani 
                untuk selalu hadir dan meringankan beban sesama. Melalui program <strong>Bakti Sosial & Pengobatan Gratis</strong>, 
                tim dokter dan paramedis kami secara konsisten turun langsung menyapa warga Bogor Barat.
              </p>
              <p>
                Saksikan kehangatan interaksi tim resepsionis kami di meja pendaftaran hingga ketulusan 
                dokter yang mendampingi pemeriksaan kesehatan warga dengan penuh kesabaran dan rasa kekeluargaan.
              </p>
            </div>

            {/* 3 Poin Keunggulan (Flat Outline Icon) */}
            <div className="space-y-3 pt-2">
              {points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 text-navy-900 mt-0.5 shadow-2xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Link Kegiatan */}
            <div className="pt-2">
              <Link
                href="/kegiatan"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-blue-600 transition-colors group"
              >
                <span>Lihat Agenda & Dokumentasi Kegiatan Lainnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
