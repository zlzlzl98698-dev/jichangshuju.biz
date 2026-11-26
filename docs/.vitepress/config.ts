import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://jichangshuju.biz').replace(/\/$/, '');
const ALGOLIA_APP_ID = process.env.VITE_ALGOLIA_APP_ID || '';
const ALGOLIA_SEARCH_KEY = process.env.VITE_ALGOLIA_SEARCH_API_KEY || '';
const ALGOLIA_INDEX_NAME = process.env.VITE_ALGOLIA_INDEX_NAME || '';
const hasAlgolia = Boolean(ALGOLIA_APP_ID && ALGOLIA_SEARCH_KEY && ALGOLIA_INDEX_NAME);
const GOOGLE_VERIFY = process.env.VITE_GOOGLE_SITE_VERIFICATION || '';
const BING_VERIFY = process.env.VITE_BING_SITE_VERIFICATION || '';
const SHENMA_VERIFY = process.env.VITE_SHENMA_SITE_VERIFICATION || '';
const BAIDU_VERIFY = process.env.VITE_BAIDU_SITE_VERIFICATION || '';
const SITE_BRAND = '机场数据';
const SITE_BRAND_EN = 'Airport Data';
const SECTION_LABELS: Record<string, string> = {
  recommend: '机场推荐',
  pricing: '价格与套餐',
  database: '数据中心',
  brands: '机场品牌',
  compare: '多品牌对比',
  vpn: 'VPN 与加速器',
  clients: '客户端软件',
  'streaming-ai': 'AI 与流媒体',
  network: '线路与节点',
  guides: '使用教程',
  diagnostics: '故障排查',
  risks: '风险与替代',
  methodology: '数据治理与声明',
};

const formatSchemaDate = (val: unknown): string => {
  if (!val) return '';
  if (val instanceof Date) return val.toISOString().slice(0, 10);
  const s = String(val);
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : s;
};

const brandsRaw = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'data/brands/brands.json'), 'utf8')
) as Array<{ name: string; slug: string; promotionPriority: number; completenessScore: number; verifiedAt?: string }>;

const speedtestsRaw = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'data/speedtests/speedtests.json'), 'utf8')
) as Array<{ testDate?: string; recordedAt?: string }>;

const allDates = [
  ...brandsRaw.map((b) => formatSchemaDate(b.verifiedAt)),
  ...speedtestsRaw.map((s) => formatSchemaDate(s.testDate || s.recordedAt)),
].filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d));
const LATEST_DATASET_DATE = allDates.sort().at(-1) || '2026-11-26';
const DEFAULT_OG_IMAGE = `${SITE_URL}/avatar.webp`;

const brandSidebarItems = [...brandsRaw]
  .sort((a, b) => a.promotionPriority - b.promotionPriority)
  .map((b) => ({
    text: `${b.name}${b.completenessScore < 60 ? '（档案）' : ''}`,
    link: `/brands/${b.slug}`,
  }));

