---
title: iPhone / iPad 代理客户端大全：Shadowrocket 小火箭 / Stash / Karing 对比
shortTitle: iOS 客户端
description: 全面对比 iOS 与 iPadOS 主流代理软件：包含付费主力 Shadowrocket（小火箭）、Stash、Quantumult X、Surge 5 与免费开源方案 Karing、Hiddify、Streisand、sing-box (SFI)，附外区 App Store 账户安全守则与 50MB 内存防崩溃指南。
pageType: docs
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑组
sourceNote: 依据第三方代理客户端核查清单及 Apple iOS Network Extension 系统机制整理；具体 App Store 售价以各区商店实时显示为准。
faq:
  - q: iPhone 上这些代理软件都是免费的吗？哪几款需要花钱购买？
    a: 并非全部免费。Shadowrocket（小火箭）、Stash 与 Quantumult X 在非中国大陆区 App Store 均属于付费买断下载软件；Surge 5 则可免费下载基础壳程序但解锁完整代理与高级脚本能力需要较高额内购或订阅。如果目前不想在软件上花钱，可直接使用外区商店完全免费的 Karing、Hiddify、Streisand 或官方版 sing-box (SFI)。
  - q: 没有海外区 Apple ID 怎么下载？能用共享账号吗？
    a: 长期最安全可靠的做法是自己免费注册一个美区、港区或日区 Apple ID（通过苹果官网直接注册即可）。如果极短时间迫不得已使用他人或品牌提供的临时账号下载软件，一条绝对不能触碰的红线是：只能在 App Store 应用内右上角头像处退出并登录下载，绝对禁止在 iPhone“系统设置 → 顶部 iCloud”里登录共享 ID，否则设备面临照片泄露或被对方远程抹除锁死的风险！
  - q: 为什么 iPhone 连上客户端看剧一会儿就自己断开、状态栏 VPN 标志消失？
    a: 这是 iOS 苹果系统强制施加的 Network Extension（NE）内存硬上限导致的：苹果对第三方 VPN/代理插件进程限制了大约 50MB 左右的内存空间。如果加载了几十万行的全量 GeoIP/RuleSet 规则集或极其庞大的覆写配置，进程会在切换网络或高并发加载网页时瞬间超限被系统杀掉。解决方法是切到精简规则配置，减少臃肿的正则重写与巨型规则集。
  - q: Shadowrocket、Stash 和 Karing，iOS 新手优先选哪个？
    a: 预算允许、希望一步到位长期稳用：首选 Shadowrocket（小火箭），体积小、极省电、对 iOS 内存控制最老练且支持几乎所有新老协议；希望免费白嫖正版且兼顾 Clash 规则风格：首选 Karing 或 Streisand；习惯桌面端 Clash YAML 分流且对颜值有高要求、同时可能用到 Apple TV（tvOS）：可考虑付费的 Stash。
  - q: 哪些机场的订阅可以用在小火箭或 Karing 上？
    a: 必须在品牌参数库里支持“第三方通用订阅”的机场才行，例如光速云、星岛梦、暮光加速、唯兔云、一翻云、二猫云、梯子云、速界、可信云等；仅允许官方自研软件登录的品牌（如飞猫云、SOGO 云、隐形人等）不开放订阅链接，只能尝试其自研 iOS 分发包（但需承受企业签名随时掉签失效的隐患）。
---

# iPhone / iPad 客户端大全（Shadowrocket 小火箭 / Stash / Quantumult X / Surge 5）

**由于中国大陆区 App Store 下架了全系列网络代理工具，iPhone 与 iPad（iOS / iPadOS）用户选型的第一道分水岭在于“先拥有安全合规的非大陆区 Apple ID”，第二道才是根据预算选择“一次性付费主力”（[Shadowrocket 小火箭](/clients/shadowrocket)、Stash、Quantumult X、Surge 5）还是“正版免费替代”（Karing、Hiddify、Streisand、sing-box SFI）。**

