# Ohyun Hub Reference Notes

Collected on 2026-05-13.

## Source Sites

- Current Ohyun public site: `https://xn--v92b7yba209gttbpx5b.com/`
- Target reference site: `https://www.daeryunlaw.com/`
- Scope note: Daeryun-style structure is the target, but multilingual links and AI feature surfaces are excluded.

## Downloaded Reference Files

- Raw crawl summary: `reference-assets/reference-summary.json`
- Raw Ohyun homepage HTML: `reference-assets/ohyun-home.html`
- Raw Daeryun homepage HTML: `reference-assets/daeryun-home.html`
- Downloaded Ohyun homepage images: `reference-assets/ohyun/`
- Downloaded Ohyun lawyer sample photos: `reference-assets/ohyun/lawyers/`
- App-served copies for the Next.js page: `public/reference-assets/ohyun/`

The current page uses local Ohyun assets from `public/reference-assets/ohyun/` so the preview does not depend on remote image hosts.

## Current Ohyun Site Structure Observed

Primary menu:

- 오시는길
- 오현소개
- 구성원소개
- 업무분야(센터)
- 고객상담
- 법률지식인
- 법률정보
- 인재채용
- 오현소식

Homepage content patterns:

- Popup image banners
- Header logo and global phone CTA
- Main hero / visual blocks
- Performance/stat cards
- Lawyer carousel/grid with uploaded lawyer photos
- Field/site links that jump to separate field domains
- Map/office section
- Floating quick consultation links

Useful Ohyun sample assets:

- `homepage-07.png`: office interior, good for the first public hero
- `homepage-06.png`: Korea branch map graphic
- `homepage-12.jpg` and `homepage-13.jpg`: legal/business visual backgrounds
- `lawyer-home-01.png` through `lawyer-home-10.png`: homepage lawyer portraits
- `lawyer-01.jpg` through `lawyer-10.jpg`: lawyer detail page sample images

## Daeryun Target Structure

Use this as the public-site direction:

- Dense top utility bar with login/my case/customer links can be simplified for Ohyun.
- Main GNB should expose firm intro, lawyers, cases, fields, locations, legal content, consultation.
- Hero should feel like a real law firm homepage, with strong first-viewport brand signal and real imagery.
- Search/integrated discovery should eventually route across lawyers, cases, legal info, and fields.
- Main page should aggregate content from many field sites rather than behave like a single center page.
- Lawyer section should use real portraits and field badges.
- Case section should show field, title, result, and link out to the owning field/sub-site when needed.
- Office/map section should show nationwide branches with photo/map assets.
- Quick CTA should remain persistent: online consultation, Kakao/Naver Talk, phone, lawyer recommendation.
- Footer should include firm/legal info, social links, and site-family links.

Excluded from Daeryun reference:

- Multilingual language switchers
- AI consultation/product links
- Unneeded member/login surfaces unless Ohyun explicitly asks for them

## Hub Project Structure

- `app/page.tsx`: first public hub homepage, currently static mock data.
- `app/globals.css`: page styling and responsive layout.
- `public/reference-assets/ohyun/`: local images used by the page.
- `reference-assets/`: raw crawl output and downloaded source references.
- `tools/collect-reference-assets.mjs`: repeatable collector for Ohyun/Daeryun reference files.

## Build Notes

- `npm run build` uses `next build --webpack`.
- `next.config.mjs` sets `distDir: 'build-cache'` because `.next/dev` had OneDrive permission trouble in this workspace.
- Turbopack currently panics on the Korean workspace path, so Webpack is the stable local path.

## Next Implementation Direction

1. Convert the homepage from static arrays to a small content module.
2. Add real routes for `/about`, `/lawyers`, `/cases`, `/fields`, `/legal-info`, `/faq`, `/reviews`, `/news`, `/contact`.
3. Shape those pages around the PDF requirements first, then use Daeryun only as UX density/reference.
4. Keep admin-only design controls out of the public app.
5. Keep Cloudflare security/bot handling out of app UI.
