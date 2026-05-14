import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { faqs, fields } from '../site-content';

export const metadata: Metadata = {
  title: '법률지식인 | 법무법인 오현',
  description: '형사, 민사, 경제범죄 등 주요 분야별 자주 묻는 법률 질문과 답변입니다.'
};

export default function FaqPage() {
  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="FAQ" title="법률지식인" description="형사, 민사, 경제범죄 등 주요 분야별 자주 묻는 질문과 답변을 확인하세요." />
      <section className="filter-band">
        {fields.slice(0, 8).map((field) => <a href={`/faq?field=${field.slug}`} key={field.id}>{field.name}</a>)}
      </section>
      <section className="faq-list">
        {faqs.map((item) => (
          <details key={item.id} open>
            <summary><span>{item.category}</span>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
