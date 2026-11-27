import React from 'react';
import Link from 'next/link';
import HeaderTopBar from '@/components/HeaderTopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Lock, 
  ShieldCheck, 
  Eye, 
  FileCheck, 
  Server, 
  UserCheck, 
  Clock, 
  ChevronRight,
  PhoneCall,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { clinicInfo } from '@/data/clinicData';

export const metadata = {
  title: 'Kebijakan Privasi & Perlindungan Data Pasien (UU PDP)',
  description: 'Kebijakan perlindungan data pribadi dan kerahasiaan rekam medis pasien di Klinik dr. Suhendra sesuai UU Perlindungan Data Pribadi No. 27 Tahun 2022 dan Permenkes No. 24/2022.',
  alternates: {
    canonical: 'https://klinikdrsuhendra.id/kebijakan-privasi',
  },
  openGraph: {
    title: 'Kebijakan Privasi & Perlindungan Data | Klinik dr. Suhendra',
    description: 'Komitmen perlindungan data pribadi, rekam medis elektronik, dan kerahasiaan pasien sesuai UU PDP No. 27/2022.',
    url: 'https://klinikdrsuhendra.id/kebijakan-privasi',
  },
};

export default function KebijakanPrivasiPage() {
  const lastUpdated = "27 November 2026";

  const principles = [
    {
      icon: ShieldCheck,
      title: "1. Landasan Hukum & Kepatuhan Regulasi",
      content: (
        <p className="text-slate-600 leading-relaxed">
          Klinik dr. Suhendra berkomitmen teguh menjaga privasi dan keamanan data setiap pengunjung, pasien, dan keluarga pasien. Kebijakan Privasi ini disusun sesuai dengan ketentuan hukum Republik Indonesia, khususnya:
          <br /><br />
          <strong>(a) Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)</strong>;
          <br />
          <strong>(b) Peraturan Menteri Kesehatan No. 24 Tahun 2022 tentang Rekam Medis (RME)</strong>; dan
          <br />
          <strong>(c) Peraturan Menteri Kesehatan No. 36 Tahun 2012 tentang Rahasia Kedokteran</strong>.
        </p>
      ),
    },
    {
      icon: Eye,
      title: "2. Data yang Kami Kumpulkan",
      content: (
        <div className="space-y-3">
          <p className="text-slate-600 leading-relaxed">
            Data pribadi yang kami proses terbagi menjadi beberapa kategori:
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <strong className="text-navy-950 block">Data Identitas Umum:</strong>
              Nama lengkap, Nomor Induk Kependudukan (NIK/KTP), nomor kartu keluarga, tanggal lahir, jenis kelamin, dan alamat tempat tinggal saat pendaftaran fisik maupun online.
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <strong className="text-navy-950 block">Data Kontak:</strong>
              Nomor telepon/WhatsApp aktif dan alamat email untuk keperluan konfirmasi antrean, pengingat kontrol dokter, atau hasil laboratorium.
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <strong className="text-navy-950 block">Data Medis & Rekam Medis (Data Pribadi Spesifik):</strong>
              Riwayat keluhan klinis, tanda-tanda vital, hasil diagnosis dokter, resep obat, catatan tindakan, serta hasil laboratorium/USG yang dilindungi ketat oleh kerahasiaan medis.
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <strong className="text-navy-950 block">Data Teknis & Interaksi AI:</strong>
              Alamat IP (Internet Protocol), jenis peramban (browser), log percakapan umum dengan asisten Dera AI untuk penjaminan mutu dan kestabilan sistem.
            </li>
          </ul>
        </div>
      ),
    },
    {
      icon: FileCheck,
      title: "3. Tujuan Penggunaan & Pemrosesan Data",
      content: (
        <div className="space-y-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>Kami hanya mengumpulkan dan memproses data pribadi Anda untuk tujuan-tujuan yang sah, meliputi:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 text-sm">
            <li>Pemberian layanan perawatan klinis, rawat jalan, rawat inap, dan pertolongan pertama gawat darurat.</li>
            <li>Pencatatan Rekam Medis Elektronik (RME) yang terintegrasi dengan platform SatuSehat Kementerian Kesehatan RI.</li>
            <li>Pengelolaan antrean pasien dan koordinasi jadwal dokter melalui WhatsApp.</li>
            <li>Klaim penjaminan BPJS Kesehatan atau asuransi rekanan resmi (apabila pasien menggunakan asuransi).</li>
            <li>Kepatuhan terhadap instruksi perundang-undangan dan pelaporan surveilans epidemiologi dinas kesehatan.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: Lock,
      title: "4. Kerahasiaan Medis & Rahasia Kedokteran",
      content: (
        <div className="space-y-3 text-slate-600 leading-relaxed text-sm sm:text-base">
          <p>
            Seluruh data medis pasien yang tercatat di Klinik dr. Suhendra berstatus <strong>Rahasia Kedokteran</strong>. Hanya tenaga medis yang memiliki hubungan langsung dengan perawatan pasien (dokter yang memeriksa, perawat penanggung jawab, bidan, dan analis lab terkait) yang memiliki izin akses terhadap berkas rekam medis Anda.
          </p>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-sm text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Komitmen Tanpa Penjualan Data:</strong> Klinik dr. Suhendra <u>TIDAK PERNAH</u> memperjualbelikan, menyewakan, atau membagikan nomor telepon atau data medis pasien kepada pihak ketiga manapun untuk keperluan pemasaran, telemarketing, atau komersial pihak luar.
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: Server,
      title: "5. Keamanan & Penyimpanan Data",
      content: (
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Kami menerapkan standar perlindungan keamanan fisik, teknis, dan administratif yang ketat: enkripsi data in-transit (HTTPS/SSL), pembatasan otentikasi berbasis peran (Role-Based Access Control) bagi petugas admisi, serta pencadangan data terenkripsi. Berkas rekam medis disimpan sesuai jangka waktu retensi minimum yang diatur dalam Permenkes No. 24 Tahun 2022.
        </p>
      ),
    },
    {
      icon: UserCheck,
      title: "6. Hak-Hak Subjek Data Pasien (Hak Anda)",
      content: (
        <div className="space-y-2 text-slate-600 leading-relaxed text-sm sm:text-base">
          <p>Sesuai UU Perlindungan Data Pribadi No. 27 Tahun 2022, Anda memiliki hak untuk:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 text-sm">
            <li>Mendapatkan kejelasan mengenai tujuan pemrosesan data pribadi Anda.</li>
            <li>Meminta akses dan salinan resume medis (ringkasan rekam medis) yang menjadi hak pasien.</li>
            <li>Memperbarui atau membetulkan data demografis yang tidak akurat (misal perubahan alamat atau nomor telepon).</li>
            <li>Menarik persetujuan pemrosesan data tertentu sepanjang tidak bertentangan dengan kewajiban hukum penyimpanan rekam medis negara.</li>
          </ul>
        </div>
      ),
    },
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
            <span className="text-navy-950 font-bold">Kebijakan Privasi</span>
          </nav>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 text-xs font-bold text-blue-900 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>PERLINDUNGAN DATA PRIBADI & MEDIS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              Kebijakan Privasi (Privacy Policy)
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Komitmen kami dalam menjaga kerahasiaan identitas, riwayat medis, dan keamanan data pasien berlandaskan UU Perlindungan Data Pribadi No. 27 Tahun 2022.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Terakhir diperbarui: <strong>{lastUpdated}</strong></span>
              <span>•</span>
              <span>Standar UU PDP & Permenkes RI No. 24/2022</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-10">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article 
                  key={idx} 
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                      {item.title}
                    </h2>
                  </div>

                  <div className="text-slate-700">
                    {item.content}
                  </div>
                </article>
              );
            })}
          </div>

          {/* DPO Contact Card */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-lg font-bold text-navy-950">Pertanyaan Mengenai Data Pribadi Anda?</h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
                Jika Anda ingin mengajukan pertanyaan seputar pemrosesan data, pembaruan data rekam medis, atau pelaksanaan hak subjek data, silakan hubungi tim kami.
              </p>
            </div>
            <a
              href={`mailto:${clinicInfo.email}?subject=Permohonan%20Terkait%20Data%20Pribadi%20Pasien`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider transition-colors flex-shrink-0 shadow-2xs"
            >
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Email: {clinicInfo.email}</span>
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
