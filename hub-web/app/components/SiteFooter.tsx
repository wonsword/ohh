import { fields, navigation, quickLinks } from '../site-content';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <strong>법무법인 오현</strong>
          <p>형사·민사·경제범죄·가사·기업법무까지 함께하는 종합 법률서비스</p>
        </div>
        <a href="tel:16612661">1661-2661</a>
      </div>
      <div className="footer-grid">
        <nav aria-label="푸터 메뉴">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="footer-fields">
          {fields.slice(0, 12).map((field) => (
            <a href={field.href} key={field.id}>{field.name}</a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>대표번호 1661-2661</span>
        <span>서울특별시 서초중앙로 118, 6층 (KAIS빌딩)</span>
        <span>Copyright OHYUN Law Firm.</span>
      </div>
      <aside className="quick-cta" aria-label="빠른 상담 메뉴">
        {quickLinks.map((item) => (
          <a href={item.href} key={item.label}>{item.label}</a>
        ))}
      </aside>
    </footer>
  );
}
