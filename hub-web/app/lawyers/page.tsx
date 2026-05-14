import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { fields, lawyers } from '../site-content';

type LawyerStyle = CSSProperties & Record<'--lawyer-image', string>;

export const metadata: Metadata = {
  title: '구성원 소개 | 법무법인 오현',
  description: '법무법인 오현의 변호사 구성원, 주요 경력, 담당 분야를 확인하고 사건에 맞는 변호사 상담으로 연결합니다.'
};

export default function LawyersPage() {
  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="LAWYERS" title="구성원 소개" description="법무법인 오현 변호사의 주요 경력과 담당 분야를 확인하세요." image="/reference-assets/ohyun/lawyers/lawyer-home-01.png" />
      <section className="filter-band">
        <a href="/lawyers">전체</a>
        {fields.slice(0, 10).map((field) => <a href={`/lawyers?field=${field.slug}`} key={field.id}>{field.name}</a>)}
      </section>
      <section className="profile-grid">
        {lawyers.map((lawyer) => (
          <article className="profile-card" id={lawyer.id} key={lawyer.id}>
            <div className="profile-photo" style={{ '--lawyer-image': `url(${lawyer.image})` } as LawyerStyle} />
            <div>
              <span>{lawyer.badges.join(' · ')}</span>
              <h2>{lawyer.name}</h2>
              <p>{lawyer.title}</p>
              <strong>{lawyer.headline}</strong>
              <ul>
                {lawyer.career.map((career) => <li key={career}>{career}</li>)}
              </ul>
              <a href={`/lawyers/${lawyer.id}`}>상세보기</a>
            </div>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
