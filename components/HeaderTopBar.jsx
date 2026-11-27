'use client';

import React from 'react';
import { Clock, Phone, MapPin, Mail, MessageCircle } from 'lucide-react';
import { clinicInfo } from '@/data/clinicData';

export default function HeaderTopBar() {
  return (
    <div className="bg-navy-950 text-slate-200 text-xs py-2 border-b border-navy-900/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Sisi Kiri: Jam Operasional & Hotline IGD (sejajar garis template) */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-1 text-slate-300">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" strokeWidth={1.75} />
            <span>24 Jam Nonstop Setiap Hari</span>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" strokeWidth={1.75} />
            <span>Hotline IGD: <strong className="text-white font-medium">{clinicInfo.emergencyPhone}</strong></span>
          </div>
        </div>

        {/* Sisi Kanan: Email (sejajar garis menu kanan template) */}
        <div className="flex items-center gap-2">
          <a 
            href={`mailto:${clinicInfo.email}`}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" strokeWidth={1.75} />
            <span>{clinicInfo.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
