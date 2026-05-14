import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { newsItems } from '../site-content';

export const metadata: Metadata = {
  title: '인재채용 | 법무법인 오현',
  description: '법무법인 오현 인재채용 안내 페이지입니다.'
};

export default function CareersPage() {
  const careers = newsItems.filter((item) => item.type === '인재채용');

  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="CAREERS" title="인재채용" description="송무, 상담, 운영 직군의 채용 소식과 지원 안내를 확인하세요." image="/reference-assets/ohyun/homepage-07.png" />
      <section className="news-grid">
        {careers.map((item) => (
          <a className="news-card" href="/careers" key={item.id}>
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
