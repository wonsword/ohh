import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = new URL('../', import.meta.url);
const OUT = new URL('reference-assets/', ROOT);
const OUT_PATH = fileURLToPath(OUT);

const sources = {
  ohyun: 'https://xn--v92b7yba209gttbpx5b.com/',
  daeryun: 'https://www.daeryunlaw.com/'
};

const clean = (value) => value.replace(/\s+/g, ' ').trim();
const stripTags = (html) => clean(
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
);

function absolutize(base, maybeUrl) {
  if (!maybeUrl || maybeUrl.startsWith('data:') || maybeUrl.startsWith('javascript:')) return null;
  try {
    return new URL(maybeUrl, base).href;
  } catch {
    return null;
  }
}

function extFromUrl(url, fallback = '.jpg') {
  const ext = extname(new URL(url).pathname).toLowerCase();
  return ext && ext.length <= 6 ? ext : fallback;
}

function extFromType(contentType, fallback = '.jpg') {
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('gif')) return '.gif';
  if (contentType.includes('svg')) return '.svg';
  return fallback;
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'Mozilla/5.0 reference collector' }
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get('content-type') ?? ''
  };
}

async function fetchText(url) {
  const { buffer, contentType } = await fetchBuffer(url);
  const charset = contentType.match(/charset=([^;]+)/i)?.[1]?.toLowerCase();
  const decoder = new TextDecoder(charset || 'utf-8');
  return decoder.decode(buffer);
}

async function downloadImage(url, fileStem, directory) {
  const { buffer, contentType } = await fetchBuffer(url);
  const magic = buffer.slice(0, 12).toString('hex');
  const isImage = contentType.startsWith('image/')
    || magic.startsWith('89504e47')
    || magic.startsWith('ffd8ff')
    || magic.startsWith('47494638')
    || magic.startsWith('52494646');
  if (!isImage) throw new Error(`not an image: ${contentType}`);
  const ext = magic.startsWith('89504e47')
    ? '.png'
    : magic.startsWith('ffd8ff')
      ? '.jpg'
      : extFromType(contentType, extFromUrl(url));
  const file = `${fileStem}${ext}`;
  await writeFile(join(directory, file), buffer);
  return { file, bytes: buffer.length, contentType };
}

function extractImages(html, base) {
  const images = [];

  for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
    const src = tag.match(/\s(?:src|data-src|data-original|data-lazy)=["']([^"']+)["']/i)?.[1];
    const alt = tag.match(/\salt=["']([^"']*)["']/i)?.[1] ?? '';
    const url = absolutize(base, src);
    if (url) images.push({ url, alt: clean(alt), kind: 'img' });
  }

  for (const [, raw] of html.matchAll(/url\(["']?([^"')]+)["']?\)/gi)) {
    const url = absolutize(base, raw);
    if (url) images.push({ url, alt: '', kind: 'css-url' });
  }

  return uniqueBy(images, 'url');
}

function extractAnchors(html, base) {
  const anchors = [];
  for (const [, href, body] of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const url = absolutize(base, href);
    const text = stripTags(body);
    if (url && text) anchors.push({ url, text });
  }
  return uniqueBy(anchors, 'url');
}

function uniqueBy(items, key) {
  const map = new Map();
  for (const item of items) {
    if (!map.has(item[key])) map.set(item[key], item);
  }
  return [...map.values()];
}

