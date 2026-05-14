import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ConsultationForm } from '../../components/ConsultationForm';
import { PageHero } from '../../components/PageHero';
import { SiteFooter } from '../../components/SiteFooter';
import { SiteHeader } from '../../components/SiteHeader';
import { cases, fields, lawyers } from '../../site-content';

export function generateStaticParams() {
  return fields.map((field) => ({ slug: field.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const field = fields.find((item) => item.slug === slug);
  if (!field) return {};
  return {
    title: `${field.name} 변호사 | 법무법인 오현`,
    description: `${field.description}. 법무법인 오현 ${field.name} 분야 상담과 업무사례를 확인하세요.`,
    keywords: ['법무법인 오현', field.name, ...field.keywords],
    alternates: { canonical: `https://www.ohyunlaw.com/fields/${slug}` }
  };
}

export default async function FieldDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const field = fields.find((item) => item.slug === slug);
  if (!field) notFound();

  const relatedCases = cases.filter((item) => item.field === field.name || item.siteId === field.siteId).slice(0, 3);
  const relatedLawyers = lawyers.filter((lawyer) => lawyer.fields.some((name) => field.name.includes(name) || name.includes(field.name))).slice(0, 3);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.ohyunlaw.com' },
      { '@type': 'ListItem', position: 2, name: '업무분야', item: 'https://www.ohyunlaw.com/fields' },
      { '@type': 'ListItem', position: 3, name: field.name, item: `https://www.ohyunlaw.com/fields/${field.slug}` }
    ]
  };

  return (
    <main className="listing-page">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <PageHero eyebrow="PRACTICE DETAIL" title={field.name} description={field.description} image="/reference-assets/ohyun/homepage-13.jpg">
        <div className="hero-links">
          <a href={field.externalUrl}>분야 사이트 이동</a>
          <a href="/contact">상담 신청</a>
        </div>
      </PageHero>
      <section className="detail-layout">
        <article>
          <p className="eyebrow">KEYWORDS</p>
          <h2>{field.name} 주요 쟁점</h2>
          <div className="keyword-list">
            {field.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
          </div>
          <h2>관련 업무사례</h2>
          <div className="mini-list">
            {(relatedCases.length ? relatedCases : cases.slice(0, 3)).map((item) => (
              <a href="/cases" key={item.id}><b>{item.result}</b>{item.title}</a>
            ))}
          </div>
          <h2>관련 변호사</h2>
          <div className="mini-list">
            {(relatedLawyers.length ? relatedLawyers : lawyers.slice(0, 3)).map((lawyer) => (
              <a href="/lawyers" key={lawyer.id}><b>{lawyer.name}</b>{lawyer.headline}</a>
            ))}
          </div>
        </article>
        <ConsultationForm compact />
      </section>
      <SiteFooter />
    </main>
  );
}
