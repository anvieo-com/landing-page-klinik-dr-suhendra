'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  X, 
  Calendar, 
  Stethoscope, 
  Bed, 
  Activity, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Cross
} from 'lucide-react';
import { branches } from '@/data/clinicData';
import 'leaflet/dist/leaflet.css';

export default function InteractiveBranchMap({ onOpenBooking }) {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]); // Default open Bojong Jengkol
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    let isMounted = true;

    // Dynamically import Leaflet on client side
    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Avoid double initialization
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Initialize Map
      const map = L.map(mapContainerRef.current, {
        center: [-6.575, 106.69],
        zoom: 12,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Add OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Create Custom SVG DivIcon for each branch
      branches.forEach((b) => {
        const isSelected = selectedBranch && selectedBranch.id === b.id;
        
        const customIcon = L.divIcon({
          className: 'custom-branch-marker',
          html: `
            <div class="relative group cursor-pointer" style="transform: translate(-50%, -100%);">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg border-2 ${
                isSelected 
                  ? 'bg-amber-500 border-white text-navy-950 ring-4 ring-amber-400/50 scale-110' 
                  : 'bg-navy-950 border-white text-white hover:bg-blue-600'
              } transition-all duration-200">
                <span class="w-2 h-2 rounded-full ${isSelected ? 'bg-navy-950' : 'bg-emerald-400 animate-pulse'}"></span>
                <span class="text-[11px] font-black tracking-wide whitespace-nowrap">${b.shortName}</span>
              </div>
              <div class="w-3 h-3 bg-navy-950 rotate-45 mx-auto -mt-1.5 border-r border-b border-white ${isSelected ? '!bg-amber-500' : ''}"></div>
            </div>
          `,
          iconSize: [120, 40],
          iconAnchor: [60, 40]
        });

        const marker = L.marker([b.lat, b.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          setSelectedBranch(b);
          setIsDrawerOpen(true);
          map.flyTo([b.lat, b.lng], 14, { duration: 1.0 });
        });

        markersRef.current[b.id] = marker;
      });

      // Fit bounds if needed to show all branches
      const group = new L.featureGroup(Object.values(markersRef.current));
      map.fitBounds(group.getBounds().pad(0.15));

    }).catch((err) => {
      console.error("Leaflet load error:", err);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Pan to selected branch when selected from button/marker
  const handleSelectBranch = (b) => {
    setSelectedBranch(b);
    setIsDrawerOpen(true);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([b.lat, b.lng], 14, { duration: 1.0 });
    }
  };

  return (
    <div className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] overflow-hidden bg-slate-100">
      
      {/* 1. Leaflet OSM Map Canvas (Full-width 100% fit kiri kanan) */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-0" 
        style={{ width: '100%', height: '100%' }}
      />

      {/* 2. Floating Branch Quick Selector Tabs (Top Left Pill Bar) */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto z-[400] max-w-full overflow-x-auto no-scrollbar pb-1">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90">
          {branches.map((b) => {
            const isActive = selectedBranch && selectedBranch.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelectBranch(b)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-sm ring-2 ring-blue-500/40'
                    : 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-navy-950'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-blue-600'}`} strokeWidth={2} />
                <span>{b.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Floating Drawer Slider dari Kanan Mengambang di Atas Peta */}
      {selectedBranch && isDrawerOpen && (
        <div 
          className="absolute right-3 sm:right-6 lg:right-8 top-3 sm:top-6 bottom-3 sm:bottom-6 w-[calc(100%-1.5rem)] sm:w-96 lg:w-[420px] bg-white rounded-3xl shadow-2xl z-[500] border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-right duration-300"
        >
          {/* Header Image with Overlay */}
          <div className="relative h-44 sm:h-52 w-full bg-navy-950 overflow-hidden flex-shrink-0 group">
            <Image
              src={selectedBranch.image || '/assets/gambar1.jpg'}
              alt={selectedBranch.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>

            {/* Close Button */}
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-all shadow-md active:scale-95"
              title="Tutup Panel Info"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Badges on Image */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
              {selectedBranch.is24Hours ? (
                <span className="px-3 py-1 bg-emerald-500 text-white text-[11px] font-extrabold rounded-full shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  Buka 24 Jam Nonstop
                </span>
              ) : (
                <span className="px-3 py-1 bg-amber-500 text-navy-950 text-[11px] font-extrabold rounded-full shadow-md">
                  {selectedBranch.hours}
                </span>
              )}
            </div>

            {/* Branch Name overlay */}
            <div className="absolute bottom-3.5 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300 block">
                Cabang Klinik dr. Suhendra
              </span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                {selectedBranch.name}
              </h3>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-left">
            
            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedBranch.desc}
            </p>

            {/* Address */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-950">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2} />
                <span>Alamat Lengkap</span>
              </div>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                {selectedBranch.address}
              </p>
            </div>

            {/* Phone & Hotline */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-navy-950">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={2} />
                <span>Layanan & Kontak Darurat</span>
              </div>
              <div className="pl-6 flex items-center justify-between text-xs">
                <span className="font-bold text-navy-950">{selectedBranch.phone}</span>
                <a
                  href={`https://wa.me/62${selectedBranch.phone.replace(/[^0-9]/g, '').slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 hover:text-emerald-700 underline"
                >
                  Chat WhatsApp &rarr;
                </a>
              </div>
            </div>

            {/* Facilities Badges */}
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Fasilitas & Layanan Unggulan:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedBranch.hasUGD && (
                  <span className="px-2.5 py-1 bg-red-50 text-red-700 text-[11px] font-bold rounded-lg border border-red-200">
                    IGD 24 Jam
                  </span>
                )}
                {selectedBranch.hasRanap && (
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-lg border border-blue-200">
                    Rawat Inap
                  </span>
                )}
                {selectedBranch.hasLab && (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-lg border border-emerald-200">
                    Laboratorium Darah
                  </span>
                )}
                {selectedBranch.hasGigi && (
                  <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-[11px] font-bold rounded-lg border border-purple-200">
                    Poli Gigi & Mulut
                  </span>
                )}
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200">
                  Poli Umum
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg border border-slate-200">
                  Apotek BPOM
                </span>
              </div>
            </div>

            {/* Dokter Jaga Cabang Ini */}
            {selectedBranch.doctors && selectedBranch.doctors.length > 0 && (
              <div className="pt-1">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Dokter Bertugas di Cabang Ini:
                </h4>
                <div className="space-y-2">
                  {selectedBranch.doctors.slice(0, 3).map((doc, dIdx) => (
                    <div key={dIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-navy-950">{doc.name}</p>
                        <p className="text-[11px] text-blue-600 font-medium">{doc.poli}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {doc.schedule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sticky Drawer Footer Action Buttons */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2 flex-shrink-0">
            <a
              href={selectedBranch.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 shadow-sm transition-all"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Buka Petunjuk Arah (Google Maps)</span>
            </a>

            {onOpenBooking && (
              <button
                onClick={() => onOpenBooking(selectedBranch)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-navy-950 bg-white hover:bg-slate-100 border border-slate-200 transition-all"
              >
                <Calendar className="w-4 h-4 text-navy-900" />
                <span>Daftar Antrean di Cabang Ini</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* Button to re-open drawer if closed */}
      {!isDrawerOpen && selectedBranch && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="absolute right-4 bottom-4 z-[400] inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-navy-900 text-white text-xs font-bold shadow-2xl hover:bg-navy-950 transition-all border border-navy-800"
        >
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Lihat Info {selectedBranch.shortName}</span>
        </button>
      )}

    </div>
  );
}
