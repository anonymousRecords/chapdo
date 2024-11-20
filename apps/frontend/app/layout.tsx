import type { Metadata } from 'next';
import '../styles/globals.css';
import BottomNavigation from '@/components/layout/bottom-navigation/bottom-navigation';
import Header from '@/components/layout/header/header';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center bg-gray-100">
        <div className="w-full max-w-[600px] min-h-screen bg-white shadow-md relative">
          <Header />
          <div className='mt-[48px] mb-[66px]'>{children}</div>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
