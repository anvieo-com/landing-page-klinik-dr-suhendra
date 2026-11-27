'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { clinicInfo } from '@/data/clinicData';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Jadwal', href: '/jadwal' },
    { name: 'Kegiatan', href: '/kegiatan' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/60' 
        : 'bg-slate-100 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Branding (No box, no hover state change, tight spacing) */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0">
              <Image
                src="/assets/logo.png"
                alt="Logo Klinik dr. Suhendra"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="font-extrabold text-base sm:text-lg text-navy-950 tracking-tight leading-tight m-0 p-0">
                KLINIK dr. SUHENDRA
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider leading-tight m-0 p-0 -mt-0.5">
                KESEHATAN KELUARGA ANDA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Positioned to the Right, No buttons */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2 ml-auto">
            {navLinks.map((link) => {
              // Menu selain Beranda tetap warna biru aktif, sedangkan Beranda tidak memakai warna blok biru
              const isOtherActive = link.href !== '/' && (pathname === link.href || pathname?.startsWith(link.href));
              const isHome = link.href === '/';

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
                    isOtherActive
                      ? 'text-white bg-navy-900 shadow-sm'
                      : isHome && pathname === '/'
                        ? 'text-navy-950 hover:bg-slate-100'
                        : 'text-slate-700 hover:text-navy-950 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Menu Toggle on the Right */}
          <div className="flex items-center lg:hidden ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-navy-950 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-navy-950" strokeWidth={2} />
              ) : (
                <Menu className="w-6 h-6 text-navy-950" strokeWidth={2} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b border-slate-200/60 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 ${
          isScrolled ? 'bg-white/90 backdrop-blur-xl' : 'bg-slate-100'
        }`}>
          <div className="py-2 space-y-1">
            {navLinks.map((link) => {
              const isOtherActive = link.href !== '/' && (pathname === link.href || pathname?.startsWith(link.href));
              const isHome = link.href === '/';
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                    isOtherActive
                      ? 'bg-navy-900 text-white'
                      : isHome && pathname === '/'
                        ? 'text-navy-950 hover:bg-slate-50'
                        : 'text-slate-700 hover:text-navy-950 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isOtherActive ? 'text-white' : 'text-slate-400'}`} strokeWidth={1.75} />
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Buka 24 Jam Nonstop</span>
            <span className="font-bold text-navy-900">{clinicInfo.emergencyPhone}</span>
          </div>
        </div>
      )}
    </header>
  );
}
