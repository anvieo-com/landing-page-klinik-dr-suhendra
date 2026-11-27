// Server Component — JANGAN tambahkan 'use client' di file ini
// Metadata ini spesifik untuk halaman /layanan

export const metadata = {
  title: 'Layanan Medis Lengkap — IGD, Rawat Inap, Lab & Apotek Bogor Barat',
  description: 'Layanan medis Klinik dr. Suhendra: IGD 24 jam, rawat inap, poli umum, kebidanan & KIA, laboratorium diagnostik, apotek, dan poli gigi. Tersedia di 6 cabang wilayah Bogor Barat dan Ciampea.',
  keywords: [
    'layanan klinik bogor barat', 'IGD 24 jam ciampea', 'rawat inap bogor barat',
    'poli umum ciampea', 'kebidanan kia bogor', 'laboratorium klinik ciampea',
    'apotek 24 jam bogor barat', 'poli gigi ciampea bogor',
  ],
  alternates: {
    canonical: 'https://klinikdrsuhendra.id/layanan',
  },
  openGraph: {
    title: 'Layanan Medis Klinik dr. Suhendra | IGD, Rawat Inap, Lab & Apotek',
    description: 'Layanan medis lengkap di Bogor Barat: IGD 24 jam, rawat inap, poli umum, KIA, lab & apotek. 6 cabang aktif.',
    url: 'https://klinikdrsuhendra.id/layanan',
    images: [{ url: '/assets/gambar1.jpg', width: 1200, height: 630 }],
  },
};

export default function LayananLayout({ children }) {
  return children;
}
