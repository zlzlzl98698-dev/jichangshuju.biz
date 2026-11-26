import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const articleMap = JSON.parse(fs.readFileSync(path.join(root, 'data/keywords/article-keyword-map.json'), 'utf8'));
const clusterMap = JSON.parse(fs.readFileSync(path.join(root, 'data/keywords/cluster-map.json'), 'utf8'));
const brands = JSON.parse(fs.readFileSync(path.join(root, 'data/brands/brands.json'), 'utf8'));
const existingKeywords = JSON.parse(fs.readFileSync(path.join(root, 'data/keywords/keywords.json'), 'utf8'));

// Planned longtail backlog candidates (all 15 items now published inside article-keyword-map.json)
const plannedBacklog = [];

const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

// 1. Write data/keywords/longtail-master.csv
const masterHeader = [
  'keyword',
  'primaryKeyword',
  'searchIntent',
  'parentTopic',
  'parentUrl',
  'targetUrl',
  'priority',
  'status',
  'searchVolume',
  'lastReviewedAt',
];
const masterRows = [masterHeader.join(',')];

for (const a of articleMap) {
  masterRows.push(
    [
      esc(a.keyword),
      esc(a.primaryKeyword),
      esc(a.searchIntent),
      esc(a.parentTopic),
      esc(a.parentSecondary),
      esc(a.targetUrl),
      esc(a.contentPriority),
      esc(a.contentStatus),
      esc('unverified'),
      esc(a.lastReviewedAt),
    ].join(',')
  );
}
for (const b of brands) {
  masterRows.push(
    [
      esc(`${b.name}评测与套餐`),
      esc(`${b.name}怎么样`),
      esc('Commercial Investigation'),
      esc('机场品牌'),
      esc('/brands/'),
      esc(`/brands/${b.slug}`),
      esc(b.promotionPriority <= 11 ? 'A' : 'B'),
      esc('published'),
      esc('unverified'),
      esc(b.verifiedAt),
    ].join(',')
  );
  if (clusterMap.commercialBrandPlans.includes(`/brands/${b.slug}/plans`)) {
    masterRows.push(
      [
        esc(`${b.name}套餐价格优惠码`),
        esc(`${b.name}套餐怎么买`),
        esc('Transactional'),
        esc('机场品牌'),
        esc(`/brands/${b.slug}`),
        esc(`/brands/${b.slug}/plans`),
        esc(b.promotionPriority <= 5 ? 'S' : 'A'),
        esc('published'),
        esc('unverified'),
        esc('2026-11-26'),
      ].join(',')
    );
  }
}
for (const p of plannedBacklog) {
  masterRows.push(
    [
      esc(p.keyword),
      esc(p.keyword),
      esc(p.intent),
      esc(p.cluster),
      esc(p.parentUrl),
      esc(p.targetUrl),
      esc(p.priority),
      esc(p.status),
      esc('unverified'),
      esc('2026-11-26'),
    ].join(',')
  );
}
fs.writeFileSync(path.join(root, 'data/keywords/longtail-master.csv'), masterRows.join('\n'), 'utf8');

// 2. Write data/keywords/content-priority.csv
const prioHeader = ['priority', 'contentStatus', 'parentTopic', 'targetUrl', 'titleOrTopic', 'sourceRequirements'];
const prioRows = [prioHeader.join(',')];
for (const a of [...articleMap].sort((x, y) => x.contentPriority.localeCompare(y.contentPriority))) {
  prioRows.push(
    [
      esc(a.contentPriority),
      esc(a.contentStatus),
      esc(a.parentTopic),
      esc(a.targetUrl),
      esc(a.articleTitle),
      esc(a.sourceRequirements),
    ].join(',')
  );
}
for (const p of plannedBacklog) {
  prioRows.push(
    [esc(p.priority), esc(p.status), esc(p.cluster), esc(p.targetUrl), esc(p.keyword), esc('待下一批次撰写，禁止空页面')].join(',')
  );
}
fs.writeFileSync(path.join(root, 'data/keywords/content-priority.csv'), prioRows.join('\n'), 'utf8');

// 3. Merge into data/keywords/keywords.json without duplicate normalizedKeyword or conflicting targetUrls
const seenNorm = new Set(existingKeywords.map((k) => k.normalizedKeyword));
const seenUrls = new Set(existingKeywords.map((k) => k.targetUrl));
const merged = [...existingKeywords];

for (const a of articleMap) {
  const norm = a.keyword.toLowerCase();
  if (!seenNorm.has(norm) && !seenUrls.has(a.targetUrl)) {
    merged.push({
      keyword: a.primaryKeyword,
      normalizedKeyword: norm,
      parentKeyword: a.parentTopic,
      entityId: a.relatedBrands[0] || `cluster-${a.parentCluster.replace(/\//g, '')}`,
      intent: a.searchIntent.toLowerCase().includes('transactional')
        ? 'transactional'
        : a.searchIntent.toLowerCase().includes('commercial') || a.searchIntent.toLowerCase().includes('comparison')
          ? 'commercial'
          : 'informational',
      topicCluster: a.parentTopic,
      funnelStage: a.searchIntent.includes('Commercial') ? 'MOFU' : 'TOFU',
      targetUrl: a.targetUrl,
      priority: a.contentPriority,
      source: '三级长尾发现与扩展',
      searchVolume: null,
      impressions: null,
      clicks: null,
      ctr: null,
      position: null,
      contentStatus: 'published',
      lastUpdated: a.lastReviewedAt,
    });
    seenNorm.add(norm);
    seenUrls.add(a.targetUrl);
  }
}

for (const cmp of [
  { kw: '光速云和二猫云对比', norm: '光速云 二猫云 对比', url: '/compare/guangsuyun-vs-ermao', id: 'compare-guangsuyun-ermao' },
  { kw: '飞猫云和星岛梦对比', norm: '飞猫云 星岛梦 对比', url: '/compare/feimao-vs-xingdaomeng', id: 'compare-feimao-xingdaomeng' },
]) {
  if (!seenNorm.has(cmp.norm)) {
    merged.push({
      keyword: cmp.kw,
      normalizedKeyword: cmp.norm,
      parentKeyword: '品牌对比',
      entityId: cmp.id,
      intent: 'commercial',
      topicCluster: '多品牌对比',
      funnelStage: 'BOFU',
      targetUrl: cmp.url,
      priority: 'A',
      source: '高价值双品牌对比扩展',
      searchVolume: null,
      impressions: null,
      clicks: null,
      ctr: null,
      position: null,
      contentStatus: 'published',
      lastUpdated: '2026-11-26',
    });
    seenNorm.add(cmp.norm);
  }
}

fs.writeFileSync(path.join(root, 'data/keywords/keywords.json'), JSON.stringify(merged, null, 2), 'utf8');
console.log(`Synced longtail-master.csv (${masterRows.length - 1} rows), content-priority.csv (${prioRows.length - 1} rows), keywords.json (${merged.length} entries).`);
