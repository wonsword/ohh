import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '../../components/SiteFooter';
import { SiteHeader } from '../../components/SiteHeader';
import { cases, fields, lawyers } from '../../site-content';

type LawyerDetailParams = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return lawyers.map((lawyer) => ({ id: lawyer.id }));
}

export async function generateMetadata({ params }: LawyerDetailParams): Promise<Metadata> {
  const { id } = await params;
  const lawyer = lawyers.find((item) => item.id === id);

  if (!lawyer) {
    return { title: '구성원 소개 | 법무법인 오현' };
  }

  return {
    title: `${lawyer.name} ${lawyer.title} | 구성원 소개 | 법무법인 오현`,
    description: `${lawyer.name} ${lawyer.title}의 주요 경력과 담당 분야를 확인하세요. ${lawyer.headline}`,
    alternates: { canonical: `/lawyers/${lawyer.id}` },
    openGraph: {
      title: `${lawyer.name} ${lawyer.title}`,
      description: lawyer.headline,
      images: [lawyer.image],
      type: 'profile'
    }
  };
}

function getLawyerMessage(lawyer: (typeof lawyers)[number]) {
  return `${lawyer.name} ${lawyer.title}는 ${lawyer.fields.join(', ')} 분야에서 사건의 핵심 쟁점을 빠르게 정리하고 의뢰인에게 필요한 대응 방향을 제시합니다.`;
}

export default async function LawyerDetailPage({ params }: LawyerDetailParams) {
  const { id } = await params;
  const lawyer = lawyers.find((item) => item.id === id);

  if (!lawyer) {
    notFound();
  }

  const relatedFields = fields.filter((field) => lawyer.fields.some((name) => field.name.includes(name) || name.includes(field.name))).slice(0, 6);
  const relatedCases = cases.filter((item) => lawyer.fields.some((name) => item.field.includes(name) || name.includes(item.field))).slice(0, 3);
  const otherLawyers = lawyers.filter((item) => item.id !== lawyer.id).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: lawyer.name,
    jobTitle: lawyer.title,
    image: `https://www.ohyunlaw.com${lawyer.image}`,
    worksFor: {
      '@type': 'LegalService',
      name: '법무법인 오현'
    },
    knowsAbout: lawyer.fields
  };

  return (
    <main className="lawyer-detail-page">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="lawyer-detail-hero">
        <div className="lawyer-hero-copy">
          <nav aria-label="현재 위치">
            <a href="/">Home</a>
            <a href="/lawyers">구성원 소개</a>
            <span>{lawyer.name}</span>
          </nav>
          <p className="eyebrow">LAWYER PROFILE</p>
          <h1>{lawyer.name}</h1>
          <strong>{lawyer.title}</strong>
          <p>{lawyer.headline}</p>
          <div className="lawyer-hero-tags">
            {lawyer.badges.map((badge) => <span key={badge}>{badge}</span>)}
          </div>
          <div className="lawyer-hero-actions">
            <a href="/contact">상담예약</a>
            <a href="tel:16612661">1661-2661</a>
          </div>
        </div>
        <div className="lawyer-hero-photo">
          <img src={lawyer.image} alt={`${lawyer.name} ${lawyer.title}`} />
        </div>
      </section>

      <nav className="lawyer-detail-tabs" aria-label="구성원 상세 섹션">
        <a href="#intro">소개</a>
        <a href="#career">경력</a>
        <a href="#related-cases">업무사례</a>
        <a href="#related-fields">업무분야</a>
      </nav>

      <section className="lawyer-detail-body">
        <div className="lawyer-main-column">
          <section className="lawyer-intro-section" id="intro">
            <div>
              <p className="eyebrow">MESSAGE</p>
              <h2>의뢰인의 사건을 끝까지 살피겠습니다.</h2>
            </div>
            <article>
              <p>{getLawyerMessage(lawyer)}</p>
              <p>
                법무법인 오현은 사건의 초기 상담부터 자료 검토, 절차 대응, 결과 이후의 후속 리스크까지 함께 검토합니다.
                담당 변호사는 의뢰인과 직접 상황을 공유하며 사건별로 필요한 전략을 세웁니다.
              </p>
            </article>
          </section>

          <section className="lawyer-career-section" id="career">
            <div className="lawyer-career-head">
              <p className="eyebrow">PROFILE</p>
              <h2>주요 경력</h2>
            </div>
            <div className="lawyer-career-list">
              {lawyer.career.map((career, index) => (
                <article key={career}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{career}</strong>
                </article>
              ))}
              <article>
                <span>{String(lawyer.career.length + 1).padStart(2, '0')}</span>
                <strong>{lawyer.fields.join(' · ')} 사건 담당</strong>
              </article>
            </div>
          </section>
        </div>

        <aside className="lawyer-side-column" aria-label="관련 정보">
          <section id="related-cases">
            <div className="side-head">
              <p className="eyebrow">SUCCESS CASES</p>
              <h2>관련 업무사례</h2>
              <a href="/cases">전체보기</a>
            </div>
            <div className="lawyer-side-case-list">
              {(relatedCases.length ? relatedCases : cases.slice(0, 3)).map((item) => (
                <a href={`/cases/${item.slug}`} key={item.id}>
                  <span>{item.field}</span>
                  <strong>{item.title}</strong>
                  <em>{item.result}</em>
                </a>
              ))}
            </div>
          </section>

          <section id="related-lawyers">
            <div className="side-head">
              <p className="eyebrow">LAWYERS</p>
              <h2>관련 구성원</h2>
              <a href="/lawyers">전체보기</a>
            </div>
            <div className="lawyer-side-person-list">
              {otherLawyers.slice(0, 3).map((item) => (
                <a href={`/lawyers/${item.id}`} key={item.id}>
                  <img src={item.image} alt={`${item.name} ${item.title}`} />
                  <div>
                    <span>{item.badges.join(' · ')}</span>
                    <strong>{item.name}</strong>
                    <em>{item.title}</em>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="related-fields">
            <div className="side-head">
              <p className="eyebrow">PRACTICE AREAS</p>
              <h2>관련 업무분야</h2>
              <a href="/fields">전체보기</a>
            </div>
            <div className="lawyer-side-field-list">
              {(relatedFields.length ? relatedFields : fields.slice(0, 4)).map((field) => (
                <a href={field.href} key={field.id}>
                  <span>{field.group}</span>
                  <strong>{field.name}</strong>
                </a>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className="lawyer-consult-cta">
        <div>
          <p className="eyebrow">CONSULTATION</p>
          <h2>{lawyer.name} {lawyer.title}와 상담이 필요하신가요?</h2>
          <p>사건의 쟁점과 필요한 자료를 먼저 확인한 뒤, 적합한 대응 방향을 안내합니다.</p>
        </div>
        <div>
          <a href="/contact">상담예약</a>
          <a href="tel:16612661">전화상담 1661-2661</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
