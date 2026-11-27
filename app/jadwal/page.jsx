'use client';

import React, { useState } from 'react';
import HeaderTopBar from '@/components/HeaderTopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DoctorScheduleSection from '@/components/DoctorScheduleSection';
import DoctorsShowcase from '@/components/DoctorsShowcase';
import AppointmentModal from '@/components/AppointmentModal';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Stethoscope, 
  ShieldCheck, 
  PhoneCall, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { clinicInfo } from '@/data/clinicData';

export default function JadwalPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);

  const handleSelectDoctor = (doctor, branch) => {
    setBookingInitialData({
      doctor: doctor.name,
      service: doctor.poli,
      branch: branch ? branch.name : undefined,
    });
    setBookingModalOpen(true);
  };

  const scheduleGuidelines = [
    {
      title: "Pendaftaran Nomor Antrean",
      desc: "Disarankan melakukan reservasi antrean online minimal 2 jam sebelum kedatangan untuk meminimalkan waktu tunggu di klinik."
    },
    {
      title: "Dokumen yang Perlu Dibawa",
      desc: "Bawa KTP/KIA/Kartu Keluarga untuk pasien baru, serta Kartu BPJS Kesehatan atau asuransi swasta yang masih aktif."
    },
    {
      title: "Layanan Gawat Darurat (IGD)",
      desc: "Pasien dengan keluhan darurat (trauma, sesak napas berat, kejang, perdarahan) langsung ditangani di ruang IGD tanpa sistem antrean poli."
    },
    {
      title: "Perubahan Jadwal Dokter",
      desc: "Jadwal dokter dapat menyesuaikan sewaktu-waktu karena tindakan operasi rujukan. Pastikan konfirmasi via WhatsApp sebelum berangkat."
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
                JADWAL PRAKTIK TERPADU
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              <span className="coretan-oranye text-navy-950">Jadwal Praktik</span> Dokter & Tim Medis Klinik dr. Suhendra
            </h1>
            <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal max-w-2xl mx-auto">
              Cek waktu tugas dokter umum dan dokter gigi di seluruh 6 cabang aktif kami. Layanan IGD dan dokter jaga siaga 24 jam nonstop untuk kenyamanan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Doctor Schedule Section */}
      <DoctorScheduleSection onSelectDoctor={handleSelectDoctor} />

      {/* Doctors Showcase */}
      <DoctorsShowcase onOpenBookingWithDoctor={handleSelectDoctor} />

      {/* Panduan Kunjungan Pasien */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                Panduan Pasien
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 mt-3 tracking-tight">
              <span className="coretan-oranye text-navy-950">Informasi Penting</span> Sebelum Berkunjung
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scheduleGuidelines.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-navy-900 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-navy-900 font-extrabold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-extrabold text-navy-950 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Callout */}
      <section className="py-14 lg:py-18 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Ingin Mengkonfirmasi <span className="coretan-oranye text-navy-950">Dokter Jaga</span> Hari Ini?
          </h2>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Hubungi hotline WhatsApp kami di <strong className="text-navy-950">{clinicInfo.emergencyPhone}</strong> untuk respon kilat admin klinik.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Halo%20Klinik%20dr.%20Suhendra,%20saya%20ingin%20cek%20jadwal%20dokter%20hari%20ini.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-xl shadow-md transition-all"
            >
              <PhoneCall className="w-4 h-4 text-white" strokeWidth={2} />
              <span>Konfirmasi via WhatsApp Sekarang</span>
            </a>
          </div>
        </div>
      </section>

      <Footer onOpenBooking={() => setBookingModalOpen(true)} />

      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={bookingInitialData}
      />
    </main>
  );
}
