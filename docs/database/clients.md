---
title: 客户端兼容性数据库 — 第三方订阅与专属客户端对照
shortTitle: 客户端兼容性库
description: 按 Windows、Android、iOS/iPadOS、macOS、Linux 与 OpenWrt 六大平台查询 22 款代理客户端，明确区分支持第三方订阅与仅支持官方专属客户端的机场品牌。
pageType: database
wide: true
verifiedAt: 2026-10-19
updatedAt: 2026-11-26
sourceNote: 第三方代理客户端.txt + 32家机场品牌清单.txt
faq:
  - q: 第三方通用订阅机场与“官方专属客户端”机场核心区别是什么？
    a: 开放第三方通用订阅的品牌（如光速云、星岛梦、唯兔云、暮光加速、二猫云）允许将订阅 URL 导入 Clash Verge Rev、Mihomo、v2rayN、Shadowrocket 或 OpenWrt 软路由；而纯专属客户端品牌（如飞猫云、SOGO 云、全球云、隐形人、灵猫网络）只允许登录官方定制 App，无法接入软路由或开源客户端。
  - q: 2026 年选择开源桌面端与移动端客户端最推荐哪几款内核？
    a: 桌面端与软路由主流首选 **Mihomo（原 Clash Meta 内核，搭配 Clash Verge Rev / FlClash / OpenClash）** 与 **sing-box**；Windows 多协议管理可选 **v2rayN**；iOS 端经典通用方案为 **Shadowrocket** 或支持 sing-box/Mihomo 的跨端工具。
  - q: "本库里标注为 `pending` 待核实的品牌该怎么处理？"
    a: 部分档案或待核实品牌（如微风网络、U1S1 等）的 `thirdPartySupport` 字段目前保留为 `pending`，建议先用最低单月付登录后台确认是否提供标准 Clash/Shadowrocket 导入按钮，再决定长期续费。
---

# 客户端兼容性数据库

**选购机场前必须先核对客户端接入模式：目前 31 家收录品牌明确分化为“支持 Clash/Shadowrocket 通用订阅”、“仅支持官方专属客户端”和“待核实”三类。不提供标准订阅链接的品牌，无法直接导入 Clash Verge Rev、v2rayN、Shadowrocket 或 OpenWrt 软路由。**

<ClientCompatibilityMatrix />

---

## 一、三类接入模式对跨平台自由度的影响

| 接入模式 | 代表客户端支持 | 软路由（OpenWrt）可用性 | 自定义分流与脚本 | 典型机场核对提示 |
|---|---|---|---|---|
| **开放第三方通用订阅** | Clash Verge Rev、FlClash、v2rayN、Shadowrocket、Karing | **原生支持**（OpenClash / Nikki / HomeProxy） | 支持自定义 Merge/Script 规则与精细分流 | 购买前确认提供标准 Clash / base64 订阅导出 |
| **仅官方专属客户端** | 仅厂商自研桌面/移动安装包 | **通常不支持**（除非厂商提供独立固件包） | 仅能使用 App 内置策略 | 详见 [专属客户端锁定风险分析](/risks/exclusive-client-lockin) |
| **状态待核实（pending）** | 需首月登录用户面板实测确认 | 不确定，切勿未经验证直接年付 | 视面板导出接口而定 | 先购最低月付进面板验证订阅菜单 |

---

## 二、选型延伸与配置教程

- **内核与界面对比**：阅读 [Mihomo、sing-box 与 FlClash 内核区别](/clients/mihomo-vs-singbox-vs-flclash)
- **桌面端分流与排障**：查看 [Clash Verge Merge/Script 覆写教程](/guides/clash-verge-merge-script) ｜ [TUN 模式冲突排查](/diagnostics/clash-tun-conflict)
- **移动端与路由器**：参考 [Shadowrocket 报错排查](/clients/iphone-shadowrocket-setup-errors) ｜ [OpenWrt 软路由选型避坑](/guides/router-openwrt)
- **多设备合规边界**：了解 [同一订阅多设备共用限制](/guides/multi-device-same-subscription)

---

## 三、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>第三方通用订阅机场与“官方专属客户端”机场核心区别是什么？</summary>

开放第三方通用订阅的品牌允许将订阅 URL 导入 Clash Verge Rev、Mihomo、v2rayN、Shadowrocket 或 OpenWrt 软路由；而纯专属客户端品牌只允许登录官方定制 App，无法接入软路由或自定义客户端内核。

</details>

<details class="ad-faq-details">
<summary>2026 年选择开源桌面端与移动端客户端最推荐哪几款内核？</summary>

桌面端与软路由主流首选 **Mihomo（Clash Verge Rev / FlClash）** 与 **sing-box**；Windows 多协议支持可选 **v2rayN**；iOS 通用端常用 **Shadowrocket** 等工具。

</details>

<details class="ad-faq-details">
<summary>本库里标注为 `pending` 待核实的品牌该怎么处理？</summary>

坚持“不直接买年付或大流量包”原则，先购单月入门套餐登录面板核实是否开放订阅链接，再决定长期使用。

</details>