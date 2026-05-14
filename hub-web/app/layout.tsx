import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ohyunlaw.com'),
  title: {
    default: '법무법인 오현 | 형사·민사·경제범죄 법률상담',
    template: '%s | 법무법인 오현'
  },
  description: '법무법인 오현은 형사, 민사, 경제범죄, 이혼, 부동산 등 주요 분야의 전문 변호사와 함께 사건의 시작부터 해결까지 조력합니다.',
  alternates: {
    canonical: 'https://www.ohyunlaw.com'
  },
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
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
