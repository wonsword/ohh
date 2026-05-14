import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { reviews } from '../site-content';

export const metadata: Metadata = {
  title: '의뢰인 후기 | 법무법인 오현',
  description: '법무법인 오현 의뢰인이 남긴 상담 및 사건 진행 후기입니다.',
  alternates: { canonical: 'https://www.ohyunlaw.com/reviews' }
};

export default function ReviewsPage() {
  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="REVIEWS" title="의뢰인 후기" description="오현을 찾은 의뢰인들의 상담과 사건 진행 후기를 확인하세요." image="/reference-assets/ohyun/homepage-12.jpg" />
      <section className="review-list">
        {reviews.map((review, index) => (
          <article className="review-card" key={review.id}>
            <span>{review.field} REVIEW {String(index + 1).padStart(2, '0')}</span>
            <h2>{review.title}</h2>
            <p>{review.body}</p>
            <a href="/contact">상담 신청</a>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
