'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import HeaderTopBar from '@/components/HeaderTopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import { openWhatsAppBooking } from '@/lib/whatsapp';
import { 
  Stethoscope, 
  Ambulance, 
  Bed, 
  Microscope, 
  Baby, 
  Pill, 
  Check, 
  ArrowRight, 
  Clock, 
  Calendar,
  Sparkles,
  ClipboardList,
  HeartPulse,
  Activity
} from 'lucide-react';
import { services } from '@/data/clinicData';

export default function LayananPage() {
  const [selectedService, setSelectedService] = useState(null);

  const iconMap = {
    Stethoscope: Stethoscope,
    Ambulance: Ambulance,
    Bed: Bed,
    Microscope: Microscope,
    Baby: Baby,
    Pill: Pill,
  };

  const patientFlow = [
    {
      step: "01",
      title: "Pendaftaran Cepat",
      desc: "Daftar di loket atau via online WhatsApp untuk mendapatkan nomor antrean tanpa menunggu lama."
    },
    {
      step: "02",
      title: "Pemeriksaan Tanda Vital",
      desc: "Pengukuran tekanan darah, suhu, berat badan, dan saturasi oksigen oleh perawat ramah kami."
    },
    {
      step: "03",
      title: "Konsultasi Dokter Ahli",
      desc: "Pemeriksaan fisik mendalam, anamnesis keluhan, serta penjelasan medis yang transparan dan bersahabat."
    },
    {
      step: "04",
      title: "Diagnostik & Tindakan",
      desc: "Pemeriksaan penunjang laboratorium atau tindakan medis bila diindikasikan secara rasional."
    },
    {
      step: "05",
      title: "Apotek & Pemulihan",
      desc: "Penebusan obat dengan etiket jelas disertai edukasi pemakaian oleh apoteker berlisensi."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Page Header - Align Center & Background Slate-100 (Grey) */}
      <section className="bg-slate-100 border-b border-slate-200/80 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                KOMPREHENSIF & BERKELANJUTAN
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              <span className="coretan-oranye text-navy-950">Layanan Medis</span> Lengkap untuk Seluruh Anggota Keluarga
            </h1>
            <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal max-w-2xl mx-auto">
              Dari layanan preventif pemeriksaan rutin, pertolongan darurat 24 jam di IGD, rawat inap higienis, uji laboratorium cepat, hingga apotek terstandar BPOM.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Services Deep Dive - Foto Menempel Pinggir Layar & Dilengkapi Shading Halus */}
      <div className="divide-y divide-slate-100">
        {services.map((srv, index) => {
          const Icon = iconMap[srv.icon] || Stethoscope;
          const isReversed = index % 2 === 1;

          return (
            <section 
              key={srv.id} 
              id={srv.id}
              className="relative bg-white py-20 sm:py-24 lg:py-28 overflow-hidden flex items-center min-h-[480px] lg:min-h-[560px]"
            >
              {/* Background Image Layer — Menempel ke batas pinggir layar (kiri / kanan) dengan shading */}
              <div 
                className={`absolute top-0 bottom-0 ${
                  isReversed ? 'right-0' : 'left-0'
                } w-full lg:w-[50%] xl:w-[49%] h-[340px] sm:h-[420px] lg:h-full overflow-hidden z-0 pointer-events-none`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    className="object-cover object-center select-none"
                    priority={index < 2}
                  />
                </div>

                {/* Shading Atas: Lembut menyamarkan garis batas atas */}
                <div className="absolute inset-x-0 top-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-b from-white from-25% via-white/90 via-55% to-transparent z-[1]" />

                {/* Shading Bawah: Lembut menyamarkan garis batas bawah */}
                <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-white from-25% via-white/90 via-55% to-transparent z-[1]" />

                {/* Shading Sisi Tepi Layar */}
                <div 
                  className={`absolute inset-y-0 ${
                    isReversed 
                      ? 'right-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-l from-white via-white/60 to-transparent' 
                      : 'left-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-white via-white/60 to-transparent'
                  } z-[1]`} 
                />

                {/* Shading Sisi Dalam: Membaur luas ke arah kolom teks */}
                <div 
                  className={`absolute inset-y-0 ${
                    isReversed 
                      ? 'left-0 w-28 sm:w-40 lg:w-56 bg-gradient-to-r from-white via-white/85 to-transparent' 
                      : 'right-0 w-28 sm:w-40 lg:w-56 bg-gradient-to-r from-transparent via-white/85 to-white'
                  } z-[1]`} 
                />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  
                  {/* Kolom Kiri: Spacer untuk memberikan ruang pandang foto jika gambar menempel di kiri */}
                  {!isReversed && (
                    <div className="h-[280px] sm:h-[360px] lg:h-auto lg:min-h-[460px] lg:col-span-5 pointer-events-none" />
                  )}

                  {/* Kolom Detail Konten Layanan */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Badge & Schedule Header */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <span className="px-3.5 py-1 bg-navy-50 text-navy-950 border border-navy-200/60 text-xs font-black rounded-full shadow-2xs">
                        {srv.badge}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
                        <span>{srv.schedule}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 text-navy-900 flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <Icon className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight leading-tight">
                        {srv.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                        Cakupan Tindakan & Keunggulan:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {srv.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-3">
                      <button
                        onClick={() => openWhatsAppBooking({ service: srv.title })}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 active:scale-95 rounded-xl shadow-sm transition-all"
                      >
                        <Calendar className="w-4 h-4" strokeWidth={2} />
                        <span>Daftar Layanan Ini via WhatsApp</span>
                      </button>

                      <button
                        onClick={() => setSelectedService(srv)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-navy-950 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-xl border border-slate-200 transition-all"
                      >
                        <span>Lihat Ringkasan Modal</span>
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>

                  {/* Kolom Kanan: Spacer untuk memberikan ruang pandang foto jika gambar menempel di kanan */}
                  {isReversed && (
                    <div className="h-[280px] sm:h-[360px] lg:h-auto lg:min-h-[460px] lg:col-span-5 pointer-events-none" />
                  )}

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Alur Pelayanan Pasien */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                Alur Pelayanan
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mt-3 tracking-tight">
              <span className="coretan-oranye text-navy-950">5 Langkah Mudah</span> & Nyaman Berobat
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Kami menyusun alur pelayanan yang ringkas agar pasien mendapatkan kenyamanan maksimal tanpa proses birokrasi berbelit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {patientFlow.map((flow, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-navy-900 shadow-soft transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-blue-600/60 block mb-2">
                    {flow.step}
                  </span>
                  <h4 className="text-base font-extrabold text-navy-950 mb-2">
                    {flow.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {flow.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Membutuhkan <span className="coretan-oranye text-navy-950">Konsultasi Dokter</span> atau Penanganan Cepat?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            IGD dan Poli Umum kami siaga 24 jam nonstop setiap hari. Daftar antrean online untuk kemudahan Anda.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openWhatsAppBooking()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-white" strokeWidth={2} />
              <span>Buat Janji Temu Sekarang via WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      <Footer onOpenBooking={() => openWhatsAppBooking()} />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookFromService={(s) => openWhatsAppBooking({ service: s.title })}
      />
    </main>
  );
}
