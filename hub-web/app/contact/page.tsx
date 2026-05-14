import type { Metadata } from 'next';
import { ConsultationForm } from '../components/ConsultationForm';
import { PageHero } from '../components/PageHero';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';
import { branches, quickLinks } from '../site-content';

export const metadata: Metadata = {
  title: '고객상담 | 법무법인 오현',
  description: '법무법인 오현 온라인 상담 신청. 성함, 연락처, 상담내용만 입력하면 상담 접수가 가능합니다.',
  alternates: { canonical: 'https://www.ohyunlaw.com/contact' }
};

export default function ContactPage() {
  return (
    <main className="listing-page">
      <SiteHeader />
      <PageHero eyebrow="CONTACT" title="고객상담" description="성함, 연락처, 상담내용을 남겨주시면 담당자가 순차적으로 연락드립니다." image="/reference-assets/ohyun/homepage-06.png" />
      <section className="contact-layout">
        <ConsultationForm />
        <aside className="contact-panel">
          <div>
            <span>대표번호</span>
            <strong>1661-2661</strong>
            <p>대표번호로 주요 분야 상담을 접수합니다.</p>
          </div>
          <div>
            <span>빠른 상담 채널</span>
            <div className="channel-list">
              {quickLinks.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
            </div>
          </div>
          <div>
            <span>상담 가능 지점</span>
            <p>{branches.map((branch) => branch.city).join(' · ')}</p>
          </div>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
