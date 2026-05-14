import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ohyunlaw.com'),
  title: {
    default: '법무법인 오현 | 형사·민사·경제범죄 법률상담',
    template: '%s'
  },
  description: '법무법인 오현의 업무사례, 구성원, 전국 사무소, 법률정보와 상담 안내를 확인하세요.',
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
