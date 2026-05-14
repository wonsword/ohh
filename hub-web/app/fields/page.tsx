import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { fields } from '../site-content';

export const metadata: Metadata = {
  title: '업무분야',
  description: '법무법인 오현의 주요 업무분야와 분야별 상담 영역을 확인하세요.',
  alternates: { canonical: 'https://www.ohyunlaw.com/fields' }
};

export default function FieldsPage() {
  const grouped = Object.entries(fields.reduce<Record<string, typeof fields>>((acc, field) => {
    acc[field.group] = [...(acc[field.group] ?? []), field];
    return acc;
  }, {}));

  const groupKeys = grouped.map(([group]) => group);

  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="PRACTICE AREAS" title="업무분야" description="형사, 민사, 경제범죄, 가사, 기업법무 등 사건별 상담 분야를 확인하세요." image="/reference-assets/ohyun/homepage-13.jpg" />
      <nav className="field-tab-nav" aria-label="업무분야 그룹">
        {groupKeys.map((group) => (
          <a href={`#group-${encodeURIComponent(group)}`} key={group}>{group}</a>
        ))}
      </nav>
      <section className="field-directory grouped">
        {grouped.map(([group, items]) => (
          <article className="field-group-card" id={`group-${encodeURIComponent(group)}`} key={group}>
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
