'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import type { Field, Lawyer } from '../site-content';

type LawyerStyle = CSSProperties & Record<'--lawyer-image', string>;

interface Props {
  lawyers: Lawyer[];
  fields: Field[];
}

export function LawyerList({ lawyers, fields }: Props) {
  const [activeField, setActiveField] = useState<string>('all');

  const filtered = activeField === 'all'
    ? lawyers
    : lawyers.filter((l) => l.fields.includes(activeField));

  return (
    <>
      <section className="filter-band">
        <button
          className={activeField === 'all' ? 'filter-active' : ''}
          onClick={() => setActiveField('all')}
        >
          전체
        </button>
        {fields.slice(0, 10).map((field) => (
          <button
            key={field.id}
            className={activeField === field.name ? 'filter-active' : ''}
            onClick={() => setActiveField(field.name)}
          >
            {field.name}
          </button>
        ))}
      </section>
      <section className="profile-grid">
        {filtered.map((lawyer) => (
          <article className="profile-card" id={lawyer.id} key={lawyer.id}>
            <div className="profile-photo" style={{ '--lawyer-image': `url(${lawyer.image})` } as LawyerStyle} />
            <div>
              <span>{lawyer.badges.join(' · ')}</span>
              <h2>{lawyer.name}</h2>
              <p>{lawyer.title}</p>
              <strong>{lawyer.headline}</strong>
              <ul>
                {lawyer.career.map((career) => <li key={career}>{career}</li>)}
              </ul>
              <a href={`/lawyers/${lawyer.id}`}>상세보기</a>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
