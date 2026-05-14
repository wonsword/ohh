import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { ConsultationForm } from './components/ConsultationForm';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { branches, cases, faqs, fields, heroSlides, hubSite, insights, lawyers, reviews, stats, youtubeVideos } from './site-content';

type LawyerStyle = CSSProperties & Record<'--lawyer-image', string>;

export const metadata: Metadata = {
  title: hubSite.seo.title,
  description: hubSite.seo.description,
  keywords: hubSite.seo.keywords,
  alternates: { canonical: hubSite.seo.canonical },
  openGraph: {
    title: hubSite.seo.title,
    description: hubSite.seo.description,
    images: [hubSite.seo.ogImage],
    type: 'website'
  }
};

export default function Home() {
  const pinnedCases = [...cases].sort((a, b) => (a.pinnedOrder ?? 99) - (b.pinnedOrder ?? 99)).slice(0, 3);
  const featuredReviews = reviews.filter((r) => r.featuredOnMain);
  const uniqueBranchCities = [...new Set(branches.map((b) => b.city))];
  const groupedFields = Object.entries(
    fields.reduce<Record<string, typeof fields>>((acc, field) => {
      acc[field.group] = [...(acc[field.group] ?? []), field];
      return acc;
    }, {})
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: '법무법인 오현',
    url: 'https://www.ohyunlaw.com',
    telephone: '1661-2661',
    areaServed: 'KR',
    image: 'https://www.ohyunlaw.com/reference-assets/ohyun/common/logo.png',
    sameAs: ['https://xn--v92b7yba209gttbpx5b.com/']
  };

  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hub-hero" aria-labelledby="hero-title">
        <div className="hero-track" aria-live="polite">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={index !== 0}
            >
              <div className="hero-copy">
                <p className="eyebrow">{slide.eyebrow}</p>
                <h1 id={index === 0 ? 'hero-title' : undefined}>{slide.title}</h1>
                <p className="hero-lead">{slide.lead}</p>
                {index === 0 && (
                  <div className="hero-cta">
                    <a className="btn-primary" href="/cases">업무사례 보기</a>
                    <a className="btn-outline" href="/contact">무료 상담 예약</a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="hero-phone-badge" aria-label="24시간 상담 전화">
          <span>24시간 지역별 상담</span>
          <strong>1661-2661</strong>
        </div>
        <div className="hero-indicators" aria-hidden="true">
          {heroSlides.map((_, i) => (
            <span key={i} className="hero-dot" />
          ))}
        </div>
      </section>

      {/* ── 성과 수치 ── */}
      <section className="stats-band" aria-label="오현 성과데이터">
        {stats.map((item) => (
          <a key={item.label} href={item.href}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </a>
        ))}
      </section>

      {/* ── 의뢰인 후기 ── */}
      <section className="section review-section" aria-label="의뢰인 후기">
        <div className="section-head">
          <div>
            <p className="eyebrow">CLIENT REVIEWS</p>
            <h2>의뢰인이 직접 전하는 후기</h2>
          </div>
          <a href="/reviews">후기 전체보기</a>
        </div>
        <div className="review-titles">
          {featuredReviews.map((review) => (
            <a href="/reviews" key={review.id}>
              <span>{review.field}</span>
              <strong>{review.title}</strong>
              <p>{review.body}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── 변호사 ── */}
      <section className="section lawyer-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">LAWYERS</p>
            <h2>형사·민사·경제범죄 전문 변호사</h2>
          </div>
          <a href="/lawyers">구성원 전체보기</a>
        </div>
        <div className="lawyer-grid">
          {lawyers.slice(0, 8).map((lawyer) => (
            <a className="lawyer-card" href={`/lawyers/${lawyer.id}`} key={lawyer.id} style={{ '--lawyer-image': `url(${lawyer.image})` } as LawyerStyle}>
              <span>{lawyer.badges.join(' · ')}</span>
              <strong>{lawyer.name}</strong>
              <small>{lawyer.title}</small>
              <p>{lawyer.headline}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── 빠른 서비스 ── */}
      <section className="quick-service section" aria-label="오현 바로가기">
        <a href="/cases">
          <span>업무사례</span>
          <strong>8,253건 누적 사례로 검증된 오현의 노하우</strong>
        </a>
        <a href="/legal-info">
          <span>법률정보</span>
          <strong>변호사가 직접 작성한 최신 법률 정보</strong>
        </a>
        <a href="/faq">
          <span>법률지식인</span>
          <strong>실제 의뢰인이 가장 많이 묻는 질문</strong>
        </a>
        <a href="/contact">
          <span>무료 상담</span>
          <strong>24시간 언제든지 상담을 접수하세요</strong>
        </a>
      </section>

      {/* ── 업무분야 ── */}
      <section className="section fields-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">PRACTICE AREAS</p>
            <h2>오현이 다루는 업무분야</h2>
          </div>
          <a href="/fields">업무분야 전체보기</a>
        </div>
        <div className="field-bands">
          {groupedFields.map(([group, items]) => (
            <div className="field-band" key={group}>
              <span className="field-band-label">{group}</span>
              <div className="field-band-chips">
                {items.map((field) => (
                  <a href={field.href} key={field.id} className="field-chip">
                    <strong>{field.name}</strong>
                    <span>{field.caseCount.toLocaleString()}건</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 업무사례 ── */}
      <section className="section case-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">SUCCESS CASES</p>
            <h2>오현의 주요 업무사례</h2>
          </div>
          <a href="/cases">업무사례 전체보기</a>
        </div>
        <div className="case-list">
          {pinnedCases.map((item) => (
            <a className="case-card" href={`/cases/${item.slug}`} key={item.id}>
              <span>{item.field}</span>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
              <em>{item.result}</em>
            </a>
          ))}
        </div>
      </section>

      {/* ── 전국 사무소 + 상담폼 ── */}
      <section className="section branch-consult">
        <div className="branch-map">
          <p className="eyebrow">NATIONWIDE OFFICES</p>
          <h2>전국 16개 분사무소 상담 네트워크</h2>
          <p>가까운 지점을 선택하거나 대표번호와 온라인 상담으로 사건을 접수할 수 있습니다.</p>
          <div>
            {uniqueBranchCities.map((city) => (
              <a href="/about/location" key={city}>{city}</a>
            ))}
          </div>
        </div>
        <ConsultationForm compact />
      </section>

      {/* ── FAQ · 법률정보 ── */}
      <section className="section content-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">FAQ · LEGAL INFO</p>
            <h2>상담 전 확인하는 법률정보</h2>
          </div>
          <a href="/legal-info">법률정보 전체보기</a>
        </div>
        <div className="content-grid">
          {faqs.slice(0, 2).map((faq) => (
            <a href="/faq" key={faq.id}>
              <span>법률지식인</span>
              <strong>{faq.question}</strong>
              <p>{faq.answer}</p>
            </a>
          ))}
          {insights.slice(0, 2).map((item) => (
            <a href={item.type === '사례분석' ? '/insights' : '/legal-info'} key={item.id}>
              <span>{item.type}</span>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── YouTube ── */}
      <section className="section youtube-section">
        <div className="youtube-intro">
          <p className="eyebrow">OHYUN LAW CHANNEL</p>
          <h2>영상으로 확인하는 법률 이슈와 사건 해설</h2>
          <p>복잡한 법률 쟁점과 실제 사건 경위를 변호사가 직접 설명합니다.</p>
          <a href="https://www.youtube.com/" className="btn-yt" target="_blank" rel="noreferrer">채널 바로가기</a>
        </div>
        <div className="youtube-grid">
          {youtubeVideos.map((v) => (
            <a
              key={v.id}
              href={v.url}
              className="youtube-card"
              target="_blank"
              rel="noreferrer"
              style={{ backgroundImage: `url(${v.thumbnail})` }}
              aria-label={v.title}
            >
              <div className="youtube-play" aria-hidden="true">▶</div>
              <strong>{v.title}</strong>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
