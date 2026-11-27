'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderTopBar from '@/components/HeaderTopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/AppointmentModal';
import QuickStatsDarkBanner from '@/components/QuickStatsDarkBanner';
import BranchLocations from '@/components/BranchLocations';
import { 
  Building2, 
  Target, 
  Eye, 
  ShieldCheck, 
  Users, 
  Clock, 
  Award, 
  HeartHandshake, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { clinicInfo, valuePillars } from '@/data/clinicData';

export default function TentangPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Page Header - Tinggi kembali proporsional & natural seperti semula */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden py-10 sm:py-12 lg:py-14 flex items-center">
        {/* 1. Background Image Layer on Left - /assets/gambar4.png */}
        <div className="absolute top-0 bottom-0 left-0 w-full lg:w-[48%] xl:w-[46%] h-[240px] sm:h-[300px] lg:h-full overflow-hidden z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="/assets/gambar4.png"
              alt="Keluarga Besar & Tim Medis Klinik dr. Suhendra"
              fill
              className="object-cover object-center select-none"
              priority
            />
          </div>

          {/* Shading Atas: Tipis untuk menyamarkan garis atas */}
          <div className="absolute inset-x-0 top-0 h-10 sm:h-12 bg-gradient-to-b from-white via-white/80 to-transparent z-[1]" />

          {/* Shading Bawah: Tipis untuk menyamarkan garis bawah */}
          <div className="absolute inset-x-0 bottom-0 h-10 sm:h-12 bg-gradient-to-t from-white via-white/80 to-transparent z-[1]" />

          {/* Shading Kanan: Tipis untuk menyamarkan garis kanan membaur ke teks */}
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-28 bg-gradient-to-r from-transparent via-white/80 to-white z-[1]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Kolom Kiri: Spacer untuk memberikan ruang pandang visual bagi foto di sebelah kiri */}
            <div className="h-[200px] sm:h-[240px] lg:h-auto lg:col-span-5 pointer-events-none" />

            {/* Kolom Kanan: Teks Judul & Keterangan */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              {/* Header Model Garis di Kiri (Tanpa Badge) */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                  PROFIL & KOMITMEN KAMI
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-black text-navy-950 tracking-tight leading-snug">
                Dedikasi Sepenuh Hati untuk{' '}
                <span className="coretan-oranye text-navy-950">
                  Kesehatan Anda
                </span>{' '}
                & Keluarga
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                Klinik dr. Suhendra lahir dari kepedulian mendalam untuk menghadirkan akses layanan kesehatan primer yang bermutu, terjangkau, dan humanis di wilayah Bogor dan sekitarnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah & Cerita Perjalanan - Gambar melebar sampai batas kanan dengan shading lembut */}
      <section className="relative py-16 lg:py-24 bg-white border-b border-slate-100 overflow-hidden">
        {/* Background Image Layer on Right - Menempel ke batas kanan dan memanjang dengan shading */}
        <div className="absolute top-0 bottom-0 right-0 w-full lg:w-[49%] xl:w-[48%] h-[320px] sm:h-[400px] lg:h-full overflow-hidden z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="/assets/gambar1.jpg"
              alt="Gedung Pelayanan Utama Klinik dr. Suhendra"
              fill
              className="object-cover object-center select-none"
            />
          </div>

          {/* Shading Atas: Tebal solid di ujung tepi menyamarkan garis atas */}
          <div className="absolute inset-x-0 top-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-b from-white from-25% via-white/90 via-55% to-transparent z-[1]" />

          {/* Shading Bawah: Tebal solid di ujung tepi menyamarkan garis bawah */}
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-white from-25% via-white/90 via-55% to-transparent z-[1]" />

          {/* Shading Kiri: Membaur anggun ke arah kolom teks di sebelah kiri */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-28 lg:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-[1]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Kolom Kiri: Keterangan Sejarah Singkat */}
            <div className="lg:col-span-6 space-y-6">
              {/* Header Model Garis di Kiri (Tanpa Badge) */}
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                  SEJARAH SINGKAT
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight leading-tight">
                Lebih dari{' '}
                <span className="coretan-oranye text-navy-950">
                  10 Tahun Mengabdi
                </span>{' '}
                Menjadi Sahabat Sehat Keluarga
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Dimulai dari fasilitas klinik pratama sederhana di Bojong Jengkol pada tahun 2016, 
                Klinik dr. Suhendra terus tumbuh atas dasar kepercayaan dan rekomendasi dari ribuan pasien. 
                Kini kami telah mengoperasikan <strong className="text-navy-950 font-bold">6 cabang aktif</strong> yang tersebar strategis di wilayah Ciampea, 
                Tenjolaya, Ciseeng, dan Cibungbulang.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Kami meyakini bahwa setiap pasien berhak mendapatkan penjelasan medis yang transparan, 
                perlakuan yang ramah dan bermartabat, serta pengobatan yang rasional tanpa membebani keuangan keluarga.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-2xl font-black text-navy-950">500.000+</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Pasien telah kami layani</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-2xl font-black text-navy-950">24 Jam</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Siaga nonstop termasuk hari libur</p>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Spacer untuk memberi ruang pandang bagi foto gedung yang melebar ke kanan */}
            <div className="h-[280px] sm:h-[360px] lg:h-auto lg:min-h-[440px] lg:col-span-6 pointer-events-none" />

          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            {/* Header Model Garis (Tanpa Badge) */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                ARAH & TUJUAN
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mt-3 tracking-tight">
              <span className="coretan-oranye text-navy-950">Visi & Misi</span> Klinik dr. Suhendra
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Prinsip panduan yang mendasari setiap keputusan medis dan pelayanan keperawatan kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Visi */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft hover:shadow-card transition-all">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-navy-900 mb-6">
                <Eye className="w-7 h-7 stroke-[1.75]" />
              </div>
              <h3 className="text-2xl font-black text-navy-950 mb-3">Visi Kami</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Menjadi jaringan klinik pelayanan kesehatan primer yang paling terpercaya, terjangkau, dan humanis di Jawa Barat, yang selalu mengutamakan keselamatan dan kenyamanan pasien.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft hover:shadow-card transition-all">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-navy-900 mb-6">
                <Target className="w-7 h-7 stroke-[1.75]" />
              </div>
              <h3 className="text-2xl font-black text-navy-950 mb-3">Misi Kami</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span>Memberikan pelayanan medis berkualitas tinggi dengan dukungan tenaga kesehatan yang kompeten dan bersertifikasi.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span>Menyediakan sarana pemeriksaan modern, laboratorium akurat, dan apotek berstandar BPOM selama 24 jam nonstop.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span>Menerapkan etika medis yang menjunjung tinggi empati, komunikasi terbuka, dan transparansi tarif.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span>Mendukung program pemerintah dalam pemerataan akses kesehatan masyarakat melalui kerja sama BPJS Kesehatan.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Pilar Nilai */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {/* Header Model Garis (Tanpa Badge) */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                NILAI UTAMA
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mt-3 tracking-tight">
              <span className="coretan-oranye text-navy-950">4 Pilar Pelayanan</span> Klinik dr. Suhendra
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePillars.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-navy-900 transition-colors">
                <h4 className="text-base font-extrabold text-navy-950 mb-2">{p.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Banner */}
      <QuickStatsDarkBanner />

      {/* 6 Cabang Lokasi */}
      <BranchLocations onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Call To Action - Background Beda dengan Footer (bg-slate-50 vs Footer bg-navy-950) */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 tracking-tight">
            Siap Melayani <span className="coretan-oranye text-navy-950">Kesehatan Anda</span> dan Keluarga Hari Ini
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Kunjungi cabang Klinik dr. Suhendra terdekat atau reservasi jadwal konsultasi online sekarang tanpa antre.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-5 h-5 text-white" strokeWidth={2} />
              <span>Daftar Antrean Online Sekarang</span>
            </button>
          </div>
        </div>
      </section>

      <Footer onOpenBooking={() => setBookingModalOpen(true)} />

      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </main>
  );
}
