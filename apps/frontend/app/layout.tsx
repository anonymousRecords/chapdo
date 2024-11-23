import '../styles/globals.css';
import BottomNavigation from '@/components/layout/bottom-navigation/bottom-navigation';
import Header from '@/components/layout/header/header';
import GoogleAnalytics from '@/lib/google-analytics';
import { Metadata } from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'CHAPDO',
  description: 'Chapdo Blog',
  keywords: 'Chapdo, Blog',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'CHAPDO',
    description: 'Chapdo Blog',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'CHAPDO',
    url: 'https://chapdo.life',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: 'CHAPDO',
      },
    ],
  },
};

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-ExtraBold.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="flex justify-center bg-gray-100">
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <div className="w-full max-w-[600px] min-h-screen bg-white shadow-md relative">
          <Header />
          <div className="mt-[48px] mb-[66px]">{children}</div>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
