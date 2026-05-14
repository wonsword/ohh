import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { insights } from '../site-content';

export const metadata: Metadata = {
  title: '사례분석 | 법무법인 오현',
  description: '법무법인 오현 변호사가 작성하는 사례분석과 최신 실무 동향입니다.'
};

export default function InsightsPage() {
  const items = insights.filter((item) => item.type === '사례분석');

  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="CASE ANALYSIS" title="사례분석" description="업무사례의 쟁점과 최신 동향을 변호사 칼럼 형식으로 정리합니다." image="/reference-assets/ohyun/homepage-12.jpg" />
      <section className="article-list">
        {items.map((item) => (
          <a className="article-card feature" href="/insights" key={item.id}>
            <span>{item.field} · {item.author}</span>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <time>{item.publishedAt}</time>
          </a>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
