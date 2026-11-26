<script setup lang="ts">
import { computed } from 'vue';
import {
  availability,
  brandHistory,
  brands,
  conflicts,
  getBrandById,
  getDynamicSiteStats,
  speedtests,
} from '../../utils/data';
import SiteStatsOverview from './SiteStatsOverview.vue';
import FeaturedPartnersGrid from './FeaturedPartnersGrid.vue';
import BrandDatabaseTable from './BrandDatabaseTable.vue';

const stats = getDynamicSiteStats();

const openGlobalSearch = () => {
  const btn = document.querySelector<HTMLButtonElement>('.VPNavBarSearch button, .DocSearch-Button');
  if (btn) btn.click();
};

const regionSummary = computed(() => {
  const regions = ['香港', '台湾', '新加坡', '日本', '美国'];
  return regions.map((r) => {
    const items = speedtests
      .filter((s) => s.metrics.length > 0)
      .map((s) => s.metrics.find((m) => m.region === r))
      .filter((m): m is NonNullable<typeof m> => Boolean(m && m.latencyMs !== null));
    const latMin = items.length ? Math.min(...items.map((i) => i.latencyMs!)) : null;
    const latMax = items.length ? Math.max(...items.map((i) => i.latencyMs!)) : null;
    const spdMax = items.length ? Math.max(...items.map((i) => i.downloadMbps || 0)) : null;
    return { region: r, count: items.length, latMin, latMax, spdMax };
  });
});

const matrixPreviewBrands = ['guangsuyun', 'muguang', 'feimao', 'weifeng', 'xingdaomeng', 'ermao', 'lingdong', 'kexin'];
const matrixRows = computed(() =>
  matrixPreviewBrands.map((id) => {
    const b = getBrandById(id)!;
    const rows = availability.filter((a) => a.brandId === id);
    const findSvc = (svc: string) => rows.find((r) => r.serviceName === svc);
    const fmt = (svc: string) => {
      const e = findSvc(svc);
      if (!e) return '待核实';
      const tag = e.dataStatus === 'measured' ? '实测' : e.dataStatus === 'vendor' ? '声明' : '未测';
      if (e.availabilityStatus === 'supported') return `支持(${tag})`;
      if (e.availabilityStatus === 'partial') return `视节点(${tag})`;
      if (e.availabilityStatus === 'vendor') return `声明支持`;
      if (e.availabilityStatus === 'unsupported') return `失败(${tag})`;
      return '待核实';
    };
    return {
      name: b.name,
      slug: b.slug,
      chatgpt: fmt('ChatGPT'),
      claude: fmt('Claude'),
      gemini: fmt('Gemini'),
      netflix: fmt('Netflix'),
      youtube: fmt('YouTube'),
      tiktok: fmt('TikTok'),
    };
  })
);
</script>

