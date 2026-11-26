---
title: 机场品牌数据库（2026）：31 家唯一品牌实体检索、完整度核查与评测总库
description: 集中检索与筛选 31 家去重后的机场品牌档案（含光速云、暮光加速、飞猫云、微风网络、星岛梦、唯兔云、Firefly等），详解资料完整度、运营状态验证、官网入口核对与替代决策方法。
pageType: pillar
schemaCollection: true
wide: true
aside: false
shortTitle: 机场品牌库
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: data/brands/brands.json + data/sources/data-conflicts.json
itemList:
  - name: 光速云（96%完整度·旗舰档案）
    url: /brands/guangsuyun
  - name: Firefly（84%完整度·合并萤火虫实体）
    url: /brands/firefly
  - name: 唯兔云（82%完整度·IPLC 10档套餐）
    url: /brands/weitu
  - name: 一翻云（82%完整度·HY2/Reality/SS）
    url: /brands/yifan
  - name: 星岛梦（80%完整度·2020年老牌）
    url: /brands/xingdaomeng
  - name: 二猫云（80%完整度·不限设备IEPL）
    url: /brands/ermao
faq:
  - q: 原始资料文件叫“32家机场品牌清单”，为什么品牌库里只显示 31 家？
    a: 经实体去重审计，原始清单中的第 8 位“Firefly”与补充记录中的“Firefly 萤火虫”实为同一品牌在不同时间点的档案记录，合并归档为唯一实体 firefly 后，实际独立品牌总数为 31 家。此外压缩包中存在“快狸”PNG 与 Logo，但未纳入 31 品牌主清单，仅作库外审计留档（CF-018）。
  - q: 品牌数据库里的“资料完整度”代表速度更快或更安全吗？
    a: 不代表。资料完整度仅统计该品牌目前公开可查的字段数量（如是否有完整套餐表、协议类型、设备限制、测速截图与付款政策），不等于产品性能好坏，也不构成安全性评级。
  - q: 为什么有些品牌档案标注“待核实”或存在“有冲突”标签？
    a: 当不同时间的原始文档对同一品牌的流量、优惠码、协议或节点地区给出矛盾说法时，本站不擅自猜对错，而是公开保留来源冲突标签（全库共登记 18 条，如 CF-001 至 CF-018），方便用户下单前向官网核实。
  - q: 品牌档案页里的链接都是官方无推广直连网址吗？
    a: "不是。目前收录的品牌入口主要为带邀请码的官方联盟推广入口，页面统一标注“含推广链接”并加上 rel=\"nofollow sponsored noopener\"。对于尚无独立非推广域名或链接异常（如云界线、环球梯缺少 #/）的品牌，均会单独明示提示。"
  - q: 灵动云、浪网和边缘节点 EdgeNova 为什么排在最后且标注历史档案？
    a: 这三家品牌原始记录标注为 2026-08-09 历史品牌库采集，此后未包含在 2026-10-19 主表更新中，当前入口、优惠码或部分套餐字段（如浪网“截150G”、灵动云定制遮挡）尚未完成近期复核，按规范排后展示并重点提示待核实。
  - q: 如何把任意 2–4 个品牌拉在一起横向对比？
    a: 可以直接打开本站的“多品牌参数并排对比系统”（/compare/），一次勾选 2 到 4 家品牌，即可并排查看 22 项参数对比；缺失字段统一显示“待核实/未提供”，绝不填 0。
  - q: 如何阅读一篇机场品牌评测才不会被营销文案带偏？
    a: 建议跳过开头的宣传语，重点看四块硬核字段：① 客户端是通用订阅还是专属 App 锁定；② 测速数据是否为非晚高峰或单日截图；③ AI/流媒体哪些是节点实测、哪些仅是品牌方宣传；④ 是否有不退款或优惠码不适用限制。
  - q: 遇到某个品牌的推广优惠码在官网结账提示无效怎么办？
    a: 首先核查是否选错了不参与折扣的入门年付版或永久包（如光速云轻量版、Firefly 年付版）；其次核对是否属于存在来源冲突的品牌（如隐形人 yxr888/moon80、灵猫 lmao888/lingmao），若全部失效可通过页面底部“纠错机制”反馈。
---

# 机场品牌数据库（31 家独立品牌检索与档案中心）

> **Answer-First 核心结论**：本品牌库收录经**实体去重与冲突审计后的 31 家唯一机场品牌**（已将 `Firefly` 与 `Firefly 萤火虫` 合并为统一实体）。这是一个**可搜索、可按预算/线路/计费周期/客户端兼容性筛选的客观数据索引**，而非纯广告榜单。**资料完整度（40%–96%）反映的是公开字段的完备程度，不代表测速排名或安全等级。**

---

## 一、机场品牌实时数据库（搜索 · 筛选 · 排序 · 表格/卡片切换）

你可以直接在下方输入品牌名称、别名（如 `2mao`、`萤火虫`、`V2Yun`）、协议（`VLESS` / `Trojan` / `Hysteria 2`）或优惠码进行即时检索：

