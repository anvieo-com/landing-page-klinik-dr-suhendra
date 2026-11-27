'use client';

import React from 'react';
import Image from 'next/image';
import { X, Check, Calendar, Clock, Stethoscope, ArrowRight } from 'lucide-react';

export default function ServiceDetailModal({ service, onClose, onBookFromService }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="relative h-48 w-full bg-navy-950 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-blue-600 px-2.5 py-0.5 rounded-md inline-block mb-1">
              {service.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-extrabold uppercase text-navy-900 tracking-wider mb-1.5">
              Deskripsi Layanan
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase text-navy-900 tracking-wider mb-2">
              Fasilitas & Tindakan yang Dicakup:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between text-xs text-blue-950">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-700" strokeWidth={2} />
              <span><strong>Jadwal:</strong> {service.schedule}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-navy-950"
          >
            Tutup
          </button>

          <button
            onClick={() => {
              onClose();
              if (onBookFromService) onBookFromService(service);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-xl shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4" strokeWidth={2} />
            <span>Daftar Layanan Ini</span>
          </button>
        </div>

      </div>
    </div>
  );
}
