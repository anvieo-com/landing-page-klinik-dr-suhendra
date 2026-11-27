'use client';

import React from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { clinicInfo } from '@/data/clinicData';

export default function FloatingSpeedDial({ onOpenBooking }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      
      {/* WhatsApp Action Button */}
      <a
        href={`https://wa.me/${clinicInfo.whatsapp}?text=Halo%20Klinik%20dr.%20Suhendra,%20saya%20ingin%20berkonsultasi.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 group"
        title="Chat WhatsApp 24 Jam"
      >
        <span className="text-xs font-bold hidden sm:inline-block">
          WhatsApp 24 Jam
        </span>
        <MessageCircle className="w-5 h-5 text-white" strokeWidth={2} />
      </a>

      {/* Booking Quick Action Button */}
      <button
        onClick={onOpenBooking}
        className="flex items-center gap-2 bg-navy-900 hover:bg-navy-950 text-white px-4 py-3 rounded-full shadow-navy hover:shadow-xl active:scale-95 transition-all duration-200 border border-navy-800"
        title="Buat Janji Temu Cepat"
      >
        <Calendar className="w-5 h-5 text-white" strokeWidth={2} />
        <span className="text-xs font-bold">
          Buat Janji
        </span>
      </button>

    </div>
  );
}
