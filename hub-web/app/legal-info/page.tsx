import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { insights } from '../site-content';

export const metadata: Metadata = {
  title: '법률정보',
  description: '상담 전 확인하면 좋은 법무법인 오현의 분야별 법률정보와 실무 콘텐츠입니다.',
  alternates: { canonical: 'https://www.ohyunlaw.com/legal-info' }
};

export default function LegalInfoPage() {
  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="LEGAL INFO" title="법률정보" description="상담 전 확인하면 좋은 법률정보와 실무 콘텐츠를 최신순으로 제공합니다." />
      <section className="article-list">
        {insights.map((item) => (
          <a className="article-card" href="/legal-info" key={item.id}>
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
