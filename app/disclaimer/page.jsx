import React from 'react';
import Link from 'next/link';
import HeaderTopBar from '@/components/HeaderTopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Stethoscope, 
  HeartPulse, 
  Bot, 
  PhoneCall, 
  Clock, 
  ChevronRight,
  Ambulance,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { clinicInfo } from '@/data/clinicData';

export const metadata = {
  title: 'Penafian Medis & Batasan Tanggung Jawab (Disclaimer)',
  description: 'Penafian medis resmi Klinik dr. Suhendra. Seluruh informasi kesehatan, artikel, dan jawaban chatbot Dera AI bukan pengganti diagnosis langsung dokter berizin.',
  alternates: {
    canonical: 'https://klinikdrsuhendra.id/disclaimer',
  },
  openGraph: {
    title: 'Penafian Medis (Disclaimer) | Klinik dr. Suhendra',
    description: 'Informasi medis & konsultasi Dera AI di situs ini bersifat edukasi dan bukan pengganti pemeriksaan medis darurat atau langsung.',
    url: 'https://klinikdrsuhendra.id/disclaimer',
  },
};

export default function DisclaimerPage() {
  const lastUpdated = "27 November 2026";

  const redFlags = [
    "Nyeri dada hebat yang menjalar ke leher, rahang, atau lengan kiri",
    "Sesak napas berat tiba-tiba atau bibir membiru (sianosis)",
    "Penurunan kesadaran, pingsan, mengigau, atau kejang berulang",
    "Perdarahan aktif tidak terkontrol atau muntah/buang air darah",
    "Tanda stroke mendadak: kelemahan satu sisi wajah/badan, bicara pelo",
    "Demam sangat tinggi pada bayi di bawah 3 bulan atau anak dengan kaku kuduk",
    "Cedera kepala akibat kecelakaan atau trauma fisik tumpul yang berat"
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
            <span className="text-navy-950 font-bold">Disclaimer Medis</span>
          </nav>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 text-xs font-bold text-amber-900 shadow-2xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>PENAFAN RESMI & KEAMANAN PASIEN</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              Penafian Medis (Medical Disclaimer)
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Klarifikasi penting mengenai batasan informasi medis, fitur kecerdasan buatan Dera AI, serta protokol kegawatdaruratan di Klinik dr. Suhendra.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Terakhir ditinjau: <strong>{lastUpdated}</strong></span>
              <span>•</span>
              <span>Standar Etika Medis & E-E-A-T Healthcare</span>
            </div>
          </div>

        </div>
      </section>

      {/* Emergency Callout Box */}
      <section className="pt-10 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 text-red-950 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-red-700 font-extrabold text-sm uppercase tracking-wider">
                  <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 animate-pulse" />
                  <span>KONDISI GAWAT DARURAT (EMERGENCY RED FLAG)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-red-950 tracking-tight">
                  Jangan Menggunakan Website Ini untuk Keadaan Kritis!
                </h2>
                <p className="text-red-900/90 text-sm leading-relaxed max-w-2xl">
                  Jika Anda atau kerabat mengalami gejala kritis yang mengancam nyawa, segera kunjungi <strong>Instalasi Gawat Darurat (IGD) 24 Jam Klinik dr. Suhendra Bojong Jengkol</strong> atau rumah sakit terdekat, atau hubungi saluran darurat kami.
                </p>
              </div>

              <a
                href={`tel:${clinicInfo.emergencyPhone.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide transition-colors shadow-md flex-shrink-0"
              >
                <Ambulance className="w-5 h-5" />
                <span>Telepon IGD: {clinicInfo.emergencyPhone}</span>
              </a>
            </div>

            {/* List of Critical Symptoms */}
            <div className="mt-6 pt-5 border-t border-red-200/80">
              <p className="text-xs font-bold text-red-900 uppercase tracking-wider mb-3">
                Gejala kegawatan yang wajib segera ke IGD:
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-red-900/90">
                {redFlags.map((flag, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Disclaimer Sections */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section 1: Bukan Pengganti Hubungan Dokter-Pasien */}
          <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                1. Bukan Pengganti Pemeriksaan & Diagnosis Dokter
              </h2>
            </div>
            <div className="space-y-3 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                Seluruh konten yang disajikan di situs <strong>klinikdrsuhendra.id</strong>—termasuk namun tidak terbatas pada artikel kesehatan, tips medis, profil layanan, jadwal poli, dan data deskriptif lainnya—disediakan <strong>semata-mata untuk tujuan informasi umum dan edukasi masyarakat</strong>.
              </p>
              <p>
                Informasi di situs ini <strong>TIDAK DIMAKSUDKAN</strong> dan <strong>TIDAK DAPAT DIANGGAP</strong> sebagai pengganti nasihat medis profesional, pemeriksaan fisik, diagnosis klinis, atau rencana pengobatan medis langsung dari dokter, perawat, atau tenaga medis profesional bersertifikasi.
              </p>
              <p>
                Membaca informasi di situs ini tidak menciptakan hubungan hukum antara dokter dan pasien (<em>doctor-patient relationship</em>). Hubungan dokter-pasien hanya terbentuk secara sah saat Anda melakukan registrasi dan pemeriksaan klinis langsung di fasilitas fisik Klinik dr. Suhendra.
              </p>
            </div>
          </article>

          {/* Section 2: Batasan Chatbot Dera AI */}
          <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                2. Batasan Tanggung Jawab Asisten Virtual Dera AI
              </h2>
            </div>
            <div className="space-y-3 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                Asisten kecerdasan buatan <strong>Dera AI</strong> didesain untuk memfasilitasi pencarian informasi awal seputar jadwal klinik, panduan umum gejala ringan, dan tata cara pendaftaran.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-sm text-slate-700">
                <p className="font-bold text-navy-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Prinsip Keamanan Dera AI:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                  <li>Dera AI adalah sistem pemrosesan bahasa alami probabilistik, bukan manusia dan bukan dokter.</li>
                  <li>Dera AI tidak dapat melakukan palpasi, auskultasi, inspeksi fisik, maupun interpretasi hasil uji laboratorium definitif.</li>
                  <li>Dera AI tidak berwenang menuliskan atau merekomendasikan obat resep bertanda lingkaran merah (obat keras) tanpa validasi dokter.</li>
                  <li>Klinik dr. Suhendra tidak bertanggung jawab atas kerugian atau komplikasi yang timbul apabila pengguna mengabaikan rekomendasi pemeriksaan dokter tatap muka demi mengandalkan jawaban AI semata.</li>
                </ul>
              </div>
            </div>
          </article>

          {/* Section 3: Akurasi & Dinamika Ilmu Kedokteran */}
          <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                3. Dinamika Ilmu Kedokteran & Pembatasan Tanggung Jawab
              </h2>
            </div>
            <div className="space-y-3 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                Ilmu kedokteran dan protokol kesehatan adalah bidang yang terus berkembang pesat seiring ditemukannya riset dan pedoman klinis baru. Meskipun tim redaksi Klinik dr. Suhendra berupaya keras menyajikan informasi yang akurat, mutakhir, dan berlandaskan bukti (<em>evidence-based medicine</em>), kami tidak memberikan jaminan mutlak bahwa seluruh materi di situs ini bebas dari kekeliruan ketik atau selalu merefleksikan pedoman paling mutakhir pada detik Anda membacanya.
              </p>
              <p>
                Penggunaan informasi yang diperoleh dari situs ini sepenuhnya merupakan tanggung jawab dan diskresi pribadi Anda. Jangan pernah mengabaikan atau menunda mencari pertolongan medis profesional hanya karena membaca sesuatu di situs web ini.
              </p>
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </main>
  );
}
