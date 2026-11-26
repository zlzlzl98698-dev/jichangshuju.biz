---
title: 关键词发现与 URL 映射控制台（Keyword Discovery Engine）
description: 机场数据 SEO/GEO 关键词发现系统，管理 S/A/B/C 四级关键词优先级、专题聚类、防互抢 URL 映射与本地 CSV 导入分析。
pageType: database
wide: true
verifiedAt: 2026-11-26
updatedAt: 2026-11-26
---

# 关键词发现与 URL 映射控制台（Keyword Discovery Engine）

**机场数据采用单意图单主页面归属原则，全站关键词按 S/A/B/C 四级分配至唯一 Canonical URL；在未接入真实 Google Search Console 或 Bing Webmaster Tools 数据前，搜索量与排名字段保持留空，绝不编造虚构流量数值。**

## 关键词分级标准与扩展循环

1. **S 级（核心商业决策与数据词）**：`机场推荐`、`光速云评测`、`便宜机场`、`性价比机场`、`不限时机场`、`机场套餐数据库`、`机场品牌数据库`、`机场参数对比`。
2. **A 级（品牌长尾、价格比较与性能风险词）**：`机场排行`、`月付机场`、`年付机场`、`IEPL专线`、`ChatGPT机场`、`机场跑路判断`、`光速云 vs 暮光加速` 等。
3. **B 级（客户端软件与高频故障排查词）**：`Clash Verge Rev 教程`、`Shadowrocket 小火箭使用`、`v2rayN 下载`、`机场节点全部超时`、`订阅更新失败`。
4. **C 级（资料储备与待核实品牌词）**：等待补充官网参数或近 30 日实测数据后再升格扩展的选题。

## 实时映射表与 CSV 预览工具

<KeywordDiscoveryConsole />

## 本地 CLI 自动化分析命令

```bash
npm run keywords:analyze
```

运行后脚本将自动对比 `data/keywords/keywords.json` 与 `data/brands/brands.json`，在 `reports/keyword-discovery-report.json` 中输出：**关键词互抢告警（Cannibalization Alerts）**、**待扩展品牌长尾候选**、**现有页面升级候选**及**待核实选题清单**。
