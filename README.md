<div align="center">
  <img src="docs/public/avatar.webp" alt="机场数据 Airport Data Logo" width="88" height="88" />
  <h1>机场数据 · Airport Data</h1>
  <p><strong>中文网络服务结构化数据平台 · 品牌数据库 · 套餐成本计算与技术文档门户</strong></p>
  <p>
    <a href="https://jichangshuju.biz/"><strong>🌐 正式站点 jichangshuju.biz</strong></a>
    ·
    <a href="#-快速开始"><strong>🚀 快速开始</strong></a>
    ·
    <a href="#-项目架构与目录说明"><strong>📂 目录说明</strong></a>
    ·
    <a href="#-seo--geo-与质量验收流水线"><strong>🛡️ 质量验收</strong></a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/VitePress-1.6.4-646cff?style=flat-square&logo=vitepress" alt="VitePress 1.6.4" />
    <img src="https://img.shields.io/badge/Vue-3.5-42b883?style=flat-square&logo=vuedotjs" alt="Vue 3.5" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript" alt="TypeScript 5.7" />
    <img src="https://img.shields.io/badge/Brands-31-0f4c81?style=flat-square" alt="31 Brands" />
    <img src="https://img.shields.io/badge/Plans-157-0f766e?style=flat-square" alt="157 Plans" />
    <img src="https://img.shields.io/badge/Static_Pages-163-1d4ed8?style=flat-square" alt="163 Pages" />
  </p>
</div>

---

## 📌 项目简介

**机场数据（Airport Data / `jichangshuju.biz`）** 不是传统的评测资讯博客，而是以 **Data Documentation Portal + Network Analytics Dashboard + Technical Knowledge Base** 为视觉与工程骨架构建的简体中文网络服务结构化数据平台。

平台通过 **Single Source of Truth（单一数据源）** 驱动全站 **163 个静态页面**，统一解决价格不一致、实测截图缺口不透明、主观评分黑箱及客户端兼容性混淆等痛点。

---

## ✨ 核心特性与数据规模

- **12 项结构化数据基础设施**
  - 收录 **31** 家唯一品牌实体（已对重名/历史实体去重合并）、**157** 档周期与不限时套餐、**21** 组历史测速记录与原图、**22** 款跨平台客户端及 **18** 条开源透明冲突核实台账（`CF-001` 至 `CF-018`）。
  - 所有数据源统一存放于 `data/`，构建期自动脱敏导出为 `/data/brands.json` 与 `/data/plans.csv`。
- **一个域名，三大独立内容体系与五层内链闭环**
  - **教程与技术文档体系**：10 大一级主导航首页 + 45 个二级专题 + **37 篇**三级长尾实战指南与排障手册。
  - **品牌评测与数据体系**：31 家独立 `/brands/<slug>` 深度档案、五大交互数据库页面，以及 **7 篇**高搜索意图双品牌对比专稿。
  - **商业决策与合规转化体系**：分离设立 **16 个**独立 `/brands/<slug>/plans` 商业详情与 TCO 计算页面；由 `RelatedArticlesBar.vue` 在构建期非侵入式自动编织全站五层内链，并保留纯粹排障页面的无广告边界。
- **原创 Vue 3 交互式数据组件**
  - `HomePortal.vue` / `SiteStatsOverview.vue` / `FeaturedPartnersGrid.vue`
  - `BrandDatabaseTable.vue` / `PlanDatabaseCalculator.vue` / `BrandComparisonTool.vue`
  - `DarkObservatoryReport.vue`（深色性能观测报告面板与测速原图对比）/ `ClientCompatibilityMatrix.vue`
  - `FaqSection.vue`（原生 `<details>/<summary>` 语义折叠与 Schema 单一数据源对齐）/ `AffiliateCtaCard.vue`（强制 `rel="nofollow sponsored noopener"` 与出站事件追踪）
- **完备的 SEO / GEO 与 Apache 静态部署能力**
  - Static SSR JSON-LD（`Organization`、`WebSite`、`WebPage`、`BreadcrumbList`、`Article`、`Dataset`、`SoftwareApplication`、`HowTo`、`FAQPage`），且零隐藏 Schema。
  - 自动产出 `sitemap.xml`（162 条可索引规范 URL）、全量 `feed.xml`（96 条）、AI 可读索引 `llms.txt` & `llms-full.txt`、`robots.txt` 及含 301/CleanUrls/CORS/真实 404 的 `.htaccess`。
  - 预留 Google / Bing / 神马 / 百度四平台站长 HTML 验证 `<meta>` 环境变量接口及 Algolia DocSearch 切换能力（未配置凭据时自动启用 VitePress 本地全文搜索）。

---

## 📂 项目架构与目录说明

