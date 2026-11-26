---
title: 2026 代理客户端软件大全：Clash Verge Rev / v2rayN / Shadowrocket / sing-box 全平台指南
description: 覆盖 Windows、Android、iOS/iPadOS、macOS、Linux 与 OpenWrt 六大操作系统的 22 款主流代理客户端详解：内核区别、支持协议、官方下载源、安全警告及机场订阅兼容性。
pageType: pillar
schemaCollection: true
wide: true
aside: false
shortTitle: 客户端软件
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: 第三方代理客户端.txt + 32家机场品牌清单.txt + data/clients/clients.json
softwareApp:
  name: Clash Verge Rev / v2rayN / Shadowrocket / sing-box 客户端生态矩阵
  os: Windows, Android, iOS, iPadOS, macOS, Linux, OpenWrt
faq:
  - q: 为什么有些机场能导入 Clash Verge Rev 和 Shadowrocket，有些却不行？
    a: 因为机场分为“提供通用订阅链接”和“仅限官方专属客户端”两类。如光速云、星岛梦、一翻云、梯子云提供通用订阅链接，可自由导入 Clash/v2rayN/小火箭；而飞猫云、SOGO 云、隐形人、闪跃、全球云以及 2026-10 后的 Firefly/无忧链接/灵猫网络仅提供官方客户端账号登录，不开放订阅链接。
  - q: 原版 Clash for Windows 删库停更后，2026 年电脑端应该用哪款软件替代？
    a: 首选基于活跃维护的 Mihomo (Clash.Meta) 内核的 Clash Verge Rev（支持 Windows/macOS/Linux），其次是支持 Xray/sing-box/Mihomo 多核心切换的 v2rayN，或轻量跨端的 FlClash 与 Hiddify。不建议继续使用旧版停更内核，否则无法解析 VLESS-Reality 与 Hysteria 2 协议。
  - q: 安卓手机端有哪些安全可靠的客户端？NekoBox 为什么有警告？
    a: 安卓推荐从 GitHub 官方 Releases 下载 v2rayNG、FlClash、Hiddify 或 Karing。对于 NekoBox for Android，官方项目页已明确提示“维护资源有限”，且特别警告用户不要下载 Google Play 上已被第三方接管的同名 NekoBox 应用。
  - q: 苹果 iPhone 上除了收费的 Shadowrocket（小火箭），还有免费的正版客户端吗？
    a: 有。如果不打算付费购买 Shadowrocket、Stash 或 Quantumult X，可在海外区 App Store 免费下载 Karing、Clash Mi、Hiddify、Streisand 或官方 sing-box (SFI)，它们同样支持主流协议与订阅导入。
  - q: macOS 下载客户端时 Intel 和 Apple Silicon 安装包有什么区别？
    a: 搭载 M1/M2/M3/M4 芯片的 Mac 必须选 arm64 / aarch64（Apple Silicon）包；老款 Intel 芯片 Mac 选 x86_64 / x64 包。Clash Verge Rev 与 FlClash 均在发布页同时提供两种架构。
  - q: Linux 桌面与无桌面服务器分别推荐哪款客户端？
    a: Linux 桌面推荐 Clash Verge Rev、FlClash 或 v2rayN（注意区分 DEB、RPM 与 AppImage 格式）；无图形界面的 Linux 主机、NAS 或网关推荐使用带 Web 管理界面的 v2rayA，操作局域网控制面板即可。
  - q: OpenWrt 软路由安装 OpenClash、PassWall2 和 Nikki 有什么前置条件？
    a: 需核对路由器固件版本、CPU 架构（x86_64 / aarch64 / mips 等）、可用 Flash/RAM 容量以及防火墙后端（iptables vs nftables）。特别注意 Nikki 官方明确要求 OpenWrt 24.10 及以上版本，旧固件不能直接安装。
  - q: Mihomo 内核和 sing-box 内核有什么核心区别？
    a: Mihomo（原 Clash.Meta）延续了最广泛的 Clash YAML 规则生态，绝大多数机场后台都直接提供 Mihomo/Clash 订阅；sing-box 则是现代全能通用代理平台（SFA/SFI/SFM、Hiddify、Karing 底层核心），路由与 DNS 控制更统一，部分机场需要转换或专用下发格式。
  - q: 为什么不建议随便在百度搜“Clash 下载官网”下载安装包？
    a: 开源代理软件几乎全部托管在 GitHub 官方仓库，从未授权所谓“中文官网”分站。搜索引擎广告里的山寨下载站常捆绑木马或篡改配置。
  - q: 安装桌面端客户端后开启 TUN 模式安全吗？为什么需要管理员权限？
    a: 正版开源客户端在本地创建虚拟网卡需要操作系统网络接口权限（Windows 服务模式 / macOS root 授权），属于正常技术原理；但切记只安装来自官方 GitHub 仓库的签名或校验一致安装包。
