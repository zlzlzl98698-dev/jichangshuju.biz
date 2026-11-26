import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const keywords = JSON.parse(fs.readFileSync(path.join(root, 'data/keywords/keywords.json'), 'utf8'));
const brands = JSON.parse(fs.readFileSync(path.join(root, 'data/brands/brands.json'), 'utf8'));

// Detect cannibalization (same normalizedKeyword pointing to multiple URLs or multiple S-tier pages targeting same parentKeyword)
const byNorm = new Map();
for (const k of keywords) {
  if (!byNorm.has(k.normalizedKeyword)) byNorm.set(k.normalizedKeyword, []);
  byNorm.get(k.normalizedKeyword).push(k);
}
const cannibalization = [...byNorm.entries()]
  .filter(([, list]) => list.length > 1)
  .map(([kw, list]) => ({ keyword: kw, urls: list.map((x) => x.targetUrl) }));

// Auto-generate candidate long-tail keywords for every brand lacking explicit brand-review keyword mapping
const mappedBrands = new Set(keywords.map((k) => k.entityId));
const brandCandidates = brands
  .filter((b) => !mappedBrands.has(b.brandId))
  .map((b) => ({
    keyword: `${b.name} 评测与套餐`,
    entityId: b.brandId,
    targetUrl: `/brands/${b.slug}`,
    priority: b.promotionPriority <= 11 ? 'A' : 'B',
    reason: 'Brand review page exists; add long-tail brand query tracking',
  }));

const report = {
  generatedAt: new Date().toISOString(),
  totalTrackedKeywords: keywords.length,
  byPriority: {
    S: keywords.filter((k) => k.priority === 'S').length,
    A: keywords.filter((k) => k.priority === 'A').length,
    B: keywords.filter((k) => k.priority === 'B').length,
    C: keywords.filter((k) => k.priority === 'C').length,
  },
  cannibalizationAlerts: cannibalization,
  brandExpansionCandidates: brandCandidates,
  upgradeCandidates: keywords.filter((k) => k.contentStatus === 'upgrade'),
  pendingVerificationTopics: keywords.filter((k) => k.contentStatus === 'pending-verification'),
};

fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports/keyword-discovery-report.json'), JSON.stringify(report, null, 2));
console.log(`Keyword discovery analysis complete. Tracked=${report.totalTrackedKeywords}, BrandExpansionCandidates=${brandCandidates.length}, Cannibalization=${cannibalization.length}`);
