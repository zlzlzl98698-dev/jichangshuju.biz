---
title: 关于机场数据（jichangshuju.biz · Airport Data）
shortTitle: 关于本站
description: 介绍机场数据平台的定位、三个独立内容体系（教程、评测与数据、商业决策）、编辑审核分工、实体架构与透明纠错联系方式。
pageType: docs
verifiedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
---

# 关于机场数据（Airport Data）

> **Answer-First 核心定位**：**机场数据（`jichangshuju.biz`）定位为面向中文用户的网络服务结构化数据平台与技术知识库**，旨在用单一事实源（Single Source of Truth）解决传统机场资讯博客“只排商业名次不给测试口径、只写优点不标缺口、同一品牌在不同文章价格与优惠互相冲突”的长期痛点。

---

## 一、平台三大协同内容体系

1. **教程与技术文档体系**（[使用教程](/guides/)、[客户端软件](/clients/)、[线路知识](/network/)、[故障排查](/diagnostics/)）
   - 面向真实工程操作与终端故障排除（如 OpenWrt 软路由内存约束、Clash Verge Merge/Script 覆写规则、TUN 模式虚拟网卡冲突与 HTTP 200 空订阅修复）。纯粹排障指南严格克制商业导流，不强插无关品牌广告卡片。
2. **品牌评测与结构化数据体系**（[31 家品牌档案](/brands/)、[套餐数据库](/database/plans)、[历史测速库](/database/speedtests)、[可用性矩阵](/database/availability)、[多品牌对比](/compare/)）
   - 全库通过结构化 JSON/CSV（开放导出至 `/data/brands.json` 与 `/data/plans.csv`）统一驱动。任何页面展示的套餐价、每 GB 单价、节点倍率与协议均受脚本校验，禁止各篇文章自行编造或篡改口径。
3. **商业决策与合规转化体系**（[机场推荐](/recommend/)、[价格专题](/pricing/)、[品牌商业页](/brands/guangsuyun/plans)、[优惠码总表](/pricing/coupons)）
   - 在明确披露合作推广关系与推广顺序规则的前提下，按月付门槛、年付折算、不限时盈亏平衡点及设备接入自由度帮助用户做客观比价。

---

## 二、编辑组与性能核查团队职责分工

为保障数据一致性与评测可复核性，站内维护工作拆分为三条独立审核线：
- **基础数据校验组**：负责维护 `brands.json`、`plans.json` 与 `affiliate-links.json`，运行自动化数据与外链合规审计脚本，并对同一品牌跨文本出现的 18 项分歧建立公开冲突台账（[`CF-001` 至 `CF-018`](/methodology/sources)）。
- **网络性能与图证归档组**：核验 `2026-08-11`（MAI-TEST-BOT）及 `2026-08-19`（MiaoKo 三网及单多线程测试）等历史原始测速图片与地区延迟数值；严格区分非晚高峰单批截面与连续夜间压测，严禁对无图品牌编造速度数据。
- **客户端与排障文档组**：追踪 Mihomo、sing-box、v2rayN、Shadowrocket、FlClash、Nikki 与 HomeProxy 等开源工具发布源变更，确保安装与分流文档不误导用户访问山寨打包下载站。

---

## 三、核心治理规范快速导航

- 了解字段可信度评级与完整度计算逻辑：[评测方法与字段分级 →](/methodology/evaluation)
- 查看商业合作顺位与 `nofollow sponsored` 规定：[商业推广披露声明 →](/methodology/disclosure)
- 查阅全部 `CF-001`~`CF-018` 来源分歧与原文出处：[数据来源与冲突台账 →](/methodology/sources)
- 提交失效优惠码或最新结账核对截图：[数据纠错与更新日志 →](/methodology/corrections)
- 查看隐私边界与法律免责说明：[隐私政策与免责声明 →](/methodology/privacy-disclaimer)