---

# 2026 代理客户端软件与全平台兼容性中心

> **Answer-First 核心结论**：**选软件前先看你的机场类型，再按操作系统对号入座。** 凡支持通用订阅导入的机场（如 [光速云](/brands/guangsuyun)、[星岛梦](/brands/xingdaomeng)、[一翻云](/brands/yifan) 等），**Windows/macOS/Linux 首选 [Clash Verge Rev](/clients/clash-verge) 或 [v2rayN](/clients/v2rayn)；Android 首选 `v2rayNG` / `FlClash`；iOS 首选付费的 [Shadowrocket（小火箭）](/clients/shadowrocket) 或免费的 `Karing`；OpenWrt 软路由选 `OpenClash` / `PassWall2` / `Nikki`（需 24.10+）**。若购买的是仅限官方专属客户端的品牌（如飞猫云、隐形人、SOGO 云等 8 家），则上述第三方工具全部不适用，须使用机场官网提供的专用 App。

---

## 一、客户端与订阅服务的关系（先分清两大阵营）

代理客户端本身**不含节点流量**，它只是一个安装在你设备上的网络协议解析与分流调度程序：

- **通用开源/商店客户端**：你需要把机场后台提供的“订阅链接（URL）”复制进去，客户端会定时拉取节点列表并按分流规则工作。优势是**不被单一服务商绑架**、支持多机场合并分流、可运行在软路由和命令行下。
- **机场专属客户端**：由服务商自行封装打包，用户只需输入账号密码登录，省去复制订阅与配置规则的步骤，但失去了软件选择权与软路由扩展能力。

> **极重要核对**：请勿将不开放订阅链接的品牌（如飞猫云、SOGO 云、隐形人、2026-10 后的 Firefly/无忧/灵猫）错误视为支持 Clash 或 Shadowrocket 导入。完整兼容名单见下方矩阵。

---

## 二、全库 22 款客户端 × 六大平台实时查询与品牌兼容矩阵

<ClientCompatibilityMatrix />

---

## 三、六大操作系统客户端选型与安装包规范

### 1. Windows 客户端（[进入 Windows 专篇 →](/clients/windows)）
- **主力选择**：[Clash Verge Rev](/clients/clash-verge)（Mihomo 内核，适合规则分流与 TUN 模式）、[v2rayN](/clients/v2rayn)（Xray / sing-box / Mihomo 多核心切换）、FlClash、Hiddify、Karing、Clash Nyanpasu、Clash Mi。
- **历史迁移提示**：`Mihomo Party` 适合历史教程对照和迁移用户，官方仓库维护状态需单独关注，暂不作为未核实即推荐的首选。
- **架构选择**：常规 PC 选 `x64`，高通骁龙 ARM 笔记本选 `arm64`。

