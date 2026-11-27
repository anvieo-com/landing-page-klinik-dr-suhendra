// app/robots.js — Next.js App Router auto-generates /robots.txt from this file
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://klinikdrsuhendra.id/sitemap.xml',
    host: 'https://klinikdrsuhendra.id',
  };
}
