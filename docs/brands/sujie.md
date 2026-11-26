---
title: 速界评测与档案：25元/150GB AI 专项定位、克制免责与 08-11 实测审视
description: 速界（2024年运营）独立档案（完整度 56%）：评估其在 ¥25/150GB 档聚焦 ChatGPT/Claude/Gemini 访问场景并克制声明不作永久风控担保的态度，结合 08-11 15:39 截图与缺口进行客观比较。
pageType: review
shortTitle: 速界
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: src-brand-roster-32 + src-speedtest-zip-20260811
faq:
  - q: 速界支持 Clash 或 Shadowrocket（小火箭）等第三方客户端吗？
    a: "支持。速界兼容官方自研客户端与第三方通用订阅导入（文本见 VLESS，08-11 截图见 Shadowsocks），适用 Clash Verge Rev、v2rayN、Shadowrocket 及软路由。"
  - q: 速界最低价格是多少？有不限时套餐吗？
    a: "当前收录标准月付参考档为 ¥25/月（150GB/月，折 ¥0.167/GB）；完整多周期与不限时清单尚待补充。"
  - q: 速界的测速与 AI 解锁数据能保证晚高峰长期稳定吗？
    a: "速界自己也很克制地提示 AI 解锁受 IP 与平台风控影响不作永久担保；本站亦仅见 2026-08-11 15:39 单批珠海联通快照，无独立 AI 节点检测表。"
  - q: 速界支持多少台设备同时连接？
    a: "设备连接上限、倍率与退款条约目前均处于待核实状态。"
  - q: "使用速界的优惠码 `sss1111` 有哪些注意事项？"
    a: "优惠码 `sss1111` 具体折扣幅度待核实，下单请看系统结账栏实减比例。"
---

# 速界评测与品牌数据档案（2026）

> **Answer-First 核心结论**：**速界（SpeedWorld）** 标注自 **2024 年起运营**（完整度 **56%**），在 ¥25/150GB 主力月付档中显著将重心放在 **ChatGPT、Claude、Gemini 等 AI 工具访问场景**，同时罕见地主动克制注明“AI 可用性受 IP、地区与风控规则影响”。支持自研+第三方通用订阅并存，且留存 `2026-08-11 (15:39)` 实测 PNG；但缺少完整多档价表、设备限额与独立三网 AI 解锁实图，购前依然需要单月亲测。

<AffiliateCtaCard brandId="sujie" />

---

## 一、AI 工具专项定位与“风控动态免责”克制声明审视

在众多机场动辄用红字保证“100% 永久解锁全套 AI”的环境下，速界资料中展现了一项少见的理性声明：
- **亮点态度**：明确重点面向 **ChatGPT、Claude、Gemini** 场景优化，但同时诚实加注“可用性受目标平台 IP 封控政策与地区变动制约”（这与我们在 [Claude 防封指引](/streaming-ai/claude-access-and-ban-guide) 及 [Gemini 报错修复](/streaming-ai/gemini-region-and-error-fix) 中强调的技术规律完全一致）。
- **事实边界**：上述支持属于品牌方产品定位陈述（`vendor`），目前全库尚未取得速界各地区节点对 OpenAI/Claude/Gemini 的逐一节点级解锁截图列，实际干净度以首月购买实测为准。

---

## 二、25 元 / 150GB 标准月付门槛与优惠码 `sss1111` 核对

| 参考档位 | 计费方式 | 标称实付 | 月均配额 | 标称每 GB | 协议与接入说明 |
|---|---|---:|---:|---:|---|
| **标准月付参考档** | 月付 | **¥25** | 150 GB/月 | `¥0.167/GB` | 优惠码 `sss1111` 待核实；开放自研 + 第三方通用订阅 |

由于仅录得单档 ¥25 月付参考，速界高阶大流量月付或年付价格尚待后续补入；买前如需要多设备在路由器上分流（如只让 Claude 走固定美国/日本），务必记得关闭客户端自动切节点测速（参考 [多设备分流教程](/guides/clash-rules)）。

---

## 三、`08-11 (15:39)` 测速截图与 VLESS / SS 混合协议现状

<DarkObservatoryReport brandId="sujie" />

- **性能截屏与协议**：附带 `2026-08-11 15:39` 于珠海联通 5Gbps 环境下测试的原图截图（呈现 Shadowsocks 特征，而文本介绍注明 VLESS，归为跨源协议混合 `conflict`），缺少 `2026-10-19` 五地区延迟汇总表。
- **其余待补项（44%）**：除完整套餐表外，节点地区具体数目、并发设备数上限、节点倍率及支付退款规则目前均待面板核对。

---

## 四、同价位 25 元档 AI 稳定性平行比较

站在 **同样 ¥25/月** 起步门槛上，可以同步参考以下两条对比路径：
- **追求已验节点 AI 明细与 96% 完整度**：直接对比旗舰 **[光速云极速版](/brands/guangsuyun)**（同样 ¥25/月，但配额达 **168GB 且写明全 1x + 不限设备**，并明确公开了 `08-19` 截图实测中新加坡过 Gemini/OpenAI、香港仅限 APP 的真实表现）。
- **全库比较**：借助 [AI 与流媒体可用性数据库](/database/availability) 与 [多品牌参数对比工具](/compare/) 并排查看更多节点解锁差异。

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>速界支持 Clash 或 Shadowrocket（小火箭）等第三方客户端吗？</summary>

支持。速界兼容官方自研客户端与第三方通用订阅导入（文本见 VLESS，08-11 截图见 Shadowsocks），适用 Clash Verge Rev、v2rayN、Shadowrocket 及软路由。

</details>

<details class="ad-faq-details">
<summary>速界最低价格是多少？有不限时套餐吗？</summary>

当前收录标准月付参考档为 ¥25/月（150GB/月，折 ¥0.167/GB）；完整多周期与不限时清单尚待补充。

</details>

<details class="ad-faq-details">
<summary>速界的测速与 AI 解锁数据能保证晚高峰长期稳定吗？</summary>

速界自己也很克制地提示 AI 解锁受 IP 与平台风控影响不作永久担保；本站亦仅见 2026-08-11 15:39 单批珠海联通快照，无独立 AI 节点检测表。

</details>

<details class="ad-faq-details">
<summary>速界支持多少台设备同时连接？</summary>

设备连接上限、倍率与退款条约目前均处于待核实状态。

</details>

<details class="ad-faq-details">
<summary>使用速界的优惠码 `sss1111` 有哪些注意事项？</summary>

优惠码 `sss1111` 具体折扣幅度待核实，下单请看系统结账栏实减比例。

</details>
<AffiliateCtaCard brandId="sujie" compact />
