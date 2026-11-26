import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'docs/.vitepress/dist');

const walkHtml = (dir) => {
  const res = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) res.push(...walkHtml(full));
    else if (entry.name.endsWith('.html')) res.push(full);
  }
  return res;
};

const htmlFiles = walkHtml(distDir);
const brands = JSON.parse(fs.readFileSync(path.join(root, 'data/brands/brands.json'), 'utf8'));
const affiliateLinks = JSON.parse(fs.readFileSync(path.join(root, 'data/affiliate-links.json'), 'utf8'));
const affUrls = new Set(affiliateLinks.map((a) => a.affiliateUrl).filter(Boolean));

const issues = [];
const titles = new Map();
const brokenLinks = [];
const emptyPages = [];
const missingCanonical = [];
const nonCompliantAffiliate = [];

const resolveInternalHtml = (href) => {
  const clean = decodeURIComponent(href.split('#')[0].split('?')[0]);
  if (!clean || clean === '/') return fs.existsSync(path.join(distDir, 'index.html'));
  const rel = clean.replace(/^\//, '');
  if (fs.existsSync(path.join(distDir, rel))) return true;
  if (fs.existsSync(path.join(distDir, `${rel}.html`))) return true;
  if (fs.existsSync(path.join(distDir, rel, 'index.html'))) return true;
  return false;
};

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  if (relPath === '404.html') continue;

  const html = fs.readFileSync(file, 'utf8');
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';
  if (!title) issues.push(`Missing title: ${relPath}`);
  else {
    if (titles.has(title)) issues.push(`Duplicate title "${title}" in ${relPath} and ${titles.get(title)}`);
    titles.set(title, relPath);
  }

  if (!/<link rel="canonical" href="https:\/\/jichangshuju\.biz/.test(html)) {
    missingCanonical.push(relPath);
  }

  const textLen = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '').trim().length;
  if (textLen < 350) emptyPages.push({ relPath, textLen });

  // Check FAQPage JSON-LD vs visible FAQ section inside main content container (no Hidden Schema allowed)
  const docHtml = (html.match(/<div class="content-container"[^>]*>([\s\S]*?)(?=<footer class="ad-global-footer"|<\/body>)/i) || html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || ['', ''])[1];
  const lds = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const lm of lds) {
    try {
      const obj = JSON.parse(lm[1]);
      for (const g of obj['@graph'] || [obj]) {
        if (g['@type'] === 'FAQPage' && Array.isArray(g.mainEntity) && g.mainEntity.length > 0) {
          if (!/常见问题|FAQ/i.test(docHtml)) {
            issues.push(`Hidden FAQPage schema (no visible FAQ DOM): ${relPath}`);
          }
        }
      }
    } catch {
      issues.push(`Invalid JSON-LD: ${relPath}`);
    }
  }

  // Check internal & ALL external hrefs
  const hrefRe = /<a\b[^>]*href="([^"]+)"[^>]*>/gi;
  let m;
  while ((m = hrefRe.exec(html)) !== null) {
    const tag = m[0];
    const href = m[1];
    if (href.startsWith('/') && !href.startsWith('//')) {
      if (!resolveInternalHtml(href)) {
        brokenLinks.push({ page: relPath, href });
      }
    }
    if (/^https?:\/\//i.test(href) && !href.startsWith('https://jichangshuju.biz')) {
      const hasNofollow = /rel="[^"]*\bnofollow\b/i.test(tag);
      const isAff = affUrls.has(href) || /aff\.|code=/i.test(href);
      if (!hasNofollow) {
        nonCompliantAffiliate.push({ page: relPath, href, reason: 'missing rel=nofollow' });
      } else if (isAff && (!/sponsored/i.test(tag) || !/target="_blank"/i.test(tag))) {
        nonCompliantAffiliate.push({ page: relPath, href, reason: 'missing sponsored or _blank' });
      }
    }
  }
}

// Check all 31 brand pages exist in dist
const missingBrands = [];
for (const b of brands) {
  const p1 = path.join(distDir, 'brands', `${b.slug}.html`);
  const p2 = path.join(distDir, 'brands', b.slug, 'index.html');
  if (!fs.existsSync(p1) && !fs.existsSync(p2)) missingBrands.push(b.slug);
}

// Check required deployment artifacts
const requiredArtifacts = ['sitemap.xml', 'robots.txt', 'feed.xml', 'llms.txt', 'llms-full.txt', '.htaccess', '404.html', 'data/brands.json', 'data/plans.csv'];
const missingArtifacts = requiredArtifacts.filter((a) => !fs.existsSync(path.join(distDir, a)));

const report = {
  auditedAt: new Date().toISOString(),
  totalHtmlPages: htmlFiles.length,
  missingBrands,
  missingArtifacts,
  missingCanonical,
  emptyPages,
  brokenLinksCount: brokenLinks.length,
  brokenLinks: brokenLinks.slice(0, 30),
  nonCompliantAffiliate,
  otherIssues: issues,
};

fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports/qa-audit-report.json'), JSON.stringify(report, null, 2));

console.log(
  `QA Audit Complete: Pages=${htmlFiles.length}, MissingBrands=${missingBrands.length}, MissingArtifacts=${missingArtifacts.length}, MissingCanonical=${missingCanonical.length}, EmptyPages=${emptyPages.length}, BrokenLinks=${brokenLinks.length}, NonCompliantAff=${nonCompliantAffiliate.length}, OtherIssues=${issues.length}`
);

if (
  missingBrands.length ||
  missingArtifacts.length ||
  missingCanonical.length ||
  emptyPages.length ||
  brokenLinks.length ||
  nonCompliantAffiliate.length ||
  issues.length
) {
  console.error('QA Issues found! See reports/qa-audit-report.json');
  process.exit(1);
}
