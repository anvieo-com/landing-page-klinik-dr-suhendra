import React from 'react';
import Link from 'next/link';
import HeaderTopBar from '@/components/HeaderTopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Users, 
  HeartHandshake, 
  FileCheck2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  PhoneCall,
  Scale
} from 'lucide-react';
import { clinicInfo } from '@/data/clinicData';

export const metadata = {
  title: 'Hak & Kewajiban Pasien | Klinik dr. Suhendra',
  description: 'Panduan resmi hak dan kewajiban pasien di Klinik dr. Suhendra berlandaskan UU Kesehatan No. 17 Tahun 2023, PMK No. 4/2018, dan standar akreditasi klinik pratama.',
  alternates: {
    canonical: 'https://klinikdrsuhendra.id/hak-kewajiban-pasien',
  },
  openGraph: {
    title: 'Hak & Kewajiban Pasien | Klinik dr. Suhendra',
    description: 'Pedoman hak perlindungan pasien dan kewajiban saat menerima pelayanan medis di Klinik dr. Suhendra.',
    url: 'https://klinikdrsuhendra.id/hak-kewajiban-pasien',
  },
};

export default function HakKewajibanPasienPage() {
  const lastUpdated = "27 November 2026";

  const hakPasienList = [
    "Memperoleh informasi mengenai tata tertib dan peraturan yang berlaku di Klinik dr. Suhendra.",
    "Memperoleh layanan kesehatan yang manusiawi, adil, jujur, dan tanpa diskriminasi suku, agama, ras, atau golongan.",
    "Memperoleh layanan kesehatan yang bermutu, aman, dan sesuai dengan standar profesi serta standar operasional prosedur klinis.",
    "Memperoleh pelayanan yang efektif dan efisien sehingga pasien terhindar dari kerugian fisik dan materi.",
    "Memilih dokter dan dokter gigi serta kelas perawatan sesuai dengan keinginannya dan peraturan yang berlaku di klinik.",
    "Meminta konsultasi tentang penyakit yang dideritanya kepada dokter lain yang mempunyai Surat Izin Praktik (SIP) baik di dalam maupun di luar klinik (Second Opinion).",
    "Mendapatkan privasi dan kerahasiaan penyakit yang diderita termasuk data-data medisnya (Rahasia Kedokteran).",
    "Mendapat informasi lengkap meliputi diagnosis, tata cara tindakan medis, tujuan tindakan, alternatif tindakan, risiko, komplikasi yang mungkin terjadi, dan prognosis penyakit.",
    "Memberikan persetujuan atau menolak sebagian atau seluruh tindakan yang akan dilakukan oleh tenaga kesehatan terhadap dirinya setelah menerima dan memahami informasi (Informed Consent).",
    "Didampingi oleh keluarganya dalam keadaan kritis atau tindakan tertentu sesuai pertimbangan medis.",
    "Menjalankan ibadah sesuai agama atau kepercayaan yang dianutnya selama tidak mengganggu pasien lainnya.",
    "Memperoleh keamanan dan keselamatan dirinya selama dalam perawatan di Klinik dr. Suhendra.",
    "Mengajukan usul, saran, perbaikan atas perlakuan klinik terhadap dirinya melalui kotak saran atau saluran resmi pimpinan klinik.",
    "Mengeluhkan pelayanan klinik yang tidak sesuai dengan standar pelayanan melalui media yang sesuai dengan ketentuan peraturan perundang-undangan."
  ];

  const kewajibanPasienList = [
    "Mentaati segala peraturan dan tata tertib yang berlaku di seluruh cabang Klinik dr. Suhendra.",
    "Menggunakan fasilitas klinik secara bertanggung jawab dan menjaga kebersihan serta ketertiban lingkungan klinik.",
    "Memberikan informasi yang jujur, lengkap, dan akurat mengenai masalah kesehatan, riwayat penyakit terdahulu, riwayat alergi obat, dan pengobatan yang sedang dijalani kepada dokter/perawat.",
    "Mematuhi rencana terapi dan instruksi medis yang telah disepakati bersama dokter setelah mendapatkan penjelasan.",
    "Menerima segala konsekuensi hukum apabila secara sadar menolak tindakan medis yang direkomendasikan dokter (menandatangani surat penolakan tindakan).",
    "Menghormati hak-hak pasien lain, pengunjung, dan seluruh tenaga medis serta staf pendukung yang bertugas di klinik.",
    "Memenuhi kewajiban pembayaran dan administrasi atas pelayanan kesehatan yang telah diterima sesuai ketentuan tarif atau mekanisme jaminan asuransi."
  ];

  return (
    <main className="min-h-screen bg-white">
      <HeaderTopBar />
      <Navbar />

      {/* Header Banner */}
      <section className="bg-slate-100 border-b border-slate-200/80 py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-navy-900 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-navy-950 font-bold">Hak & Kewajiban Pasien</span>
          </nav>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 text-xs font-bold text-emerald-900 shadow-2xs">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
              <span>STANDAR AKREDITASI & KESELAMATAN PASIEN</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              Hak & Kewajiban Pasien
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Panduan transparansi hubungan timbal balik antara pasien, keluarga, dan tenaga medis di Klinik dr. Suhendra berlandaskan UU Kesehatan Republik Indonesia.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Sesuai standar: <strong>UU Kesehatan No. 17 Tahun 2023 & PMK No. 4/2018</strong></span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Bagian 1: Hak Pasien */}
          <article className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                  Hak-Hak Pasien
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Setiap pasien yang berkunjung ke Klinik dr. Suhendra memiliki hak-hak yang dilindungi oleh undang-undang:
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {hakPasienList.map((hak, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-xl flex items-start gap-3 hover:bg-blue-50/40 hover:border-blue-200 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-extrabold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    {index + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {hak}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Bagian 2: Kewajiban Pasien */}
          <article className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                <Scale className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                  Kewajiban Pasien
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Untuk mendukung kelancaran pengobatan yang optimal, pasien dan keluarga berkewajiban untuk:
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {kewajibanPasienList.map((kewajiban, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-xl flex items-start gap-3 hover:bg-amber-50/40 hover:border-amber-200 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-navy-950 text-white font-extrabold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    {index + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {kewajiban}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Kotak Pengaduan & Layanan Pelanggan */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-lg font-bold text-navy-950">Saluran Aspirasi & Pengaduan Pasien</h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
                Kenyamanan dan keselamatan Anda adalah prioritas utama kami. Jika ada perlakuan atau pelayanan yang dirasa kurang memuaskan, sampaikan masukan Anda langsung kepada Kepala Manajemen Klinik.
              </p>
            </div>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Halo%20Manajemen%20Klinik%20dr.%20Suhendra,%20saya%20ingin%20menyampaikan%20masukan%20dan%20aspirasi%20pelayanan.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex-shrink-0 shadow-2xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Sampaikan Masukan via WA</span>
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
