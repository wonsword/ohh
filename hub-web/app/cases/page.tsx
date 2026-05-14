import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { cases, fields } from '../site-content';
import { CaseList } from './CaseList';

export const metadata: Metadata = {
  title: '업무사례',
  description: '형사, 민사, 경제범죄 등 오현의 분야별 업무사례와 결과를 확인하세요.',
  alternates: { canonical: 'https://www.ohyunlaw.com/cases' }
};

export default function CasesPage() {
  const sortedCases = [...cases].sort((a, b) => (a.pinnedOrder ?? 99) - (b.pinnedOrder ?? 99));

  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="SUCCESS CASES" title="업무사례" description="형사, 민사, 경제범죄 등 오현의 분야별 업무사례와 결과를 확인하세요." image="/reference-assets/ohyun/homepage-12.jpg" />
      <CaseList cases={sortedCases} fields={fields} />
      <SiteFooter />
    </main>
  );
}
