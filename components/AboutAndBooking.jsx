'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Building2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Bed, 
  HeartPulse, 
  User, 
  Phone, 
  MapPin, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { branches, clinicInfo } from '@/data/clinicData';

export default function AboutAndBooking({ onBookingSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: branches[0].name,
    service: 'Poli Umum & Rawat Jalan',
    date: new Date().toISOString().split('T')[0],
    timeSession: 'Pagi (08.00 - 12.00)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Build WhatsApp message
    const message = `Halo Klinik dr. Suhendra, saya ingin membuat janji temu/pendaftaran online:\n\n` +
      `• *Nama Pasien:* ${formData.name}\n` +
      `• *No. WhatsApp:* ${formData.phone}\n` +
      `• *Cabang:* ${formData.branch}\n` +
      `• *Poli/Layanan:* ${formData.service}\n` +
      `• *Tanggal:* ${formData.date}\n` +
      `• *Sesi Waktu:* ${formData.timeSession}\n` +
      (formData.notes ? `• *Keluhan:* ${formData.notes}\n\n` : '\n') +
      `Mohon konfirmasi ketersediaan nomor antrean. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${clinicInfo.whatsapp}?text=${encoded}`;
    
    setSubmitted(true);
    if (onBookingSuccess) onBookingSuccess(formData);

    // Open WhatsApp after a short delay
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <section id="tentang" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: About Clinic */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-navy-900 text-xs font-bold tracking-wide">
              <Building2 className="w-4 h-4 text-navy-900" strokeWidth={1.75} />
              <span>Tentang Klinik Kami</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight leading-tight">
              Klinik dr. Suhendra: Mitra Terpercaya Menuju Keluarga Sehat & Berkualitas
            </h2>

            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Berawal dari komitmen tulus mendampingi kesehatan warga di wilayah Bogor Barat, 
              Klinik dr. Suhendra kini telah berkembang dengan <strong>6 cabang aktif</strong> yang siap melayani 
              masyarakat dengan standar pelayanan medis yang profesional, fasilitas higienis, dan biaya yang transparan.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Kami memadukan pendekatan medis modern dengan kehangatan komunikasi dokter-pasien. 
              Setiap pasien tidak hanya ditangani penyakitnya, namun juga diedukasi mengenai tindakan 
              pencegahan agar tetap bugar dalam menjalani aktivitas harian.
            </p>

            {/* 4 Feature Key Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-navy-900">
                  <Clock className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Pelayanan 24 Jam Nonstop</h4>
                  <p className="text-xs text-slate-500 mt-0.5">IGD & rawat inap siaga setiap waktu termasuk hari libur.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-navy-900">
                  <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Terdaftar & Terakreditasi</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Menerima BPJS Kesehatan & penjamin asuransi swasta.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-navy-900">
                  <Bed className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Fasilitas Rawat Inap Nyaman</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Kamar bersih berstandar medis dengan pengawasan dokter visit.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-navy-900">
                  <HeartPulse className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">Biaya Bersahabat & Transparan</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Pemberian obat rasional dan tarif tindakan yang jujur.</p>
                </div>
              </div>
            </div>

            {/* Building Photo Banner */}
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-soft mt-4">
              <Image
                src="/assets/gambar1.jpg"
                alt="Gedung Klinik dr. Suhendra"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-xs font-bold uppercase tracking-wider bg-blue-600/80 px-2.5 py-1 rounded-md text-white inline-block mb-1">
                    Gedung & Pelayanan Terpadu
                  </span>
                  <h4 className="font-extrabold text-base sm:text-lg">Klinik dr. Suhendra Bojong Jengkol</h4>
                  <p className="text-xs text-slate-200">Melayani poli umum, rawat inap, laboratorium darah, dan apotek 24 jam.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Appointment Form (CareWell + Anaverse style) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-navy-900 shadow-card transition-all duration-300">
              
              <div className="border-b border-slate-100 pb-5 mb-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase text-navy-900 tracking-wider mb-1">
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  <span>Pendaftaran Online</span>
                </div>
                <h3 className="text-2xl font-black text-navy-950 tracking-tight">
                  Buat Janji Temu Dokter
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Isi data di bawah untuk reservasi nomor antrean tanpa perlu antre lama di klinik.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">Permintaan Janji Temu Terkirim!</h4>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    Data pendaftaran atas nama <strong>{formData.name}</strong> di cabang <strong>{formData.branch}</strong> sedang diteruskan ke admin WhatsApp kami.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-emerald-700 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    Daftar Kembali
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Nama Pasien */}
                  <div>
                    <label className="block text-xs font-bold text-navy-950 mb-1.5">
                      Nama Lengkap Pasien *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Budi Santoso"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Nomor WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-navy-950 mb-1.5">
                      Nomor WhatsApp / HP Aktif *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Cabang Klinik */}
                  <div>
                    <label className="block text-xs font-bold text-navy-950 mb-1.5">
                      Pilih Cabang Klinik *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition-all"
                      >
                        {branches.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Poli / Layanan */}
                  <div>
                    <label className="block text-xs font-bold text-navy-950 mb-1.5">
                      Poli / Jenis Layanan *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Stethoscope className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition-all"
                      >
                        <option value="Poli Umum & Rawat Jalan">Poli Umum & Rawat Jalan</option>
                        <option value="IGD & Gawat Darurat 24 Jam">IGD & Gawat Darurat 24 Jam</option>
                        <option value="Rawat Inap Observasi">Rawat Inap Observasi</option>
                        <option value="Laboratorium & Cek Darah">Laboratorium & Cek Darah</option>
                        <option value="Kesehatan Ibu, Anak & USG">Kesehatan Ibu, Anak & USG</option>
                        <option value="Poli Gigi & Mulut">Poli Gigi & Mulut</option>
                        <option value="Apotek & Konsultasi Obat">Apotek & Konsultasi Obat</option>
                      </select>
                    </div>
                  </div>

                  {/* Tanggal & Sesi Waktu */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy-950 mb-1.5">
                        Rencana Tanggal *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy-950 mb-1.5">
                        Sesi Waktu *
                      </label>
                      <select
                        value={formData.timeSession}
                        onChange={(e) => setFormData({ ...formData, timeSession: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all"
                      >
                        <option value="Pagi (08.00 - 12.00)">Pagi (08.00 - 12.00)</option>
                        <option value="Siang (12.00 - 16.00)">Siang (12.00 - 16.00)</option>
                        <option value="Sore / Malam (16.00 - 21.00)">Sore / Malam (16.00 - 21.00)</option>
                        <option value="Malam / 24 Jam (21.00 - 08.00)">Malam / 24 Jam (21.00 - 08.00)</option>
                      </select>
                    </div>
                  </div>

                  {/* Keluhan / Catatan */}
                  <div>
                    <label className="block text-xs font-bold text-navy-950 mb-1.5">
                      Keluhan Singkat (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Demam 2 hari, batuk pilek, cek tensi"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-navy-900 hover:bg-navy-950 active:scale-95 rounded-xl shadow-navy transition-all duration-200"
                  >
                    <span>Konfirmasi & Daftar Janji Temu</span>
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2} />
                  </button>

                  <p className="text-[11px] text-center text-slate-500 pt-1">
                    Petugas kami akan mengirimkan nomor antrean via WhatsApp dalam hitungan menit.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
