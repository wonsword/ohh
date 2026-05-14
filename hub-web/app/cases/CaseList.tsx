'use client';

import { useState } from 'react';
import type { Case, Field } from '../site-content';

interface Props {
  cases: Case[];
  fields: Field[];
}

export function CaseList({ cases, fields }: Props) {
  const [activeField, setActiveField] = useState<string>('all');
  const [query, setQuery] = useState('');

  const filtered = cases.filter((c) => {
    const matchField = activeField === 'all' || c.field === activeField;
    const matchQuery = !query || c.title.includes(query) || c.summary.includes(query);
    return matchField && matchQuery;
  });

  return (
    <>
      <section className="filter-band">
        <button
          className={activeField === 'all' ? 'filter-active' : ''}
          onClick={() => setActiveField('all')}
        >
          전체
        </button>
        {fields.slice(0, 12).map((field) => (
          <button
            key={field.id}
            className={activeField === field.name ? 'filter-active' : ''}
            onClick={() => setActiveField(field.name)}
          >
            {field.name}
          </button>
        ))}
        <div className="case-search">
          <input
            type="search"
            placeholder="사례 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="업무사례 검색"
          />
        </div>
      </section>
      <section className="case-board">
        {filtered.length === 0 && (
          <p className="case-empty">검색 결과가 없습니다.</p>
        )}
        {filtered.map((item, index) => (
          <a href={`/cases/${item.slug}`} className="case-row" key={item.id}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <em>{item.field}</em>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
            </div>
            <b>{item.result}</b>
          </a>
        ))}
      </section>
    </>
  );
}