```text
jichangshuju.biz/
├── .env.example              # 域名、Algolia、四平台站长验证与可选统计端点环境变量模板
├── package.json              # 构建、校验、关键词分析与 QA 脚本定义
├── data/                     # Single Source of Truth 核心结构化数据源
│   ├── brands/               # 31 家品牌实体主档案与完整度定义
│   ├── plans/                # 157 档套餐定价与计费周期明细
│   ├── speedtests/           # 历史测速、地区延迟与原图清单
│   ├── availability/         # AI 工具（ChatGPT/Claude/Gemini）与流媒体可用性矩阵
│   ├── clients/              # 22 款跨平台客户端兼容性数据库
│   ├── keywords/             # 长尾关键词主表、聚类映射与防互抢追踪库
│   ├── sources/              # 数据来源与 CF-001 ~ CF-018 冲突核实台账
│   ├── affiliate-links.json  # 统一商业推广链接与优惠限制条款
│   └── history/              # 核查日志与品牌历史事件档案
├── docs/                     # VitePress 站点源码
│   ├── .vitepress/           # config.ts（SEO/Schema/Nav）、原创主题组件与全局样式
│   ├── public/               # .htaccess、robots.txt、头像图标及公开导出数据目录
│   ├── recommend/            # ① 机场推荐专题
│   ├── pricing/              # ② 价格与套餐专题
│   ├── brands/               # ③ 31 家品牌深度评测与 16 个 /plans 商业页
│   ├── vpn/                  # ④ VPN 与加速器专题
│   ├── clients/              # ⑤ 客户端软件文档
│   ├── streaming-ai/         # ⑥ AI 与流媒体专题
│   ├── network/              # ⑦ 线路与节点知识库
│   ├── guides/               # ⑧ 使用教程与分流配置
│   ├── diagnostics/          # ⑨ 故障排查知识库
│   ├── risks/                # ⑩ 风险预警与替代方案
│   ├── database/             # 交互式数据查询中心（品牌/套餐/测速/客户端/可用性/关键词）
│   ├── compare/              # 22 项参数并排对比系统与对比专稿
│   └── methodology/          # E-E-A-T 方法论、冲突台账、推广披露、纠错机制与部署说明
├── scripts/                  # 自动化工程脚本
│   ├── validate-data.mjs     # 实体去重、推广属性、冲突台账与图片完整性校验
│   ├── export-public-data.mjs# 自动导出 docs/public/data/{brands.json,plans.csv}
│   ├── postbuild-seo.mjs     # 生成全量 feed.xml、llms.txt、llms-full.txt 与 404 noindex
│   ├── qa-audit.mjs          # 全站死链、Canonical、所有外链 nofollow 与隐藏 Schema 强审计
│   ├── keyword-discovery.mjs # 关键词覆盖率、品牌长尾扩展与互抢告警分析
│   └── check-content-quality.mjs # 产出 10 份结构化质量与交付审计报告
├── raw-sources/              # 原始采集文字材料与测试截图档案备份
└── reports/                  # 自动化构建、QA 与 SEO/GEO 审计报告输出目录
```

---

## 🚀 快速开始

### 1. 环境准备与安装依赖

需要 **Node.js 20+**（推荐 LTS）与 `npm`：

```bash
npm install
```

如需配置正式域名、Algolia 搜索或四平台站长验证代码，可先复制环境变量模板：

```bash
cp .env.example .env
```

支持的核心环境变量见 [`.env.example`](.env.example)：
- `VITE_SITE_URL`：正式规范域名（默认 `https://jichangshuju.biz`）
- `VITE_GOOGLE_SITE_VERIFICATION` / `VITE_BING_SITE_VERIFICATION` / `VITE_SHENMA_SITE_VERIFICATION` / `VITE_BAIDU_SITE_VERIFICATION`：四平台 HTML `<meta>` 验证值
- `VITE_ALGOLIA_APP_ID` / `VITE_ALGOLIA_SEARCH_API_KEY` / `VITE_ALGOLIA_INDEX_NAME`：Algolia Search-Only 凭据（留空自动回退 VitePress 本地搜索）

### 2. 本地开发与静态预览

```bash
# 启动 VitePress 热更新开发服务器
npm run dev

# 完整构建后启动本地静态预览（默认 4173 端口）
npm run preview
```

---

## 🛡️ SEO / GEO 与质量验收流水线

每次修改品牌数据、套餐价格、对比参数或新增 Markdown 文档后，建议按顺序执行以下校验命令：

```bash
# 1. TypeScript 类型检查
npm run typecheck

# 2. 数据结构、去重、顺位、推广规则与图片完整度校验
npm run validate

# 3. 关键词覆盖分析与 0 互抢校验
npm run keywords:analyze

# 4. 全量静态构建（含公共数据导出、VitePress SSG、Sitemap、RSS 与 llms.txt 生成）
npm run build

# 5. 全站静态 HTML 强审计（检查 0 死链、Canonical、外链 nofollow 与无隐藏 Schema）
npm run qa

# 6. 生成全套 10 份内容与交付审计报告
node scripts/check-content-quality.mjs
```

---

## 📦 生产部署（Apache 静态托管）

1. 执行 `npm run build && npm run qa` 确认全站检查零错误退出；
2. 将 `docs/.vitepress/dist/` 目录下的全部内容（注意包含隐藏文件 **`.htaccess`**）同步至 Apache 站点根目录；
3. 确认 Apache 已开启 `mod_rewrite`、`mod_headers`、`mod_mime`、`mod_deflate`、`mod_expires` 及虚拟主机 `AllowOverride All`。详细配置说明见 [docs/methodology/deployment.md](docs/methodology/deployment.md)。

---

## 📜 数据原则与合规说明

- 本项目所有商业推广链接均严格标记 `rel="nofollow sponsored noopener"` 并公开展示推广披露声明；
- 合作推广展示顺序不伪装为真实测速排行；缺失独立测试截图或存在来源分歧（`CF-001` 至 `CF-018`）的字段均按原文留存边界披露，不编造速度数值、虚假评分或搜索量。