<BrandDatabaseTable />

---

## 二、31 家品牌数据完整度与四大档案梯队拆解

为了防止“把资料残缺的 5.6 元摘要品牌和拥有三网截图的完整品牌混为一谈”，本站将 31 家品牌按可查证据分为四个资料梯队（详情规则见 [评测方法与可信度分级](/methodology/evaluation)）：

| 档案梯队 | 完整度范围 | 包含品牌名单（共 31 家） | 数据特征与决策参考价值 |
|---|---|---|---|
| **第一梯队：旗舰级实证档案** | 90%+ | **[光速云](/brands/guangsuyun)**（96%） | 具备 7 档完整套餐、2026-08-19 5 张三网 MiaoKo 实测+解锁矩阵截图、08-11 PNG 及完整冲突声明 |
| **第二梯队：数据充实档案** | 70%–89% | [Firefly](/brands/firefly)、[唯兔云](/brands/weitu)、[一翻云](/brands/yifan)、[星岛梦](/brands/xingdaomeng)、[二猫云](/brands/ermao)、[SOGO 云](/brands/sogo)、[飞猫云](/brands/feimao)、[灵猫网络](/brands/lingmao)、[全球云](/brands/quanqiu)、[微风网络](/brands/weifeng)、[U1S1](/brands/u1s1)、[无忧链接](/brands/wuyou)、[灵动云](/brands/lingdong)、[暮光加速](/brands/muguang)、[闪跃](/brands/shanyue) | 具备完整多档月付/年付/不限时定价；多数含 2026-08-11 截图或 2026-10-19 非晚高峰表（暮光/Firefly/闪跃缺 PNG） |
| **第三梯队：中等缺口档案** | 50%–69% | [隐形人](/brands/yinxingren)（66%）、[梯子云](/brands/tiziyun)（58%）、[速界](/brands/sujie)（56%）、[可信云](/brands/kexin)（54%）、[光年梯](/brands/guangnian)（54%）、[极连云](/brands/jilian)（52%）、[边缘节点 EdgeNova](/brands/edgenova)（50%） | 要么有套餐但缺测速数值（隐形人/EdgeNova），要么有 08-11 测速图与定位但缺完整多档价格表（极连云/光年梯/可信云/速界） |
| **第四梯队：摘要与历史留档** | 40%–49% | [宇宙云](/brands/yuzhou)（48%）、[大佬云](/brands/dalaoyun)（44%）、[闪电鼠](/brands/shandianshu)（44%）、[云界线](/brands/yunjiexian)（44%）、[神行加速](/brands/shenxing)（44%）、[环球梯](/brands/huanqiuti)（44%）、[榴莲云](/brands/liulianyun)（42%）、[浪网](/brands/langwang)（40%） | 仅包含起步参考价或遮挡截图（浪网/宇宙云），**不具备独立测速或全套价格对比条件**，选前须谨慎核查 |

---

## 三、老牌 vs 新品牌、自研端 vs 第三方端核心格局

### 1. 运营年限分布（核实记录）
- **2020 年起运营（最长周期）**：[光速云](/brands/guangsuyun)、[星岛梦](/brands/xingdaomeng)
- **2023 年起运营（成熟期）**：[暮光加速](/brands/muguang)、[飞猫云](/brands/feimao)、[微风网络](/brands/weifeng)、[二猫云](/brands/ermao)、[唯兔云](/brands/weitu)
- **2024 年起运营**：[大佬云](/brands/dalaoyun)、[隐形人](/brands/yinxingren)、[极连云](/brands/jilian)、[可信云](/brands/kexin)、[速界](/brands/sujie)、[闪电鼠](/brands/shandianshu)、[云界线](/brands/yunjiexian)、[榴莲云](/brands/liulianyun)、[神行加速](/brands/shenxing)、[环球梯](/brands/huanqiuti)
- **2025–2026 年新上线品牌**：[无忧链接](/brands/wuyou)（2025）、[U1S1](/brands/u1s1)（2025）、[灵猫网络](/brands/lingmao)（2025）、[光年梯](/brands/guangnian)（2025）、[一翻云](/brands/yifan)（2025）、[梯子云](/brands/tiziyun)（2025）、[灵动云](/brands/lingdong)（2025）、[SOGO 云](/brands/sogo)（2026）、[全球云](/brands/quanqiu)（2026）
- **开业年份未标注（待核实）**：[Firefly](/brands/firefly)（资料自称8年团队但未独立核实年份）、[宇宙云](/brands/yuzhou)、[闪跃](/brands/shanyue)、[浪网](/brands/langwang)、[边缘节点 EdgeNova](/brands/edgenova)

