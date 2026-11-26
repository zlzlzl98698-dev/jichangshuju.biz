<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { SITE_URL, SITE_BRAND, SITE_BRAND_EN } from '../utils/data';

const { Layout } = DefaultTheme;
const { page, frontmatter } = useData();
const route = useRoute();

const sectionLabels: Record<string, string> = {
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

const breadcrumbs = computed(() => {
  const path = route.path.replace(/\/$/, '');
  if (!path || path === '') return [];
  const segments = path.split('/').filter(Boolean);
  const crumbs: { label: string; href: string }[] = [{ label: '首页', href: '/' }];
  let acc = '';
  segments.forEach((seg, idx) => {
    acc += `/${seg}`;
    const isLast = idx === segments.length - 1;
    const label = isLast
      ? (frontmatter.value.shortTitle || page.value.title || sectionLabels[seg] || seg)
      : (sectionLabels[seg] || seg);
    crumbs.push({ label, href: isLast ? '' : `${acc}/` });
  });
  return crumbs;
});

const isDocPage = computed(() => {
  return route.path !== '/' && frontmatter.value.layout !== 'home' && !page.value.isNotFound;
});

const formatDate = (val: unknown): string => {
  if (!val) return '';
  if (val instanceof Date) return val.toISOString().slice(0, 10);
  const s = String(val);
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : s;
};

const pageTypeBadge = computed(() => {
  const t = frontmatter.value.pageType;
  const map: Record<string, string> = {
    review: '品牌评测 / 档案',
    database: '结构化数据库',
    comparison: '多品牌对比',
    report: '性能观测报告',
    commercial: '决策与选购指南',
    docs: '技术文档 / 教程',
  };
  return map[t] || '技术与数据专题';
});

const injectJsonLd = () => {
  if (typeof document === 'undefined') return;
  const existing = document.getElementById('ad-jsonld');
  if (existing) existing.remove();

  const rel = page.value.relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '');
  const url = `${SITE_URL}${rel ? `/${rel}` : '/'}`;

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
      '@id': `${url}#webpage`,
      url,
      name: page.value.title || SITE_BRAND,
      description: page.value.description || frontmatter.value.description || '',
      inLanguage: 'zh-CN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      dateModified: frontmatter.value.updatedAt || '2026-11-26',
    },
  ];

  if (breadcrumbs.value.length > 1) {
    graphs.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.value.map((c, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: c.label,
        item: c.href ? `${SITE_URL}${c.href}` : url,
      })),
    });
  }

  if (
    frontmatter.value.pageType === 'review' ||
    frontmatter.value.pageType === 'docs' ||
    frontmatter.value.pageType === 'commercial' ||
    frontmatter.value.pageType === 'pillar'
  ) {
    graphs.push({
      '@type': 'Article',
      headline: page.value.title,
      description: page.value.description || frontmatter.value.description || '',
      datePublished: formatDate(frontmatter.value.publishedAt) || '2026-11-26',
      dateModified: formatDate(frontmatter.value.updatedAt) || '2026-11-26',
      author: {
        '@type': 'Organization',
        name: frontmatter.value.author || '机场数据编辑与性能实验室',
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    });
  }

  if (frontmatter.value.schemaCollection) {
    graphs.push({
      '@type': 'CollectionPage',
      name: page.value.title,
      description: frontmatter.value.description || page.value.description,
      url,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    });
  }

  if (Array.isArray(frontmatter.value.itemList) && frontmatter.value.itemList.length > 0) {
    graphs.push({
      '@type': 'ItemList',
      name: page.value.title,
      numberOfItems: frontmatter.value.itemList.length,
      itemListElement: frontmatter.value.itemList.map(
        (entry: { name: string; url: string }, idx: number) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: entry.name,
          url: entry.url.startsWith('http') ? entry.url : `${SITE_URL}${entry.url}`,
        })
      ),
    });
  }

  if (frontmatter.value.softwareApp) {
    graphs.push({
      '@type': 'SoftwareApplication',
      name: frontmatter.value.softwareApp.name,
      applicationCategory: 'NetworkingApplication',
      operatingSystem: frontmatter.value.softwareApp.os,
      url,
    });
  }

  if (frontmatter.value.pageType === 'database') {
    const endCoverage = formatDate(frontmatter.value.updatedAt) || '2026-11-26';
    graphs.push({
      '@type': 'Dataset',
      name: page.value.title,
      description: frontmatter.value.description || page.value.description,
      url,
      creator: { '@id': `${SITE_URL}/#organization` },
      temporalCoverage: `2026-07-20/${endCoverage}`,
      distribution: [
        {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: `${SITE_URL}/data/brands.json`,
        },
        {
          '@type': 'DataDownload',
          encodingFormat: 'text/csv',
          contentUrl: `${SITE_URL}/data/plans.csv`,
        },
      ],
    });
  }

  if (frontmatter.value.howTo && Array.isArray(frontmatter.value.howTo.steps) && frontmatter.value.howTo.steps.length > 0) {
    graphs.push({
      '@type': 'HowTo',
      name: frontmatter.value.howTo.name || page.value.title,
      description: frontmatter.value.description || page.value.description,
      step: frontmatter.value.howTo.steps.map((st: { name: string; text: string }, idx: number) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: st.name,
        text: st.text,
      })),
    });
  }

  if (Array.isArray(frontmatter.value.faq) && frontmatter.value.faq.length > 0) {
    graphs.push({
      '@type': 'FAQPage',
      mainEntity: frontmatter.value.faq.map((item: { q: string; a: string }) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  const script = document.createElement('script');
  script.id = 'ad-jsonld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graphs });
  document.head.appendChild(script);
};

const trackSponsoredClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null;
  const anchor = target?.closest('a[rel*="sponsored"]') as HTMLAnchorElement | null;
  if (!anchor) return;
  const payload = {
    event: 'affiliate_outbound_click',
    sourcePath: route.path,
    targetUrl: anchor.href,
    brandId: anchor.dataset.brandId || '',
    timestamp: new Date().toISOString(),
  };
  try {
    const key = 'ad_outbound_clicks_v1';
    const history = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(history)) {
      history.push(payload);
      localStorage.setItem(key, JSON.stringify(history.slice(-100)));
    }
  } catch {
    // Ignore storage quota / private mode restrictions
  }
  window.dispatchEvent(new CustomEvent('ad:affiliate-click', { detail: payload }));
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  if (endpoint && typeof navigator.sendBeacon === 'function') {
    navigator.sendBeacon(endpoint, JSON.stringify(payload));
  }
};

onMounted(() => {
  injectJsonLd();
  document.addEventListener('click', trackSponsoredClick, { passive: true });
});
onUnmounted(() => {
  document.removeEventListener('click', trackSponsoredClick);
});
watch(() => route.path, injectJsonLd);
</script>

<template>
  <Layout :class="{ 'ad-wide-page': Boolean(frontmatter.wide) }">
    <template #doc-before>
      <div v-if="isDocPage">
        <nav v-if="breadcrumbs.length" class="ad-breadcrumbs" aria-label="面包屑导航">
          <template v-for="(crumb, idx) in breadcrumbs" :key="crumb.label + idx">
            <span v-if="idx > 0" aria-hidden="true">/</span>
            <a v-if="crumb.href" :href="crumb.href">{{ crumb.label }}</a>
            <span v-else>{{ crumb.label }}</span>
          </template>
        </nav>

        <div class="ad-meta-strip">
          <span class="ad-badge">{{ pageTypeBadge }}</span>
          <span v-if="frontmatter.verifiedAt">数据核实日期：<strong class="ad-mono">{{ formatDate(frontmatter.verifiedAt) }}</strong></span>
          <span v-if="frontmatter.updatedAt">页面更新：<strong class="ad-mono">{{ formatDate(frontmatter.updatedAt) }}</strong></span>
          <span>编辑归属：{{ frontmatter.author || '机场数据研究组' }}</span>
          <span v-if="frontmatter.sourceNote">来源：{{ frontmatter.sourceNote }}</span>
        </div>
      </div>
    </template>

    <template #doc-footer-before>
      <FaqSection v-if="isDocPage && frontmatter.autoFaq" />
    </template>

    <template #doc-after>
      <RelatedArticlesBar v-if="isDocPage" />
    </template>

    <template #not-found>
      <div class="ad-portal-wrap" style="text-align: center; padding: 4rem 1.25rem;">
        <p class="ad-badge ad-badge--conflict">HTTP 404 · 页面未找到</p>
        <h1 style="margin: 1rem 0 0.5rem;">未找到对应的机场数据页面</h1>
        <p style="color: var(--ad-text-muted); max-width: 560px; margin: 0 auto 1.5rem;">
          该 URL 不存在或尚未建立页面。请通过下方入口检索机场品牌数据库、套餐价格表或客户端文档。
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center;">
          <a class="ad-btn ad-btn--primary" href="/">返回数据门户首页</a>
          <a class="ad-btn ad-btn--secondary" href="/brands/">浏览 31 家品牌库</a>
          <a class="ad-btn ad-btn--secondary" href="/database/plans">查询套餐价格数据库</a>
          <a class="ad-btn ad-btn--secondary" href="/methodology/sitemap">查看全站地图</a>
        </div>
      </div>
    </template>

    <template #layout-bottom>
      <footer class="ad-global-footer">
        <div class="ad-global-footer__inner">
          <div>
            <h4>机场数据 · Airport Data</h4>
            <p style="margin: 0 0 0.5rem;">
              域名：<code>jichangshuju.biz</code>。中文网络服务结构化数据平台，统一维护 31 家机场品牌档案、套餐单位成本、历史测速证据与客户端文档。
            </p>
            <p style="margin: 0; font-size: 0.8rem;">
              本站公开商业推广关系，所有推广链接统一使用 <code>nofollow sponsored noopener</code>，合作顺序不伪装为实测性能排名。
            </p>
          </div>

          <div>
            <h4>核心数据与对比工具</h4>
            <ul>
              <li><a href="/brands/">机场品牌数据库（31家）</a></li>
              <li><a href="/database/plans">机场套餐与每GB成本计算器</a></li>
              <li><a href="/database/speedtests">历史测速报告与截图库</a></li>
              <li><a href="/database/availability">AI 与流媒体可用性矩阵</a></li>
              <li><a href="/compare/">多品牌参数并排对比</a></li>
            </ul>
          </div>

          <div>
            <h4>十大一级专题</h4>
            <ul>
              <li><a href="/recommend/">机场推荐</a> · <a href="/pricing/">价格与套餐</a></li>
              <li><a href="/vpn/">VPN 与加速器</a> · <a href="/clients/">客户端软件</a></li>
              <li><a href="/streaming-ai/">AI 与流媒体</a> · <a href="/network/">线路与节点</a></li>
              <li><a href="/guides/">使用教程</a> · <a href="/diagnostics/">故障排查</a></li>
              <li><a href="/risks/">风险与替代</a></li>
            </ul>
          </div>

          <div>
            <h4>治理规范与公共接口</h4>
            <ul>
              <li><a href="/methodology/about">关于本站</a> · <a href="/methodology/sources">数据来源与冲突台账</a></li>
              <li><a href="/methodology/evaluation">评测方法</a> · <a href="/methodology/disclosure">推广披露</a></li>
              <li><a href="/methodology/corrections">纠错机制</a> · <a href="/methodology/privacy-disclaimer">隐私与免责声明</a></li>
              <li><a href="/methodology/sitemap">网站地图</a> · <a href="/methodology/deployment">Apache 部署说明</a></li>
              <li><a href="/data/brands.json" target="_blank">公开 JSON</a> · <a href="/data/plans.csv" target="_blank">公开 CSV</a> · <a href="/feed.xml" target="_blank">RSS</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </template>
  </Layout>
</template>
