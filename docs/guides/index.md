---
title: 机场使用教程中心（2026）：订阅导入、Clash 分流、TUN 模式与 DNS 全流程
description: 从零开始的机场配置总教程：涵盖新手购买前准备、Windows/Android/iOS/macOS/OpenWrt 配置路线、订阅导入、规则模式 vs 全局模式、TUN 虚拟网卡与 DNS 防泄漏设置。
pageType: pillar
schemaCollection: true
shortTitle: 使用教程
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: 第三方代理客户端.txt + 站内实操文档规范
faq:
  - q: 第一次买机场，完整的上手操作顺序是什么？
    a: 标准五步顺序为：① 核对机场是否支持第三方订阅（或下载官方专属端）→ ② 在设备安装对应客户端（如 Clash Verge Rev / v2rayN / Shadowrocket）→ ③ 复制机场后台订阅 URL 并导入更新 → ④ 代理模式设为“规则 (Rule)”而非“全局 (Global)”→ ⑤ 按日常浏览/AI需求切换对应地区节点测试可用性。
  - q: 系统代理模式和 TUN 模式有什么区别？新手必须开 TUN 吗？
    a: 系统代理只接管浏览器和读取系统代理设置的应用；TUN 模式会在系统底层创建虚拟网卡，接管终端命令行（git/curl/npm）、桌面 AI 客户端（ChatGPT/Cursor Desktop）、UWP 应用与游戏更新流量。如果只用浏览器，开系统代理就够了；如果命令行或桌面 App 连不上，才开启 TUN 模式。
  - q: Clash 里的“规则 (Rule)”、“全局 (Global)”和“直连 (Direct)”该选哪个？
    a: 日常 99% 时间应选“规则 (Rule)”，让国内微信、网银直连，海外网站走代理。只有在调试特殊网站或怀疑分流规则遗漏某个域名时，才临时切到“全局 (Global)”测试；完全不需要代理时选“直连”或直接关闭系统代理开关。
  - q: 为什么开了代理之后打开淘宝、支付宝或 B站 反而变慢甚至定位到香港？
    a: 多半是因为误选了“全局 (Global)”模式，或者使用了未包含国内直连规则的白板配置。切回“规则 (Rule)”模式即可恢复正常直连速度。
  - q: 苹果手机 iPhone 没有外区 Apple ID 怎么配置机场？
    a: 有两条路径：第一是注册或切换海外区 Apple ID 从 App Store 下载付费的 Shadowrocket 或免费的 Karing / Streisand；第二是直接选购提供官方专属 iOS 客户端指引的机场，但需注意企业签名偶发掉签风险。切勿在系统设置 iCloud 登录共享账号。
  - q: 怎么知道自己的 Clash 订阅或机场套餐还剩多少流量、何时到期？
    a: 绝大多数通用机场的 Clash 订阅在导入后，会在 Clash Verge Rev、FlClash 或 Shadowrocket 订阅卡片底部直接显示“已用流量 / 总流量”和到期日期；也可以随时登录机场官网用户面板查看准确统计。
  - q: 多台设备（电脑 + 手机 + 平板）能用同一个订阅链接吗？
    a: 如果该机场标注“不限设备数量”（如光速云、星岛梦、二猫云、唯兔云、一翻云、SOGO 云、U1S1），多台自用设备可直接导入同一份订阅链接；如限制在线 IP 数，则不可同时超出设备上限，更严禁公开分享订阅。
  - q: 配置好之后，怎么快速验证 DNS 没有泄漏且分流生效？
    a: 打开浏览器访问 IP 查询站（如 ip.sb 或 whoer）确认代理出口已变为香港/新加坡等节点 IP，同时打开国内常用网页确认依然保持本地低延迟直连；若使用 AI 工具，先切到新加坡/日本节点再开无痕窗口访问验证。
---

# 机场使用教程与配置总入口（分步骤任务指南）

> **Answer-First 核心结论**：**新手从零配置机场只需按“选定接入方式 → 安装对应客户端 → 导入并更新订阅 → 设为规则分流（Rule）→ 校验连通性”五步完成。** 如果你使用的是只提供专属客户端的品牌（如飞猫云、SOGO 云、隐形人），可跳过第 2–3 步直接登录官方 App；如果使用的是支持通用订阅的品牌（如 [光速云](/brands/guangsuyun)、[星岛梦](/brands/xingdaomeng)、[一翻云](/brands/yifan)），遵循下方分平台路线 5 分钟即可完成全端部署。

