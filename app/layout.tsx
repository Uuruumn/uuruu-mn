import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  metadataBase: new URL('https://uuruu.mn'),
  title: {
    default: 'Uuruu.mn — Үл хөдлөх хөрөнгийн зарын платформ',
    template: '%s | Uuruu.mn',
  },
  description: 'Улаанбаатар хотын орон сууц, газар, хашаа байшингийн зар. Түрээс болон худалдааны үл хөдлөх хөрөнгийн мэдээлэл.',
  keywords: ['үл хөдлөх хөрөнгө', 'орон сууц', 'газар зарна', 'түрээс', 'хашаа байшин', 'Улаанбаатар', 'UB', 'зар'],
  openGraph: {
    type: 'website',
    locale: 'mn_MN',
    url: 'https://uuruu.mn',
    siteName: 'Uuruu.mn',
    title: 'Uuruu.mn — Үл хөдлөх хөрөнгийн зарын платформ',
    description: 'Улаанбаатар хотын орон сууц, газар, хашаа байшингийн зар. Түрээс болон худалдааны үл хөдлөх хөрөнгийн мэдээлэл.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uuruu.mn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uuruu.mn — Үл хөдлөх хөрөнгийн зарын платформ',
    description: 'Улаанбаатар хотын орон сууц, газар, хашаа байшингийн зар.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://uuruu.mn',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Uuruu.mn',
  url: 'https://uuruu.mn',
  description: 'Улаанбаатар хотын үл хөдлөх хөрөнгийн зарын платформ',
  areaServed: {
    '@type': 'City',
    name: 'Улаанбаатар',
    addressCountry: 'MN',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isManage = pathname.startsWith('/manage');

  return (
    <html lang="mn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mongolian&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {!isManage && <Header />}
        {children}
        {!isManage && <Footer />}
      </body>
    </html>
  );
}