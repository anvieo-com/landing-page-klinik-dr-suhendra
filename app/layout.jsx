import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Klinik dr. Suhendra | Pelayanan Kesehatan Terbaik & Siaga 24 Jam Bogor',
  description: 'Klinik dr. Suhendra melayani rawat jalan, rawat inap, IGD 24 jam, kebidanan & KIA, laboratorium, dan apotek dengan 6 cabang aktif di wilayah Bogor dan sekitarnya.',
  keywords: 'klinik dr suhendra, klinik bojong jengkol, klinik 24 jam bogor, dokter umum bogor, rawat inap ciampea, klinik medika tapos',
  icons: {
    icon: '/assets/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable}`}>
      <body className={`${inter.className} bg-white text-slate-800 antialiased selection:bg-navy-900 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
