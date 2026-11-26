---
title: 闪电鼠评测与档案：5.6元平价年付、sd88 七折门槛与缺图风险核对
description: 闪电鼠（2024年运营）独立档案（完整度 44%）：解析其 IEPL + VLESS 与双端支持下的 ¥5.6/月（60GB）入门门槛及 sd88 优惠提示，指出缺失月付梯度与独立测速图的选型约束。
pageType: review
shortTitle: 闪电鼠
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: src-brand-roster-32 + plans.json + affiliate-links.json
faq:
  - q: 闪电鼠支持 Clash 或 Shadowrocket（小火箭）等第三方客户端吗？
    a: "支持。闪电鼠资料标注兼容第三方通用订阅导入（记录协议为 VLESS），同时保留自研端一键使用。"
  - q: 闪电鼠最低价格是多少？有不限时套餐吗？
    a: "闪电鼠目前录得单一入门年付参考档（年付折约 ¥5.6/月、估算 ¥67.2 / 60GB/月），尚未记录不限时流量包。"
  - q: 闪电鼠的测速与 AI 解锁数据能保证晚高峰长期稳定吗？
    a: "无法验证。闪电鼠无独立 PNG 测速截图，也无逐地区延迟和流媒体实测表，完整度仅 44%。"
  - q: 闪电鼠支持多少台设备同时连接？
    a: "设备连接上限与节点倍率目前均为待核实，请在用户后台面板查证后再决定是否多设备接入。"
  - q: "使用闪电鼠的优惠码 `sd88` 有哪些注意事项？"
    a: "品牌记录标注 `sd88` 为季付及以上 7 折，对特价入门档的实际可用性请以结算台实扣为准。"
---

# 闪电鼠评测与品牌数据档案（2026）

> **Answer-First 核心结论**：**闪电鼠（LightningMouse）** 标注于 **2024 年上线**（完整度 **44%**），属 5.6 元低预算集群的 VLESS 标准派成员——相比无协议标注的同类档，它明确写入了 **IEPL 专线 + VLESS 协议 + 双端接入**。但受制于完整度只有 44%，购买前仍面临“无独立测速证据、无完整月付阶梯表、设备与退款均未明”三大盲区。

<AffiliateCtaCard brandId="shandianshu" />

---

## 一、低价试水逻辑：`sd88` 季付七折与月均 ¥5.6 成本估算

在预算压缩到每年不足 70 元区间时，买对还是买错往往取决于隐形沉没门槛：
- **账面计算**：入门年付参考约 ¥67.2（即 `5.6 × 12`），每月提供 60GB，标称单价约 `¥0.093/GB`；若在非特价季付以上档位叠加 `sd88` 7 折（实际规则需结算页验证），名义单价会更低。
- **对比同价风险**：因为缺失官网全系列月付明细（未知是否允许 ¥10–¥15 先试用一个月），消费者如果直接拍下年付而遇到晚高峰拥堵，实际折旧成本可能瞬间拉高（算法详见 [机场年付折算月价怎么算](/pricing/annual-monthly-math)）。

---

## 二、客户端双接入模式 vs 缺失多月付档现实

| 支持终端类型 | 当前核实状态 | 选型操作提示 |
|---|---|---|
| **官方自研端 / 第三方通用端** | 均支持 (`VLESS`) | 对需要接入 [Clash Verge Rev](/clients/clash-verge)、[v2rayN](/clients/v2rayn)、[Shadowrocket](/clients/shadowrocket) 或 [OpenWrt 软路由](/guides/router-openwrt) 较为友好 |
| **官网其余月/季/不限时档** | 缺完整详表 | 录入库前仅掌握单档参考，无法比对同品牌 300GB/500GB 大包价格 |
| **设备限制 / 倍率 / 支付退款** | 均标 `待核实` | 购买前先看清官网条款，切忌默认无限制 |

---

## 三、性能面板核实与无独立图提示

<DarkObservatoryReport brandId="shandianshu" />

闪电鼠既未入选 `2026-08-11` 测速包，也不含 `2026-10-19` 五地区参考数值，且逐项 AI 与流媒体（ChatGPT/Claude/Gemini/Netflix）均处于未测试留空状态。

---

## 四、与实测证据完整老牌的选型取舍

如果你不差每年那二三十元的差价，但非常在意“能不能看到三网测速原图与 AI 明确分地区可用性”，建议把目光转向已留存多次可验图证的老牌开放订阅机场，如 **[光速云](/brands/guangsuyun)**（¥99 年付轻量 / ¥25 月付极速全 1x）或 **[二猫云](/brands/ermao)**（¥89 年付小包）。同梯队比较见 [5.6 元平价档 5 品牌横评](/compare/budget-tier-56) 与 [高性价比月付指南](/pricing/20-yuan-monthly-guide)。

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>闪电鼠支持 Clash 或 Shadowrocket（小火箭）等第三方客户端吗？</summary>

支持。闪电鼠资料标注兼容第三方通用订阅导入（记录协议为 VLESS），同时保留自研端一键使用。

</details>

<details class="ad-faq-details">
<summary>闪电鼠最低价格是多少？有不限时套餐吗？</summary>

闪电鼠目前录得单一入门年付参考档（年付折约 ¥5.6/月、估算 ¥67.2 / 60GB/月），尚未记录不限时流量包。

</details>

<details class="ad-faq-details">
<summary>闪电鼠的测速与 AI 解锁数据能保证晚高峰长期稳定吗？</summary>

无法验证。闪电鼠无独立 PNG 测速截图，也无逐地区延迟和流媒体实测表，完整度仅 44%。

</details>

<details class="ad-faq-details">
<summary>闪电鼠支持多少台设备同时连接？</summary>

设备连接上限与节点倍率目前均为待核实，请在用户后台面板查证后再决定是否多设备接入。

</details>

<details class="ad-faq-details">
<summary>使用闪电鼠的优惠码 `sd88` 有哪些注意事项？</summary>

品牌记录标注 `sd88` 为季付及以上 7 折，对特价入门档的实际可用性请以结算台实扣为准。

</details>
<AffiliateCtaCard brandId="shandianshu" compact />
