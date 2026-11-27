'use client';

import React, { useState } from 'react';
import HeaderTopBar from '@/components/HeaderTopBar';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSectionHome from '@/components/AboutSectionHome';
import QuickStatsDarkBanner from '@/components/QuickStatsDarkBanner';
import ServicesSection from '@/components/ServicesSection';
import QuickStatsHeroBar from '@/components/QuickStatsHeroBar';
import DoctorScheduleSection from '@/components/DoctorScheduleSection';
import VideoSpotlight from '@/components/VideoSpotlight';
import TestimonialsSection from '@/components/TestimonialsSection';
import HealthArticlesSection from '@/components/HealthArticlesSection';
import EmergencyBanner from '@/components/EmergencyBanner';
import BranchMarquee from '@/components/BranchMarquee';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/AppointmentModal';
import ServiceDetailModal from '@/components/ServiceDetailModal';
import ArticleReaderModal from '@/components/ArticleReaderModal';

export default function HomePage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleOpenBooking = (initialData = null) => {
    setBookingInitialData(initialData);
    setBookingModalOpen(true);
  };

  const handleSelectDoctor = (doctor, branch) => {
    setBookingInitialData({
      doctor: doctor.name,
      service: doctor.poli,
      branch: branch ? branch.name : undefined,
    });
    setBookingModalOpen(true);
  };

  const handleBookFromService = (service) => {
    setBookingInitialData({
      service: service.title,
    });
    setBookingModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Announcement & Emergency Top Bar */}
      <HeaderTopBar />

      {/* 2. Main Sticky Navigation (Beranda, Tentang, Layanan, Jadwal, Kegiatan) */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* 3. Hero Section (Fit Height & Doctor Anchored directly to Bottom with No Box & No Bottom Border) */}
      <HeroSection onOpenBooking={() => handleOpenBooking()} />

      {/* 4. Quick Stats White Pill Bar (25.000+ Pasien, 20+ Dokter, 6 Cabang, 99% Kepuasan) */}
      <QuickStatsHeroBar />

      {/* 5. Section Tentang Kami (Gambar di Kiri, Keterangan di Kanan) */}
      <AboutSectionHome onOpenBooking={() => handleOpenBooking()} />

      {/* 6. Section Layanan Medis Kami (Flat Icon Saja) */}
      <ServicesSection onSelectService={(service) => setSelectedService(service)} />

      {/* Signature Dark Navy Stats Banner — dipindah setelah Services */}
      <QuickStatsDarkBanner />

      {/* 7. Interactive Doctor Schedule with Branch & Poli Switchers */}
      <DoctorScheduleSection onSelectDoctor={handleSelectDoctor} />

      {/* 8. Video Spotlight / Aksi Nyata & Dokumentasi Pelayanan Asli */}
      <VideoSpotlight />

      {/* 10. Patient Testimonials */}
      <TestimonialsSection />

      {/* 11. Health & Medical Articles */}
      <HealthArticlesSection onReadArticle={(article) => setSelectedArticle(article)} />

      {/* 12. Emergency 24/7 Action Banner (Clean white background) */}
      <EmergencyBanner onOpenBooking={() => handleOpenBooking()} />

      {/* 14. Branch Marquee Slider showing all clinic branch locations */}
      <BranchMarquee />

      {/* 15. Comprehensive Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 16. Modals */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialData={bookingInitialData}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookFromService={handleBookFromService}
      />

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </main>
  );
}
