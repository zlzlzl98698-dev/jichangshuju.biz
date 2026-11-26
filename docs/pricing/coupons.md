---
title: 2026 机场优惠码与折扣限制汇总（含光速云 AMM、冲突码核查与结账防踩坑）
description: 汇总 31 家机场品牌已核实优惠码（光速云 AMM、飞猫云 flycat888、微风 flat888、Firefly 等）、多周期折扣梯队、不打折排除套餐及来源冲突记录。
pageType: commercial
shortTitle: 机场优惠码
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: data/affiliate-links.json + data/sources/data-conflicts.json
faq:
  - q: 光速云优惠码 AMM 具体有什么用？所有套餐都能用吗？
    a: AMM 是光速云资料中登记的新人优惠券代码。但根据光速云品牌资料，轻量版（¥99/年）与致敬斯诺克 147 永久套餐明确标注“不打折”；极速版与定制套餐则标注半年 9 折、年付 8 折、两年 75 折、三年 7 折（具体与优惠券能否叠加需以官网结账页为准）。
  - q: 为什么有些品牌在本站表格里列出了两个不同的优惠码？
    a: 因为原始资料不同章节存在来源差异（如头部摘要与正文说明不一致）。本站不擅自删除任何一个可能有效的优惠码，而是全部并列保留并在冲突台账（CF-005/008/009/010/011/015）中明注，方便结账时逐一测试。
  - q: 优惠码输入之后提示“此套餐不适用”最常见原因是什么？
    a: 90% 是因为选购了本来就属于特惠引流性质的“入门年付版”或“永久不限时套餐”（例如光速云轻量版/147、Firefly 年付版、闪跃年付版、灵猫年付小包）。
  - q: 季付、年付自带折扣和新用户优惠码可以自动叠加吗？
    a: 不一定。只有极少数历史资料（如 Firefly 萤火虫 2026-08-09 记录）曾标注“季9/半85/年8折，叠优惠最高约64折”，其余大多数品牌由后端收银台实时判断能否叠加。
  - q: 灵动云、浪网和宇宙云的优惠码为什么标为待核实？
    a: 灵动云和浪网原始资料明确写“优惠码尚未核实”，宇宙云的 YUZHOU553 则来自较早期历史资料且当前有效性待确认，本站绝不凭空补写虚假折扣码。
---

# 2026 机场优惠码、折扣规则与适用限制汇总

