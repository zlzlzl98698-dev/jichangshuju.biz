import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'docs/.vitepress/dist');
const SITE_URL = process.env.VITE_SITE_URL || 'https://jichangshuju.biz';

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found:', distDir);
  process.exit(1);
}

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const brands = readJson('data/brands/brands.json');
const plans = readJson('data/plans/plans.json');
const speedtests = readJson('data/speedtests/speedtests.json');
const conflicts = readJson('data/sources/data-conflicts.json');
const articleMap = readJson('data/keywords/article-keyword-map.json');
const clusterMap = readJson('data/keywords/cluster-map.json');

const escapeXml = (s) =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const parseMdMeta = (relMd) => {
  const full = path.join(root, relMd);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = fmMatch ? fmMatch[1] : '';
  const getVal = (key) => {
    const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    if (!m) return '';
    return m[1].trim().replace(/^["']|["']$/g, '');
  };
  return {
    title: getVal('title'),
    description: getVal('description'),
    updatedAt: getVal('updatedAt') || getVal('verifiedAt') || '2026-11-26',
  };
};

const toRfc822 = (dateStr) => {
  const iso = /^\d{4}-\d{2}-\d{2}/.test(dateStr) ? `${dateStr.slice(0, 10)}T08:00:00+08:00` : '2026-11-26T08:00:00+08:00';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date('2026-11-26T08:00:00+08:00').toUTCString() : d.toUTCString();
};

const feedItems = [];
const seenLinks = new Set();
const addFeedItem = (title, urlPath, dateStr, description) => {
  const cleanPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  const link = `${SITE_URL}${cleanPath}`;
  if (seenLinks.has(link) || !title) return;
  seenLinks.add(link);
  feedItems.push({
    title,
    link,
    pubDate: toRfc822(dateStr),
    sortDate: dateStr || '2026-11-26',
    description: description || title,
  });
};

// 1. Flagship databases & governance
for (const dbPath of ['/database/plans', '/database/speedtests', '/database/clients', '/database/availability', '/methodology/sources']) {
  const meta = parseMdMeta(`docs${dbPath}.md`);
  if (meta) addFeedItem(meta.title, dbPath, meta.updatedAt, meta.description);
}

// 2. All published Level-3 longtail articles
for (const a of articleMap) {
  if (a.contentStatus !== 'published') continue;
  const meta = parseMdMeta(`docs${a.targetUrl}.md`);
  addFeedItem(meta?.title || a.articleTitle, a.targetUrl, meta?.updatedAt || a.lastReviewedAt, meta?.description || a.keyword);
}

// 3. All brand comparison guides
const compareDir = path.join(root, 'docs/compare');
if (fs.existsSync(compareDir)) {
  for (const file of fs.readdirSync(compareDir)) {
    if (!file.endsWith('.md') || file === 'index.md') continue;
    const slug = file.replace(/\.md$/, '');
    const meta = parseMdMeta(`docs/compare/${file}`);
    if (meta) addFeedItem(meta.title, `/compare/${slug}`, meta.updatedAt, meta.description);
  }
}

// 4. All 31 brands (ordered by promotionPriority) & commercial /plans pages
for (const b of [...brands].sort((x, y) => x.promotionPriority - y.promotionPriority)) {
  const meta = parseMdMeta(`docs/brands/${b.slug}.md`);
  addFeedItem(
    meta?.title || `${b.name}评测与档案（完整度 ${b.completenessScore}%）`,
    `/brands/${b.slug}`,
    meta?.updatedAt || b.verifiedAt,
    meta?.description || b.summary
  );
  if (fs.existsSync(path.join(root, `docs/brands/${b.slug}/plans.md`))) {
    const planMeta = parseMdMeta(`docs/brands/${b.slug}/plans.md`);
    if (planMeta) addFeedItem(planMeta.title, `/brands/${b.slug}/plans`, planMeta.updatedAt, planMeta.description);
  }
}

feedItems.sort((a, b) => b.sortDate.localeCompare(a.sortDate));

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>机场数据 · Airport Data</title>
    <link>${SITE_URL}/</link>
    <description>中文网络服务结构化数据平台：${brands.length}家机场品牌档案、${plans.length}档套餐价格、历史测速、AI流媒体可用性与客户端文档</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${feedItems
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(distDir, 'feed.xml'), rssXml, 'utf8');

// 5. Generate GEO / AI-readable llms.txt & llms-full.txt
const topBrands = [...brands].sort((a, b) => a.promotionPriority - b.promotionPriority).slice(0, 12);
const llmsTxt = `# 机场数据 (Airport Data) — jichangshuju.biz

> 中文网络服务结构化数据平台与技术文档门户：提供 ${brands.length} 家机场品牌档案、${plans.length} 档套餐价格与每 GB 单位成本计算、${speedtests.length} 组历史测速与地区延迟记录、22 款客户端兼容矩阵、AI/流媒体可用性数据库以及 ${conflicts.length} 条开源透明数据冲突核实台账（CF-001 至 CF-018）。

## 数据真实性与引述原则（Citation & Verification Policy）
- 商业推广透明度：核心合作品牌“光速云”及各品牌推广入口严格公开商业关系，评测与数据排名不按佣金顺序伪造实测性能排行。
- 冲突与缺口原则：当不同源文本或图包存在分歧时（如 CF-001 光速云轻量版 59GB vs 69GB、CF-007 宇宙云测速归属等），本站保留原始分歧记录并在公开台账披露，不擅自删改或虚构数值。
- 缺图品牌边界：10 家缺少独立测速原图的品牌明确标注“缺独立图”，不伪造任何吞吐/延迟数字。

## 开放结构化数据集（Open Datasets）
- [品牌完整结构化数据 JSON](${SITE_URL}/data/brands.json): 包含 31 家品牌核心参数、完整度评分、协议与客户端支持模式
- [全量套餐与单位流量成本 CSV](${SITE_URL}/data/plans.csv): 包含 ${plans.length} 档套餐价格、计费周期、配额及标称每 GB 成本
- [RSS 更新订阅源](${SITE_URL}/feed.xml): 实时汇总全站品牌评测、商业详情、对比页与三级专题文章
- [数据来源与冲突台账](${SITE_URL}/methodology/sources): 查看 CF-001 至 CF-018 核对细则

## 十大一级专题与核心工具中心
- [机场推荐](/recommend/): ${SITE_URL}/recommend/
- [价格与套餐](/pricing/): ${SITE_URL}/pricing/
- [机场品牌大全](/brands/): ${SITE_URL}/brands/
- [VPN 与加速器](/vpn/): ${SITE_URL}/vpn/
- [客户端软件](/clients/): ${SITE_URL}/clients/
- [AI 与流媒体](/streaming-ai/): ${SITE_URL}/streaming-ai/
- [线路与节点](/network/): ${SITE_URL}/network/
- [使用教程](/guides/): ${SITE_URL}/guides/
- [故障排查](/diagnostics/): ${SITE_URL}/diagnostics/
- [风险与替代](/risks/): ${SITE_URL}/risks/
- [套餐价格与单位成本计算器](/database/plans): ${SITE_URL}/database/plans
- [客户端兼容性数据库](/database/clients): ${SITE_URL}/database/clients
- [多品牌 22 项参数并排对比工具](/compare/): ${SITE_URL}/compare/

## 核心推荐与高完整度品牌档案
${topBrands.map((b) => `- [${b.name}评测（完整度 ${b.completenessScore}%）](${SITE_URL}/brands/${b.slug}): ${b.summary}`).join('\n')}

## 长尾实用指南与排障文档精选
${articleMap
  .filter((a) => a.contentStatus === 'published')
  .slice(0, 20)
  .map((a) => `- [${a.articleTitle}](${SITE_URL}${a.targetUrl})`)
  .join('\n')}

## 完整索引
- [完整全站页面与实体索引 (llms-full.txt)](${SITE_URL}/llms-full.txt)
`;

const llmsFullTxt = `${llmsTxt}

## 全量 31 家机场品牌与商业页目录
${[...brands]
  .sort((a, b) => a.promotionPriority - b.promotionPriority)
  .map((b) => {
    const planCount = plans.filter((p) => p.brandId === b.brandId).length;
    const hasPlans = clusterMap.commercialBrandPlans.includes(`/brands/${b.slug}/plans`);
    return `- ${b.name} (${b.slug}) | 完整度 ${b.completenessScore}% | 套餐 ${planCount} 档 | 评测: ${SITE_URL}/brands/${b.slug}${hasPlans ? ` | 商业详情: ${SITE_URL}/brands/${b.slug}/plans` : ''} | 摘要: ${b.summary}`;
  })
  .join('\n')}

## 全部已发布三级长尾文章（共 ${articleMap.filter((a) => a.contentStatus === 'published').length} 篇）
${articleMap
  .filter((a) => a.contentStatus === 'published')
  .map((a) => `- [${a.parentTopic}] ${a.articleTitle} -> ${SITE_URL}${a.targetUrl}`)
  .join('\n')}
`;

fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf8');
fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf8');

// Ensure .htaccess was copied into dist
const srcHtaccess = path.join(root, 'docs/public/.htaccess');
const distHtaccess = path.join(distDir, '.htaccess');
if (fs.existsSync(srcHtaccess)) {
  fs.copyFileSync(srcHtaccess, distHtaccess);
}

// Ensure 404.html explicitly carries noindex, nofollow
const dist404 = path.join(distDir, '404.html');
if (fs.existsSync(dist404)) {
  let html404 = fs.readFileSync(dist404, 'utf8');
  if (!/name="robots"\s+content="[^"]*noindex/i.test(html404)) {
    html404 = html404.replace('</head>', '<meta name="robots" content="noindex, nofollow"></head>');
    fs.writeFileSync(dist404, html404, 'utf8');
  }
}

console.log(`Generated feed.xml (${feedItems.length} items), llms.txt, llms-full.txt, and synced .htaccess in docs/.vitepress/dist.`);
