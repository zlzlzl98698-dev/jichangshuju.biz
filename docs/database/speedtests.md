---
title: 机场历史测速数据库与原始截图归档
description: 汇总 2026-10-19 非晚高峰节点表、2026-08-11 16 张 PNG 实测截图包、光速云 2026-08-19 三网 MiaoKo 实测及灵动云 2026-07 实测摘要。
pageType: report
wide: true
verifiedAt: 2026-10-19
updatedAt: 2026-11-26
sourceNote: 2026-08-11 测速包 + 2026-08-19 MiaoKo 截图 + 2026-10-19 非晚高峰表
---

# 机场历史测速数据库（Performance Observatory）

**历史测速结果仅能证明“在截图或记录所示时间、网络环境与测试工具下曾取得相应数值”，不能自动等同于当前实时表现、晚高峰抗拥堵能力或长期 SLA 稳定性。** 本数据库保留全部原始时间与环境限制，不做跨批次、跨时段的公平速度排名。

## 一、三批核心实测资料来源说明

| 批次 | 日期与时段 | 测试工具与后端环境 | 覆盖范围 | 核心限制说明 |
|---|---|---|---|---|
| **批次 A：光速云 MiaoKo 专项实测** | 2026-08-19 | MiaoKo 4.3.3 / SC-长沙电信·广西移动·河北联通@2Gbps（6线程）及珠海联通 9Gbps（单线程） | 光速云 62节点 SS 与 70节点 VLESS/AnyTLS | 属于特定线路与测试端下的单日快照 |
| **批次 B：16 个机场测速实测包 V2** | 2026-08-11（00:21–22:46 CST 各异） | 多数为 `MAI-TEST-BOT 2.0.0-dev`（珠海联通 5Gbps/32线程）；快狸与宇宙云为 `主端4.3.3/喵速4.7.0`（9Gbps） | 15 个在库品牌 + 1 个库外资产（快狸） | 跨时段不可直接横向排座次；可信云日期为批次推断(CF-012) |
| **批次 C：品牌清单节点汇总表** | 2026-10-19（原文标注**非晚高峰**） | 资料表汇总（香港/台湾/新加坡/日本/美国延迟与下载Mbps） | 15 个数据较全品牌（隐形人留空） | 原文明确标注非晚高峰，不可改写为晚高峰表现 |
| **批次 D：灵动云历史测速摘要** | 2026-07-20/21 | 珠海联通 9Gbps（60 测速 / 60 解锁） | 灵动云 | 速度约 20–80 MB/s，HTTPS延迟偏高，美国01整节点失败 |

## 二、2026-10-19 非晚高峰汇总对照表（静态可读数据）

> 提示：下表仅收录原始资料明确给出五地区数值的品牌；宇宙云、隐形人、浪网、EdgeNova 及 6 家摘要档品牌缺失五地区数值，保持空缺不填 0。

