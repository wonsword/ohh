import type { CSSProperties, ReactNode } from 'react';

type HeroStyle = CSSProperties & Record<'--hero-image', string>;

export function PageHero({
  eyebrow,
  title,
  description,
  image = '/reference-assets/ohyun/homepage-13.jpg',
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero" style={{ '--hero-image': `url(${image})` } as HeroStyle}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </section>
  );
}
