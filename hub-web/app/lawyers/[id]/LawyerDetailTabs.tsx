'use client';

import { useEffect, useRef, useState } from 'react';

const TAB_ITEMS = [
  { id: 'intro', label: '소개' },
  { id: 'career', label: '경력' },
  { id: 'related-cases', label: '업무사례' },
  { id: 'related-fields', label: '업무분야' },
];

export function LawyerDetailTabs() {
  const [activeId, setActiveId] = useState<string>('intro');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targets = TAB_ITEMS.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    targets.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <nav className="lawyer-detail-tabs" aria-label="구성원 상세 섹션">
      {TAB_ITEMS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={activeId === id ? 'tab-active' : ''}
          onClick={(e) => handleClick(e, id)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
