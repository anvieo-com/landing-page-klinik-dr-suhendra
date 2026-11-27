// Server Component — JANGAN tambahkan 'use client' di file ini
// Metadata ini spesifik untuk halaman /kegiatan

export const metadata = {
  title: 'Kegiatan & Berita — Bakti Sosial & Edukasi Kesehatan Klinik dr. Suhendra',
  description: 'Portal warta dan kegiatan Klinik dr. Suhendra: program bakti sosial, pengobatan gratis, edukasi kesehatan keluarga, dan dokumentasi pengabdian masyarakat di wilayah Bogor Barat dan Ciampea.',
  keywords: [
    'kegiatan klinik bogor barat', 'bakti sosial klinik ciampea',
    'pengobatan gratis bogor barat', 'edukasi kesehatan ciampea',
    'berita klinik dr suhendra', 'program sosial klinik bogor',
  ],
  alternates: {
    canonical: 'https://klinikdrsuhendra.id/kegiatan',
  },
  openGraph: {
    title: 'Kegiatan & Berita Klinik dr. Suhendra | Bakti Sosial Bogor Barat',
    description: 'Portal kegiatan klinik: bakti sosial, pengobatan gratis, dan edukasi kesehatan untuk masyarakat Bogor Barat.',
    url: 'https://klinikdrsuhendra.id/kegiatan',
    images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function KegiatanLayout({ children }) {
  return children;
}
