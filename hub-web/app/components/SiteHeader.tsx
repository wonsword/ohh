'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigation } from '../site-content';

function IconHamburger() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect y="4" width="22" height="2" rx="1" fill="currentColor" />
      <rect y="10" width="22" height="2" rx="1" fill="currentColor" />
      <rect y="16" width="22" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.8" />
      <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const isFields = item.href === '/fields';
            return (
              <div
                className={`nav-item${isActive ? ' nav-item--active' : ''}${isFields ? ' nav-item--fields' : ''}`}
                key={item.href}
              >
                <a href={item.href}>{item.label}</a>
                <div className="nav-panel">
                  {item.children.map((child) => (
                    <a href={child.href} key={child.href}>{child.label}</a>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="header-actions">
          <a className="header-search" href="/search" aria-label="통합검색">
            <IconSearch />
          </a>
          <a className="header-cta" href="/contact">상담신청</a>
          <button
            className={`mobile-menu-btn${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconClose /> : <IconHamburger />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-panel" role="dialog" aria-label="사이트 메뉴">
            <a className="mobile-consult" href="/contact" onClick={() => setMenuOpen(false)}>
              상담신청
            </a>
            {navigation.map((item) => (
              <div className="mobile-group" key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
                <div>
                  {item.children.map((child) => (
                    <a href={child.href} key={child.href} onClick={() => setMenuOpen(false)}>
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
