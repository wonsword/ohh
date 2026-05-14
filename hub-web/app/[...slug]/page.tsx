import type { Metadata } from 'next';
import { ConsultationForm } from '../components/ConsultationForm';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { branches, cases, fields, lawyers, staticRoutes, stats } from '../site-content';

const hasItems = [
  {
    title: '다양한 분야의 변호사가 있습니다.',
    body: '오현은 다양한 분야에서 활동해온 전문성 있는 변호사들로 구성되어 있습니다. 특히 검경수사권 조정 이후, 경찰 간부 경력의 유웅현 대표변호사와 검찰 지청장 역임 이용 형사센터장의 시너지 효과로 각종 사건에서 성공사례를 만들어왔습니다.'
  },
  {
    title: '16개의 분사무소가 있습니다.',
    body: '의뢰인과의 거리는 곧 승률입니다. 얼마나 가까이서 사실관계를 치밀하게 공유하는지가 승패를 좌우합니다. 오현은 서울 주사무소와 서울 분사무소를 비롯해 부산, 대구, 대전, 수원, 인천, 광주, 의정부, 성남, 창원, 평택, 천안, 일산, 전주, 울산 분사무소를 운영하고 있습니다.'
  },
  {
    title: '디지털 포렌식 센터가 있습니다.',
    body: '외부 증거 복원 업체의 도움을 받고 있는 타사와 달리, 오현은 자체 포렌식센터를 운영하며 공학박사 경력의 양제민 변호사가 사건에 알맞은 증거를 복원 및 분석합니다. 사건을 잘 아는 사람은 증거를 잘 다룰 수 있습니다.'
  },
  {
    title: '축적된 경험과 노하우가 있습니다.',
    body: '오현에는 다양한 종류의 사건에 대처할 수 있도록 여러 분야에서 경험과 노하우를 쌓은 변호사들이 있습니다. 특히 최근 형사사건은 디지털, 정보통신자료 등이 주요한 쟁점이 될 수 있기에 이러한 역량을 함께 공유하고 있는 오현에서 효과적인 사건 대응이 가능합니다.'
  }
];

const noItems = [
  {
    title: '사무장이 없습니다.',
    body: '오현은 사건의 시작부터 재판까지 전 과정 동안 담당 변호사가 의뢰인과 직접 상황을 공유하며 사건을 처리합니다.'
  },
  {
    title: '허위·과장광고가 없습니다.',
    body: '법조시장의 경쟁이 과열되며 온갖 허위, 과장광고가 넘쳐나고 있습니다. 오현은 관련 광고 규정을 준수하며, 의뢰인께 사실만을 말씀드립니다.'
  },
  {
    title: '무분별한 사건선임이 없습니다.',
    body: '법무법인의 규모를 비대하게 키우다 보면 대표변호사는 사건 선임만 할 뿐, 정작 사건 처리는 초년 차 변호사가 도맡아 하는 경우가 많습니다. 오현은 각 대표변호사의 철저한 사건 관리로 의뢰인에게 진정성 있는 조력을 제공합니다.'
  },
  {
    title: '사건에 차별이 없습니다.',
    body: '오현은 사건의 난이도나 보수와 무관하게 사건을 가장 잘 해결할 수 있는 TF팀을 구성하여 변호사들의 협업을 통해 사건을 해결하고 있습니다. 또한 어떤 사건이든 오현의 의뢰인이라면 급작스러운 변수가 발생하더라도 신속하게 소통하고 대응할 수 있습니다.'
  }
];

export function generateStaticParams() {
  return staticRoutes.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  return { title: `${page.title} | 법무법인 오현`, description: page.description };
}

