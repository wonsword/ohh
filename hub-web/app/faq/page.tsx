import type { Metadata } from 'next';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { faqs } from '../site-content';
import { FaqList } from './FaqList';

export const metadata: Metadata = {
  title: '법률지식인',
  description: '형사, 민사, 경제범죄 등 주요 분야별 자주 묻는 법률 질문과 답변입니다.',
  alternates: { canonical: 'https://www.ohyunlaw.com/faq' }
};

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  };

  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <main className="listing-page">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero eyebrow="FAQ" title="법률지식인" description="형사, 민사, 경제범죄 등 주요 분야별 자주 묻는 질문과 답변을 확인하세요." />
      <FaqList faqs={faqs} categories={categories} />
      <SiteFooter />
    </main>
  );
}