| 品牌 | 香港 (延迟 / 下载) | 台湾 (延迟 / 下载) | 新加坡 (延迟 / 下载) | 日本 (延迟 / 下载) | 美国 (延迟 / 下载) | 原始 PNG 证据 |
|---|---|---|---|---|---|---|
| [光速云](/brands/guangsuyun) | 22ms / 529Mbps | 41ms / 114Mbps | 46ms / 387Mbps | 57ms / 135Mbps | 143ms / 18Mbps | [08-11图](/assets/speedtests/光速云-节点测速实测.png) · [MiaoKo](#光速云-miaoko-专项截图) |
| [暮光加速](/brands/muguang) | 26ms / 509Mbps | 40ms / 107Mbps | 43ms / 419Mbps | 53ms / 150Mbps | 160ms / 19Mbps | 暂无 PNG |
| [飞猫云](/brands/feimao) | 21ms / 526Mbps | 41ms / 116Mbps | 45ms / 413Mbps | 54ms / 138Mbps | 178ms / 14Mbps | [08-11图(08:52)](/assets/speedtests/飞猫云-节点测速实测.png) |
| [微风网络](/brands/weifeng) | 25ms / 546Mbps | 40ms / 115Mbps | 43ms / 384Mbps | 54ms / 131Mbps | 167ms / 17Mbps | [08-11图](/assets/speedtests/微风-节点测速实测.png) |
| [星岛梦](/brands/xingdaomeng) | 27ms / 504Mbps | 41ms / 103Mbps | 44ms / 411Mbps | 57ms / 136Mbps | 177ms / 18Mbps | [08-11图(01:48)](/assets/speedtests/星岛梦-节点测速实测.png) |
| [二猫云](/brands/ermao) | 22ms / 481Mbps | 41ms / 118Mbps | 46ms / 407Mbps | 53ms / 143Mbps | 134ms / 17Mbps | [08-11图(10:45)](/assets/speedtests/二猫云-节点测速实测.png) |
| [无忧链接](/brands/wuyou) | 23ms / 531Mbps | 41ms / 107Mbps | 42ms / 418Mbps | 55ms / 147Mbps | 145ms / 17Mbps | [历史归档图](/assets/speedtests/无忧链接.jpg) |
| [唯兔云](/brands/weitu) | 27ms / 500Mbps | 37ms / 100Mbps | 44ms / 414Mbps | 56ms / 147Mbps | 179ms / 17Mbps | [08-11图(13:55)](/assets/speedtests/唯兔云-节点测速实测.png) |
| [Firefly](/brands/firefly) | 27ms / 547Mbps | 39ms / 135Mbps | 42ms / 445Mbps | 57ms / 147Mbps | 143ms / 30Mbps | 暂无 PNG |
| [U1S1](/brands/u1s1) | 24ms / 538Mbps | 39ms / 107Mbps | 46ms / 414Mbps | 57ms / 133Mbps | 134ms / 20Mbps | [08-11图(22:33)](/assets/speedtests/U1S1-节点测速实测.png) |
| [灵猫网络](/brands/lingmao) | 22ms / 492Mbps | 40ms / 109Mbps | 46ms / 409Mbps | 57ms / 147Mbps | 164ms / 19Mbps | [08-11图(18:45)](/assets/speedtests/灵猫网络-节点测速实测.png) |
| [一翻云](/brands/yifan) | 23ms / 477Mbps | 40ms / 117Mbps | 42ms / 390Mbps | 53ms / 136Mbps | 180ms / 20Mbps | [08-11图(00:21)](/assets/speedtests/一翻云-节点测速实测.png) |
| [SOGO 云](/brands/sogo) | 26ms / 488Mbps | 39ms / 118Mbps | 43ms / 401Mbps | 57ms / 137Mbps | 140ms / 17Mbps | [08-11图(18:57)](/assets/speedtests/SOGO云-节点测速实测.png) |
| [闪跃](/brands/shanyue) | 23ms / 548Mbps | 38ms / 110Mbps | 44ms / 383Mbps | 53ms / 144Mbps | 143ms / 18Mbps | 暂无 PNG |
| [全球云](/brands/quanqiu) | 25ms / 489Mbps | 37ms / 117Mbps | 45ms / 430Mbps | 55ms / 133Mbps | 138ms / 18Mbps | [08-11图(15:50)](/assets/speedtests/全球云-节点测速实测.png) |

## 三、仅具备 2026-08-11 原始截图的品牌

- [宇宙云](/brands/yuzhou)：[2026-08-11 21:04 VLESS 截图](/assets/speedtests/宇宙云-节点测速实测.png)（主清单文字表缺口，以此图作历史证据）
- [极连云](/brands/jilian)：[2026-08-11 22:46 SS 截图](/assets/speedtests/极连云-节点测速实测.png)
- [光年梯](/brands/guangnian)：[2026-08-11 14:38 SS 截图](/assets/speedtests/光年梯-节点测速实测.png)
- [可信云](/brands/kexin)：[2026-08-11 15:32 SS 截图](/assets/speedtests/可信云-节点测速实测.png)（**注**：截图底部日期仅见 `15:32:35 CST`，2026-08-11 系由压缩包批次推断）
- [速界](/brands/sujie)：[2026-08-11 15:39 SS 截图](/assets/speedtests/速界-节点测速实测.png)

## 四、光速云 MiaoKo 专项截图

<DarkObservatoryReport brandId="guangsuyun" />
