---
title: 榴莲云评测与档案：协议待公布短板、42% 完整度与 ll88 七折核实
description: 榴莲云（2024年运营）独立档案（完整度 42%）：重点揭示其作为 5.6元平价集群成员却未统一公布传输协议的透明度缺口，并列明无独立测速图与 ll88 季付 7 折约束。
pageType: review
shortTitle: 榴莲云
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: src-brand-roster-32 + plans.json + affiliate-links.json
faq:
  - q: 榴莲云支持 Clash 或 Shadowrocket（小火箭）等第三方客户端吗？
    a: "资料标注支持第三方通用订阅导入，同时提供官方自研客户端，但具体采用的传输协议（是否含 VLESS Reality 或 Hysteria 2 等）在原始资料中标为未统一提供，需在后台查看适配核心版本。"
  - q: 榴莲云最低价格是多少？有不限时套餐吗？
    a: "榴莲云当前录得年付约 ¥5.6/月（折算 12 个月约 ¥67.2 / 60GB/月）单档参考；未列出不限时一次性流量包。"
  - q: 榴莲云的测速与 AI 解锁数据能保证晚高峰长期稳定吗？
    a: "无法保证。榴莲云无任何独立 PNG 测速与五地区延迟数据，AI 与流媒体亦未获验证。"
  - q: 榴莲云支持多少台设备同时连接？
    a: "目前档案中设备限制与流量倍率全部标为待核实，不建议未确认前直接用于多人高频共用。"
  - q: "使用榴莲云的优惠码 `ll88` 有哪些注意事项？"
    a: "品牌资料注释 `ll88` 为季付及以上 7 折，是否覆盖低价入门年付需在结账台实测校验。"
---

# 榴莲云评测与品牌数据档案（2026）

> **Answer-First 核心结论**：**榴莲云（DurianCloud）** 标注自 **2024 年起运营**，以 **42% 资料完整度** 处于全库最低透明度队列（与浪网同属高缺失单档观察样本）。尽管报价规格向 5.6 元集群看齐（年付约 ¥5.6/月 60GB，标明 IEPL + 第三方订阅支持 + 自研端），但它连**具体传输协议都尚未在公开基础资料中统一披露**，缺乏独立测速图与多档月付参考，买前盲区较多。

<AffiliateCtaCard brandId="liulianyun" />

---

## 一、协议缺失边界先看：为何协议类型标为“未统一提供”

同为 ¥5.6/月 入门参考，大佬云、闪电鼠均清晰写明协议为 VLESS；而榴莲云在原始主清单中将传输协议留空（`pending`）：
- **对老旧软件用户的直接影响**：如果面板实际下发的是 Hysteria 2 或 VLESS-Reality 节点，而用户手头装的还是早已停更的旧 Clash for Windows，拉取订阅就会整批失败或空节点（排障原理见 [订阅返回 200 但空节点](/diagnostics/empty-subscription-200)）。
- **必须先装现代多核心客户端**：计划试测时，桌面务必提前准备基于 Mihomo/sing-box 内核的 [Clash Verge Rev](/clients/clash-verge) 或 [v2rayN](/clients/v2rayn)，苹果端使用最新正版 [Shadowrocket](/clients/shadowrocket)。

---

## 二、42% 完整度结构拆解与参考单价

| 参数 / 档位维度 | 在库记录内容 | 数据状态 |
|---|---|---|
| **参考价格档** | 年付参考档（¥67.2估算 / 折约 **¥5.60/月**，60 GB/月） | 单档估算，其余月付/季付档待补 |
| **每 GB 标称单价** | 约 `¥0.093/GB` | **节点倍率未标（pending）**，若存在高倍率则会抬高真实单价 |
| **优惠码** | `ll88`（标季付及以上 7 折） | 实际适用限额待核实 |
| **待补齐缺口** | 传输协议、完整价格梯队、节点国家清单、独立测速图、AI 解锁、设备数、支付与退款 | 缺失 7 大关键领域 |

---

## 三、可验证测速现状与设备盲区（Dark Observatory）

<DarkObservatoryReport brandId="liulianyun" />

在目前收录的 `2026-08-11` 与 `2026-08-19` 测速档案库中，均未检索到榴莲云的独立节点截图。因此本站不填入任何示例延迟或下载跑分，仅保留实测空置状态以防误导。

---

## 四、适合人群、排雷提示与同档比对

- **仅适合**：明确在调研 ¥5.6/月 极端低价区间、且具备自助排错不同协议能力的技术型观察者；
- **强烈建议对照**：如果预算允许上浮至 ¥8/月（¥96–¥99/年），拥有清晰截图与全协议声明的 **[星岛梦](/brands/xingdaomeng)**（全 1x，80% 完整度）与 **[光速云](/brands/guangsuyun)**（96% 完整度）可显著降低盲买踩坑概率。延伸看 [5.6 元集群横向分析](/compare/budget-tier-56) 与 [套餐成本计算器](/database/plans)。

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>榴莲云支持 Clash 或 Shadowrocket（小火箭）等第三方客户端吗？</summary>

资料标注支持第三方通用订阅导入，同时提供官方自研客户端，但具体采用的传输协议（是否含 VLESS Reality 或 Hysteria 2 等）在原始资料中标为未统一提供，需在后台查看适配核心版本。

</details>

<details class="ad-faq-details">
<summary>榴莲云最低价格是多少？有不限时套餐吗？</summary>

榴莲云当前录得年付约 ¥5.6/月（折算 12 个月约 ¥67.2 / 60GB/月）单档参考；未列出不限时一次性流量包。

</details>

<details class="ad-faq-details">
<summary>榴莲云的测速与 AI 解锁数据能保证晚高峰长期稳定吗？</summary>

无法保证。榴莲云无任何独立 PNG 测速与五地区延迟数据，AI 与流媒体亦未获验证。

</details>

<details class="ad-faq-details">
<summary>榴莲云支持多少台设备同时连接？</summary>

目前档案中设备限制与流量倍率全部标为待核实，不建议未确认前直接用于多人高频共用。

</details>

<details class="ad-faq-details">
<summary>使用榴莲云的优惠码 `ll88` 有哪些注意事项？</summary>

品牌资料注释 `ll88` 为季付及以上 7 折，是否覆盖低价入门年付需在结账台实测校验。

</details>
<AffiliateCtaCard brandId="liulianyun" compact />
