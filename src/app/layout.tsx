import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://m9ad.ru'),
  title: "M9 — Архитектура и дизайн интерьера",
  description: "Бюро архитектуры и дизайна интерьера M9. Проектируем пространство, где вам не нужно думать о привычках.",
  icons: {
    icon: '/images/favic/favik.jpg',
  },
  openGraph: {
    title: "M9 — Архитектура и дизайн интерьера",
    description: "Бюро архитектуры и дизайна интерьера M9. Проектируем пространство, где вам не нужно думать о привычках.",
    url: 'https://m9ad.ru',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/MainPage/001_0000.JPG',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
