'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  X,
  Calendar,
  Stethoscope,
  ChevronRight,
  Crosshair,
  Route,
  Compass
} from 'lucide-react';
import { branches } from '@/data/clinicData';
import { openWhatsAppBooking } from '@/lib/whatsapp';
import 'leaflet/dist/leaflet.css';

// Haversine distance calculator in kilometers
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

export default function InteractiveBranchMap({ onOpenBooking }) {
  // User coordinates: default around Bogor Dramaga/City Center, updated by Geolocation
  const [userLocation, setUserLocation] = useState({
    lat: -6.595,
    lng: 106.745,
    isDetected: false
  });
  const [selectedBranch, setSelectedBranch] = useState(branches[0]); // Default Bojong Jengkol
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [showRoute, setShowRoute] = useState(true);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const leafletModuleRef = useRef(null);
  const markersRef = useRef({});
  const userMarkerRef = useRef(null);
  const routeLineRef = useRef(null);

  // Compute branches sorted by distance to user
  const branchesWithDistance = useMemo(() => {
    return branches.map((b) => ({
      ...b,
      distance: calculateDistanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng),
    })).sort((a, b) => a.distance - b.distance);
  }, [userLocation]);

  const nearestBranch = branchesWithDistance[0];

  // Geolocation detector
  const detectUserLocation = () => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            isDetected: true
          };
          setUserLocation(loc);

          if (mapInstanceRef.current && userMarkerRef.current) {
            userMarkerRef.current.setLatLng([loc.lat, loc.lng]);
            mapInstanceRef.current.flyTo([loc.lat, loc.lng], 13, { duration: 1.0 });
          }
        },
        (err) => {
          console.warn("Geolocation denied/unavailable, keeping default Bogor location:", err.message);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  };

  // Initialize Map
  useEffect(() => {
    let isMounted = true;

    // Detect real location once on load
    detectUserLocation();

    // Dynamically import Leaflet on client side
    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;
      leafletModuleRef.current = L;

      // Ensure Leaflet uses local assets without querying external CDNs
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
        iconUrl: '/assets/leaflet/marker-icon.png',
        shadowUrl: '/assets/leaflet/marker-shadow.png',
      });

      // Avoid double initialization
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Initialize Map with zoom control disabled at top-left
      const map = L.map(mapContainerRef.current, {
        center: [-6.575, 106.69],
        zoom: 12,
        scrollWheelZoom: false,
        zoomControl: false, // Turned off default top-left
      });

      mapInstanceRef.current = map;

      // Pindahkan tombol zoom in / zoom out ke KIRI BAWAH sesuai permintaan
      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      // Custom CachedTileLayer to comply with OpenStreetMap Tile Usage Policy:
      // 1. Client-side tile caching via Web Cache API (window.caches) to minimize OSM server load
      // 2. Strict attribution link to https://www.openstreetmap.org/copyright
      // 3. updateWhenIdle to throttle requests and avoid burst spamming OSM servers
      // 4. MaxZoom 18 restriction according to OSM volunteer capacity guidelines
      const CachedTileLayer = L.TileLayer.extend({
        createTile: function (coords, done) {
          const tile = document.createElement('img');

          L.DomEvent.on(tile, 'load', L.Util.bind(this._tileOnLoad, this, done, tile));
          L.DomEvent.on(tile, 'error', L.Util.bind(this._tileOnError, this, done, tile));

          if (this.options.crossOrigin || this.options.crossOrigin === '') {
            tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
          }
          tile.referrerPolicy = 'no-referrer-when-downgrade';
          tile.alt = '';

          const url = this.getTileUrl(coords);

          // Client-side persistent tile caching via Web Cache API
          if (typeof window !== 'undefined' && 'caches' in window) {
            caches.open('klinik-dr-suhendra-osm-tiles-v1').then((cache) => {
              cache.match(url).then((response) => {
                if (response) {
                  // Found in client cache: load locally without network request to OSM server
                  response.blob().then((blob) => {
                    tile.src = URL.createObjectURL(blob);
                  }).catch(() => {
                    tile.src = url;
                  });
                } else {
                  // Cache miss: load tile and asynchronously save to client cache for next views
                  tile.src = url;
                  fetch(url, { mode: 'cors' }).then((res) => {
                    if (res.ok) {
                      cache.put(url, res);
                    }
                  }).catch(() => {});
                }
              }).catch(() => {
                tile.src = url;
              });
            }).catch(() => {
              tile.src = url;
            });
          } else {
            tile.src = url;
          }

          return tile;
        }
      });

      // Add OpenStreetMap Tile Layer with full OSM regulation compliance & client caching
      new CachedTileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 10,
        keepBuffer: 6,
        updateWhenIdle: true,
        updateWhenZooming: false,
        crossOrigin: 'anonymous',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
      }).addTo(map);

      // User Location Marker: Lingkaran Biru dengan Efek Radar
      const userRadarIcon = L.divIcon({
        className: 'custom-user-radar-marker',
        html: `
          <div class="relative flex items-center justify-center" style="width: 44px; height: 44px; transform: translate(-50%, -50%);">
            <span class="absolute w-11 h-11 rounded-full bg-blue-500/30 animate-ping"></span>
            <span class="absolute w-7 h-7 rounded-full bg-blue-400/50 animate-pulse"></span>
            <span class="relative w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center">
              <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            </span>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userRadarIcon,
        zIndexOffset: 1000
      }).addTo(map);

      userMarker.bindTooltip('<div class="font-bold text-xs text-navy-950">📍 Lokasi Anda</div>', {
        permanent: false,
        direction: 'top',
        className: 'rounded-lg shadow-md border border-slate-200'
      });

      userMarkerRef.current = userMarker;

      // Helper to generate responsive custom DivIcon with auto-width (preventing text overflow)
      const createBranchIcon = (b, isSelected) => {
        return L.divIcon({
          className: '!bg-transparent !border-0 !p-0 !m-0',
          html: `
            <div class="inline-flex flex-col items-center cursor-pointer select-none" style="transform: translate(-50%, -100%); width: max-content;">
              <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-xl border-2 ${isSelected
              ? 'bg-amber-500 border-white text-navy-950 ring-4 ring-amber-400/50 scale-105 shadow-amber-500/30'
              : 'bg-navy-950 border-white text-white hover:bg-blue-600 shadow-navy-950/40'
            } transition-all duration-200 whitespace-nowrap">
                <span class="w-2 h-2 rounded-full flex-shrink-0 ${isSelected ? 'bg-navy-950' : 'bg-emerald-400 animate-pulse'}"></span>
                <span class="text-xs font-black tracking-tight whitespace-nowrap leading-none">${b.shortName}</span>
              </div>
              <div class="w-2.5 h-2.5 bg-navy-950 rotate-45 -mt-1 border-r-2 border-b-2 border-white flex-shrink-0 ${isSelected ? '!bg-amber-500' : ''}"></div>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0]
        });
      };

      // Create Custom SVG DivIcon for each branch
      branches.forEach((b) => {
        const isSelected = selectedBranch && selectedBranch.id === b.id;
        const customIcon = createBranchIcon(b, isSelected);

        const marker = L.marker([b.lat, b.lng], {
          icon: customIcon,
          zIndexOffset: isSelected ? 1000 : 100
        }).addTo(map);

        marker.on('click', () => {
          setSelectedBranch(b);
          setIsDrawerOpen(true);
          map.flyTo([b.lat, b.lng], 14, { duration: 1.0 });
        });

        markersRef.current[b.id] = marker;
      });

      // Fit bounds to show all branches and user location
      const allMarkers = [...Object.values(markersRef.current), userMarker];
      const group = new L.featureGroup(allMarkers);
      map.fitBounds(group.getBounds().pad(0.12));

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

  // Update User Marker position when userLocation changes
  useEffect(() => {
    if (userMarkerRef.current && userLocation) {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation]);

  // Update Branch Marker Icon styles & z-indexes dynamically when selectedBranch changes
  useEffect(() => {
    if (!leafletModuleRef.current || !markersRef.current) return;
    const L = leafletModuleRef.current;

    branches.forEach((b) => {
      const marker = markersRef.current[b.id];
      if (marker) {
        const isSelected = selectedBranch && selectedBranch.id === b.id;
        const icon = L.divIcon({
          className: '!bg-transparent !border-0 !p-0 !m-0',
          html: `
            <div class="inline-flex flex-col items-center cursor-pointer select-none" style="transform: translate(-50%, -100%); width: max-content;">
              <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-xl border-2 ${isSelected
              ? 'bg-amber-500 border-white text-navy-950 ring-4 ring-amber-400/50 scale-105 shadow-amber-500/30'
              : 'bg-navy-950 border-white text-white hover:bg-blue-600 shadow-navy-950/40'
            } transition-all duration-200 whitespace-nowrap">
                <span class="w-2 h-2 rounded-full flex-shrink-0 ${isSelected ? 'bg-navy-950' : 'bg-emerald-400 animate-pulse'}"></span>
                <span class="text-xs font-black tracking-tight whitespace-nowrap leading-none">${b.shortName}</span>
              </div>
              <div class="w-2.5 h-2.5 bg-navy-950 rotate-45 -mt-1 border-r-2 border-b-2 border-white flex-shrink-0 ${isSelected ? '!bg-amber-500' : ''}"></div>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0]
        });

        marker.setIcon(icon);
        marker.setZIndexOffset(isSelected ? 1000 : 100);
      }
    });
  }, [selectedBranch]);

  // Update Route Polyline whenever selectedBranch or userLocation or showRoute changes
  useEffect(() => {
    if (!mapInstanceRef.current || !leafletModuleRef.current || !selectedBranch || !userLocation) return;
    const L = leafletModuleRef.current;

    // Clear existing route
    if (routeLineRef.current) {
      mapInstanceRef.current.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (showRoute) {
      const polyline = L.polyline([
        [userLocation.lat, userLocation.lng],
        [selectedBranch.lat, selectedBranch.lng]
      ], {
        color: '#2563eb',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '8, 8',
        lineCap: 'round'
      }).addTo(mapInstanceRef.current);

      routeLineRef.current = polyline;
    }
  }, [selectedBranch, userLocation, showRoute]);

  // Handle selecting a branch
  const handleSelectBranch = (b) => {
    setSelectedBranch(b);
    setIsDrawerOpen(true);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([b.lat, b.lng], 14, { duration: 1.0 });
    }
  };

  // Focus bounds to see both user and current branch route
  const handleFitRouteBounds = () => {
    if (!mapInstanceRef.current || !leafletModuleRef.current || !selectedBranch) return;
    const L = leafletModuleRef.current;
    const bounds = L.latLngBounds([
      [userLocation.lat, userLocation.lng],
      [selectedBranch.lat, selectedBranch.lng]
    ]);
    mapInstanceRef.current.fitBounds(bounds, { padding: [60, 60], duration: 1.0 });
  };

  // Distance of currently selected branch
  const currentBranchDistance = useMemo(() => {
    if (!selectedBranch) return null;
    return calculateDistanceKm(userLocation.lat, userLocation.lng, selectedBranch.lat, selectedBranch.lng);
  }, [userLocation, selectedBranch]);

  return (
    <div className="relative w-full h-[560px] sm:h-[610px] lg:h-[650px] overflow-hidden bg-slate-100 isolate z-0">

      {/* 1. Leaflet OSM Map Canvas (Full-width 100% fit kiri kanan) */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-0"
        style={{ width: '100%', height: '100%' }}
      />

      {/* 2. Floating Rute & Lokasi Saya Controller (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 max-w-[280px] sm:max-w-[340px]">
        {/* Panel Lokasi Pengguna & Cabang Terdekat */}
        <div className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 text-left space-y-2">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
              </span>
              <span className="text-xs font-black text-navy-950">
                {userLocation.isDetected ? 'Lokasi Anda Terdeteksi' : 'Titik Referensi Anda'}
              </span>
            </div>

            <button
              onClick={detectUserLocation}
              className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-navy-950 transition-colors"
              title="Perbarui / Deteksi Ulang Lokasi Saya"
            >
              <Crosshair className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Info Cabang Terdekat */}
          {nearestBranch && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-semibold">Cabang Terdekat:</span>
                <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {nearestBranch.distance} km
                </span>
              </div>
              <p className="text-xs font-bold text-navy-950 truncate">
                {nearestBranch.name}
              </p>

              <div className="flex items-center gap-1.5 pt-1">
                <button
                  onClick={() => handleSelectBranch(nearestBranch)}
                  className="flex-1 py-1.5 px-2.5 rounded-xl bg-navy-900 text-white text-[11px] font-bold hover:bg-navy-950 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Route className="w-3.5 h-3.5 text-amber-400" />
                  <span>Rute Terdekat</span>
                </button>
                <button
                  onClick={handleFitRouteBounds}
                  className="py-1.5 px-2.5 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-bold hover:bg-slate-200 transition-all flex items-center justify-center"
                  title="Lihat Rentang Rute Penuh"
                >
                  <Compass className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Opsi Pilih Arah Rute ke Cabang Lainnya */}
          <div className="pt-1 border-t border-slate-100">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Pilihan Rute ke Cabang Lain:
            </label>
            <select
              value={selectedBranch ? selectedBranch.id : ''}
              onChange={(e) => {
                const b = branches.find(item => item.id === e.target.value);
                if (b) handleSelectBranch(b);
              }}
              className="w-full text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {branchesWithDistance.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.shortName} ({b.distance} km)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Floating Drawer Slider dari Kanan Mengambang di Atas Peta */}
      {selectedBranch && isDrawerOpen && (
        <div
          className="absolute right-3 sm:right-6 lg:right-8 top-3 sm:top-6 bottom-3 sm:bottom-6 w-[calc(100%-1.5rem)] sm:w-96 lg:w-[420px] bg-white rounded-3xl shadow-2xl z-30 border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-right duration-300"
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
            <button
              onClick={() => {
                if (onOpenBooking) {
                  onOpenBooking(selectedBranch);
                } else {
                  openWhatsAppBooking({ branch: selectedBranch });
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Daftar Antrean di Cabang Ini via WhatsApp</span>
            </button>
          </div>

        </div>
      )}

      {/* Button to re-open drawer if closed */}
      {!isDrawerOpen && selectedBranch && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="absolute right-4 bottom-4 z-20 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-navy-900 text-white text-xs font-bold shadow-2xl hover:bg-navy-950 transition-all border border-navy-800"
        >
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Lihat Info {selectedBranch.shortName}</span>
        </button>
      )}

    </div>
  );
}