export default defineConfig({
  lang: 'zh-CN',
  title: '机场数据',
  titleTemplate: ':title | 机场数据 jichangshuju.biz',
  description:
    '机场数据（Airport Data）是中文网络服务结构化数据平台，提供 31 个机场品牌档案、套餐价格与每GB成本计算、历史测速证据、AI与流媒体可用性及跨平台客户端文档。',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: SITE_URL,
    transformItems(items) {
      return items.filter((item) => !item.url.includes('404'));
    },
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
    ['meta', { name: 'theme-color', content: '#0f4c81' }],
    ['meta', { property: 'og:site_name', content: '机场数据 · Airport Data' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['link', { rel: 'icon', type: 'image/webp', href: '/avatar.webp' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: '机场数据 RSS', href: `${SITE_URL}/feed.xml` }],
    ...(GOOGLE_VERIFY ? ([['meta', { name: 'google-site-verification', content: GOOGLE_VERIFY }]] as [string, Record<string, string>][]) : []),
    ...(BING_VERIFY ? ([['meta', { name: 'msvalidate.01', content: BING_VERIFY }]] as [string, Record<string, string>][]) : []),
    ...(SHENMA_VERIFY ? ([['meta', { name: 'shenma-site-verification', content: SHENMA_VERIFY }]] as [string, Record<string, string>][]) : []),
    ...(BAIDU_VERIFY ? ([['meta', { name: 'baidu-site-verification', content: BAIDU_VERIFY }]] as [string, Record<string, string>][]) : []),
  ],
  transformPageData(pageData) {
    const rel = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '');
    const is404 = Boolean(pageData.isNotFound || pageData.relativePath === '404.md');
    const canonicalPath = rel ? `/${rel}` : '/';
    const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;

    const fm = pageData.frontmatter;
    const pageTitle = pageData.title || fm.title || `${SITE_BRAND} · ${SITE_BRAND_EN}`;
    const pageDesc = pageData.description || fm.description || '中文网络服务结构化数据平台';
    const isArticleType = ['review', 'docs', 'commercial', 'comparison', 'pillar'].includes(String(fm.pageType || ''));
    const pubDate = formatSchemaDate(fm.publishedAt || fm.verifiedAt) || '2026-11-26';
    const modDate = formatSchemaDate(fm.updatedAt) || LATEST_DATASET_DATE;
    const pageAuthor = String(fm.author || '机场数据编辑与性能实验室');

    const ogImage = fm.ogImage
      ? (String(fm.ogImage).startsWith('http') ? String(fm.ogImage) : `${SITE_URL}${fm.ogImage}`)
      : DEFAULT_OG_IMAGE;

    fm.head ??= [];
    if (!is404) {
      fm.head.push(['link', { rel: 'canonical', href: canonicalUrl }]);
    }
    fm.head.push(
      ['meta', { name: 'robots', content: is404 || fm.noindex ? 'noindex, nofollow' : 'index, follow' }],
      ['meta', { name: 'author', content: pageAuthor }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:type', content: isArticleType ? 'article' : 'website' }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'twitter:image', content: ogImage }]
    );

    if (isArticleType) {
      fm.head.push(
        ['meta', { property: 'article:published_time', content: `${pubDate}T08:00:00+08:00` }],
        ['meta', { property: 'article:modified_time', content: `${modDate}T08:00:00+08:00` }]
      );
    }

    const graphs: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: `${SITE_BRAND} (${SITE_BRAND_EN})`,
        url: SITE_URL,
        logo: `${SITE_URL}/avatar.webp`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_BRAND,
        inLanguage: 'zh-CN',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: pageDesc,
        inLanguage: 'zh-CN',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        dateModified: formatSchemaDate(fm.updatedAt) || '2026-11-26',
      },
    ];

    const segs = canonicalPath.replace(/\/$/, '').split('/').filter(Boolean);
    if (segs.length >= 1) {
      const crumbs: { label: string; href: string }[] = [{ label: '首页', href: '/' }];
      let acc = '';
      segs.forEach((seg, idx) => {
        acc += `/${seg}`;
        const isLast = idx === segs.length - 1;
        const label = isLast ? (fm.shortTitle || pageTitle || SECTION_LABELS[seg] || seg) : (SECTION_LABELS[seg] || seg);
        crumbs.push({ label, href: isLast ? '' : `${acc}/` });
      });
      graphs.push({
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: c.label,
          item: c.href ? `${SITE_URL}${c.href}` : canonicalUrl,
        })),
      });
    }

    if (fm.pageType === 'review' || fm.pageType === 'docs' || fm.pageType === 'commercial' || fm.pageType === 'pillar') {
      graphs.push({
        '@type': 'Article',
        headline: pageTitle,
        description: pageDesc,
        datePublished: formatSchemaDate(fm.publishedAt) || '2026-11-26',
        dateModified: formatSchemaDate(fm.updatedAt) || '2026-11-26',
        author: { '@type': 'Organization', name: fm.author || '机场数据编辑与性能实验室' },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
      });
    }

    if (fm.schemaCollection) {
      graphs.push({
        '@type': 'CollectionPage',
        name: pageTitle,
        description: pageDesc,
        url: canonicalUrl,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      });
    }

    if (Array.isArray(fm.itemList) && fm.itemList.length > 0) {
      graphs.push({
        '@type': 'ItemList',
        name: pageTitle,
        numberOfItems: fm.itemList.length,
        itemListElement: fm.itemList.map((entry: { name: string; url: string }, idx: number) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: entry.name,
          url: entry.url.startsWith('http') ? entry.url : `${SITE_URL}${entry.url}`,
        })),
      });
    }

    if (fm.softwareApp) {
      graphs.push({
        '@type': 'SoftwareApplication',
        name: fm.softwareApp.name,
        applicationCategory: 'NetworkingApplication',
        operatingSystem: fm.softwareApp.os,
        url: canonicalUrl,
      });
    }

    if (fm.pageType === 'database') {
      const endCoverage = formatSchemaDate(fm.updatedAt) || LATEST_DATASET_DATE;
      graphs.push({
        '@type': 'Dataset',
        name: pageTitle,
        description: pageDesc,
        url: canonicalUrl,
        creator: { '@id': `${SITE_URL}/#organization` },
        temporalCoverage: `2026-07-20/${endCoverage}`,
        distribution: [
          { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE_URL}/data/brands.json` },
          { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `${SITE_URL}/data/plans.csv` },
        ],
      });
    }

    if (fm.howTo && Array.isArray(fm.howTo.steps) && fm.howTo.steps.length > 0) {
      graphs.push({
        '@type': 'HowTo',
        name: fm.howTo.name || pageTitle,
        description: pageDesc,
        step: fm.howTo.steps.map((st: { name: string; text: string }, idx: number) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: st.name,
          text: st.text,
        })),
      });
    }

    if (Array.isArray(fm.faq) && fm.faq.length > 0) {
      const mdPath = path.resolve(process.cwd(), 'docs', pageData.relativePath);
      if (fs.existsSync(mdPath)) {
        const mdSrc = fs.readFileSync(mdPath, 'utf8').replace(/^---[\s\S]*?---/, '');
        if (!/^##\s+.*(常见问题|FAQ)/m.test(mdSrc)) {
          fm.autoFaq = true;
        }
      }
      graphs.push({
        '@type': 'FAQPage',
        mainEntity: fm.faq.map((item: { q: string; a: string }) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      });
    }

    fm.head.push([
      'script',
      { id: 'ad-jsonld', type: 'application/ld+json' },
      JSON.stringify({ '@context': 'https://schema.org', '@graph': graphs }),
    ]);
  },
  themeConfig: {
    logo: { src: '/avatar.webp', alt: '机场数据 Airport Data Logo' },
    siteTitle: '机场数据',
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: '最近更新',
    },
    darkModeSwitchLabel: '阅读模式',
    lightModeSwitchTitle: '切换浅色模式',
    darkModeSwitchTitle: '切换深色模式',
    sidebarMenuLabel: '专题目录',
    returnToTopLabel: '返回顶部',
    editLink: {
      pattern: 'https://jichangshuju.biz/methodology/corrections',
      text: '提交数据纠错或来源补充',
    },
    search: hasAlgolia
      ? {
          provider: 'algolia',
          options: {
            appId: ALGOLIA_APP_ID,
            apiKey: ALGOLIA_SEARCH_KEY,
            indexName: ALGOLIA_INDEX_NAME,
            placeholder: '搜索机场品牌、套餐、小火箭、IEPL 或故障代码…',
          },
        }
      : {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: '搜索品牌/套餐/教程', buttonAriaLabel: '搜索全站数据' },
              modal: {
                noResultsText: '未找到匹配内容，可尝试搜索品牌别名（如 小火箭 / 萤火虫 / 光速云）',
                resetButtonTitle: '清空查询',
                footer: { selectText: '打开', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
    nav: [
      {
        text: '机场推荐',
        items: [
          { text: '机场推荐总览', link: '/recommend/' },
          { text: '机场综合排行口径', link: '/recommend/rankings' },
          { text: '靠谱与老牌机场', link: '/recommend/reliable' },
          { text: '稳定与专线机场', link: '/recommend/stable' },
          { text: '好用与新手机场', link: '/recommend/beginner' },
          { text: '多设备与大流量机场', link: '/recommend/multi-device' },
          { text: '高性价比机场推荐', link: '/recommend/value' },
        ],
      },
      {
        text: '价格与套餐',
        items: [
          { text: '价格与套餐总览', link: '/pricing/' },
          { text: '机场套餐数据库 & 计算器', link: '/database/plans' },
          { text: '便宜机场（5.6元–15元）', link: '/pricing/cheap' },
          { text: '一元与一分机场解析', link: '/pricing/one-cent-airport' },
          { text: '月付机场筛选', link: '/pricing/monthly' },
          { text: '年付机场对比', link: '/pricing/annual' },
          { text: '不限时流量包汇总', link: '/pricing/no-expiry' },
          { text: '性价比与大流量套餐', link: '/pricing/value' },
          { text: '每GB流量成本与优惠码', link: '/pricing/traffic-cost' },
          { text: '全部品牌优惠码汇总', link: '/pricing/coupons' },
        ],
      },
      {
        text: '机场品牌',
        items: [
          { text: '31家机场品牌数据库', link: '/brands/' },
          { text: '光速云核心评测（旗舰）', link: '/brands/guangsuyun' },
          { text: '光速云完整套餐与成本', link: '/brands/guangsuyun/plans' },
          { text: '多品牌参数并排对比', link: '/compare/' },
          { text: '机场数据中心总览', link: '/database/' },
        ],
      },
      {
        text: 'VPN 与加速器',
        items: [
          { text: 'VPN 与机场核心差异', link: '/vpn/' },
          { text: '手机 VPN（安卓 / iPhone）', link: '/vpn/mobile' },
          { text: 'Windows 与桌面端 VPN', link: '/vpn/windows' },
          { text: 'VPN 价格与评测口径', link: '/vpn/pricing-comparison' },
          { text: '游戏加速器对比', link: '/vpn/game-accelerators' },
        ],
      },
      {
        text: '客户端软件',
        items: [
          { text: '客户端兼容性数据库', link: '/clients/' },
          { text: 'Windows 客户端大全', link: '/clients/windows' },
          { text: 'Android 安卓客户端', link: '/clients/android' },
          { text: 'iOS / iPadOS（小火箭等）', link: '/clients/ios' },
          { text: 'macOS 客户端（双芯片）', link: '/clients/macos' },
          { text: 'Linux 与 OpenWrt 软路由', link: '/clients/linux-openwrt' },
          { text: 'Clash Verge Rev 专篇', link: '/clients/clash-verge' },
          { text: 'Shadowrocket 小火箭专篇', link: '/clients/shadowrocket' },
          { text: 'v2rayN 专篇', link: '/clients/v2rayn' },
        ],
      },
      {
        text: 'AI 与流媒体',
        items: [
          { text: 'AI 与流媒体专题总览', link: '/streaming-ai/' },
          { text: 'AI 与流媒体可用性矩阵', link: '/database/availability' },
          { text: 'ChatGPT / Claude / Gemini 指南', link: '/streaming-ai/chatgpt' },
          { text: 'Netflix / Disney+ 解锁', link: '/streaming-ai/netflix' },
          { text: 'YouTube / TikTok / Spotify', link: '/streaming-ai/youtube-tiktok' },
        ],
      },
      {
        text: '线路与节点',
        items: [
          { text: '线路与节点技术总览', link: '/network/' },
          { text: '历史测速数据库', link: '/database/speedtests' },
          { text: 'IEPL 专线详解', link: '/network/iepl' },
          { text: 'IPLC 专线对比', link: '/network/iplc' },
          { text: 'BGP 中转与直连线路', link: '/network/bgp-transit' },
          { text: '港/日/新/美节点地区分析', link: '/network/regions' },
          { text: '线路倍率与原生 IP', link: '/network/multiplier-native-ip' },
        ],
      },
      {
        text: '使用教程',
        items: [
          { text: '新手使用教程总览', link: '/guides/' },
          { text: '机场订阅导入教程', link: '/guides/subscription' },
          { text: 'Clash 分流规则配置', link: '/guides/clash-rules' },
          { text: 'TUN 模式与 DNS 设置', link: '/guides/tun-dns' },
          { text: '多设备与套餐选择策略', link: '/guides/plan-selection' },
        ],
      },
      {
        text: '故障排查',
        items: [
          { text: '网络诊断知识库', link: '/diagnostics/' },
          { text: '节点超时与全部超时', link: '/diagnostics/all-timeout' },
          { text: '订阅失败与无法连接', link: '/diagnostics/subscription-failed' },
          { text: 'DNS 错误与网速慢', link: '/diagnostics/dns-speed' },
          { text: 'AI 降级与流媒体区域错误', link: '/diagnostics/ai-streaming-errors' },
        ],
      },
      {
        text: '风险与替代',
        items: [
          { text: '风险与运营核查中心', link: '/risks/' },
          { text: '机场跑路预警与避坑', link: '/risks/exit-scam-warning' },
          { text: '机场退款与安全性分析', link: '/risks/safety-refund' },
          { text: '品牌替代方案矩阵', link: '/risks/alternatives' },
          { text: '数据来源、冲突与纠错', link: '/methodology/sources' },
        ],
      },
    ],
    sidebar: {
      '/recommend/': [
        {
          text: '机场推荐与决策指南',
          items: [
            { text: '机场推荐总览', link: '/recommend/' },
            { text: '机场综合排行口径', link: '/recommend/rankings' },
            { text: '靠谱与老牌机场', link: '/recommend/reliable' },
            { text: '稳定与专线机场', link: '/recommend/stable' },
            { text: '好用与新手机场', link: '/recommend/beginner' },
            { text: '多设备与大流量机场', link: '/recommend/multi-device' },
            { text: '高性价比机场推荐', link: '/recommend/value' },
          ],
        },
      ],
      '/pricing/': [
        {
          text: '价格与套餐专题',
          items: [
            { text: '价格与套餐总览', link: '/pricing/' },
            { text: '便宜机场（5.6元起）', link: '/pricing/cheap' },
            { text: '10元以内预算账本', link: '/pricing/10-yuan-budget' },
            { text: '一元/一分机场风险', link: '/pricing/one-cent-airport' },
            { text: '月付机场', link: '/pricing/monthly' },
            { text: '年付机场', link: '/pricing/annual' },
            { text: '不限时流量包', link: '/pricing/no-expiry' },
            { text: '性价比与大流量', link: '/pricing/value' },
            { text: '每GB流量成本模型', link: '/pricing/traffic-cost' },
            { text: '品牌优惠码汇总', link: '/pricing/coupons' },
          ],
        },
        {
          text: '交互式数据中心',
          items: [
            { text: '套餐数据库与计算器', link: '/database/plans' },
            { text: '光速云套餐全解析', link: '/brands/guangsuyun/plans' },
          ],
        },
      ],
      '/database/': [
        {
          text: '结构化数据平台',
          items: [
            { text: '机场数据中心总览', link: '/database/' },
            { text: '机场套餐数据库与计算器', link: '/database/plans' },
            { text: '历史测速数据库', link: '/database/speedtests' },
            { text: 'AI 与流媒体可用性矩阵', link: '/database/availability' },
            { text: '客户端兼容性数据库', link: '/database/clients' },
            { text: '关键词发现与映射库', link: '/database/keywords' },
          ],
        },
      ],
      '/brands/': [
        {
          text: '品牌库与核心页面',
          items: [
            { text: '31家机场品牌数据库', link: '/brands/' },
            { text: '光速云完整套餐与成本', link: '/brands/guangsuyun/plans' },
            { text: '多品牌参数对比工具', link: '/compare/' },
          ],
        },
        {
          text: '全部 31 个品牌评测与档案',
          collapsed: false,
          items: brandSidebarItems,
        },
      ],
      '/compare/': [
        {
          text: '多品牌对比系统',
          items: [
            { text: '并排对比器（2-4家）', link: '/compare/' },
            { text: '光速云 vs 暮光加速', link: '/compare/guangsuyun-vs-muguang' },
            { text: '光速云 vs 飞猫云', link: '/compare/guangsuyun-vs-feimao' },
            { text: '光速云 vs 星岛梦', link: '/compare/guangsuyun-vs-xingdaomeng' },
            { text: '唯兔云 vs Firefly', link: '/compare/weitu-vs-firefly' },
            { text: '5.6元平价档5品牌横向对比', link: '/compare/budget-tier-56' },
          ],
        },
      ],
      '/vpn/': [
        {
          text: 'VPN 与加速器专题',
          items: [
            { text: 'VPN 与机场区别', link: '/vpn/' },
            { text: '手机 VPN（安卓 / iOS）', link: '/vpn/mobile' },
            { text: 'Windows 与桌面 VPN', link: '/vpn/windows' },
            { text: 'VPN 价格对比与口径', link: '/vpn/pricing-comparison' },
            { text: '游戏加速器对比', link: '/vpn/game-accelerators' },
          ],
        },
      ],
      '/clients/': [
        {
          text: '按操作系统分类',
          items: [
            { text: '客户端兼容性总览', link: '/clients/' },
            { text: 'Windows 客户端', link: '/clients/windows' },
            { text: 'Android 客户端', link: '/clients/android' },
            { text: 'iOS / iPadOS 客户端', link: '/clients/ios' },
            { text: 'macOS 客户端', link: '/clients/macos' },
            { text: 'Linux 与 OpenWrt 软路由', link: '/clients/linux-openwrt' },
          ],
        },
        {
          text: '重点客户端专篇',
          items: [
            { text: 'Clash Verge Rev', link: '/clients/clash-verge' },
            { text: 'Shadowrocket（小火箭）', link: '/clients/shadowrocket' },
            { text: 'v2rayN', link: '/clients/v2rayn' },
          ],
        },
      ],
      '/streaming-ai/': [
        {
          text: 'AI 与流媒体',
          items: [
            { text: 'AI 与流媒体专题总览', link: '/streaming-ai/' },
            { text: 'AI 服务环境（ChatGPT/Claude/Gemini）', link: '/streaming-ai/chatgpt' },
            { text: '流媒体解锁（Netflix/Disney+）', link: '/streaming-ai/netflix' },
            { text: 'YouTube / TikTok / Spotify', link: '/streaming-ai/youtube-tiktok' },
            { text: '完整可用性矩阵表', link: '/database/availability' },
          ],
        },
      ],
      '/network/': [
        {
          text: '线路架构与节点知识',
          items: [
            { text: '线路与节点百科总览', link: '/network/' },
            { text: 'IEPL 专线技术解析', link: '/network/iepl' },
            { text: 'IPLC 专线架构', link: '/network/iplc' },
            { text: 'BGP 中转与直连对比', link: '/network/bgp-transit' },
            { text: '港/日/新/美节点表现', link: '/network/regions' },
            { text: '线路倍率与原生 IP', link: '/network/multiplier-native-ip' },
            { text: 'VLESS / HY2 / Trojan 协议对比', link: '/network/vless-reality-vs-hy2' },
            { text: '历史测速数据库', link: '/database/speedtests' },
          ],
        },
      ],
      '/guides/': [
        {
          text: '操作与配置指南',
          items: [
            { text: '新手使用教程总览', link: '/guides/' },
            { text: '机场订阅导入全流程', link: '/guides/subscription' },
            { text: 'Clash 规则分流配置', link: '/guides/clash-rules' },
            { text: 'TUN 模式与 DNS 设置', link: '/guides/tun-dns' },
            { text: '多设备与套餐选择方法', link: '/guides/plan-selection' },
            { text: 'OpenWrt 软路由挑选与避坑', link: '/guides/router-openwrt' },
          ],
        },
      ],
      '/diagnostics/': [
        {
          text: '故障诊断知识库',
          items: [
            { text: '故障排查总览', link: '/diagnostics/' },
            { text: '节点超时与全部节点超时', link: '/diagnostics/all-timeout' },
            { text: '订阅失败与无法连接', link: '/diagnostics/subscription-failed' },
            { text: 'DNS 错误与速度慢', link: '/diagnostics/dns-speed' },
            { text: 'Clash TUN 冲突与端口占用', link: '/diagnostics/clash-tun-conflict' },
            { text: 'AI 降级与流媒体区域异常', link: '/diagnostics/ai-streaming-errors' },
          ],
        },
      ],
      '/risks/': [
        {
          text: '风险与替代方案',
          items: [
            { text: '风险与核查中心', link: '/risks/' },
            { text: '机场跑路预警与避坑', link: '/risks/exit-scam-warning' },
            { text: '专属客户端锁定与迁移', link: '/risks/exclusive-client-lockin' },
            { text: '退款政策与安全性', link: '/risks/safety-refund' },
            { text: '品牌替代方案矩阵', link: '/risks/alternatives' },
          ],
        },
      ],
      '/methodology/': [
        {
          text: '数据治理与站点规范',
          items: [
            { text: '关于机场数据', link: '/methodology/about' },
            { text: '数据来源与冲突台账', link: '/methodology/sources' },
            { text: '评测口径与可信度分级', link: '/methodology/evaluation' },
            { text: '商业推广披露', link: '/methodology/disclosure' },
            { text: '数据纠错与历史记录', link: '/methodology/corrections' },
            { text: '隐私政策与免责声明', link: '/methodology/privacy-disclaimer' },
            { text: '全站 HTML 站点地图', link: '/methodology/sitemap' },
            { text: 'Apache 部署文档', link: '/methodology/deployment' },
          ],
        },
      ],
    },
  },
});
