'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Stethoscope, 
  Star, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Award,
  ArrowRight
} from 'lucide-react';
import { featuredDoctors } from '@/data/clinicData';
import { openWhatsAppBooking } from '@/lib/whatsapp';

export default function DoctorsShowcase({ onOpenBookingWithDoctor }) {
  return (
    <section id="dokter" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (matching Template 2: Dokter Spesialis & Umum Berpengalaman) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                Dokter Berpengalaman
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 mt-3 tracking-tight">
              <span className="coretan-oranye text-navy-950">Tim Dokter Berdedikasi</span> & Siap Melayani
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Setiap dokter di Klinik dr. Suhendra memiliki sertifikasi kompetensi resmi, pengalaman klinis luas, dan empati dalam mendengarkan keluhan pasien.
            </p>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 hover:border-navy-900 overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                
                {/* Doctor Visual Area */}
                <div className="relative h-60 w-full bg-gradient-to-b from-slate-100 to-slate-200/80 p-4 flex items-end justify-center overflow-hidden">
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-navy-900 border border-slate-200 flex items-center gap-1 shadow-sm">
                    <MapPin className="w-3 h-3 text-blue-600" strokeWidth={2} />
                    <span>{doc.branch}</span>
                  </div>

                  <div className="absolute top-3 right-3 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full text-xs font-black text-amber-700 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>

                  <div className="relative w-40 h-52">
                    <Image
                      src={doc.photo}
                      alt={doc.name}
                      fill
                      className="object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Doctor Bio Details */}
                <div className="p-5">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md mb-2">
                    {doc.specialty}
                  </span>

                  <h3 className="text-base font-extrabold text-navy-950 group-hover:text-navy-900 transition-colors">
                    {doc.name}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {doc.title}
                  </p>

                  <p className="text-xs italic text-slate-600 mt-3 pt-3 border-t border-slate-100 line-clamp-2">
                    "{doc.quote}"
                  </p>
                </div>

              </div>

              {/* Card Footer CTA */}
              <div className="px-5 pb-5 pt-1">
                <button
                  onClick={() => {
                    if (onOpenBookingWithDoctor) {
                      onOpenBookingWithDoctor(doc);
                    } else {
                      openWhatsAppBooking({ doctor: doc });
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-navy-950 hover:text-white bg-slate-100 hover:bg-navy-900 border border-slate-200 hover:border-navy-900 rounded-xl transition-all duration-200"
                >
                  <Calendar className="w-4 h-4" strokeWidth={1.75} />
                  <span>Jadwalkan Konsultasi via WhatsApp</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
