import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import NavigationLoader from '@/components/NavigationLoader';
import DeraAIWidget from '@/components/DeraAIWidget';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const BASE_URL = 'https://klinikdrsuhendra.id';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Klinik dr. Suhendra Bogor Barat | IGD & Dokter 24 Jam Ciampea',
    template: '%s | Klinik dr. Suhendra',
  },
  description: 'Klinik 24 jam di Bogor Barat & Ciampea. IGD, rawat inap, poli umum, kebidanan KIA, laboratorium & apotek. 6 cabang aktif: Bojong Jengkol, Tapos, Cibungbulang, Karihkil, Ciampea Udik. Hubungi sekarang!',
  keywords: [
    'klinik dr suhendra', 'klinik 24 jam ciampea', 'klinik bogor barat',
    'dokter 24 jam bogor', 'IGD 24 jam bogor barat', 'rawat inap ciampea',
    'klinik cibungbulang', 'klinik tenjolaya', 'klinik karihkil',
    'klinik medika tapos', 'klinik bojong jengkol', 'dokter umum bogor',
    'bidan ciampea', 'poli gigi ciampea', 'laboratorium klinik bogor barat',
    'apotek 24 jam ciampea', 'klinik pratama bogor barat',
  ],
  authors: [{ name: 'Klinik dr. Suhendra', url: BASE_URL }],
  creator: 'Klinik dr. Suhendra',
  publisher: 'Klinik dr. Suhendra',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/logo-lg.png', type: 'image/png', sizes: '500x500' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: BASE_URL,
    siteName: 'Klinik dr. Suhendra',
    title: 'Klinik dr. Suhendra Bogor Barat | IGD & Dokter 24 Jam',
    description: 'Klinik 24 jam terpercaya di Bogor Barat. 6 cabang aktif di Ciampea, Cibungbulang & sekitarnya. IGD, rawat inap, poli umum, KIA, lab & apotek.',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Klinik dr. Suhendra — Dokter & IGD 24 Jam Bogor Barat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klinik dr. Suhendra | IGD & Dokter 24 Jam Bogor Barat',
    description: 'Klinik 24 jam di Ciampea, Bogor Barat. 6 cabang aktif. IGD, rawat inap, poli umum, lab & apotek.',
    images: ['/assets/og-image.jpg'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// JSON-LD Structured Data — MedicalClinic + LocalBusiness
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['MedicalClinic', 'LocalBusiness'],
      '@id': `${BASE_URL}/#clinic`,
      name: 'Klinik dr. Suhendra',
      alternateName: ['Klinik Medika Tapos', 'Klinik Medika Karihkil', 'Klinik Medika Cihideung', 'Klinik Medika Pasar Rebo'],
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/assets/logo.png`,
      },
      image: `${BASE_URL}/assets/hero-doctor-new.jpg`,
      description: 'Pusat pelayanan kesehatan 24 jam di Bogor Barat dengan 6 cabang aktif di Ciampea, Cibungbulang, Tenjolaya, Karihkil, dan sekitarnya.',
      telephone: '+6282311188250',
      email: 'Hai@klinikdrsuhendra.id',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jl. Raya Bojong Jengkol No. 45',
        addressLocality: 'Ciampea',
        addressRegion: 'Bogor',
        postalCode: '16620',
        addressCountry: 'ID',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -6.5713042,
        longitude: 106.7077089,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      priceRange: 'Rp Rp',
      currenciesAccepted: 'IDR',
      paymentAccepted: 'Cash, Transfer Bank, BPJS Kesehatan, Asuransi Swasta',
      medicalSpecialty: ['GeneralPractice', 'EmergencyMedicine', 'Obstetrics', 'Dentistry'],
      availableService: [
        { '@type': 'MedicalTherapy', name: 'IGD 24 Jam' },
        { '@type': 'MedicalTherapy', name: 'Rawat Inap' },
        { '@type': 'MedicalTherapy', name: 'Poli Umum' },
        { '@type': 'MedicalTherapy', name: 'Kebidanan & KIA' },
        { '@type': 'MedicalTherapy', name: 'Laboratorium Klinik' },
        { '@type': 'MedicalTherapy', name: 'Apotek' },
        { '@type': 'MedicalTherapy', name: 'Poli Gigi' },
      ],
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 20 },
      foundingDate: '2014',
      areaServed: [
        { '@type': 'City', name: 'Bogor' },
        { '@type': 'AdministrativeArea', name: 'Bogor Barat' },
        { '@type': 'AdministrativeArea', name: 'Ciampea' },
        { '@type': 'AdministrativeArea', name: 'Cibungbulang' },
        { '@type': 'AdministrativeArea', name: 'Tenjolaya' },
        { '@type': 'AdministrativeArea', name: 'Ciseeng' },
      ],
      hasMap: 'https://maps.google.com/?q=Klinik+dr+Suhendra+Bojong+Jengkol',
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#org`,
      name: 'Klinik dr. Suhendra',
      url: BASE_URL,
      logo: `${BASE_URL}/assets/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+6282311188250',
        contactType: 'customer service',
        availableLanguage: 'Indonesian',
        contactOption: 'TollFree',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable}`}>
      <body className={`${inter.className} bg-white text-slate-800 antialiased selection:bg-navy-900 selection:text-white`}>
        <NavigationLoader />
        {children}
        <DeraAIWidget />
        <Script
          id="structured-data-clinic"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
