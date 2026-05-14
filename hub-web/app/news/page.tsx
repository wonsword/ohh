import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { newsItems } from '../site-content';

export const metadata: Metadata = {
  title: '언론보도·오현소식 | 법무법인 오현',
  description: '법무법인 오현의 언론보도, 공지, 주요 소식을 확인하세요.'
};

export default function NewsPage() {
  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="NEWS" title="언론보도·오현소식" description="법무법인 오현의 언론보도, 공지, 주요 소식을 확인하세요." />
      <section className="news-grid">
        {newsItems.filter((item) => item.type !== '인재채용').map((item) => (
          <a className="news-card" href="/news" key={item.id}>
            <span>{item.type}</span>
            <h2>{item.title}</h2>
            <time>{item.date}</time>
          </a>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
