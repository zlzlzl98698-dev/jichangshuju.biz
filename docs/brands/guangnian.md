---
title: 光年梯评测与档案：2025新站 18元/110GB、08-11 测速与 VLESS/SS 差异
description: 光年梯（2025年成立）独立档案（完整度 54%）：评估其 ¥18/月（110GB）IEPL 定位，展示 2026-08-11 14:38 MAI-TEST-BOT 测速截图、VLESS 与 SS 跨源冲突及 2025 新站年限注意。
pageType: review
shortTitle: 光年梯
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: src-brand-roster-32 + src-speedtest-zip-20260811
faq:
  - q: 光年梯支持 Clash 或 Shadowrocket（小火箭）等第三方客户端吗？
    a: "支持。兼容第三方通用订阅导入与自研客户端双模式（同时见 VLESS 文本声明与 08-11 Shadowsocks 截图），可直接跑在 Clash Verge Rev、v2rayN 与小火箭里。"
  - q: 光年梯最低价格是多少？有不限时套餐吗？
    a: "当前收录标准月付入门档为 ¥18/月（110GB/月，折 ¥0.164/GB）；其余周期包与不限时流量包尚未见于主库详表。"
  - q: 光年梯的测速与 AI 解锁数据能保证晚高峰长期稳定吗？
    a: "不能绝对保证。目前仅有 2026-08-11 下午 14:38 的珠海联通单批测速快照（非晚高峰 21:00 测试），且缺 10-19 五地区汇总表与逐项 AI 实测。"
  - q: 光年梯支持多少台设备同时连接？
    a: "设备并发上限与流量倍率目前均标为待核实，仅先按单月试测看待。"
  - q: "使用光年梯的优惠码 `gnt6666` 有哪些注意事项？"
    a: "优惠码 `gnt6666` 具体减免百分比尚未核实，具体以结算框实扣为准。"
---

# 光年梯评测与品牌数据档案（2026）

> **Answer-First 核心结论**：**光年梯（LightYear）** 标注于 **2025 年上线**（完整度 **54%**），主打 **¥18/月（110GB）** 真月付门槛——比同价位的极连云（100GB）多出 10GB 配额，具备 **IEPL 专线声明、自研/第三方双模式支持以及 `2026-08-11`（14:38）真实测试图片**。需重点留意其 **2025 年新站沉淀期较短**、存在文案 VLESS 与实图 Shadowsocks 协议并存特征，且缺少 `10-19` 五地区延迟汇总。

<AffiliateCtaCard brandId="guangnian" />

---

## 一、18 元月付 110GB 与 VLESS / SS 跨批次协议差异核对

在 [20 元以内真月付指南](/pricing/20-yuan-monthly-guide) 里，¥18/月 是极低沉没成本的试错区间：

| 核对维度 | 本站当前记录 | 审计与实务意义 |
|---|---|---|
| **参考月付门槛** | **¥18 / 月 · 110 GB/月**（`¥0.164/GB`） | 无需直接押注年付，首月试水压力极轻；优惠码 `gnt6666` 比例待核 |
| **协议记录分歧 (`conflict`)** | 品牌资料声明 **VLESS** vs `08-11` 测速原图显示 **Shadowsocks** | 可能为多节点混布或批次调整，使用支持双协议的 [Clash Verge Rev](/clients/clash-verge) 即可兼容 |
| **客户端自由度** | 自研软件 + 第三方订阅导入双支持 | 可导入 [Shadowrocket](/clients/shadowrocket) 与 [OpenWrt 软路由](/guides/router-openwrt) |

---

## 二、`2026-08-11 (14:38)` MAI-TEST-BOT 测速截图实录

<DarkObservatoryReport brandId="guangnian" />

- **已核查测试边界**：该图来自 `2026-08-11` **下午 `14:38`** 于珠海联通 5Gbps / 32 线程环境下运行的 MAI-TEST-BOT 快照。注意：**下午两点半属于典型平峰闲时，不能用来直接担保夜间 21:00–23:00 电信或移动家宽的丢包情况**，且同品牌缺 `2026-10-19` 五地区延迟数表。
- **AI 与流媒体声明**：官方资料提及支持常见 AI 工具与主流流媒体，但缺乏节点级解锁截图列支撑，归类为 `vendor` 声明。

---

## 三、2025 年新建站运营年限与 46% 待补字段边界

尽管有了 `08-11` 截图比纯无图品牌高出一个档次，光年梯仍缺失：完整多档月/季/年付价表、各地区总节点数、设备同时在线上限、流量倍率以及支付方式和退款规范。对于 2025 年创立的新品牌，最理性的动作永远是**只买单月 ¥18 验证晚高峰，不要急着寻年付大单**。

---

## 四、第三方客户端导入适配与同价位比对

- **18 元 vs 19.9 元/25 元升级参照**：如果看重明确写清 **全 1x 倍率**、拥有 2020 年老牌运营背景与完整多档定价体系，建议对比仅多加约 ¥2 的 **[唯兔云](/brands/weitu)**（¥19.9/150GB，完整度 82%）或加 ¥7 升级至旗舰 **[光速云极速版](/brands/guangsuyun)**（¥25/168GB，5 张三网原图，完整度 96%）。横向比价使用 [22 项参数对比工具](/compare/) 与 [价格计算器](/database/plans)。

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>光年梯支持 Clash 或 Shadowrocket（小火箭）等第三方客户端吗？</summary>

支持。兼容第三方通用订阅导入与自研客户端双模式（同时见 VLESS 文本声明与 08-11 Shadowsocks 截图），可直接跑在 Clash Verge Rev、v2rayN 与小火箭里。

</details>

<details class="ad-faq-details">
<summary>光年梯最低价格是多少？有不限时套餐吗？</summary>

当前收录标准月付入门档为 ¥18/月（110GB/月，折 ¥0.164/GB）；其余周期包与不限时流量包尚未见于主库详表。

</details>

<details class="ad-faq-details">
<summary>光年梯的测速与 AI 解锁数据能保证晚高峰长期稳定吗？</summary>

不能绝对保证。目前仅有 2026-08-11 下午 14:38 的珠海联通单批测速快照（非晚高峰 21:00 测试），且缺 10-19 五地区汇总表与逐项 AI 实测。

</details>

<details class="ad-faq-details">
<summary>光年梯支持多少台设备同时连接？</summary>

设备并发上限与流量倍率目前均标为待核实，仅先按单月试测看待。

</details>

<details class="ad-faq-details">
<summary>使用光年梯的优惠码 `gnt6666` 有哪些注意事项？</summary>

优惠码 `gnt6666` 具体减免百分比尚未核实，具体以结算框实扣为准。

</details>
<AffiliateCtaCard brandId="guangnian" compact />
