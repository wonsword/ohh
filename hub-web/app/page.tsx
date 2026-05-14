import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { ConsultationForm } from './components/ConsultationForm';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { branches, cases, faqs, fields, heroSlides, hubSite, insights, lawyers, stats } from './site-content';

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
  const pinnedCases = [...cases].sort((a, b) => (a.pinnedOrder ?? 99) - (b.pinnedOrder ?? 99)).slice(0, 4);
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
        <div className="hero-copy">
          <p className="eyebrow">{heroSlides[0].eyebrow}</p>
          <strong className="hero-kicker">오직 결과로 증명하는</strong>
          <h1 id="hero-title">{heroSlides[0].title}</h1>
          <span className="hero-subtitle">PROFESSIONAL LAW GROUP</span>
          <p>{heroSlides[0].lead}</p>
          <form className="hero-search" action="/search">
            <input name="q" aria-label="통합 검색어" placeholder="업무분야, 변호사, 업무사례, 법률정보 검색" />
            <button type="submit">통합검색</button>
          </form>
          <div className="hero-links">
            <a href="/cases">업무사례 보기</a>
            <a href="/lawyers">변호사 찾기</a>
            <a href="/contact">상담 예약</a>
          </div>
        </div>
        <div className="hero-visual" aria-label="오현 상담 안내">
          <div>
            <span>24시간, 지역별 상담 가능</span>
            <strong>1661-2661</strong>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="오현 성과데이터">
        {stats.map((item) => (
          <a key={item.label} href={item.href}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </a>
        ))}
      </section>

      <section className="section lawyer-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">LAWYERS</p>
            <h2>법무법인 오현의 변호사</h2>
          </div>
          <a href="/lawyers">구성원 전체보기</a>
        </div>
        <div className="lawyer-grid">
          {lawyers.slice(0, 6).map((lawyer) => (
            <a className="lawyer-card" href={`/lawyers/${lawyer.id}`} key={lawyer.id} style={{ '--lawyer-image': `url(${lawyer.image})` } as LawyerStyle}>
              <span>{lawyer.badges.join(' · ')}</span>
              <strong>{lawyer.name}</strong>
              <small>{lawyer.title}</small>
              <p>{lawyer.headline}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="quick-service section" aria-label="오현 바로가기">
        <a href="/cases">
          <span>업무사례</span>
          <strong>축적된 오현의 노하우를 확인해 보세요</strong>
        </a>
        <a href="/legal-info">
          <span>법률정보</span>
          <strong>최근 법률 이슈와 실무 정보를 확인해 보세요</strong>
        </a>
        <a href="/faq">
          <span>지식인</span>
          <strong>실제 의뢰인이 궁금해한 질문을 확인해 보세요</strong>
        </a>
        <a href="/contact">
          <span>고객센터</span>
          <strong>사소한 문제도 최선을 다해 조력하겠습니다</strong>
        </a>
      </section>

      <section className="section fields-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">PRACTICE AREAS</p>
            <h2>업무분야</h2>
          </div>
          <a href="/fields">업무분야 전체보기</a>
        </div>
        <div className="field-groups">
          {groupedFields.map(([group, items]) => (
            <article key={group}>
              <h3>{group}</h3>
              <div>
                {items.map((field) => (
                  <a href={field.href} key={field.id}>
                    <strong>{field.name}</strong>
                    <span>{field.caseCount.toLocaleString()}건</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

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

      <section className="section branch-consult">
        <div className="branch-map">
          <p className="eyebrow">NATIONWIDE OFFICES</p>
          <h2>전국 16개 분사무소 상담 네트워크</h2>
          <p>가까운 지점을 선택하거나 대표번호와 온라인 상담으로 사건을 접수할 수 있습니다.</p>
          <div>
            {branches.map((branch) => (
              <a href="/about/location" key={branch.id}>{branch.city}</a>
            ))}
          </div>
        </div>
        <ConsultationForm compact />
      </section>

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
              <span>{faq.category}</span>
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

      <section className="section youtube-section">
        <div>
          <p className="eyebrow">OHYUN LAW CHANNEL</p>
          <h2>영상으로 확인하는 법률 이슈와 사건 해설</h2>
          <p>복잡한 법률 이슈와 실제 사건 쟁점을 영상으로 쉽게 확인할 수 있습니다.</p>
        </div>
        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
          <span>VIEW CHANNEL</span>
          <strong>최신 법률 이슈 보기</strong>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
