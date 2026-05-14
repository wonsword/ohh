import type { MetadataRoute } from 'next';
import { baseUrl, cases, fields, lawyers } from './site-content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about',
    '/about/strength',
    '/about/location',
    '/lawyers',
    '/cases',
    '/insights',
    '/fields',
    '/legal-info',
    '/faq',
    '/reviews',
    '/news',
    '/careers',
    '/contact',
    '/search',
    ...fields.map((field) => `/fields/${field.slug}`),
    ...cases.map((item) => `/cases/${item.slug}`),
    ...lawyers.map((lawyer) => `/lawyers/${lawyer.id}`)
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-05-13'),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8
  }));
}
