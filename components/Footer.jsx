'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUp,
  MessageCircle
} from 'lucide-react';
import { clinicInfo, branches } from '@/data/clinicData';

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Jadwal', href: '/jadwal' },
    { name: 'Kegiatan', href: '/kegiatan' },
  ];

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-navy-900">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-xl p-1 shadow-sm flex items-center justify-center flex-shrink-0">
                <Image
                  src="/assets/logo.png"
                  alt="Logo Klinik dr. Suhendra"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight block leading-tight">
                  KLINIK dr. SUHENDRA
                </span>
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                  Kesehatan Keluarga Anda
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-4">
              Pusat layanan kesehatan keluarga terpadu di wilayah Bogor dan sekitarnya. 
              Melayani rawat jalan, rawat inap, IGD 24 jam, kebidanan & KIA, laboratorium, dan apotek berstandar mutu.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" strokeWidth={1.75} />
                <span>Pelayanan 24 Jam Nonstop Setiap Hari</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" strokeWidth={1.75} />
                <span>Hotline: <strong className="text-white">{clinicInfo.emergencyPhone}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" strokeWidth={1.75} />
                <span>{clinicInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigasi Menu Utama (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Menu Utama
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-blue-500 font-bold">›</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Jaringan 6 Cabang (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Cabang Klinik di Bogor
            </h4>
            <div className="space-y-2.5 text-xs">
              {branches.slice(0, 4).map((b) => (
                <div key={b.id} className="border-b border-navy-900 pb-2">
                  <span className="font-bold text-white block">{b.name}</span>
                  <span className="text-slate-400 text-[11px] block">{b.address}</span>
                </div>
              ))}
              <Link href="/jadwal" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-white font-bold pt-1">
                <span>Lihat semua 6 cabang & jadwal dokter →</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Footer Info & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} <strong>Klinik dr. Suhendra</strong>. Seluruh Hak Cipta Dilindungi.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Halo%20Klinik%20dr.%20Suhendra,%20saya%20ingin%20mendaftar%20antrean%20online.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-400 hover:text-white transition-colors"
            >
              Pendaftaran Online via WhatsApp
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
