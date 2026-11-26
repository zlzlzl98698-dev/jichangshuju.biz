---
title: 数据来源、实体去重与 18 条冲突台账（Audit & Conflicts）
description: 公开机场数据全站引用的 7 份原始资料清单、Firefly 与 Firefly 萤火虫实体合并说明，以及 18 条字段级来源冲突与数据缺口处理记录。
pageType: database
wide: true
verifiedAt: 2026-11-26
updatedAt: 2026-11-26
sourceNote: data/sources/sources.json + data/sources/data-conflicts.json
---

# 数据来源与冲突审计台账

**机场数据坚持“不隐藏原始资料矛盾、不擅自抹平差异、不补写无依据字段”原则。** 以下完整公开本站的原始数据源清单以及已登记的 18 条冲突/审计记录。

## 一、原始资料清单（Sources Registry）

| Source ID | 资料名称 | 类型 | 观察日期 | 说明 |
|---|---|---|---|---|
| `src-brand-roster-32` | `32家机场品牌清单.txt` | 品牌/汇总 | 2026-10-19 | 共 32 条目；合并 Firefly 与 Firefly 萤火虫后去重为 **31 个独立品牌**；末尾 4 条为 2026-08-09 历史记录 |
| `src-guangsuyun-brief` | `光速云品牌信息.txt` | 品牌资料 | 2026-10-19 | 光速云核心参数、套餐、折扣与节点分布说明 |
| `src-clients-2026` | `第三方代理客户端.txt` | 技术文档 | 2026-10-19 | 覆盖六大操作系统 22 款客户端及安全警告 |
| `src-speedtest-zip-20260811` | `机场测速实测资料包_2026-08-11_发布整理版_V2.zip` | 实测截图 | 2026-08-11 | 16 张 1122×1402 PNG（15 在库品牌 + 快狸库外资产） |
| `src-guangsuyun-miaoko-20260819` | `光速云测试图解锁图` | 实测截图 | 2026-08-19 | 5 张 MiaoKo 三网测速及 70 节点基础流媒体截图 |
| `src-chart-spec` | `机场品牌图表样式.txt` | 设计规范 | 2026-10-19 | Dark Network Observatory 视觉与状态语言规范 |
| `src-content-matrix` | `内容矩阵.txt` | 架构规范 | 2026-11-26 | 品牌库结构、GEO 与内链矩阵规范 |

## 二、已登记 18 条来源冲突与审计台账

| 冲突编号 | 涉及品牌 | 冲突/缺口字段 | 原始多方记录 | 本站处理口径 | 状态 |
|---|---|---|---|---|---|
| `CF-001` | [光速云](/brands/guangsuyun) | 轻量版流量 / 线路 / 协议 | 摘要写 59GB vs 详表写 69GB；VLESS vs 08-11 SS vs 08-19 SS+VLESS/AnyTLS | 主表采 69GB 并明注 59GB 冲突；协议与线路分批次呈现 | 来源冲突 |
| `CF-002` | [Firefly](/brands/firefly) | 实体合并与专属端切换 | 主清单 `#8` vs 附录 Firefly 萤火虫 (`jTp9wSgZ`) | 合并为统一实体 `firefly`，标注 2026-10 起改专属端 | 已归档合并 |
| `CF-003` | [微风网络](/brands/weifeng) | 入门年付价格 | 顶部写 7元/月 50GB vs 正文/详表写 ¥137/年 100GB | 主表采 ¥137/年，保留 7 元冲突提示 | 来源冲突 |
| `CF-004` | [二猫云](/brands/ermao) | 新加坡节点有无 | 介绍称缺新加坡 vs 10-19 测速表含新加坡 46ms | 正文如实披露矛盾 | 来源冲突 |
| `CF-005` | [暮光加速](/brands/muguang) | 优惠码口径 | 头部写 `muguang5555` vs 正文写未查到公开优惠码 | 保留 `muguang5555` 并注明正文冲突 | 来源冲突 |
| `CF-006` | [星岛梦](/brands/xingdaomeng) | 协议类型 | 正文写 Trojan vs 08-11 截图显示 Shadowsocks | 并列记录 Trojan 与 SS | 来源冲突 |
| `CF-007` | [宇宙云](/brands/yuzhou) | 实测证据差异 | 清单写“暂无可核实实测” vs 压缩包存在 VLESS PNG | 接入 PNG 为历史证据并标明套餐缺失 | 来源冲突 |
| `CF-008` | [灵猫网络](/brands/lingmao) | 优惠码与月付入门 | 头部写 19元 / `lmao888` vs 详表写 ¥25 / `lingmao` | 主表用 ¥25，双优惠码并列提示 | 来源冲突 |
| `CF-009` | [一翻云](/brands/yifan) | 优惠码冲突 | 头部 `yfy6666` vs 正文 `1FLYYUN`（9折） | 双优惠码并列标注 | 来源冲突 |
| `CF-010` | [SOGO 云](/brands/sogo) | 优惠码与年份 | 基础信息 `SOGO10000` vs 汇总表 `sss777`/2026年新品牌 | 并列标注差异 | 来源冲突 |
| `CF-011` | [全球云](/brands/quanqiu) | 优惠码与协议 | `qq88` (Trojan/SS) vs `qqy7777` (08-11截图SS) | 并列标注差异 | 来源冲突 |
| `CF-012` | [可信云](/brands/kexin) | 截图日期置信度 | PNG 底部仅见 `15:32:35 CST`，完整年月日被裁切 | 强制注明“日期由压缩包批次推断” | 待核实 |
| `CF-013` | [云界线](/brands/yunjiexian) | 链接格式与邀请码 | 缺 `#/` 且正文 `aycnwNUi` vs 汇总表 `HBaZ91c6` | 主用正文并提示访问前核查 | 来源冲突 |
| `CF-014` | [环球梯](/brands/huanqiuti) | 推广链接格式异常 | `https://qwerty.huanqiutiaff.com/?code=9I4KRNPH` 缺 `#/` | 界面高亮提醒访问前核实 | 待核实 |
| `CF-015` | [隐形人](/brands/yinxingren) | 基础流量/码/设备限 | 100GB/`yxr888` vs 144GB/`moon80`；设备限制表述不一致 | 采详表 144GB 并如实列出冲突 | 来源冲突 |
| `CF-016` | [灵动云](/brands/lingdong) | 协议混提与定制流量 | VLESS/trojan 混提；定制套餐 ¥620 流量标注“截图遮挡” | 定制流量保持待核实 | 待核实 |
| `CF-017` | [浪网](/brands/langwang) | 入门流量遮挡 | 标为“截150G”，协议/地区/设备/实测均缺失 | 如实标注截图遮挡与未实测 | 待核实 |
| `CF-018` | 快狸（库外资产） | 目录外 PNG 与 Logo | `logos/kuaili_logo.png` 与 `快狸-节点测速实测.png` 存在但不在 31 品牌清单 | 仅作审计留档，不擅自虚构扩编 | 审计说明 |