### 2. 客户端生态格局分化
- **双支持（自研客户端 + 第三方订阅导入）**：光速云、大佬云、二猫云、极连云、光年梯、速界、闪电鼠、云界线、榴莲云、神行加速、环球梯、梯子云。
- **第三方通用接入为主**：星岛梦、唯兔云、一翻云、可信云、微风网络（接入模式待进一步细分）。
- **仅限官方专属客户端（不提供订阅链接）**：飞猫云、隐形人、SOGO 云、闪跃、全球云，以及 2026 年 10 月后切换的 Firefly、无忧链接、灵猫网络。详细影响见 [专属客户端锁定分析](/risks/exclusive-client-lockin)。

---

## 四、如何阅读单品牌深度评测与核实官方入口

1. **先看“数据状态条”与“冲突块 (`CF-xxx`)”**：例如查看 [光速云评测](/brands/guangsuyun) 时先留意 `CF-001`（59GB vs 69GB 冲突）；看 [二猫云](/brands/ermao) 时留意 `CF-004`（新加坡节点文案矛盾）；看 [可信云](/brands/kexin) 时留意 `CF-012`（截图日期由压缩包推断）。
2. **核实官方入口与链接格式**：本站统一从 [affiliate-links.json](file:///c:/Users/Pro%20User/Desktop/jichangshuju.biz/data/affiliate-links.json) 渲染入口按钮并附带推广关系说明；特别注意 **云界线（`CF-013`）与环球梯（`CF-014`）** 的原始链接缺少 `#/`，点击跳转后需亲自确认页面是否正常加载。
3. **检查售后与运营状态**：品牌是否标注“特殊商品不退款”（光速云）或“无免费试用”（隐形人/一翻云/SOGO 云），决定了你第一笔测试订单应该买多小金额。

---

## 五、常用双品牌与集群对比入口

- [2–4 家品牌 22 项参数并排对比系统](/compare/)
- [光速云 vs 暮光加速](/compare/guangsuyun-vs-muguang) — 综合旗舰与多端大流量对比
- [光速云 vs 飞猫云](/compare/guangsuyun-vs-feimao) — 通用订阅导入 vs 专属端零配置
- [光速云 vs 星岛梦](/compare/guangsuyun-vs-xingdaomeng) — 同为 2020 年老牌 IEPL 对照
- [唯兔云 vs Firefly](/compare/weitu-vs-firefly) — 专属端切换后的 IPLC 差异
- [5.6 元平价档 5 家横评](/compare/budget-tier-56) — 同质化参数与链接隐患梳理

---

## 六、机场品牌库常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>原始资料文件叫“32家机场品牌清单”，为什么品牌库里只显示 31 家？</summary>

Firefly 与补充记录里的 Firefly 萤火虫属于同一品牌实体，合并去重后为 31 家；“快狸”PNG 仅在压缩包内出现而不在品牌清单内，作为库外审计记录。

</details>

<details class="ad-faq-details">
<summary>品牌数据库里的“资料完整度”代表速度更快或更安全吗？</summary>

不代表。完整度只统计结构化字段（套餐、协议、截图、退款说明等）的充实度，不是性能评分或安全认证。

</details>

<details class="ad-faq-details">
<summary>为什么有些品牌档案标注“待核实”或存在“有冲突”标签？</summary>

当多份原始资料说法不一致或缺少截图验证时，本站保留双方原始记录与冲突编号（CF-001 至 CF-018），绝不主观改写或填 0。

</details>

<details class="ad-faq-details">
<summary>品牌档案页里的链接都是官方无推广直连网址吗？</summary>

收录链接均来自原始清单的联盟推广注册入口，已统一标注推广关系与 `nofollow sponsored noopener`。

</details>

<details class="ad-faq-details">
<summary>灵动云、浪网和边缘节点 EdgeNova 为什么排在最后且标注历史档案？</summary>

它们录入于 2026-08-09 历史资料批次且存在截图遮挡或入口待核实情况，按原始要求置于列表靠后位置。

</details>

<details class="ad-faq-details">
<summary>如何把任意 2–4 个品牌拉在一起横向对比？</summary>

使用 [多品牌并排对比工具](/compare/)，可同时勾选 2 到 4 家对比 22 项指标。

</details>

<details class="ad-faq-details">
<summary>如何阅读一篇机场品牌评测才不会被营销文案带偏？</summary>

重点核对客户端是否开放订阅、测速时段是否非晚高峰、AI 解锁是节点实测还是品牌宣传，以及优惠码是否有套餐排除条款。

</details>

<details class="ad-faq-details">
<summary>遇到某个品牌的推广优惠码在官网结账提示无效怎么办？</summary>

核对是否选用了不打折的入门年付/永久版，或查看是否有另一组冲突优惠码；若确认全部失效可通过 [纠错机制](/methodology/corrections) 提交更新。

</details>
---

## 关联一级与数据入口

- **按价格和每 GB 成本重排品牌**：[价格与套餐专题 →](/pricing/) ｜ [套餐与成本计算器 →](/database/plans)
- **不知道怎么从 31 家开始选**：[查看机场推荐决策指南 →](/recommend/)
- **遇到品牌不适或需找平替**：[查看品牌替代方案矩阵 →](/risks/alternatives) · [数据来源与冲突台账 →](/methodology/sources)
