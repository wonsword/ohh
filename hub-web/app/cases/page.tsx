import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { cases, fields } from '../site-content';

export const metadata: Metadata = {
  title: '업무사례 | 법무법인 오현',
  description: '형사, 민사, 경제범죄 등 오현의 분야별 업무사례와 결과를 확인하세요.'
};

export default function CasesPage() {
  const sortedCases = [...cases].sort((a, b) => (a.pinnedOrder ?? 99) - (b.pinnedOrder ?? 99));

  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="SUCCESS CASES" title="업무사례" description="형사, 민사, 경제범죄 등 오현의 분야별 업무사례와 결과를 확인하세요." image="/reference-assets/ohyun/homepage-12.jpg" />
      <section className="filter-band">
        <a href="/cases">전체</a>
        {fields.slice(0, 12).map((field) => <a href={`/cases?field=${field.slug}`} key={field.id}>{field.name}</a>)}
      </section>
      <section className="case-board">
        {sortedCases.map((item, index) => (
          <a href={`/cases/${item.slug}`} className="case-row" key={item.id}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <em>{item.field}</em>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
            </div>
            <b>{item.result}</b>
          </a>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