> **Answer-First 核心结论**：**使用机场优惠码前，必须先看“是否适用当前套餐”和“是否存在多来源码冲突”。** 全库共有明确优惠记录的品牌多集中在新用户 **7 折–9 折** 区间，但 **特惠年付小包与永久不限时套餐普遍不参与额外折扣**（例如光速云轻量版与 147 永久版、Firefly 年付版、闪跃年付版、灵猫年付小包）。下表全部直连统一注册表 [affiliate-links.json](file:///c:/Users/Pro%20User/Desktop/jichangshuju.biz/data/affiliate-links.json)，标注推广关系与核实日期。

返回上游专题：[价格与套餐总览 →](/pricing/) ｜ 查询完整套餐价格：[套餐数据库 →](/database/plans)

---

## 一、31 家品牌已登记优惠码与适用限制总表

| 品牌 | 登记优惠码 | 折扣力度与适用限制（来源于原资料） | 冲突状态 | 品牌直达（含推广披露） |
|---|---|---|---|---|
| [光速云](/brands/guangsuyun) | `AMM` | 新人优惠券；**轻量版与 147 永久版不打折**；极速/定制版半年9/年8/两年75/三年7折 | 清晰 | [光速云详情与入口](/brands/guangsuyun) |
| [暮光加速](/brands/muguang) | `muguang5555` | 头部标注代码，正文另有“未查到公开优惠码”描述 | `CF-005` | [暮光加速详情](/brands/muguang) |
| [飞猫云](/brands/feimao) | `flycat888` | 汇总表标注 8 折，适用套餐待核实 | 清晰 | [飞猫云详情](/brands/feimao) |
| [微风网络](/brands/weifeng) | `flat888` | 汇总表标注 9 折 | 清晰 | [微风网络详情](/brands/weifeng) |
| [大佬云](/brands/dalaoyun) | `dly888` | 季付及以上 7 折 | 清晰 | [大佬云档案](/brands/dalaoyun) |
| [星岛梦](/brands/xingdaomeng) | `nmw888` | 具体折扣比例与限制待核实 | 清晰 | [星岛梦详情](/brands/xingdaomeng) |
| [隐形人](/brands/yinxingren) | `yxr888` / `moon80` | `moon80` 标注 8 折；与头部 `yxr888` 并存 | `CF-015` | [隐形人详情](/brands/yinxingren) |
| [二猫云](/brands/ermao) | `ermao5555` | 具体折扣比例待核实 | 清晰 | [二猫云详情](/brands/ermao) |
| [无忧链接](/brands/wuyou) | `wuyou666` | 具体折扣比例待核实 | 清晰 | [无忧链接详情](/brands/wuyou) |
| [唯兔云](/brands/weitu) | `weitu666` | 具体折扣比例待核实 | 清晰 | [唯兔云详情](/brands/weitu) |
| [Firefly](/brands/firefly) | `firefly` | 新用户 8 折（**年付版不适用**）；历史另有季9/半85/年8折 | `CF-002` | [Firefly 详情](/brands/firefly) |
| [宇宙云](/brands/yuzhou) | `YUZHOU553` | 历史资料称新用户 8 折，当前有效性待核实 | 待核实 | [宇宙云档案](/brands/yuzhou) |
| [U1S1](/brands/u1s1) | `akaka` | 具体折扣比例待核实 | 清晰 | [U1S1 详情](/brands/u1s1) |
| [灵猫网络](/brands/lingmao) | `lmao888` / `lingmao` | `lingmao` 标注 8 折（**年付小包不适用**） | `CF-008` | [灵猫网络详情](/brands/lingmao) |
| [极连云](/brands/jilian) / [光年梯](/brands/guangnian) | `ji8888` / `gnt6666` | 具体折扣幅度待核实 | 清晰 | [极连云](/brands/jilian) · [光年梯](/brands/guangnian) |
| [一翻云](/brands/yifan) | `yfy6666` / `1FLYYUN` | `1FLYYUN` 正文标注 9 折；与头部 `yfy6666` 并存 | `CF-009` | [一翻云详情](/brands/yifan) |
| [SOGO 云](/brands/sogo) | `SOGO10000` / `sss777` | `SOGO10000` 标注 9 折；与汇总表 `sss777` 并存 | `CF-010` | [SOGO 云详情](/brands/sogo) |
| [可信云](/brands/kexin) / [速界](/brands/sujie) | `kkk333` / `sss1111` | 具体折扣幅度待核实 | 清晰 | [可信云](/brands/kexin) · [速界](/brands/sujie) |
| [闪跃](/brands/shanyue) | `shanyue` | 8 折（仅限闪动/飞跃/瞬移/跃迁月付，**年付版不适用**） | 清晰 | [闪跃详情](/brands/shanyue) |
| [全球云](/brands/quanqiu) | `qq88` / `qqy7777` | `qq88` 标注 8 折；与汇总表 `qqy7777` 并存 | `CF-011` | [全球云详情](/brands/quanqiu) |
| [闪电鼠](/brands/shandianshu) / [云界线](/brands/yunjiexian) / [榴莲云](/brands/liulianyun) / [环球梯](/brands/huanqiuti) | `sd88` / `yjx888` / `ll88` / `HQ66` | 季付及以上 7 折（云界线、环球梯注意链接格式异常） | `CF-013/014` | [5.6元 5 品牌对比](/compare/budget-tier-56) |
| [神行加速](/brands/shenxing) / [梯子云](/brands/tiziyun) | `xs0077` / `tiziyun` | 神行新用户 7 折；梯子云幅度待核实 | 清晰 | [神行加速](/brands/shenxing) · [梯子云](/brands/tiziyun) |
| [边缘节点 EdgeNova](/brands/edgenova) | `TH888` | 历史 8 折（2026-08-09 录入，当前有效性待核实） | 待核实 | [EdgeNova 档案](/brands/edgenova) |
| [灵动云](/brands/lingdong) / [浪网](/brands/langwang) | 优惠码尚未核实 | 历史记录未收录有效优惠码 | 待核实 | [灵动云](/brands/lingdong) · [浪网](/brands/langwang) |

---

## 常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>光速云优惠码 AMM 具体有什么用？所有套餐都能用吗？</summary>

AMM 是光速云新人优惠券代码，但轻量版与致敬斯诺克 147 永久套餐明确不打折，其余档位以结账页实测为准。

</details>

<details class="ad-faq-details">
<summary>为什么有些品牌在本站表格里列出了两个不同的优惠码？</summary>

源于不同批次原始文档的口径差异，本站保留全部候选码并登记冲突编号，供结账时按序尝试。

</details>

<details class="ad-faq-details">
<summary>优惠码输入之后提示“此套餐不适用”最常见原因是什么？</summary>

多半是因为选了不参与折扣的特价年付小包或永久不限时套餐。

</details>

<details class="ad-faq-details">
<summary>季付、年付自带折扣和新用户优惠码可以自动叠加吗？</summary>

多数服务商以结账页最终系统计算为准，不可默认所有品牌均支持折上折。

</details>

<details class="ad-faq-details">
<summary>灵动云、浪网和宇宙云的优惠码为什么标为待核实？</summary>

这些品牌处于历史档案状态且原资料未提供或未验证最新折扣码有效性，本站不编造代码。

</details>