function pickHomepageImages(images) {
  return images
    .filter((image) => /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(image.url) || /image|upload|data|img|file/i.test(image.url))
    .filter((image) => !/close|btn|icon|blank|loading|favicon|logo/i.test(image.url))
    .filter((image) => !/\/upload\/lawyer\//i.test(image.url))
    .slice(0, 14);
}

function pickLawyerImage(images) {
  return images.find((image) => /lawyer|profile|member|upload|file|photo|people/i.test(image.url))
    ?? images.find((image) => !/logo|close|btn|icon|blank|loading|map/i.test(image.url));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(new URL('ohyun/', OUT), { recursive: true });
  await mkdir(new URL('ohyun/lawyers/', OUT), { recursive: true });

  const ohyunHtml = await fetchText(sources.ohyun);
  const daeryunHtml = await fetchText(sources.daeryun);

  await writeFile(new URL('ohyun-home.html', OUT), ohyunHtml, 'utf8');
  await writeFile(new URL('daeryun-home.html', OUT), daeryunHtml, 'utf8');

  const ohyunImages = extractImages(ohyunHtml, sources.ohyun);
  const ohyunAnchors = extractAnchors(ohyunHtml, sources.ohyun);
  const daeryunAnchors = extractAnchors(daeryunHtml, sources.daeryun);

  const downloaded = [];
  const homepageImages = pickHomepageImages(ohyunImages);
  for (const [index, image] of homepageImages.entries()) {
    try {
      const result = await downloadImage(image.url, `homepage-${String(index + 1).padStart(2, '0')}`, join(OUT_PATH, 'ohyun'));
      downloaded.push({ source: 'ohyun-home', file: `reference-assets/ohyun/${result.file}`, ...result, alt: image.alt, url: image.url });
    } catch (error) {
      downloaded.push({ source: 'ohyun-home', failed: image.url, error: error.message });
    }
  }

  const homepageLawyerImages = ohyunImages
    .filter((image) => /\/upload\/lawyer\//i.test(image.url))
    .slice(0, 10);
  for (const [index, image] of homepageLawyerImages.entries()) {
    try {
      const result = await downloadImage(image.url, `lawyer-home-${String(index + 1).padStart(2, '0')}`, join(OUT_PATH, 'ohyun', 'lawyers'));
      downloaded.push({ source: 'ohyun-home-lawyer', file: `reference-assets/ohyun/lawyers/${result.file}`, ...result, alt: image.alt, url: image.url });
    } catch (error) {
      downloaded.push({ source: 'ohyun-home-lawyer', failed: image.url, error: error.message });
    }
  }

  const lawyerLinks = ohyunAnchors
    .filter((link) => link.url.includes('code=ohLawyerView'))
    .slice(0, 10);

  const lawyerSamples = [];
  for (const [index, link] of lawyerLinks.entries()) {
    try {
      const html = await fetchText(link.url);
      const text = stripTags(html).slice(0, 1400);
      const pick = pickLawyerImage(extractImages(html, link.url));
      lawyerSamples.push({ name: link.text, url: link.url, sampleText: text });
      if (pick) {
        try {
          const result = await downloadImage(pick.url, `lawyer-${String(index + 1).padStart(2, '0')}`, join(OUT_PATH, 'ohyun', 'lawyers'));
          downloaded.push({ source: 'ohyun-lawyer', file: `reference-assets/ohyun/lawyers/${result.file}`, ...result, alt: pick.alt, url: pick.url, page: link.url });
        } catch (error) {
          downloaded.push({ source: 'ohyun-lawyer', failed: pick.url, error: error.message, page: link.url });
        }
      }
    } catch (error) {
      lawyerSamples.push({ name: link.text, url: link.url, error: error.message });
    }
  }

  const notes = {
    collectedAt: new Date().toISOString(),
    sources,
    ohyun: {
      menu: ohyunAnchors.filter((link) => /code=ohIntro|code=ohLawyerList|code=ohCenter|code=consult|code=intellectual|code=info|code=ohIncruit|code=press|code=ohLocation/.test(link.url)),
      fieldLinks: ohyunAnchors.filter((link) => !link.url.includes('code=ohLawyerView') && /ohcrime|ohdcrime|ohscrime|ohlabor|ohchusim|xn--/.test(link.url)).slice(0, 30),
      lawyerLinks,
      lawyerSamples
    },
    daeryun: {
      sampleLinks: daeryunAnchors.slice(0, 100)
    },
    downloaded
  };

  await writeFile(new URL('reference-summary.json', OUT), JSON.stringify(notes, null, 2), 'utf8');
  console.log(JSON.stringify({
    downloaded: downloaded.filter((item) => item.file).length,
    failures: downloaded.filter((item) => item.failed).length,
    lawyerPages: lawyerSamples.length,
    summary: 'reference-assets/reference-summary.json'
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
