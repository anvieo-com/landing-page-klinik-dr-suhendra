'use client';

import React from 'react';
import { PhoneCall, MessageCircle, Clock, ShieldCheck, Ambulance } from 'lucide-react';
import { clinicInfo } from '@/data/clinicData';

export default function EmergencyBanner({ onOpenBooking }) {
  return (
    <section id="emergency" className="bg-slate-50 py-14 lg:py-18 relative overflow-hidden border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 rounded-3xl border border-navy-800 p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-2xl pointer-events-none" />

          {/* Left Text */}
          <div className="max-w-xl space-y-4 text-center lg:text-left relative z-10">
            {/* Header Model Garis di Samping (Tanpa Badge) */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-8 sm:w-10 h-[2.5px] bg-red-500 rounded-full inline-block flex-shrink-0"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-400">
                Layanan Gawat Darurat & IGD 24 Jam Nonstop
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Butuh Bantuan Medis Segera?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tim dokter jaga dan perawat kami selalu siap siaga 24 jam sehari, 7 hari seminggu. 
              Jangan tunda kondisi gawat darurat, segera hubungi kontak ambulans atau IGD kami.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 pt-2 font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" strokeWidth={1.75} />
                <span>Siaga 24 Jam</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" strokeWidth={1.75} />
                <span>Tenaga Medis Berpengalaman</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Ambulance className="w-4 h-4 text-blue-400" strokeWidth={1.75} />
                <span>Unit Ambulans Cepat</span>
              </div>
            </div>
          </div>

          {/* Right Action Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-navy-950 text-center lg:text-left w-full lg:w-auto flex-shrink-0 shadow-lg border border-slate-200 space-y-4 relative z-10">
            <div>
              <p className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                Hubungi Hotline Darurat
              </p>
              <a
                href={`tel:${clinicInfo.emergencyPhone}`}
                className="text-2xl sm:text-3xl font-black text-navy-950 hover:text-blue-600 transition-colors tracking-tight block mt-1"
              >
                {clinicInfo.emergencyPhone}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`tel:${clinicInfo.emergencyPhone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-xl transition-all shadow-sm active:scale-95"
              >
                <PhoneCall className="w-4 h-4" strokeWidth={1.75} />
                <span>Telepon IGD Sekarang</span>
              </a>

              <a
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Halo%20IGD%20Klinik%20dr.%20Suhendra,%20saya%20membutuhkan%20bantuan%20darurat.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-navy-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
                <span>Chat WhatsApp</span>
              </a>
            </div>

            <div className="text-center pt-1">
              <a
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Halo%20Klinik%20dr.%20Suhendra,%20saya%20ingin%20membuat%20janji%20temu/konsultasi.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-600 hover:underline inline-block"
              >
                Atau Buat Janji Temu Terlebih Dahulu via WhatsApp →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
