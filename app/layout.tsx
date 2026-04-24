import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Uuruu.mn — Үл хөдлөх хөрөнгийн зарын платформ',
  description: 'Үл хөдлөх хөрөнгийн орчин үеийн зарын платформ',
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
      </head>
      <body>
        {!isManage && <Header />}
        {children}
        {!isManage && <Footer />}
      </body>
    </html>
  );
}