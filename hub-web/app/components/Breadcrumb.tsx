interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.ohyunlaw.com' },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://www.ohyunlaw.com${item.href}` } : {})
      }))
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="breadcrumb" aria-label="breadcrumb">
        <a href="/">홈</a>
        {items.map((item, i) => (
          <span key={i}>
            <span aria-hidden="true"> / </span>
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </span>
        ))}
      </nav>
    </>
  );
}
