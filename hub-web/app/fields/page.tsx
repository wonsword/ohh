import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { fields } from '../site-content';

export const metadata: Metadata = {
  title: '업무분야 | 법무법인 오현',
  description: '법무법인 오현의 주요 업무분야와 분야별 상담 영역을 확인하세요.'
};

export default function FieldsPage() {
  const grouped = Object.entries(fields.reduce<Record<string, typeof fields>>((acc, field) => {
    acc[field.group] = [...(acc[field.group] ?? []), field];
    return acc;
  }, {}));

  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="PRACTICE AREAS" title="업무분야" description="형사, 민사, 경제범죄, 가사, 기업법무 등 사건별 상담 분야를 확인하세요." image="/reference-assets/ohyun/homepage-13.jpg" />
      <section className="field-directory grouped">
        {grouped.map(([group, items]) => (
          <article className="field-group-card" key={group}>
            <h2>{group}</h2>
            <div>
              {items.map((field) => (
                <a className="directory-card" href={field.href} key={field.id}>
                  <span>{field.caseCount.toLocaleString()}건</span>
                  <h3>{field.name}</h3>
                  <p>{field.description}</p>
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
