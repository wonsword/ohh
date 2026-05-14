import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFooter } from '../../components/SiteFooter';
import { SiteHeader } from '../../components/SiteHeader';
import { cases, fields, lawyers } from '../../site-content';

type CaseDetailParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CaseDetailParams): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((caseItem) => caseItem.slug === slug);

  if (!item) {
    return { title: '업무사례 | 법무법인 오현' };
  }

  return {
    title: `${item.title} | 업무사례 | 법무법인 오현`,
    description: item.summary,
    alternates: { canonical: `/cases/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      type: 'article',
      images: ['/reference-assets/ohyun/homepage-12.jpg']
    }
  };
}

function buildCaseSections(item: (typeof cases)[number]) {
  return [
    {
      id: 'background',
      title: `1. ${item.field} 사건을 의뢰하게 된 경위`,
      body: [
        `의뢰인은 ${item.field} 사건으로 조사를 받거나 분쟁 대응이 필요한 상황에서 법무법인 오현을 찾았습니다.`,
        item.summary,
        '오현은 초기 상담 단계에서 사건의 시간순 흐름, 상대방 주장, 객관 자료의 존재 여부를 먼저 확인하고 쟁점을 정리했습니다.'
      ],
      points: ['사건 경위와 쟁점 정리', '의뢰인 진술 방향 검토', '증거자료 확보 범위 확인']
    },
    {
      id: 'strategy',
      title: `2. ${item.field} 사건에서 적용한 핵심 대응 전략`,
      body: [
        '담당 변호사는 수사기관 또는 재판부가 중점적으로 볼 쟁점을 기준으로 자료를 재구성했습니다.',
        '불리하게 해석될 수 있는 정황은 법리와 객관 자료로 설명하고, 유리한 사정은 빠짐없이 의견서와 증거자료에 반영했습니다.'
      ],
      points: ['객관 자료 중심의 사실관계 재구성', '상대방 주장과 법리 쟁점 분리', '단계별 의견서 및 소명자료 제출']
    },
    {
      id: 'result',
      title: `3. 오현의 조력으로 이끌어낸 결과`,
      body: [
        `그 결과 ${item.result} 결정을 이끌어냈습니다.`,
        '본 사례는 사건의 초기 대응과 자료 정리가 결과에 직접적인 영향을 줄 수 있음을 보여줍니다.'
      ],
      points: [`최종 결과: ${item.result}`, '의뢰인 상황에 맞춘 전략 수립', '후속 리스크까지 함께 검토']
    }
  ];
}

export default async function CaseDetailPage({ params }: CaseDetailParams) {
  const { slug } = await params;
  const item = cases.find((caseItem) => caseItem.slug === slug);

  if (!item) {
    notFound();
  }

  const detailSections = buildCaseSections(item);
  const relatedCases = cases.filter((caseItem) => caseItem.slug !== item.slug).slice(0, 3);
  const relatedFields = fields.filter((field) => field.name === item.field || field.siteId === item.siteId).slice(0, 4);
  const relatedLawyers = lawyers.filter((lawyer) => lawyer.fields.includes(item.field) || lawyer.fields.some((field) => field.includes(item.field))).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.summary,
    datePublished: item.publishedAt,
    author: {
      '@type': 'Organization',
      name: '법무법인 오현'
    },
    publisher: {
      '@type': 'Organization',
      name: '법무법인 오현',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ohyunlaw.com/reference-assets/ohyun/common/logo.png'
      }
    }
  };

  return (
    <main className="case-detail-page">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="case-detail-hero">
        <div>
          <nav aria-label="현재 위치">
            <a href="/">Home</a>
            <a href="/cases">업무사례</a>
            <span>{item.field}</span>
          </nav>
          <p className="eyebrow">SUCCESS CASE</p>
          <span className="case-detail-charge">{item.field}</span>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
          <dl>
            <div>
              <dt>결과</dt>
              <dd>{item.result}</dd>
            </div>
            <div>
              <dt>분야</dt>
              <dd>{item.field}</dd>
            </div>
            <div>
              <dt>작성일</dt>
              <dd>{item.publishedAt}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="case-detail-body">
        <div className="case-main-column">
          <aside className="case-detail-toc">
            <strong>CONTENTS</strong>
            {detailSections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>{section.title}</a>
            ))}
          </aside>

          <article className="case-detail-article">
            <div className="case-notice">
              개인정보보호를 위해 사건 내용은 일부 각색될 수 있습니다.
            </div>

            {detailSections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="case-point-box">
                  {section.points.map((point) => <span key={point}>{point}</span>)}
                </div>
              </section>
            ))}

            <section className="case-result-card">
              <span>RESULT</span>
              <h2>{item.result}</h2>
              <p>법무법인 오현은 사건별 쟁점에 맞춰 초기 상담부터 자료 정리, 의견서 작성, 절차 대응까지 함께합니다.</p>
            </section>
          </article>
        </div>

        <aside className="case-side-column" aria-label="관련 정보">
          <section id="related-cases">
            <div className="side-head">
              <p className="eyebrow">RELATED CASES</p>
              <h2>관련 업무사례</h2>
              <a href="/cases">전체보기</a>
            </div>
            <div className="case-side-case-list">
              {relatedCases.map((related) => (
                <a href={`/cases/${related.slug}`} key={related.id}>
                  <span>{related.field}</span>
                  <strong>{related.title}</strong>
                  <em>{related.result}</em>
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
            <div className="case-side-lawyer-list">
              {(relatedLawyers.length ? relatedLawyers : lawyers.slice(0, 4)).slice(0, 3).map((lawyer) => (
                <a href={`/lawyers/${lawyer.id}`} key={lawyer.id}>
                  <img src={lawyer.image} alt={`${lawyer.name} ${lawyer.title}`} />
                  <div>
                    <span>{lawyer.badges.join(' · ')}</span>
                    <strong>{lawyer.name}</strong>
                    <em>{lawyer.title}</em>
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
            <div className="case-side-field-list">
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

      <section className="case-consult-cta">
        <div>
          <p className="eyebrow">CONSULTATION</p>
          <h2>사건 구조에 맞는 법리 검토가 필요하다면</h2>
          <p>초기 대응 방향 설정이 어렵다면 오현의 상담을 통해 사건 자료와 쟁점을 먼저 확인해 보세요.</p>
        </div>
        <div>
          <a href="tel:16612661">전화상담 1661-2661</a>
          <a href="/contact">온라인 상담신청</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
