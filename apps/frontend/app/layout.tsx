import type { Metadata } from 'next';
import '../styles/globals.css';
import BottomNavigation from '@/components/layout/bottom-navigation/bottom-navigation';
import Header from '@/components/layout/header/header';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'CHAPDO',
  description: 'Chapdo Blog',
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
      <body className="flex justify-center bg-gray-100">
        <div className="w-full max-w-[600px] min-h-screen bg-white shadow-md relative">
          <Header />
          <div className="mt-[48px] mb-[66px]">{children}</div>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