下表汇总本站已收录的全部 iOS / iPadOS 代理客户端核查数据（含付费属性及平台支持特征）：

<ClientCompatibilityMatrix initialPlatform="ios" :showBrandMatrix="false" />

---

## 一、iOS 付费主力 vs 免费替代全景对比

| 客户端名称 | 收费策略（以目标区商店为准） | 底层特性与优势 | 适用用户画像 |
|---|---|---|---|
| **[Shadowrocket（小火箭）](/clients/shadowrocket)** | 一次性付费买断 | 生态最成熟、内存极省极稳、支持 SS/VMess/VLESS/Trojan/Hy2 全协议、按场景自动切换策略 | **90% iPhone 用户的性价比稳用首选** |
| **Karing** | **免费** | 基于 sing-box 内核，既支持标准通用节点也支持 Clash 订阅语法，跨平台界面一致 | 不想为客户端付费、希望零成本用正版商店软件的新手 |
| **Streisand / Hiddify / SFI** | **免费** | Streisand 与 SFI（sing-box 官方）原生轻量；Hiddify 支持多格式自适配 | 需要免费纯净开源客户端、重视新协议支持（VLESS Reality / Hy2） |
| **Stash** | 一次性付费买断 | 与桌面端 Clash Meta / Mihomo 配置文件高度统一，UI 现代支持 Apple TV（tvOS） | 重度 Clash 规则用户，追求高颜值或电视端同步 |
| **Quantumult X（圈 X）** | 一次性付费买断 | 强大的脚本（JS）重写、抓包调试与自定义按钮规则，社区玩法丰富 | 喜欢折腾规则、去广告脚本与精细化分流的进阶用户 |
| **Surge 5** | 免费下载 + 高级功能付费/订阅 | iOS 网络工具旗舰标杆，支持最强 Ponte 组网、网关模式与深度协议开发调试 | 资深开发者、极客及有 Mac/iOS 全生态协同需求者 |

---

## 二、iPhone 安装客户端的三条绝对安全守则

1. **绝不在“系统设置（iCloud）”登录来路不明的共享 Apple ID**
   这是每年大量 iPhone 变成“砖头”的最常见原因：如果你把网上或客服发来的共享 Apple ID 登进了手机顶部的系统 iCloud，对方只要开启“查找我的 iPhone → 抹掉/丢失模式”，你的整部手机会被立即远程锁死并勒索解锁费。
   - **唯一安全做法**：自己免费注册一个美区/日区/港区 Apple ID（不需要绑定海外信用卡即可通过正常流程注册下载免费应用，如 Karing/Streisand）；如果要买小火箭，通过正规海外礼品卡充值自己的号。
2. **警惕假冒山寨高仿软件**
   在外区 App Store 搜索 `Shadowrocket` 时，会出现许多名字刻意写成 `Shadowrocket Pro`、`小火箭 VPN` 且免费下载但内含天价自动周扣订阅（Weekly Subscription）的高仿李鬼软件！请务必仔细核对正版图标、开发者名称及具体商店分类。
3. **慎用企业证书“免商店直装版”专属端**
   少数只提供专属端或面向无外区 ID 新手的品牌会提供“描述文件/企业签名直装包”。企业签名属于苹果临时内测分发机制，一旦被苹果官方吊销，手机上的客户端会突然弹窗“未受信任的企业级开发者”而彻底打不开，断连期间甚至无法连网重下。能用自己外区 ID 装正版商店软件永远是最稳方案。

---

## 三、避免 iOS 插件频繁崩掉：看懂“50MB 内存红线”

iPhone 上有一个很多安卓转过来的用户完全不了解的底层机制：**苹果对运行在后台的 Network Extension（系统 VPN 扩展）施加了极严格的运行内存限额（通常约 50MB）**。