### 2. Android 安卓客户端（[进入 Android 专篇 →](/clients/android)）
- **主力选择**：`v2rayNG`（经典轻量、支持 Xray/sing-box）、`FlClash`、`Hiddify`、`Karing`、`Clash Meta for Android`、`sing-box for Android (SFA)`。
- **高风险警告**：`NekoBox for Android` 官方仓库已提示维护资源有限，并**明确警告勿下载 Google Play 上已被第三方控制的同名 NekoBox 应用**，务必仅从 GitHub 官方 Releases 获取 APK。

### 3. iPhone / iPad 客户端（[进入 iOS 专篇 →](/clients/ios)）
- **付费主力**：[Shadowrocket（小火箭）](/clients/shadowrocket)、`Stash`、`Quantumult X（圈 X）`、`Surge 5`（含内购）。这些应用在美区等外区 App Store 均为付费软件，实际价格以商店地区为准。
- **免费替代**：`Karing`、`Clash Mi`、`Hiddify`、`Streisand`、`sing-box (SFI)`、`Potatso`、`OneClick`。

### 4. macOS 苹果电脑客户端（[进入 macOS 专篇 →](/clients/macos)）
- **主力选择**：`Clash Verge Rev`、`FlClash`、`v2rayN`、`Clash Nyanpasu`、`Hiddify`、`Karing`、`Surge Mac`、`sing-box for macOS (SFM)`。
- **芯片区分**：Apple Silicon（M1–M4）下载 `arm64`/`aarch64` 包，Intel Mac 下载 `x86_64`/`x64` 包，避免通过 Rosetta 转译损耗续航和性能。

### 5. Linux 桌面与服务器（[进入 Linux & OpenWrt 专篇 →](/clients/linux-openwrt)）
- **安装包格式**：桌面端需区分 `.deb`（Debian/Ubuntu）、`.rpm`（Fedora/RHEL）与通用 `.AppImage`。
- **无桌面环境**：Linux 服务器、NAS 或 Docker 主机推荐 `v2rayA`（提供浏览器 Web 控制台接管透明代理）。

### 6. OpenWrt 软路由客户端（[查看软路由挑选与避坑 →](/guides/router-openwrt)）
- **主力插件**：`OpenClash`、`PassWall2`、`Nikki`、`HomeProxy`、`v2rayA`。
- **硬性前提**：安装前确认固件版本、CPU 架构、包管理器（`opkg` vs `apk`）与防火墙内核（例如 **Nikki 明确要求 OpenWrt 24.10 及以上版本**）。

---

## 四、三大热门客户端专题直达与核心对比

| 重点客户端 | 核心 / 协议支持 | 订阅格式 | 最突出优势 | 详细教程直达 |
|---|---|---|---|---|
| **Clash Verge Rev** | Mihomo（SS/VMess/VLESS/Trojan/HY2/TUIC/AnyTLS） | Clash / Mihomo YAML | 桌面端综合体验最均衡、TUN 与规则覆写生态成熟 | [Clash Verge Rev 专篇 →](/clients/clash-verge) |
| **Shadowrocket** | 自研多协议内核（全主流协议） | V2Ray Base64 / URI / 规则 | iOS 普及度最高、机场一键导入兼容面最广 | [Shadowrocket 专篇 →](/clients/shadowrocket) |
| **v2rayN** | Xray + sing-box + Mihomo 多核心 | Base64 / JSON / YAML / URI | 新协议响应最快、适合排查节点真实延迟与多内核测试 | [v2rayN 专篇 →](/clients/v2rayn) |

---

## 五、客户端安全与常见配置错误清单

1. **只认官方开源仓库与正规商店**：绝不在第三方网盘或百度竞价广告站下载打包版客户端；安装 GitHub Release 后建议核对文件哈希。
2. **禁止使用共享 Apple ID 登录系统 iCloud**：下小火箭等付费应用时，仅可在 App Store 内短时切换商店账号，严禁登录到“设置”顶部的 iCloud 导致被恶意锁机。
3. **关闭重复的系统代理与冲突加速器**：同一台电脑不要同时运行 v2rayN 与 Clash Verge Rev 或游戏加速器，避免 `7890` / `10808` 端口及 TUN 网卡打架（排查详见 [Clash TUN 冲突](/diagnostics/clash-tun-conflict)）。
4. **订阅地址勿泄漏**：订阅 URL 等于你的账户流量密钥，截图求助前务必打码或截断 Token。

