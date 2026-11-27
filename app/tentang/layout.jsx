// Server Component — JANGAN tambahkan 'use client' di file ini
// Metadata ini spesifik untuk halaman /tentang

export const metadata = {
  title: 'Tentang Kami — Profil & Sejarah Klinik dr. Suhendra Bogor Barat',
  description: 'Profil lengkap Klinik dr. Suhendra: sejarah, visi misi, tim dokter berpengalaman, dan 6 cabang aktif di Bogor Barat. Melayani masyarakat Ciampea, Cibungbulang & sekitarnya selama 10+ tahun.',
  keywords: [
    'profil klinik dr suhendra', 'sejarah klinik bogor barat', 'visi misi klinik ciampea',
    'tim dokter klinik bogor', 'tentang klinik suhendra',
  ],
  alternates: {
    canonical: 'https://klinikdrsuhendra.id/tentang',
  },
  openGraph: {
    title: 'Tentang Klinik dr. Suhendra | Profil & Sejarah Klinik Bogor Barat',
    description: 'Profil Klinik dr. Suhendra: 10+ tahun melayani masyarakat Bogor Barat, 6 cabang aktif, 20+ dokter berpengalaman.',
    url: 'https://klinikdrsuhendra.id/tentang',
    images: [{ url: '/assets/tentang-dokter-pasien.jpg', width: 1200, height: 630 }],
  },
};

export default function TentangLayout({ children }) {
  return children;
}
