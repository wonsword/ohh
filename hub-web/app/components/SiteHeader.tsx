import { navigation } from '../site-content';

export function SiteHeader() {
  return (
    <>
      <div className="utility-bar">
        <a href="/reviews">의뢰인 후기</a>
        <a href="/news">언론보도</a>
        <a href="/careers">인재채용</a>
        <a href="/about/location">전국 사무소</a>
        <a className="utility-phone" href="tel:16612661">24시간 상담 접수 1661-2661</a>
      </div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="법무법인 오현 홈">
          <img src="/reference-assets/ohyun/common/logo.png" alt="법무법인 오현" />
        </a>

        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <div className="nav-item" key={item.href}>
              <a href={item.href}>{item.label}</a>
              <div className="nav-panel">
                {item.children.map((child) => (
                  <a href={child.href} key={child.href}>{child.label}</a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-search" href="/search" aria-label="통합검색">검색</a>
          <a className="header-cta" href="/contact">상담신청</a>
        </div>

        <details className="mobile-menu">
          <summary>메뉴</summary>
          <div className="mobile-panel">
            <a className="mobile-consult" href="/contact">상담신청</a>
            {navigation.map((item) => (
              <div className="mobile-group" key={item.href}>
                <a href={item.href}>{item.label}</a>
                <div>
                  {item.children.map((child) => (
                    <a href={child.href} key={child.href}>{child.label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      </header>
    </>
  );
}
