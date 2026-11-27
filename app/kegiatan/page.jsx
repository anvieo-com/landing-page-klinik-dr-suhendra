'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
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

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Page Header - Portal Berita Style */}
      <section className="bg-white border-b border-slate-100 py-12 lg:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Model Garis di Kiri (Tanpa Badge) */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                PORTAL WARTA & AKSI SOSIAL RESMI
              </span>
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

      {/* Portal Top Bar: Filter Kategori & Pencarian Berita */}
      <section className="py-4 bg-slate-50 border-b border-slate-200">
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
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 flex items-center gap-1.5 ${
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Main News Portal Body (Two Columns: Feed + Sticky Sidebar) */}
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
                onClick={() => setSelectedActivity(featuredArticle)}
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
                      onClick={() => setSelectedActivity(act)}
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
                        onClick={() => setSelectedActivity(news)}
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

      {/* Modal Detail Berita Lengkap */}
      {selectedActivity && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedActivity(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="relative h-64 sm:h-72 w-full bg-navy-950 overflow-hidden flex-shrink-0">
              <Image
                src={selectedActivity.img}
                alt={selectedActivity.title}
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>

              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-blue-600 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
                  {selectedActivity.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  {selectedActivity.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-navy-900" strokeWidth={1.75} />
                    <span className="font-semibold text-navy-900">{selectedActivity.date}</span>
                  </div>
                  <span>•</span>
                  <span>Humas & CSR Klinik dr. Suhendra</span>
                </div>

                <button
                  onClick={() => handleShare(selectedActivity)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Tautan Disalin!' : 'Bagikan Berita'}</span>
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line pt-1">
                {selectedActivity.content}
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Warta Resmi • Klinik dr. Suhendra
              </span>
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-navy-900 rounded-xl hover:bg-navy-950 transition-colors"
              >
                Tutup Berita
              </button>
            </div>
          </div>
        </div>
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
