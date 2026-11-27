'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderTopBar from '@/components/HeaderTopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/AppointmentModal';
import { 
  Calendar, 
  Clock, 
  Search, 
  ArrowRight, 
  X, 
  HeartHandshake,
  User,
  Share2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Newspaper,
  Tag,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { activities, activityCategories } from '@/data/activitiesData';

export default function KegiatanPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const listTopRef = useRef(null);

  // Filter activities based on category and search
  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Featured Headline (First newest item when no filter/search active)
  const isDefaultView = selectedCategory === 'Semua' && searchTerm.trim() === '';
  const featuredArticle = isDefaultView ? activities[0] : null;

  // The feed articles: if default view on page 1, we can exclude the featured article from the paginated feed
  const feedPool = useMemo(() => {
    if (isDefaultView) {
      return activities.slice(1);
    }
    return filteredActivities;
  }, [isDefaultView, filteredActivities]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(feedPool.length / itemsPerPage));
  const currentFeed = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return feedPool.slice(start, start + itemsPerPage);
  }, [feedPool, currentPage, itemsPerPage]);

  // Latest news for Sticky Sidebar (top 5 most recent)
  const latestSidebarNews = useMemo(() => {
    return activities.slice(0, 5);
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { Semua: activities.length };
    activities.forEach((act) => {
      counts[act.category] = (counts[act.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Sinkronisasi URL jika ada query ?baca=[id] atau tombol back browser
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const bacaId = params.get('baca') || params.get('id');
    if (bacaId) {
      const found = activities.find((a) => a.id === bacaId);
      if (found) {
        setSelectedActivity(found);
      }
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const currentId = currentParams.get('baca') || currentParams.get('id');
      if (currentId) {
        const f = activities.find((a) => a.id === currentId);
        setSelectedActivity(f || null);
      } else {
        setSelectedActivity(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenDetail = (act) => {
    setSelectedActivity(act);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('baca', act.id);
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToList = () => {
    setSelectedActivity(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('baca');
      url.searchParams.delete('id');
      window.history.pushState({}, '', url.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (selectedActivity) {
      handleBackToList();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    if (selectedActivity) {
      setSelectedActivity(null);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (listTopRef.current) {
        listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleShare = (activity) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const url = `${window.location.origin}/kegiatan?baca=${activity.id}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = (activity) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/kegiatan?baca=${activity.id}`;
      const text = `Baca warta resmi: "${activity.title}" di Klinik dr. Suhendra:\n${url}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Page Header - Portal Berita Style - Align Center & Background Slate-100 (Grey) */}
      <section className="bg-slate-100 border-b border-slate-200/80 py-20 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Model Garis Center */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                PORTAL WARTA & AKSI SOSIAL RESMI
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              Warta & <span className="coretan-oranye text-navy-950">Kegiatan Medis</span> Terkini
            </h1>
            
            <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              Pusat informasi publik, agenda bakti sosial, edukasi kesehatan keluarga, serta dokumentasi pengabdian Klinik dr. Suhendra untuk masyarakat Bogor.
            </p>
          </div>
        </div>
      </section>

      {/* Portal Top Bar: Filter Kategori & Pencarian Berita — Sticky di bawah Menu Nav Top */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-3 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Nav Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto no-scrollbar">
              {activityCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-navy-900 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={1.75} />
              <input
                type="text"
                placeholder="Cari topik atau kata kunci berita..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition-all placeholder:text-slate-400"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-900 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Tampilan Kondisional: Halaman Detail Berita vs Feed Berita Portal */}
      {selectedActivity ? (
        /* ========================================================
           HALAMAN DETAIL KONTEN BERITA LENGKAP
           ======================================================== */
        <article className="py-10 sm:py-14 lg:py-18 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Tombol Kembali & Breadcrumb Navigasi */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-navy-950 bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-200 transition-all group cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Kembali ke Semua Kegiatan</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <Link href="/" className="hover:text-navy-950 transition-colors">Beranda</Link>
                <span>/</span>
                <button onClick={handleBackToList} className="hover:text-navy-950 transition-colors cursor-pointer">
                  Kegiatan
                </button>
                <span>/</span>
                <span className="text-blue-600 font-bold truncate max-w-[200px]">{selectedActivity.category}</span>
              </div>
            </div>

            {/* Header Artikel */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 bg-navy-900 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-2xs">
                  {selectedActivity.category}
                </span>
                <span className="text-xs font-semibold text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-navy-900" />
                  {selectedActivity.date}
                </span>
                <span className="text-xs font-semibold text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-navy-900" />
                  3 Menit Baca
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-black text-navy-950 tracking-tight leading-[1.22]">
                {selectedActivity.title}
              </h1>

              {/* Author & Share Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    KS
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-950">Tim Humas & CSR</p>
                    <p className="text-[11px] text-slate-500">Klinik dr. Suhendra Bogor</p>
                  </div>
                </div>

                {/* Share Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShareWhatsApp(selectedActivity)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <span>Bagikan ke WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleShare(selectedActivity)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-navy-900 bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-200 rounded-xl transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Tautan Disalin!' : 'Salin Tautan'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image Besar */}
            <div className="relative w-full h-72 sm:h-96 lg:h-[480px] rounded-3xl overflow-hidden border border-slate-200 shadow-md mb-10">
              <Image
                src={selectedActivity.img}
                alt={selectedActivity.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Konten Artikel Lengkap */}
            <div className="text-slate-700 text-base sm:text-lg leading-relaxed space-y-6">
              {selectedActivity.content
                .trim()
                .split('\n\n')
                .map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed font-normal">
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Kotak Kutipan / Highlight Box */}
            <div className="my-10 p-6 sm:p-8 rounded-2xl bg-blue-50/70 border-l-4 border-blue-600 text-slate-800 shadow-2xs">
              <p className="italic text-base sm:text-lg font-medium leading-relaxed">
                "Komitmen Klinik dr. Suhendra adalah selalu hadir mendampingi masyarakat Bogor Barat, tidak hanya saat warga sakit, tetapi aktif terjun ke lapangan untuk edukasi preventif dan pelayanan baksos sejak dini."
              </p>
              <span className="block mt-3 text-xs font-extrabold text-navy-950 uppercase tracking-wider">
                — Manajemen & Tim Medis Klinik dr. Suhendra
              </span>
            </div>

            {/* Kotak Ajukan Baksos / Kemitraan */}
            <div className="my-10 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-black text-navy-950">
                  Ingin Mengadakan Program Baksos di Tempat Anda?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Kami terbuka untuk kolaborasi pemeriksaan gratis, khitanan, dan sosialisasi kesehatan dengan sekolah, instansi, atau komunitas.
                </p>
              </div>
              <a
                href="mailto:Hai@klinikdrsuhendra.id"
                className="flex-shrink-0 px-5 py-3 rounded-xl bg-navy-900 hover:bg-navy-950 active:scale-95 text-white text-xs font-bold shadow-sm transition-all"
              >
                Ajukan Kemitraan CSR
              </a>
            </div>

            {/* Tombol Navigasi Bawah */}
            <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-navy-950 bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-200 transition-all group cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Kembali ke Semua Kegiatan</span>
              </button>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-navy-900 hover:bg-navy-950 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Jadwalkan Konsultasi Dokter</span>
              </button>
            </div>

            {/* Berita & Kegiatan Lainnya */}
            <div className="pt-14 mt-14 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-6 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
                <h3 className="text-lg sm:text-xl font-black text-navy-950">
                  Warta & Kegiatan Lainnya
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activities
                  .filter((a) => a.id !== selectedActivity.id)
                  .slice(0, 3)
                  .map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => handleOpenDetail(rel)}
                      className="group cursor-pointer bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 flex flex-col shadow-2xs hover:shadow-card"
                    >
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src={rel.img}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-0.5 bg-navy-900/90 text-white text-[10px] font-black rounded-md shadow-xs">
                            {rel.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-navy-950 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug mb-2">
                          {rel.title}
                        </h4>
                        <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 mt-auto pt-2">
                          <span>Baca Berita</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        </article>
      ) : (
        /* Main News Portal Body (Two Columns: Feed + Sticky Sidebar) */
        <section className="py-12 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Headline Berita Utama (Featured Hero News) */}
          {featuredArticle && currentPage === 1 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-navy-900">
                  HEADLINE BERITA UTAMA
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 ml-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Terbaru
                </span>
              </div>

              <div 
                onClick={() => handleOpenDetail(featuredArticle)}
                className="group cursor-pointer bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-card grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Visual Image */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 w-full overflow-hidden">
                  <Image
                    src={featuredArticle.img}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-navy-900 text-white text-xs font-extrabold rounded-full shadow-md">
                      {featuredArticle.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        {featuredArticle.date}
                      </span>
                      <span>•</span>
                      <span>Humas Klinik dr. Suhendra</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2">
                      <Newspaper className="w-4 h-4" />
                      <span>Liputan Khusus & Dokumentasi</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-navy-950 group-hover:text-blue-700 transition-colors leading-snug tracking-tight mb-3">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-4">
                      {featuredArticle.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center justify-between">
                    <span className="text-xs font-bold text-navy-900 group-hover:text-blue-600 flex items-center gap-1.5">
                      <span>Baca Berita Selengkapnya</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">3 menit baca</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Anchor for pagination scrolling */}
          <div ref={listTopRef} id="portal-feed-top" />

          {/* Grid Layout: Main Feed (Col 8) + Sticky Sidebar (Col 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: News Catalog Feed */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Feed Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
                  <h2 className="text-base sm:text-lg font-black text-navy-950 uppercase tracking-tight">
                    {selectedCategory === 'Semua' ? 'Katalog Berita & Kegiatan' : `Kategori: ${selectedCategory}`}
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {feedPool.length} Berita Ditemukan
                </span>
              </div>

              {/* Feed Items */}
              {currentFeed.length === 0 ? (
                <div className="bg-slate-50 rounded-2xl p-12 text-center text-slate-500 text-sm border border-slate-200">
                  <Newspaper className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="font-bold text-navy-950">Tidak ada berita yang sesuai</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Coba ganti kata kunci pencarian atau pilih kategori lain.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {currentFeed.map((act) => (
                    <article
                      key={act.id}
                      onClick={() => handleOpenDetail(act)}
                      className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-navy-900 p-4 sm:p-5 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-44 sm:h-36 w-full sm:w-52 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <Image
                          src={act.img}
                          alt={act.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2 py-0.5 bg-navy-900/90 backdrop-blur-xs text-white text-[10px] font-extrabold rounded-md shadow-xs">
                            {act.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                            <span className="flex items-center gap-1 font-medium text-slate-500">
                              <Calendar className="w-3.5 h-3.5 text-navy-900" />
                              {act.date}
                            </span>
                            <span>•</span>
                            <span className="text-[11px] text-slate-500">Humas Klinik</span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug mb-2">
                            {act.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                            {act.desc}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="font-bold text-navy-900 group-hover:text-blue-600 flex items-center gap-1">
                            <span>Baca Lengkap</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <span className="text-[11px] text-slate-400">Liputan Resmi</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Navigasi Halaman (Pagination Controls) */}
              {totalPages > 1 && (
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Menampilkan <span className="font-bold text-navy-950">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-bold text-navy-950">{Math.min(currentPage * itemsPerPage, feedPool.length)}</span> dari <span className="font-bold text-navy-950">{feedPool.length}</span> berita
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentPage === 1
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          : 'bg-white text-navy-900 hover:bg-slate-100 border border-slate-200 active:scale-95'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Sebelumnya</span>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-navy-900 text-white shadow-sm'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currentPage === totalPages
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          : 'bg-white text-navy-900 hover:bg-slate-100 border border-slate-200 active:scale-95'
                      }`}
                    >
                      <span>Selanjutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Menu Samping Berita Terkini & Sticky */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                
                {/* Widget 1: Berita Terkini (Sticky News Menu) */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-soft">
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200">
                    <span className="w-6 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
                    <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-navy-950">
                      Berita Terkini
                    </h3>
                    <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Terbaru
                    </span>
                  </div>

                  <div className="space-y-4">
                    {latestSidebarNews.map((news, idx) => (
                      <div
                        key={news.id}
                        onClick={() => handleOpenDetail(news)}
                        className="group cursor-pointer flex items-start gap-3 pb-3 border-b border-slate-200/70 last:border-0 last:pb-0 transition-colors"
                      >
                        {/* Number Index */}
                        <span className="text-sm font-black text-slate-300 group-hover:text-blue-600 transition-colors w-4 flex-shrink-0 pt-0.5">
                          0{idx + 1}
                        </span>

                        {/* Image Thumbnail */}
                        <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-200">
                          <Image
                            src={news.img}
                            alt={news.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                            {news.category}
                          </span>
                          <h4 className="text-xs font-bold text-navy-950 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {news.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {news.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Widget 2: Kategori & Topik Berita */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200">
                    <span className="w-6 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
                    <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-navy-950">
                      Topik & Kategori
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activityCategories.filter(c => c !== 'Semua').map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                          selectedCategory === cat
                            ? 'bg-navy-900 text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Tag className="w-3 h-3 opacity-60" />
                        <span>{cat}</span>
                        <span className="text-[10px] opacity-70">({categoryCounts[cat] || 0})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Widget 3: Kolaborasi & CSR Callout */}
                <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-2xl p-5 text-white shadow-soft">
                  <div className="flex items-center gap-2 mb-2 text-blue-300 text-xs font-bold">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Layanan Kemitraan & CSR</span>
                  </div>
                  <h4 className="text-sm font-bold leading-snug mb-2">
                    Ingin Mengadakan Baksos Bersama Kami?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Klinik dr. Suhendra siap bermitra dengan sekolah, instansi, atau komunitas dalam penyelenggaraan aksi sosial kesehatan.
                  </p>
                  <a
                    href="mailto:Hai@klinikdrsuhendra.id"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-navy-950 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-navy-900" />
                    <span>Ajukan Kolaborasi Sekarang</span>
                  </a>
                </div>

              </div>
            </aside>

          </div>

        </div>
      </section>
      )}

      {/* CSR / Kerjasama Callout - Warna Kontras di Atas Footer */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
            Ingin Mengadakan Program <span className="coretan-oranye text-navy-950">Bakti Sosial</span> atau Edukasi Kesehatan?
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Klinik dr. Suhendra terbuka untuk berkolaborasi dengan sekolah, instansi, atau komunitas dalam penyelenggaraan program sosial kesehatan.
          </p>
          <div className="pt-2">
            <a
              href="mailto:Hai@klinikdrsuhendra.id"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-navy-900 hover:bg-navy-950 rounded-xl shadow-md transition-all"
            >
              <span>Hubungi Tim Kemitraan & CSR Kami</span>
            </a>
          </div>
        </div>
      </section>

      <Footer onOpenBooking={() => setBookingModalOpen(true)} />

      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </main>
  );
}