---

## 一、使用前准备（两分钟自检清单）

1. **确认你的品牌接入模式**：登录已购机场的用户控制台，看是否提供 **Clash / V2Ray / 通用订阅链接**，还是仅提供 **官方客户端下载入口**（不确定的先查 [客户端兼容矩阵](/clients/)）。
2. **校对系统本地时间**：确保电脑和手机开启“自动设置时间”，系统时钟误差超过 60 秒会导致 VLESS/Trojan 节点全部握手超时。
3. **关闭冲突软件**：退出之前安装的其他 VPN、老版本 Clash for Windows 或网游加速器，防止端口与虚拟网卡占用冲突。

---

## 二、五大设备配置路线快速导航

| 你的设备平台 | 推荐客户端 | 获取来源 | 核心配置动作 | 详细专篇教程 |
|---|---|---|---|---|
| **Windows 电脑** | Clash Verge Rev / v2rayN / FlClash | GitHub 官方 Releases | 导入订阅 → 设为 Rule → 开系统代理（终端需求开 TUN） | [Windows 客户端大全](/clients/windows) · [CVR 专篇](/clients/clash-verge) |
| **macOS 苹果电脑** | Clash Verge Rev / FlClash / v2rayN | GitHub（区分 Intel / M系列） | 确认芯片架构 → 放行安全提示 → 导入订阅 → 开系统代理/TUN | [macOS 客户端大全](/clients/macos) |
| **Android 安卓** | v2rayNG / FlClash / Hiddify / Karing | GitHub / F-Droid（勿下山寨 NekoBox） | 粘贴订阅 → 更新节点 → 允许后台保活防杀进程 | [Android 客户端大全](/clients/android) |
| **iPhone / iPad** | Shadowrocket（付费）/ Karing / Streisand（免费） | 非大陆区 App Store | 切商店区下载（勿登 iCloud）→ 添加 Subscribe → 选规则配置 | [iOS 客户端大全](/clients/ios) · [小火箭专篇](/clients/shadowrocket) |
| **OpenWrt 软路由** | OpenClash / PassWall2 / Nikki / HomeProxy | GitHub（注意架构与 Nikki 24.10+ 要求） | 安装核心 → 填通用订阅 → 开启透明代理与 DNS 接管 | [OpenWrt 软路由挑选与避坑](/guides/router-openwrt) |

---

## 三、核心实操流程拆解（本页快速掌握要点）

### 第 1 步：订阅链接导入（[完整图文步骤 →](/guides/subscription)）
- 复制机场控制台的“一键导入 Clash”或“复制订阅地址”。
- 在桌面端（如 Clash Verge Rev）进入 **订阅 (Profiles)** 栏粘贴 URL 并点击导入；若首次拉取超时，可尝试切手机热点拉取或开启“通过代理更新”。

### 第 2 步：代理模式选择（Rule vs Global vs Direct）
- **Rule（规则模式 · 日常必选）**：内置 GeoIP/GeoSite 与域名表，自动判断国内外流量，实现国内直连、海外走代理。
- **Global（全局模式 · 仅调试）**：所有流量（包含微信、国内网盘）强行绕道海外节点，速度慢且消耗套餐流量，日常勿用。
- **Direct（直连模式）**：暂停一切代理转发。

### 第 3 步：系统代理 vs TUN 虚拟网卡与 DNS（[TUN 与 DNS 详解 →](/guides/tun-dns)）
- **系统代理**：满足 Chrome/Edge 网页浏览与大部分遵循系统代理的软件，无需管理员权限。
- **TUN 模式**：创建虚拟网卡接管全系统 TCP/UDP/ICMP 流量。当 `git clone`、`npm`、`docker`、桌面版 ChatGPT/Cursor 或终端报超时时，安装服务模式并开启 **TUN** 即可解决。
- **DNS 模式选择**：日常优先使用 `fake-ip`（响应快、无本地污染）；若涉及内网域名开发或特殊局域网设备解析，改用 `redir-host`。