---

## 六、客户端软件常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>为什么有些机场能导入 Clash Verge Rev 和 Shadowrocket，有些却不行？</summary>

支持通用订阅的机场（如光速云、星岛梦、一翻云）提供订阅链接；仅限专属客户端的机场（如飞猫云、SOGO 云、隐形人等）则不提供订阅地址。

</details>

<details class="ad-faq-details">
<summary>原版 Clash for Windows 删库停更后，2026 年电脑端应该用哪款软件替代？</summary>

推荐改用基于 Mihomo 内核持续维护的 Clash Verge Rev、FlClash 或多核心版 v2rayN，它们支持 VLESS-Reality 与 Hysteria 2 等现代协议。

</details>

<details class="ad-faq-details">
<summary>安卓手机端有哪些安全可靠的客户端？NekoBox 为什么有警告？</summary>

安卓优选 v2rayNG、FlClash、Hiddify 或 Karing。NekoBox 官方已明确警告勿下载已被第三方接管的 Google Play 同名版本。

</details>

<details class="ad-faq-details">
<summary>苹果 iPhone 上除了收费的 Shadowrocket（小火箭），还有免费的正版客户端吗？</summary>

有，外区 App Store 可免费下载 Karing、Clash Mi、Hiddify、Streisand 与官方 sing-box (SFI)。

</details>

<details class="ad-faq-details">
<summary>macOS 下载客户端时 Intel 和 Apple Silicon 安装包有什么区别？</summary>

M 系列芯片下载 arm64/aarch64 包，老款 Intel 芯片下载 x64/x86_64 包，选错会影响运行效率或报错。

</details>

<details class="ad-faq-details">
<summary>Linux 桌面与无桌面服务器分别推荐哪款客户端？</summary>

桌面端用 Clash Verge Rev / FlClash（注意 DEB/RPM/AppImage 对应系统）；无桌面主机或 NAS 用带 Web 界面的 v2rayA。

</details>

<details class="ad-faq-details">
<summary>OpenWrt 软路由安装 OpenClash、PassWall2 和 Nikki 有什么前置条件？</summary>

安装前需确认固件版本、架构、剩余空间与防火墙类型；例如 Nikki 明确要求 OpenWrt 24.10 及以上版本。

</details>

<details class="ad-faq-details">
<summary>Mihomo 内核和 sing-box 内核有什么核心区别？</summary>

Mihomo 兼容标准 Clash YAML 订阅生态；sing-box 路由能力统一、原生 JSON 结构严谨，部分机场订阅需经转换后使用。

</details>

<details class="ad-faq-details">
<summary>为什么不建议随便在百度搜“Clash 下载官网”下载安装包？</summary>

开源客户端没有所谓“百度官网”，搜索引擎前排的中文推广站常包含篡改木马或钓鱼安装包。

</details>

<details class="ad-faq-details">
<summary>安装桌面端客户端后开启 TUN 模式安全吗？为什么需要管理员权限？</summary>

开启 TUN 需要向系统注册虚拟网卡，因此必须授予服务模式或管理员权限；前提是安装包来自官方 GitHub 仓库。

</details>
---

## 下一步操作路径

- **已经选好客户端，准备导入订阅**：进入 [使用教程中心 →](/guides/) 或 [订阅导入全流程 →](/guides/subscription)
- **挑选支持第三方订阅的机场服务**：[查看 31 家品牌库 →](/brands/) ｜ [去了解 VPN 与机场区别 →](/vpn/)
- **客户端启动或导入报错**：[进入故障排查中心 →](/diagnostics/)
