---
title: Apache 静态部署指南与运维自动化检查说明（jichangshuju.biz）
shortTitle: Apache 部署说明
description: 机场数据（VitePress）静态导出目录结构、Apache .htaccess 重写与数据集 CORS 配置、HTTPS 301、真实 404 策略及全量校验/构建/QA 自动化流水线说明。
pageType: docs
verifiedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
---

# Apache 静态部署与运维指南

> **Answer-First 核心概要**：**本站采用纯静态预渲染（VitePress SSG），执行 `npm run build` 即自动将全量 HTML、公开 JSON/CSV 数据集、`sitemap.xml`、`feed.xml`、`llms.txt`、`llms-full.txt`、`.htaccess` 与真实 `404.html` 输出至 `docs/.vitepress/dist/`，可直接托管于任何启用 `mod_rewrite` 的标准 Apache 虚拟主机。**

---

## 一、核心校验、构建与 QA 审计流水线

每次更新任何品牌数据、套餐价格、冲突台账或新增教程文档后，按下列固定命令顺序执行全站完整性检验：

```bash
# 1. 类型检查与关键词防互抢校验
npm run typecheck && npm run keywords:analyze

# 2. 完整静态构建（自动执行 validate -> 导出公共 JSON/CSV -> VitePress SSG -> 生成 RSS 与 llms.txt）
npm run build

# 3. 全站生产构建 QA 审计（检查死链、Canonical、Hidden FAQ Schema、所有外链 nofollow 及构建产物）
npm run qa
```

---

## 二、Apache 虚拟主机配置与 `.htaccess` 核心策略

随构建自动同步至输出根目录的 `.htaccess`（源文件位于 `docs/public/.htaccess`）已内置下列生产级防呆规则：

| 配置项 | 生效规则与作用说明 | 防避问题 |
|---|---|---|
| **虚拟主机前置要求** | `DocumentRoot` 指向 `dist` 上传根目录；Apache 配置 `AllowOverride All`；启用 `mod_rewrite`、`mod_headers`、`mod_mime`、`mod_deflate`、`mod_expires` | 防止 `.htaccess` 被忽略导致 cleanUrl 访问 404 |
| **域名与 HTTPS 规范化** | 强制所有 `HTTP` 或 `www.jichangshuju.biz` 请求 301 重定向至 `https://jichangshuju.biz/...` | 彻底消除多域名协议分散抓取权重 |
| **CleanUrl 与 `.html` 收敛** | 剥离尾部多余 `.html` 跳转无后缀规范路径；内部 rewrite 优先匹配目录或 `.html` 文件 | 保持 Canonical 与访问地址 100% 统一 |
| **真实 404 错误响应** | `ErrorDocument 404 /404.html`（严禁 Rewrite 回首页） | 防止搜索引擎判定 Soft 404 软错误降权 |
| **开放数据集 MIME & CORS** | 明确设置 `.json` / `.csv` UTF-8 类型并对 `.json/.csv/.xml/.txt` 开放 `Access-Control-Allow-Origin: *` | 保障 `brands.json`、`plans.csv` 与 `llms.txt` 稳定被 AI 与研究工具读取 |

---

## 三、搜索引擎、Algolia 搜索与统计接入方式

1. **切换 Algolia DocSearch 全文搜索**：当前默认采用 VitePress 离线全文检索包；正式接入时只需注入 `VITE_ALGOLIA_APP_ID`、`VITE_ALGOLIA_SEARCH_API_KEY`（仅公开检索 Key）与 `VITE_ALGOLIA_INDEX_NAME` 后重新 `npm run build`。
2. **四平台站长验证 Meta 静态注入**：构建前在 `.env` 配置 `VITE_GOOGLE_SITE_VERIFICATION`（Google）、`VITE_BING_SITE_VERIFICATION`（Bing）、`VITE_SHENMA_SITE_VERIFICATION`（神马搜索）与 `VITE_BAIDU_SITE_VERIFICATION`（百度搜索），构建时自动写入全站 `<head>`（未配置时不输出伪造代码）。
3. **可选转化埋点接口**：站点已部署脱敏的 `ad:affiliate-click` 出站事件，如需汇总至自建统计端点，构建时设置 `VITE_ANALYTICS_ENDPOINT` 即可通过 `navigator.sendBeacon` 异步上报。
4. **搜索引擎索引推送**：部署上线后将 `https://jichangshuju.biz/sitemap.xml` 提交至 Google Search Console、Bing Webmaster Tools、神马站长平台与百度搜索资源平台，并验证 `/llms.txt` 返回正常 HTTP 200。