### 第 4 步：分流规则与策略组调整（[Clash 分流规则配置 →](/guides/clash-rules)）
- 利用好不同地区的节点分工：把日常 `Proxy` 策略组连到低延迟 **香港专线**（21–27ms），同时单独把 `OpenAI / Gemini` 策略组指向 **新加坡或日本**，避免香港节点被 AI 网页拒绝。

### 第 5 步：多设备管理与套餐配额核算（[多设备与套餐选择 →](/guides/plan-selection)）
- 同一份订阅在多台自用设备导入后，务必统一在所有客户端启用“启动时/每隔 24 小时自动更新订阅”，确保机场更新中转入口 IP 后所有设备同步生效。

---

## 四、配置结果检查与常见错误入口

完成以上步骤后，用三步验证配置是否完全生效：
1. 访问国内站点（如百度或本地测速），确认 IP 仍为本地宽带、延迟无增加；
2. 访问海外搜索或 YouTube，确认可流畅加载且在 Clash 连接面板（Connections）看到流量命中 `Proxy`；
3. 访问 ChatGPT / Claude 时在 Connections 中核对是否命中新加坡/日本/美国节点而非香港节点。

如果任意一步出现异常，直接对照症状进入排查：[订阅更新失败](/diagnostics/subscription-failed) · [全部节点超时](/diagnostics/all-timeout) · [Clash TUN 冲突](/diagnostics/clash-tun-conflict) · [DNS 错误与速度慢](/diagnostics/dns-speed)。

---

## 五、使用教程常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>第一次买机场，完整的上手操作顺序是什么？</summary>

确认订阅模式 → 安装对应客户端 → 导入并更新订阅 → 切换为 Rule 规则模式 → 按需求选定地区节点并校验连通性。

</details>

<details class="ad-faq-details">
<summary>系统代理模式和 TUN 模式有什么区别？新手必须开 TUN 吗？</summary>

系统代理只管浏览器等遵循系统设置的软件；TUN 接管全部命令行与桌面应用。只刷网页开系统代理即可，终端或桌面 AI 客户端连不上时再开 TUN。

</details>

<details class="ad-faq-details">
<summary>Clash 里的“规则 (Rule)”、“全局 (Global)”和“直连 (Direct)”该选哪个？</summary>

日常固定选 Rule（规则）；Global 仅用于临时排查；Direct 为全部不走代理。

</details>

<details class="ad-faq-details">
<summary>为什么开了代理之后打开淘宝、支付宝或 B站 反而变慢甚至定位到香港？</summary>

因为误开了 Global 全局模式或规则未涵盖国内直连，切回 Rule 模式即可恢复。

</details>

<details class="ad-faq-details">
<summary>苹果手机 iPhone 没有外区 Apple ID 怎么配置机场？</summary>

需切换外区 Apple ID 从 App Store 下载 Shadowrocket 或免费的 Karing / Streisand；绝不能登录未知共享账号到系统 iCloud。

</details>

<details class="ad-faq-details">
<summary>怎么知道自己的 Clash 订阅或机场套餐还剩多少流量、何时到期？</summary>

导入订阅后客户端订阅卡片底部通常自动显示剩余流量与到期日，也可登录机场官网面板查看。

</details>

<details class="ad-faq-details">
<summary>多台设备（电脑 + 手机 + 平板）能用同一个订阅链接吗？</summary>

标明不限设备数（如光速云、星岛梦、二猫云等）的自用多端可直接导入同一订阅，切勿公开分享给他人。

</details>

<details class="ad-faq-details">
<summary>配置好之后，怎么快速验证 DNS 没有泄漏且分流生效？</summary>

检查海外页面显示节点 IP 而国内页面仍走本地直连，同时在客户端 Connections 日志页确认域名按预期策略组转发。

</details>
---

## 关联一级入口

- **还没选好软件？**：[前往客户端软件中心挑选软件 →](/clients/)
- **配置过程中遇到报错？**：[进入网络故障排查中心 →](/diagnostics/)
- **需要兼容第三方订阅的套餐？**：[查看 31 家品牌库 →](/brands/) ｜ [对比机场套餐成本 →](/pricing/)
