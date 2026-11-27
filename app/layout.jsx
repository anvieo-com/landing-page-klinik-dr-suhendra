import './globals.css';

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
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-white text-slate-800 antialiased selection:bg-navy-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
