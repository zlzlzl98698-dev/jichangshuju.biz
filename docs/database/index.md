---
title: 机场数据中心 — 品牌、套餐、测速、AI解锁与客户端结构化数据库
description: 集中查询机场数据（jichangshuju.biz）五大核心数据库与开放 JSON/CSV 数据下载接口，支持品牌筛选、每GB成本测算、历史测速截图核查及关键词映射。
pageType: database
wide: true
verifiedAt: 2026-10-19
updatedAt: 2026-11-26
sourceNote: Single Source of Truth 数据层实时汇总
---

# 机场数据中心（Database Hub）

**机场数据中心把分散在品牌简介、历史测速截图与客户端清单中的非结构化信息统一归口为 5 大可查询数据库，并提供脱敏后的 JSON 与 CSV 下载接口。** 任何页面展示的套餐价格、优惠码与实测批次均源自同一份结构化数据源，避免多页面互相矛盾。

<SiteStatsOverview />

## 核心数据库入口

| 数据库模块 | 收录规模 | 核心解决的问题 | 直接入口 |
|---|---|---|---|
| **机场品牌数据库** | 31 家唯一品牌 | 按月均预算、IEPL/IPLC 线路、客户端模式与资料完整度筛选 | [进入品牌数据库 →](/brands/) |
| **机场套餐与成本计算器** | 157 档套餐记录 | 严格区分月付、年付折算与不限时套餐，计算每 GB 流量成本 | [进入套餐计算器 →](/database/plans) |
| **历史测速与截图数据库** | 21 批测速记录 | 核查 2026-10-19 非晚高峰、2026-08-11 PNG 与光速云 MiaoKo 截图 | [进入测速数据库 →](/database/speedtests) |
| **AI 与流媒体可用性矩阵** | 31 品牌映射 | 区分“节点实测”与“品牌方声明”，查看 ChatGPT/Netflix 等条件限制 | [进入可用性矩阵 →](/database/availability) |
| **客户端兼容性数据库** | 22 款跨平台工具 | 按六大操作系统查询 Clash/sing-box/小火箭及专属端限制 | [进入客户端数据库 →](/clients/) |
| **多品牌并排对比系统** | 2–4 家同屏对比 | 22 项核心参数并排对齐，缺失字段如实标“待核实” | [进入对比工具 →](/compare/) |
| **SEO / GEO 关键词系统** | S/A/B/C 四级追踪 | 查看全站关键词归属 URL、意图聚类与防互抢审计 | [进入关键词控制台 →](/database/keywords) |

## 公开数据分发（GEO / 研究下载）

以下数据文件在构建期由 `scripts/export-public-data.mjs` 自动脱敏生成（已剔除内部管理备注、未公开订阅密钥与隐私信息），可供数据分析工具或外部索引直接读取：

- 品牌结构化 JSON：[brands.json](/data/brands.json) ｜ CSV 表格：[brands.csv](/data/brands.csv)
- 套餐及每 GB 成本 JSON：[plans.json](/data/plans.json) ｜ CSV 表格：[plans.csv](/data/plans.csv)
- 历史测速 JSON：[speedtests.json](/data/speedtests.json)
- AI 与流媒体矩阵 JSON：[availability.json](/data/availability.json)
- 客户端软件 JSON：[clients.json](/data/clients.json)

## 数据治理与可信度原则

1. **禁止虚构数据**：没有实测值的品牌保留为空或标为“待核实”，绝不填入 `0` 或示例数字。
2. **禁止时段篡改**：`2026-10-19` 文字表原文明确标注为**非晚高峰**，不可改写为晚高峰结论；`2026-08-11` PNG 截图测于不同时段，仅作单日快照参考。
3. **透明冲突记录**：全库已登记 18 条来源冲突与缺口（含光速云 59GB/69GB 差异、Firefly/萤火虫实体合并、微风/灵猫/隐形人价格与节点口径冲突），详见 [数据来源与冲突台账](/methodology/sources)。
