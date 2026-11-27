'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Stethoscope, 
  CheckCircle2, 
  Phone, 
  Filter,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { branches } from '@/data/clinicData';

export default function DoctorScheduleSection({ onSelectDoctor }) {
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [poliFilter, setPoliFilter] = useState('ALL');

  const currentBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];

  // Filter doctors in selected branch
  const filteredDoctors = currentBranch.doctors.filter((doc) => {
    const matchName = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPoli = poliFilter === 'ALL' || doc.poli.toLowerCase().includes(poliFilter.toLowerCase());
    return matchName && matchPoli;
  });

  return (
    <section id="jadwal" className="py-16 lg:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Combo Box Branch Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            {/* Header Model Garis di Kiri (Tanpa Badge) */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 sm:w-10 h-[2.5px] bg-blue-600 rounded-full inline-block"></span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-navy-900">
                JADWAL DOKTER JAGA
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
              Jadwal Praktik & Layanan Dokter
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Pilih cabang klinik melalui menu combo box di samping untuk melihat jadwal dokter bertugas hari ini dan hari berikutnya. Layanan IGD siaga 24 jam.
            </p>
          </div>

          {/* Combo Box Pemilihan Cabang (Bukan Bentuk Tab) */}
          <div className="w-full md:w-auto min-w-[280px] sm:min-w-[340px]">
            <label htmlFor="branch-select" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Pilih Cabang Klinik
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="branch-select"
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white text-navy-950 font-bold text-sm rounded-xl border border-slate-300 hover:border-navy-900 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 shadow-sm appearance-none cursor-pointer transition-all outline-none"
              >
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id} className="text-navy-950 py-1 font-medium">
                    {branch.name} {branch.is24Hours ? '(24 Jam)' : ''}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>

        {/* Branch Info Card & Filters */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-navy-900">
              <MapPin className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="font-extrabold text-navy-950 text-base sm:text-lg">
                {currentBranch.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentBranch.address} • Hotline: <span className="font-bold text-navy-900">{currentBranch.phone}</span>
              </p>
            </div>
          </div>

          {/* Search & Poli Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={1.75} />
              <input
                type="text"
                placeholder="Cari nama dokter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-navy-900 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setPoliFilter('ALL')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  poliFilter === 'ALL'
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Semua Poli
              </button>
              <button
                onClick={() => setPoliFilter('Umum')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  poliFilter === 'Umum'
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Umum
              </button>
              <button
                onClick={() => setPoliFilter('Gigi')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  poliFilter === 'Gigi'
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Gigi
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Table / Cards */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl p-8 text-center text-slate-500 text-sm border border-slate-200">
            Tidak ada dokter yang cocok dengan pencarian di cabang ini.
          </div>
        ) : (
          <div className="overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-navy-950 font-extrabold text-xs uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-6">Nama Dokter</th>
                    <th className="py-4 px-6">Layanan / Poli</th>
                    <th className="py-4 px-6">Hari Praktik</th>
                    <th className="py-4 px-6">Jam Bertugas</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDoctors.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-navy-900 font-bold text-xs">
                            <Stethoscope className="w-4 h-4 text-navy-900" strokeWidth={1.75} />
                          </div>
                          <div>
                            <span className="font-extrabold text-navy-950 block">
                              {doc.name}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Tenaga Medis Tetap
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200/60">
                          {doc.poli}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-medium">
                        {doc.days}
                      </td>
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center gap-1.5 text-navy-900 font-bold text-xs bg-slate-100 px-3 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
                          <span>{doc.schedule}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => onSelectDoctor && onSelectDoctor(doc, currentBranch)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-navy-900 hover:bg-navy-950 active:scale-95 rounded-lg transition-all"
                        >
                          <span>Pilih Dokter</span>
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
