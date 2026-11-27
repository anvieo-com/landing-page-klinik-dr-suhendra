// Server Component — JANGAN tambahkan 'use client' di file ini
// Metadata ini spesifik untuk halaman /jadwal

export const metadata = {
  title: 'Jadwal Dokter — Praktik Dokter Umum & Gigi Klinik dr. Suhendra',
  description: 'Cek jadwal praktik dokter umum dan dokter gigi di 6 cabang Klinik dr. Suhendra di Bogor Barat. IGD dan dokter jaga siaga 24 jam nonstop setiap hari termasuk hari libur.',
  keywords: [
    'jadwal dokter klinik bogor barat', 'jadwal praktik dokter ciampea',
    'jadwal dokter 24 jam bogor', 'jadwal poli umum ciampea',
    'jadwal dokter gigi ciampea', 'dokter jaga bogor barat',
  ],
  alternates: {
    canonical: 'https://klinikdrsuhendra.id/jadwal',
  },
  openGraph: {
    title: 'Jadwal Dokter Klinik dr. Suhendra | Praktik Dokter Bogor Barat',
    description: 'Jadwal praktik dokter umum & gigi di 6 cabang Bogor Barat. IGD & dokter jaga 24 jam nonstop.',
    url: 'https://klinikdrsuhendra.id/jadwal',
    images: [{ url: '/assets/gambar2.jpg', width: 1200, height: 630 }],
  },
};

export default function JadwalLayout({ children }) {
  return children;
}