如果出现“开关打开几秒钟就自己弹回关闭”、“看 4K 视频或切后台突然全部断网”，大概率不是机场跑路了，而是**内存爆仓被系统强杀（OOM）**：
- **避坑排查方法 1**：不要给小火箭或 Stash 挂几万行的超大型远程去广告（AdBlock）规则集与全量 GeoIP 数据库，精简到核心国内外分流与常用媒体组即可。
- **避坑排查方法 2**：使用 `Surge` / `Stash` 时关闭非必要的全局 HTTPS MitM 解密（仅对特定需要的域名开启）。
- **避坑排查方法 3**：在 [光速云](/brands/guangsuyun)、[星岛梦](/brands/xingdaomeng) 等提供多种格式订阅的品牌后台，优先导入专门针对移动端/Shadowrocket 精简优化过的配置或规则模板。

---

## 四、信息边界与诚实披露

- **商店定价实时波动**：由于 App Store 各区汇率调整与开发者策略变化，本站不将 Shadowrocket、Stash、Surge 5 的实时美元/港币价格写死为长期承诺数字，具体金额以您登录对应区 App Store 时显示的实时标价为准。
- **机场兼容核查**：请务必在购买机场前，前往 [客户端兼容性矩阵](/database/clients) 确认所选品牌提供第三方通用订阅（支持 iOS 通用导入），避免买完后才发现该品牌不支持小火箭。

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>iPhone 上这些代理软件都是免费的吗？哪几款需要花钱购买？</summary>

并非全部免费。Shadowrocket（小火箭）、Stash 与 Quantumult X 在非中国大陆区 App Store 均属于付费买断下载软件；Surge 5 需高阶功能付费或订阅。如果不想付费，可直接使用外区商店免费的 Karing、Hiddify、Streisand 或 sing-box (SFI)。

</details>

<details class="ad-faq-details">
<summary>没有海外区 Apple ID 怎么下载？能用共享账号吗？</summary>

建议自己免费注册一个个人海外区 Apple ID（苹果官方支持注册美区等账号），安全无后患。若临时使用他人账号下载，切记只能进入 App Store 商店右上角切换，严禁登录系统顶部 iCloud 设置，下载完毕立即退回自己的号。

</details>

<details class="ad-faq-details">
<summary>为什么 iPhone 连上客户端看剧一会儿就自己断开、状态栏 VPN 标志消失？</summary>

这多半触发了 iOS 系统对 Network Extension 约 50MB 的严格内存上线限制（OOM 强杀）。精简庞大的去广告黑名单规则集与远程大型 GeoSite 文件、关闭冗余日志抓包，通常即可立刻恢复全天后台稳连。

</details>

<details class="ad-faq-details">
<summary>Shadowrocket、Stash 和 Karing，iOS 新手优先选哪个？</summary>

愿意花小钱求稳省心：首选 [Shadowrocket 小火箭](/clients/shadowrocket)；希望零费用正版软件：首选 `Karing` 或 `Streisand`；已深度使用桌面端 Clash YAML 且需要联动 Apple TV：首选 `Stash`。

</details>

<details class="ad-faq-details">
<summary>哪些机场的订阅可以用在小火箭或 Karing 上？</summary>

支持第三方通用订阅导入的品牌均可使用，如光速云、星岛梦、暮光加速、唯兔云、一翻云、二猫云、梯子云、速界等；仅提供自研专属客户端的品牌（如飞猫云、SOGO 云、隐形人等）则不支持导入上述商店 App。

</details>
---

## 下一步阅读与工具入口

- 返回一级专题：[客户端软件全平台总览](/clients/)
- 核心工具实操：[Shadowrocket 小火箭详细教程](/clients/shadowrocket) ｜ [手机端选型全面对比](/vpn/mobile)
- 常见故障排雷：[订阅更新拉取失败处理](/diagnostics/subscription-failed) ｜ [全节点超时原因分析](/diagnostics/all-timeout)