function getPage(slug: string[]) {
  const path = slug.join('/');
  if (path === 'about/strength') return { eyebrow: 'WHY OHYUN', title: '오현 강점', description: '전담 변호사, 분야별 센터, 전국 상담망, 사례 기반 전략을 하나의 경험으로 연결합니다.', image: '/reference-assets/ohyun/homepage-13.jpg' };
  if (path === 'about/location') return { eyebrow: 'OFFICES', title: '오시는 길', description: '전국 분사무소와 상담 가능 지점을 확인하세요.', image: '/reference-assets/ohyun/homepage-06.png' };
  if (path === 'search') return { eyebrow: 'SEARCH', title: '통합검색', description: '업무분야, 변호사, 업무사례, 법률정보를 통합 검색합니다.', image: '/reference-assets/ohyun/homepage-12.jpg' };
  return { eyebrow: 'ABOUT OHYUN', title: '오현소개', description: '법무법인 오현은 다양한 분야에서 전문적이고 종합적인 법률서비스를 제공합니다.', image: '/reference-assets/ohyun/homepage-07.png' };
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = getPage(slug);
  const path = slug.join('/');

  if (path === 'about') {
    return (
      <main className="listing-page about-reference-page">
        <SiteHeader />

        <section className="about-reference-hero">
          <div>
            <nav aria-label="현재 위치">
              <a href="/">홈</a>
              <span>오현소개</span>
            </nav>
            <h1>오현소개</h1>
            <p>INTRODUCTION</p>
          </div>
        </section>

        <nav className="about-tabs" aria-label="오현소개 섹션">
          <a href="#greeting">인사말</a>
          <a href="#has">오현에는 있습니다</a>
          <a href="#none">오현에는 없습니다</a>
          <a href="#office">전국 사무소</a>
        </nav>

        <section className="about-greeting" id="greeting">
          <div className="about-section-label">
            <span>GREETING</span>
            <strong>인사말</strong>
          </div>
          <div className="about-greeting-copy">
            <h2>
              법무법인 오현은 다양한 분야에서
              <br />
              전문적이고 종합적인 법률서비스를 제공합니다.
            </h2>
            <p>
              사건의 시작부터 재판까지 담당 변호사가 직접 상황을 공유하고, 분야별 경험과 전국 상담망을 바탕으로 의뢰인의 사건을 입체적으로 검토합니다.
              오현은 의뢰인께 사실만을 말씀드리고, 사건을 가장 잘 해결할 수 있는 팀을 구성해 끝까지 대응합니다.
            </p>
          </div>
        </section>

        <section className="about-wide-image" aria-label="법무법인 오현 이미지" />

        <section className="about-stats-strip" aria-label="법무법인 오현 현황">
          {stats.map((item) => (
            <a href={item.href} key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </a>
          ))}
        </section>

        <section className="about-statement" id="has">
          <div className="about-section-label">
            <span>OHYUN HAS</span>
            <strong>오현에는 있습니다.</strong>
          </div>
          <div className="about-statement-list">
            {hasItems.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-statement dark" id="none">
          <div className="about-section-label">
            <span>OHYUN PROMISE</span>
            <strong>오현에는 없습니다.</strong>
          </div>
          <div className="about-statement-list">
            {noItems.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-offices" id="office">
          <div>
            <p className="eyebrow">OFFICE INFO</p>
            <h2>16개 분사무소</h2>
            <p>서울 주사무소와 서울 분사무소를 비롯해 전국 주요 지역에서 가까운 법률상담을 제공합니다.</p>
          </div>
          <div className="about-office-grid">
            {branches.map((branch) => (
              <article key={branch.id}>
                <span>{branch.city}</span>
                <strong>{branch.name}</strong>
                <p>{branch.address}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-call">
          <p className="eyebrow">24시 법률상담번호</p>
          <h2>1661-2661</h2>
          <strong>긴급상담 010-9631-0039</strong>
          <div>
            <a href="tel:16612661">전화상담</a>
            <a href="/contact">온라인 상담신청</a>
          </div>
        </section>

        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} image={page.image} />

      {path === 'about/location' ? (
        <section className="branch-list">
          {branches.map((branch) => (
            <article key={branch.id}>
              <span>{branch.city}</span>
              <h2>{branch.name}</h2>
              <p>{branch.address}</p>
              <b>{branch.phone}</b>
              <small>{branch.hours}</small>
            </article>
          ))}
        </section>
      ) : path === 'search' ? (
        <section className="search-page">
          <form className="hero-search" action="/search">
            <input name="q" aria-label="통합 검색어" placeholder="검색어를 입력하세요" />
            <button type="submit">검색</button>
          </form>
          <div className="content-grid">
            {[
              ...lawyers.slice(0, 2).map((item) => ({ id: item.id, href: '/lawyers', type: '구성원', title: item.name })),
              ...cases.slice(0, 2).map((item) => ({ id: item.id, href: '/cases', type: item.field, title: item.title })),
              ...fields.slice(0, 2).map((item) => ({ id: item.id, href: item.href, type: '업무분야', title: item.name }))
            ].map((item) => (
              <a href={item.href} key={item.id}>
                <span>{item.type}</span>
                <strong>{item.title}</strong>
              </a>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="about-layout">
            <article>
              <p className="eyebrow">OHYUN STANDARD</p>
              <h2>법무법인 오현은 다양한 분야에서 전문적이고 종합적인 법률서비스를 제공합니다.</h2>
              <p>
                사건의 시작부터 재판까지 담당 변호사가 직접 상황을 공유하고, 분야별 경험과 전국 상담망을 바탕으로 의뢰인의 사건을 입체적으로 검토합니다.
              </p>
              <div className="stats-mini">
                {stats.map((item) => <a href={item.href} key={item.label}><b>{item.value}</b><span>{item.label}</span></a>)}
              </div>
            </article>
            <ConsultationForm compact />
          </section>

          <section className="ohyun-intro">
            <div className="intro-column has">
              <p className="eyebrow">OHYUN HAS</p>
              <h2>오현에는 있습니다.</h2>
              {hasItems.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="intro-column none">
              <p className="eyebrow">OHYUN PROMISE</p>
              <h2>오현에는 없습니다.</h2>
              {noItems.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="about-call">
            <p className="eyebrow">24시 법률상담번호</p>
            <h2>1661-2661</h2>
            <strong>긴급상담 010-9631-0039</strong>
            <div>
              <a href="tel:16612661">전화상담</a>
              <a href="/contact">온라인 상담신청</a>
            </div>
          </section>
        </>
      )}

      <SiteFooter />
    </main>
  );
}
