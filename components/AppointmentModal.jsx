'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { branches, clinicInfo } from '@/data/clinicData';

export default function AppointmentModal({ isOpen, onClose, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: branches[0].name,
    service: 'Poli Umum & Rawat Jalan',
    doctor: '',
    date: new Date().toISOString().split('T')[0],
    timeSession: 'Pagi (08.00 - 12.00)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        branch: initialData.branch || prev.branch,
        service: initialData.service || prev.service,
        doctor: initialData.doctor || prev.doctor,
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const message = `Halo Klinik dr. Suhendra, saya ingin reservasi pendaftaran online:\n\n` +
      `• *Nama Pasien:* ${formData.name}\n` +
      `• *No. WhatsApp:* ${formData.phone}\n` +
      `• *Cabang:* ${formData.branch}\n` +
      `• *Layanan/Poli:* ${formData.service}\n` +
      (formData.doctor ? `• *Dokter:* ${formData.doctor}\n` : '') +
      `• *Tanggal:* ${formData.date}\n` +
      `• *Sesi:* ${formData.timeSession}\n` +
      (formData.notes ? `• *Keluhan:* ${formData.notes}\n\n` : '\n') +
      `Mohon informasikan ketersediaan jadwal dan nomor antrean. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${clinicInfo.whatsapp}?text=${encoded}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Modal */}
        <div className="bg-navy-950 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-blue-400">
              <Calendar className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Buat Janji Temu Online
              </h3>
              <p className="text-xs text-slate-300">
                Klinik dr. Suhendra • Pelayanan Cepat & Tanpa Antre
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-navy-900 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
              </div>
              <h4 className="text-xl font-black text-navy-950">
                Pendaftaran Berhasil Dikirim!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Terima kasih <strong>{formData.name}</strong>. Anda akan segera dialihkan ke chat WhatsApp resmi admin kami untuk konfirmasi nomor antrean.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 text-xs font-bold text-white bg-navy-900 rounded-xl hover:bg-navy-950 transition-colors"
              >
                Tutup Jendela
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-navy-950 mb-1">
                  Nama Lengkap Pasien *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Siti Rahma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-950 mb-1">
                  Nomor WhatsApp Aktif *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 08123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy-950 mb-1">
                    Pilih Cabang *
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-950 mb-1">
                    Layanan / Poli *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all"
                  >
                    <option value="Poli Umum & Rawat Jalan">Poli Umum & Rawat Jalan</option>
                    <option value="IGD & Gawat Darurat 24 Jam">IGD & Gawat Darurat 24 Jam</option>
                    <option value="Rawat Inap Observasi">Rawat Inap Observasi</option>
                    <option value="Laboratorium & Cek Darah">Laboratorium & Cek Darah</option>
                    <option value="Kesehatan Ibu, Anak & USG">Kesehatan Ibu, Anak & USG</option>
                    <option value="Poli Gigi & Mulut">Poli Gigi & Mulut</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy-950 mb-1">
                    Rencana Tanggal *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-950 mb-1">
                    Sesi Waktu *
                  </label>
                  <select
                    value={formData.timeSession}
                    onChange={(e) => setFormData({ ...formData, timeSession: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all"
                  >
                    <option value="Pagi (08.00 - 12.00)">Pagi (08.00 - 12.00)</option>
                    <option value="Siang (12.00 - 16.00)">Siang (12.00 - 16.00)</option>
                    <option value="Sore / Malam (16.00 - 21.00)">Sore / Malam (16.00 - 21.00)</option>
                    <option value="Malam / 24 Jam (21.00 - 08.00)">Malam / 24 Jam (21.00 - 08.00)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-950 mb-1">
                  Keluhan / Catatan Medis (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Keluhan singkat atau dokter spesifik yang diinginkan"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-900 outline-none transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-navy-900 hover:bg-navy-950 active:scale-95 rounded-xl transition-all shadow-md"
                >
                  <span>Kirim Data & Dapatkan Antrean</span>
                  <ArrowRight className="w-4 h-4 text-white" strokeWidth={2} />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
