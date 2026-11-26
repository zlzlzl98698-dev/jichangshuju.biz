import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));

const brands = readJson('data/brands/brands.json');
const plans = readJson('data/plans/plans.json');
const speedtests = readJson('data/speedtests/speedtests.json');
const availability = readJson('data/availability/availability.json');
const clients = readJson('data/clients/clients.json');

// 1. Ensure SVG monogram badges exist for brands whose logo points to .svg
const logosDir = path.join(root, 'docs/public/assets/logos');
fs.mkdirSync(logosDir, { recursive: true });
for (const b of brands) {
  if (b.logo.endsWith('.svg')) {
    const outPath = path.join(root, 'docs/public', b.logo.replace(/^\//, ''));
    const label = b.name.slice(0, 2);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="${b.name}">
  <rect width="128" height="128" rx="24" fill="${b.accentColor}"/>
  <rect x="6" y="6" width="116" height="116" rx="20" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
  <text x="64" y="76" font-family="system-ui,-apple-system,Segoe UI,PingFang SC,Microsoft YaHei,sans-serif" font-size="44" font-weight="700" fill="#ffffff" text-anchor="middle">${label}</text>
</svg>\n`;
    fs.writeFileSync(outPath, svg, 'utf8');
  }
}

// 2. Export sanitized public JSON & CSV datasets (explicitly excluding any private keys or internal notes)
const publicDataDir = path.join(root, 'docs/public/data');
fs.mkdirSync(publicDataDir, { recursive: true });

const publicBrands = brands.map((b) => ({
  brandId: b.brandId,
  name: b.name,
  slug: b.slug,
  aliases: b.aliases,
  foundedYear: b.foundedYear,
  protocols: b.protocols,
  networkTypes: b.networkTypes,
  regions: b.regions,
  deviceLimit: b.deviceLimit,
  officialClient: b.officialClient,
  thirdPartySupport: b.thirdPartySupport,
  paymentMethods: b.paymentMethods,
  completenessScore: b.completenessScore,
  verifiedAt: b.verifiedAt,
  updatedAt: b.updatedAt,
  canonicalUrl: `https://jichangshuju.biz/brands/${b.slug}`,
}));

const publicPlans = plans.map((p) => {
  const monthlyAvg = p.billingMonths ? +(p.price / p.billingMonths).toFixed(2) : null;
  const perGb = p.trafficGB && p.trafficGB > 0
    ? p.billingType === 'one-time'
      ? +(p.price / p.trafficGB).toFixed(3)
      : monthlyAvg !== null
        ? +(monthlyAvg / p.trafficGB).toFixed(3)
        : null
    : null;
  return {
    planId: p.planId,
    brandId: p.brandId,
    planName: p.planName,
    priceCNY: p.price,
    billingType: p.billingType,
    billingMonths: p.billingMonths,
    avgMonthlyCNY: monthlyAvg,
    trafficGB: p.trafficGB,
    costPerGbCNY: perGb,
    trafficResetCycle: p.trafficResetCycle,
    deviceLimit: p.deviceLimit,
    dataStatus: p.dataStatus,
    recordedAt: p.recordedAt,
  };
});

fs.writeFileSync(path.join(publicDataDir, 'brands.json'), JSON.stringify(publicBrands, null, 2));
fs.writeFileSync(path.join(publicDataDir, 'plans.json'), JSON.stringify(publicPlans, null, 2));
fs.writeFileSync(path.join(publicDataDir, 'speedtests.json'), JSON.stringify(speedtests, null, 2));
fs.writeFileSync(path.join(publicDataDir, 'availability.json'), JSON.stringify(availability, null, 2));
fs.writeFileSync(path.join(publicDataDir, 'clients.json'), JSON.stringify(clients, null, 2));

// CSV exports with UTF-8 BOM for Excel friendliness
const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const brandCsv = [
  ['brandId', 'name', 'slug', 'foundedYear', 'protocols', 'networkTypes', 'thirdPartySupport', 'completenessScore', 'verifiedAt', 'canonicalUrl'].join(','),
  ...publicBrands.map((b) =>
    [b.brandId, b.name, b.slug, b.foundedYear ?? '待核实', b.protocols.join(';'), b.networkTypes.join(';'), b.thirdPartySupport, b.completenessScore, b.verifiedAt, b.canonicalUrl]
      .map(esc)
      .join(',')
  ),
].join('\n');

const planCsv = [
  ['planId', 'brandId', 'planName', 'priceCNY', 'billingType', 'billingMonths', 'avgMonthlyCNY', 'trafficGB', 'costPerGbCNY', 'dataStatus', 'recordedAt'].join(','),
  ...publicPlans.map((p) =>
    [p.planId, p.brandId, p.planName, p.priceCNY, p.billingType, p.billingMonths ?? '', p.avgMonthlyCNY ?? '', p.trafficGB ?? '', p.costPerGbCNY ?? '', p.dataStatus, p.recordedAt]
      .map(esc)
      .join(',')
  ),
].join('\n');

fs.writeFileSync(path.join(publicDataDir, 'brands.csv'), '\uFEFF' + brandCsv, 'utf8');
fs.writeFileSync(path.join(publicDataDir, 'plans.csv'), '\uFEFF' + planCsv, 'utf8');

console.log(`Exported public JSON/CSV datasets and SVG logos to docs/public/data and docs/public/assets/logos.`);
