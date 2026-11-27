import React from 'react';
import Link from 'next/link';
import HeaderTopBar from '@/components/HeaderTopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  Scale, 
  Users, 
  Bot, 
  CreditCard, 
  ChevronRight,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { clinicInfo } from '@/data/clinicData';

export const metadata = {
  title: 'Syarat & Ketentuan Layanan (Ketentuan Berlaku)',
  description: 'Syarat dan ketentuan resmi penggunaan situs web, layanan konsultasi Dera AI, serta prosedur pendaftaran layanan medis di Klinik dr. Suhendra Bogor.',
  alternates: {
    canonical: 'https://klinikdrsuhendra.id/ketentuan-layanan',
  },
  openGraph: {
    title: 'Syarat & Ketentuan Layanan | Klinik dr. Suhendra',
    description: 'Ketentuan resmi penggunaan situs web, konsultasi Dera AI, dan pendaftaran layanan medis di Klinik dr. Suhendra.',
    url: 'https://klinikdrsuhendra.id/ketentuan-layanan',
  },
};

export default function KetentuanLayananPage() {
  const lastUpdated = "27 November 2026";

  const sections = [
    {
      id: "umum",
      icon: FileText,
      title: "1. Ketentuan Umum & Penerimaan Syarat",
      content: (
        <>
          <p className="text-slate-600 leading-relaxed mb-3">
            Selamat datang di situs resmi <strong>Klinik dr. Suhendra</strong> (<span className="text-blue-600 font-medium">klinikdrsuhendra.id</span>). 
            Dengan mengakses, menjelajahi, menggunakan fitur pendaftaran online, maupun berinteraksi dengan asisten virtual Dera AI di situs ini, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat secara hukum oleh Syarat dan Ketentuan Layanan ini.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, kami mempersilakan Anda untuk tidak melanjutkan penggunaan situs ini dan dapat langsung mendatangi fasilitas fisik cabang Klinik dr. Suhendra terdekat untuk mendapatkan pelayanan secara konvensional.
          </p>
        </>
      ),
    },
    {
      id: "layanan-medis",
      icon: Scale,
      title: "2. Ruang Lingkup Layanan Klinik & Operasional",
      content: (
        <>
          <p className="text-slate-600 leading-relaxed mb-3">
            Klinik dr. Suhendra adalah jaringan fasilitas pelayanan kesehatan primer (Klinik Pratama) berizin resmi di bawah naungan dinas kesehatan terkait yang beroperasi di wilayah Kabupaten Bogor dan sekitarnya. Fasilitas kami mencakup:
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700 mb-3">
            <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Instalasi Gawat Darurat (IGD) 24 Jam</span>
            </li>
            <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Rawat Inap Terpadu Berizin</span>
            </li>
            <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Poli Umum & Pelayanan Dokter Jaga</span>
            </li>
            <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Kesehatan Ibu & Anak (KIA / Kebidanan)</span>
            </li>
            <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Laboratorium Darah & Diagnostik Rutin</span>
            </li>
            <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Farmasi & Apotek Resmi Standar BPOM</span>
            </li>
          </ul>
          <p className="text-slate-600 leading-relaxed text-sm">
            Tindakan medis invasif, rawat inap, atau pemberian resep obat keras (Golongan G/Narkotika/Psikotropika) wajib melalui pemeriksaan fisik langsung oleh dokter berizin (SIP aktif) di lokasi klinik dan tidak dapat diberikan semata-mata melalui media daring.
          </p>
        </>
      ),
    },
    {
      id: "dera-ai",
      icon: Bot,
      title: "3. Ketentuan Penggunaan Chatbot Asisten Dera AI",
      content: (
        <>
          <p className="text-slate-600 leading-relaxed mb-3">
            Fitur <strong>Dera AI</strong> yang terpasang pada situs ini merupakan asisten kecerdasan buatan (Artificial Intelligence) berbasis model bahasa besar yang dilatih untuk memberikan edukasi kesehatan awal, navigasi jadwal dokter, informasi tarif estimasi, dan panduan pertolongan pertama dasar.
          </p>
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 mb-3 text-sm text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Batas Kemampuan AI:</strong> Dera AI <u>BUKAN</u> pengganti dokter manusia, tidak memiliki wewenang menegakkan diagnosis final, dan tidak menerbitkan resep medis resmi. Seluruh saran dari Dera AI bersifat penunjang edukasi umum.
            </p>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm">
            Pengguna dilarang mengunggah informasi rahasia perbankan, kata sandi, materi pornografi, ujaran kebencian, atau upaya manipulasi rekayasa perintah (prompt injection) ke dalam jendela chat Dera AI.
          </p>
        </>
      ),
    },
    {
      id: "pendaftaran-online",
      icon: CreditCard,
      title: "4. Tata Cara Pendaftaran & Booking Antrean",
      content: (
        <>
          <p className="text-slate-600 leading-relaxed mb-3">
            Seluruh tombol buat janji dan pendaftaran antrean di situs ini terhubung langsung ke saluran WhatsApp resmi Administrator Klinik dr. Suhendra di nomor <strong>{clinicInfo.emergencyPhone}</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 mb-3">
            <li>Pendaftaran online berfungsi untuk reservasi estimasi waktu antrean dokter dan penyiapan berkas rekam medis sebelum pasien tiba di klinik.</li>
            <li>Kepastian urutan nomor antrean riil tetap mengikuti kedatangan fisik pasien di loket admisi serta triase kegawatdaruratan (pasien gawat darurat selalu didahulukan).</li>
            <li>Pasien pengguna jaminan BPJS Kesehatan atau asuransi rekanan wajib membawa kartu identitas sah (KTP/KK) dan kartu kepesertaan aktif saat verifikasi di loket.</li>
          </ul>
        </>
      ),
    },
    {
      id: "hki",
      icon: ShieldCheck,
      title: "5. Hak Kekayaan Intelektual",
      content: (
        <p className="text-slate-600 leading-relaxed">
          Seluruh logo, merek dagang, nama domain, desain tata letak, ilustrasi visual, foto dokumentasi asli fasilitas, serta teks artikel yang termuat dalam situs <span className="font-semibold text-navy-950">klinikdrsuhendra.id</span> adalah milik sah Klinik dr. Suhendra dan dilindungi oleh Undang-Undang Hak Cipta Republik Indonesia. Penggandaan, modifikasi, atau distribusi untuk kepentingan komersial tanpa izin tertulis dari manajemen adalah tindakan melanggar hukum.
        </p>
      ),
    },
    {
      id: "hukum-yurisdiksi",
      icon: Scale,
      title: "6. Hukum yang Berlaku & Penyelesaian Sengketa",
      content: (
        <p className="text-slate-600 leading-relaxed">
          Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Negara Kesatuan Republik Indonesia. Segala perselisihan yang timbul sehubungan dengan penggunaan situs ini akan diselesaikan secara musyawarah untuk mufakat terlebih dahulu, dan bila tidak tercapai, akan diselesaikan melalui yurisdiksi Pengadilan Negeri di wilayah hukum Kabupaten Bogor, Jawa Barat.
        </p>
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
            <span className="text-navy-950 font-bold">Ketentuan Layanan</span>
          </nav>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-navy-900 shadow-2xs">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>REGULASI & KEBIJAKAN HUKUM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-tight">
              Syarat & Ketentuan Layanan
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
              Panduan resmi ketentuan penggunaan situs web, interaksi asisten kesehatan Dera AI, serta tata cara pendaftaran layanan medis di Klinik dr. Suhendra.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Terakhir diperbarui: <strong>{lastUpdated}</strong></span>
              <span>•</span>
              <span>Berlaku untuk seluruh pengunjung</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-10">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <article 
                  key={section.id} 
                  id={section.id} 
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-navy-950 tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  <div className="text-slate-700">
                    {section.content}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Quick Support Card */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-navy-950 text-white border border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white">Ada Pertanyaan Mengenai Ketentuan Ini?</h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Hubungi staf administrasi kami untuk klarifikasi atau informasi lebih lanjut.
              </p>
            </div>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Halo%20Admin%20Klinik%20dr.%20Suhendra,%20saya%20ingin%20bertanya%20seputar%20ketentuan%20layanan.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex-shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi Hotline Klinik</span>
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
