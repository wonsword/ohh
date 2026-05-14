'use client';

import { useState } from 'react';
import type { faqs as faqsType } from '../site-content';

type Faq = (typeof faqsType)[number];

interface Props {
  faqs: Faq[];
  categories: string[];
}

export function FaqList({ faqs, categories }: Props) {
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? faqs : faqs.filter((f) => f.category === active);

  return (
    <>
      <section className="filter-band">
        <button
          className={active === 'all' ? 'filter-active' : ''}
          onClick={() => setActive('all')}
        >
          전체
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={active === cat ? 'filter-active' : ''}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </section>
      <section className="faq-list">
        {filtered.map((item) => (
          <details key={item.id}>
            <summary><span>{item.category}</span>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
    </>
  );
}