<template>
  <div class="ad-portal-wrap">
    <!-- 第一屏：品牌 Hero -->
    <section class="ad-hero">
      <div class="ad-hero__tag ad-mono">AIRPORT DATA · JICHANGSHUJU.BIZ · SINGLE SOURCE OF TRUTH</div>
      <h1>机场数据 — 机场推荐、品牌数据库与网络性能分析</h1>
      <p class="ad-hero__sub">
        查询机场品牌、套餐价格、流量成本、线路类型、历史测速及客户端兼容性，通过可比较的数据了解不同网络服务的实际差异。
      </p>
      <div class="ad-hero__actions">
        <button type="button" class="ad-btn ad-btn--primary" @click="openGlobalSearch">
          全站数据检索（Ctrl + K）
        </button>
        <a href="/brands/" class="ad-btn ad-btn--secondary">查询 {{ stats.brandCount }} 家品牌数据库</a>
        <a href="/database/plans" class="ad-btn ad-btn--secondary">比较 {{ stats.planCount }} 档套餐与每GB成本</a>
        <a href="/recommend/" class="ad-btn ad-btn--secondary">查看机场推荐口径</a>
      </div>
    </section>

    <!-- 第二屏：网站数据概览 -->
    <section class="ad-section">
      <div class="ad-section-head">
        <div>
          <h2>网站数据概览</h2>
          <p>所有计数由结构化数据库实时计算，禁止虚构实时用户量、访问量或连续在线率。</p>
        </div>
        <a href="/methodology/sources">查看数据来源与审计台账 →</a>
      </div>
      <SiteStatsOverview />
    </section>

    <!-- 第三屏：精选合作品牌 -->
    <section class="ad-section">
      <div class="ad-section-head">
        <div>
          <h2>精选合作品牌（核心主推：光速云）</h2>
          <p>按合作展示顺位呈现，明确区分商业推广顺序与独立性能评测。</p>
        </div>
        <a href="/methodology/disclosure">商业推广披露说明 →</a>
      </div>
      <FeaturedPartnersGrid :limit="6" />
    </section>

    <!-- 第四屏：机场品牌数据库 -->
    <section class="ad-section">
      <div class="ad-section-head">
        <div>
          <h2>机场品牌数据库</h2>
          <p>支持按名称、预算区间、IEPL/IPLC 线路、计费周期及第三方客户端兼容性筛选与排序。</p>
        </div>
        <a href="/brands/">进入宽屏完整品牌库 →</a>
      </div>
      <BrandDatabaseTable />
    </section>

    <!-- 第五屏：机场套餐比较中心 -->
    <section class="ad-section">
      <div class="ad-section-head">
        <div>
          <h2>机场套餐比较中心</h2>
          <p>严格分离月付、年付折算与不限时一次性套餐，并提供每 GB 流量成本与 12 个月 TCO 测算入口。</p>
        </div>
        <a href="/database/plans">打开套餐计算器 →</a>
      </div>
      <div class="ad-entry-grid">
        <a href="/pricing/cheap" class="ad-entry-card">
          <strong>便宜与平价机场</strong>
          <span>5.6 元/月（年付折算）至 15 元档全覆盖，区分摘要品牌与实测品牌</span>
        </a>
        <a href="/pricing/monthly" class="ad-entry-card">
          <strong>纯月付灵活性筛选</strong>
          <span>先月付实测晚高峰再年付，重点比对 14.9–27 元月付梯队</span>
        </a>
        <a href="/pricing/annual" class="ad-entry-card">
          <strong>年付小包折算比价</strong>
          <span>光速云 ¥99/年、飞猫 ¥84/年、星岛梦 ¥96/年、二猫云 ¥89/年</span>
        </a>
        <a href="/pricing/no-expiry" class="ad-entry-card">
          <strong>不限时永久流量包</strong>
          <span>光速云 147元/247GB、二猫云 99元/100GB、唯兔云 160元/200GB</span>
        </a>
        <a href="/pricing/value" class="ad-entry-card">
          <strong>大流量与高性价比</strong>
          <span>按标称每 GB 成本排序，覆盖 500GB–2000GB 重度办公场景</span>
        </a>
      </div>
    </section>

    <!-- 第六屏：网络性能数据中心 -->
    <section class="ad-section">
      <div class="ad-section-head">
        <div>
          <h2>网络性能数据中心（历史快照汇总）</h2>
          <p>保留 2026-10-19 非晚高峰、2026-08-11 测速包及光速云 2026-08-19 三网 MiaoKo 原始环境说明。</p>
        </div>
        <a href="/database/speedtests">查看全部测速记录与截图 →</a>
      </div>
      <div class="ad-table-scroll">
        <table>
          <thead>
            <tr>
              <th>节点地区</th>
              <th>有汇总记录品牌数</th>
              <th>2026-10-19 非晚高峰延迟区间</th>
              <th>非晚高峰历史峰值下载</th>
              <th>数据限制说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in regionSummary" :key="r.region">
              <td><strong>{{ r.region }}节点</strong></td>
              <td class="ad-mono">{{ r.count }} 家</td>
              <td class="ad-mono">{{ r.latMin }}–{{ r.latMax }} ms</td>
              <td class="ad-mono">{{ r.spdMax }} Mbps</td>
              <td>仅限非晚高峰单次记录，不作为跨时段公平排序依据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 第七屏：AI 与流媒体可用性矩阵 -->
    <section class="ad-section">
      <div class="ad-section-head">
        <div>
          <h2>AI 与流媒体可用性矩阵（抽样总览）</h2>
          <p>明确区分“实测证据”与“品牌方声明”，不把宣传口号写成节点实测结果。</p>
        </div>
        <a href="/database/availability">查看完整 31 品牌可用性矩阵 →</a>
      </div>
      <div class="ad-table-scroll">
        <table>
          <thead>
            <tr>
              <th>品牌</th>
              <th>ChatGPT</th>
              <th>Claude</th>
              <th>Gemini</th>
              <th>Netflix</th>
              <th>YouTube</th>
              <th>TikTok</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in matrixRows" :key="row.slug">
              <td><a :href="`/brands/${row.slug}`"><strong>{{ row.name }}</strong></a></td>
              <td>{{ row.chatgpt }}</td>
              <td>{{ row.claude }}</td>
              <td>{{ row.gemini }}</td>
              <td>{{ row.netflix }}</td>
              <td>{{ row.youtube }}</td>
              <td>{{ row.tiktok }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 第八屏：客户端文档中心 -->
    <section class="ad-section">
      <div class="ad-section-head">
        <div>
          <h2>客户端文档中心（六大操作系统）</h2>
          <p>统一实体映射 Clash Verge Rev、v2rayN、Shadowrocket、sing-box、FlClash、Hiddify 等 22 款工具。</p>
        </div>
        <a href="/clients/">进入客户端兼容矩阵 →</a>
      </div>
      <div class="ad-entry-grid">
        <a href="/clients/windows" class="ad-entry-card"><strong>Windows 客户端</strong><span>Clash Verge Rev / v2rayN / FlClash / Hiddify</span></a>
        <a href="/clients/android" class="ad-entry-card"><strong>Android 客户端</strong><span>v2rayNG / FlClash / Karing / SFA（附 NekoBox 风险提示）</span></a>
        <a href="/clients/ios" class="ad-entry-card"><strong>iOS / iPadOS 客户端</strong><span>Shadowrocket 小火箭 / Stash / Quantumult X / Surge 5</span></a>
        <a href="/clients/macos" class="ad-entry-card"><strong>macOS 客户端</strong><span>区分 Intel 与 Apple Silicon 架构安装包</span></a>
        <a href="/clients/linux-openwrt" class="ad-entry-card"><strong>Linux 与 OpenWrt</strong><span>v2rayA / OpenClash / PassWall2 / Nikki / HomeProxy</span></a>
      </div>
    </section>

    <!-- 第九屏：最新数据更新 -->
    <section class="ad-section">
      <div class="ad-section-head">
        <div>
          <h2>最新数据更新与冲突纠错台账</h2>
          <p>记录实际发生的资料整合、实体去重、测速归档与字段冲突处理。</p>
        </div>
        <a href="/methodology/corrections">查看完整纠错与更新日志 →</a>
      </div>
      <div class="ad-two-col">
        <div class="ad-panel">
          <h3 style="margin-top: 0;">近期数据变更日志</h3>
          <ul class="ad-timeline">
            <li v-for="h in brandHistory" :key="h.date + h.brandId + h.event">
              <span class="ad-mono ad-date">{{ h.date }}</span>
              <span>{{ h.event }}</span>
            </li>
          </ul>
        </div>
        <div class="ad-panel">
          <h3 style="margin-top: 0;">已登记典型来源冲突（共 {{ conflicts.length }} 条）</h3>
          <ul class="ad-timeline">
            <li v-for="c in conflicts.slice(0, 6)" :key="c.conflictId">
              <span class="ad-badge ad-badge--conflict">{{ c.conflictId }}</span>
              <span><strong>{{ c.brandName }}</strong>（{{ c.field }}）：{{ c.resolution }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 第十屏：深度评测与技术知识 -->
    <section class="ad-section">
      <div class="ad-section-head">
        <div>
          <h2>深度评测与技术知识专题</h2>
          <p>一个域名，三个独立协同体系：教程获取自然搜索流量、评测与数据建立信任、商业页面完成转化决策。</p>
        </div>
      </div>
      <div class="ad-entry-grid">
        <a href="/brands/guangsuyun" class="ad-entry-card">
          <strong>光速云深度评测（旗舰）</strong>
          <span>7 档套餐、5 张 MiaoKo 实测截图、59/69GB 口径冲突与适用场景全景分析</span>
        </a>
        <a href="/compare/" class="ad-entry-card">
          <strong>2–4 品牌并排参数对比</strong>
          <span>22 项核心维度对齐，缺省字段如实标“待核实”，无虚假评分</span>
        </a>
        <a href="/network/iepl" class="ad-entry-card">
          <strong>IEPL / IPLC / BGP 线路百科</strong>
          <span>分辨物理专线与普通中转、倍率规则与原生 IP 对 AI/流媒体的影响</span>
        </a>
        <a href="/diagnostics/" class="ad-entry-card">
          <strong>网络故障诊断知识库</strong>
          <span>节点超时、订阅失败、TUN 模式异常、DNS 污染与 OpenAI 降级排查</span>
        </a>
        <a href="/risks/exit-scam-warning" class="ad-entry-card">
          <strong>机场跑路预警与避坑</strong>
          <span>识别专属客户端锁定、异常推广格式、高折扣长付锁资风险与替代方案</span>
        </a>
        <a href="/database/keywords" class="ad-entry-card">
          <strong>SEO/GEO 关键词发现系统</strong>
          <span>S/A/B/C 四级关键词映射、意图聚类与防互抢控制台</span>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ad-hero {
  background: linear-gradient(180deg, var(--ad-surface-muted) 0%, var(--ad-surface) 100%);
  border: 1px solid var(--ad-border);
  border-radius: 14px;
  padding: 2rem 1.75rem;
}

.ad-hero__tag {
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.06em;
  margin-bottom: 0.65rem;
}

.ad-hero h1 {
  margin: 0;
  font-size: clamp(1.65rem, 3vw, 2.35rem);
  line-height: 1.25;
  color: var(--ad-text);
}

.ad-hero__sub {
  margin: 0.85rem 0 1.4rem;
  max-width: 780px;
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--ad-text-muted);
}

.ad-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.ad-entry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  gap: 0.85rem;
}

.ad-entry-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem;
  border: 1px solid var(--ad-border);
  border-radius: 10px;
  background: var(--ad-surface);
  color: var(--ad-text);
  text-decoration: none !important;
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.ad-entry-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.ad-entry-card strong {
  color: var(--vp-c-brand-1);
  font-size: 0.98rem;
}

.ad-entry-card span {
  font-size: 0.83rem;
  color: var(--ad-text-muted);
  line-height: 1.5;
}

.ad-two-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 1rem;
}

.ad-panel {
  border: 1px solid var(--ad-border);
  border-radius: 10px;
  padding: 1rem 1.15rem;
  background: var(--ad-surface);
}

.ad-timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.65rem;
  font-size: 0.85rem;
}

.ad-timeline li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  line-height: 1.5;
}

.ad-date {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
</style>
