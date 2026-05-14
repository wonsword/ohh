import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { fields, lawyers } from '../site-content';
import { LawyerList } from './LawyerList';

export const metadata: Metadata = {
  title: '구성원 소개',
  description: '법무법인 오현의 변호사 구성원, 주요 경력, 담당 분야를 확인하고 사건에 맞는 변호사 상담으로 연결합니다.',
  alternates: { canonical: 'https://www.ohyunlaw.com/lawyers' }
};

export default function LawyersPage() {
  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="LAWYERS" title="구성원 소개" description="법무법인 오현 변호사의 주요 경력과 담당 분야를 확인하세요." image="/reference-assets/ohyun/homepage-05.jpg" />
      <LawyerList lawyers={lawyers} fields={fields} />
      <SiteFooter />
    </main>
  );
}
