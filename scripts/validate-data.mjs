import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));

const brands = readJson('data/brands/brands.json');
const plans = readJson('data/plans/plans.json');
const speedtests = readJson('data/speedtests/speedtests.json');
const availability = readJson('data/availability/availability.json');
const clients = readJson('data/clients/clients.json');
const affiliateLinks = readJson('data/affiliate-links.json');
const conflicts = readJson('data/sources/data-conflicts.json');
const sources = readJson('data/sources/sources.json');
const keywords = readJson('data/keywords/keywords.json');

const errors = [];
const warnings = [];

// 1. Unique brandIds & slugs (expect 31 unique entities)
const brandIds = new Set();
const slugs = new Set();
for (const b of brands) {
  if (brandIds.has(b.brandId)) errors.push(`Duplicate brandId: ${b.brandId}`);
  if (slugs.has(b.slug)) errors.push(`Duplicate slug: ${b.slug}`);
  brandIds.add(b.brandId);
  slugs.add(b.slug);
  if (!b.name || !b.slug || !b.verifiedAt) errors.push(`Brand missing required fields: ${b.brandId}`);
  const logoFile = path.join(root, 'docs/public', b.logo.replace(/^\//, ''));
  if (!fs.existsSync(logoFile)) {
    warnings.push(`Logo not yet generated/found for ${b.brandId}: ${b.logo}`);
  }
}

if (brands.length !== 31) {
  errors.push(`Expected 31 unique brand entities after Firefly merge, got ${brands.length}`);
}

// 2. Validate promotionPriority order for top 11 & trailing 3
const priorityOrder = [...brands].sort((a, b) => a.promotionPriority - b.promotionPriority).map((b) => b.brandId);
const expectedTop = ['guangsuyun', 'muguang', 'feimao', 'weifeng', 'dalaoyun', 'xingdaomeng', 'yinxingren', 'ermao', 'wuyou', 'weitu', 'firefly'];
expectedTop.forEach((id, idx) => {
  if (priorityOrder[idx] !== id) {
    errors.push(`Promotion priority mismatch at index ${idx}: expected ${id}, got ${priorityOrder[idx]}`);
  }
});
const expectedTail = ['lingdong', 'langwang', 'edgenova'];
expectedTail.forEach((id, idx) => {
  if (priorityOrder[brands.length - 3 + idx] !== id) {
    errors.push(`Trailing brand order mismatch: expected ${id}`);
  }
});

// 3. Validate affiliate links match brands
const linkMap = new Map(affiliateLinks.map((l) => [l.brandId, l]));
for (const b of brands) {
  const link = linkMap.get(b.brandId);
  if (!link) errors.push(`Missing affiliate registry entry for ${b.brandId}`);
  else if (link.rel !== 'nofollow sponsored noopener' || link.target !== '_blank') {
    errors.push(`Invalid affiliate rel/target for ${b.brandId}`);
  }
}

// 4. Validate plans reference valid brandIds & sourceIds
const sourceIds = new Set(sources.map((s) => s.sourceId));
for (const p of plans) {
  if (!brandIds.has(p.brandId)) errors.push(`Plan ${p.planId} references unknown brandId ${p.brandId}`);
  if (!sourceIds.has(p.sourceId)) errors.push(`Plan ${p.planId} references unknown sourceId ${p.sourceId}`);
  if (p.billingType !== 'one-time' && (!p.billingMonths || p.billingMonths <= 0)) {
    errors.push(`Periodic plan ${p.planId} missing billingMonths`);
  }
}

// 5. Validate speedtests & images
for (const s of speedtests) {
  if (!brandIds.has(s.brandId)) errors.push(`Speedtest ${s.testId} references unknown brandId ${s.brandId}`);
  if (s.imagePath) {
    const imgPath = path.join(root, 'docs/public', s.imagePath.replace(/^\//, ''));
    if (!fs.existsSync(imgPath)) errors.push(`Speedtest image missing: ${s.imagePath}`);
  }
  if (s.extraImages) {
    for (const ex of s.extraImages) {
      const exPath = path.join(root, 'docs/public', ex.path.replace(/^\//, ''));
      if (!fs.existsSync(exPath)) errors.push(`Extra speedtest image missing: ${ex.path}`);
    }
  }
}

// 6. Validate availability & clients & keywords
for (const a of availability) {
  if (!brandIds.has(a.brandId)) errors.push(`Availability entry references unknown brandId ${a.brandId}`);
}
for (const c of clients) {
  if (!c.clientId || !c.platforms?.length) errors.push(`Invalid client ${c.clientId}`);
}
const kwSet = new Set();
for (const k of keywords) {
  if (kwSet.has(k.normalizedKeyword)) warnings.push(`Potential duplicate normalizedKeyword: ${k.normalizedKeyword}`);
  kwSet.add(k.normalizedKeyword);
}

// 7. Write validation summary report
fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'reports/data-validation-report.json'),
  JSON.stringify(
    {
      validatedAt: new Date().toISOString(),
      counts: {
        brands: brands.length,
        plans: plans.length,
        speedtests: speedtests.length,
        availabilityEntries: availability.length,
        clients: clients.length,
        conflicts: conflicts.length,
        keywords: keywords.length,
      },
      errors,
      warnings,
    },
    null,
    2
  )
);

if (errors.length > 0) {
  console.error('Data validation failed:\n', errors.join('\n'));
  process.exit(1);
}
console.log(`Data validation passed! Brands=${brands.length}, Plans=${plans.length}, Speedtests=${speedtests.length}, Clients=${clients.length}, Conflicts=${conflicts.length}. Warnings=${warnings.length}`);
if (warnings.length) console.log('Warnings:\n' + warnings.join('\n'));
