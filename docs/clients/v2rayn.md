---
title: v2rayN 下载、安装与多核心（Xray / sing-box / Mihomo）完全使用教程
shortTitle: v2rayN 教程
description: v2rayN 官方 GitHub（2dust/v2rayN）权威安装与配置教程：解析 With-Core 与无内核版本差异、Base64 与单链接混合管理、真连接延迟测速、分流模式以及管理员 TUN 模式开启步骤。
pageType: docs
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑组
sourceNote: 软件信息依据第三方代理客户端核查清单及 2dust/v2rayN 官方开源仓库文档整理。
softwareApp:
  name: v2rayN
  os: Windows, macOS, Linux
faq:
  - q: "下载 v2rayN 时看到 `With-Core` 与普通精简版，该下载哪个？"
    a: 绝大多数 Windows 普通用户直接选择带有 `With-Core`（且适配 64 位系统的 `windows-64` 或 `SelfContained`）的压缩包解压即可使用，里面已经把 Xray、sing-box、Mihomo 等核心执行文件和基础依赖打包齐全；如果你下载的是不包含核心的精简压缩包，首次连接节点时会弹窗提示“未找到对应内核，请先下载 Core”。
  - q: v2rayN 和 Clash Verge Rev 怎么选？
    a: 如果你购买的机场主打 Clash YAML 订阅与高度预设好的策略组（例如一键选“AI 组 / 流媒体组 / 自动选择”），优先使用 Clash Verge Rev 省心得多；如果你习惯使用传统通用 Base64 订阅、手里同时混用多个单条自建节点链接（`vless://`、`hy2://`、`ss://`），或者需要在一套软件里切换 Xray-core 与 sing-box 核心来调试最新协议兼容性，v2rayN 是无可替代的老牌神器。
  - q: 为什么测试 Tcping 有几十毫秒但还是打不开海外网页？
    a: 因为“Tcping（TCP 握手延迟）”只检测服务器端口是否开着，完全不验证代理密码、TLS 证书、协议是否正常转发，甚至国内直连伪装或墙阻塞前的假通也会返回几十毫秒。排查真可用性必须在节点列表选中后按 Ctrl+R（右键 → 测试服务器真连接延迟 / Real Delay），能返回真实数字才代表节点真正跑通了海外握手。
  - q: 如何开启 v2rayN 的 Tun 模式？
    a: 仅用于 Chrome/Edge 网页上网时，将底部最左边的“系统代理”切换为“自动配置系统代理”即可；当你需要让 Git、npm、Python、Docker 命令行终端或者 Windows UWP 应用、桌面 AI 工具全盘走代理时，必须右键桌面快捷方式“以管理员身份运行 v2rayN”，然后再打开底部“Tun 模式”开关。
  - q: 为什么把 Clash 订阅地址放进 v2rayN 里更新不出来？
    a: v2rayN 的常规“订阅分组”默认预期解析标准 Base64 通用订阅或支持特定适配后加载 Clash YAML；部分机场后台同时提供“V2Ray / 通用订阅”和“Clash 订阅”两条链接。只要是在本站数据库里支持第三方订阅导入的品牌（如光速云、星岛梦、暮光加速、一翻云、二猫云等），从后台复制“通用/V2Ray 订阅链接”导入即可完美解析；如果是仅限专属端品牌则均无法导入。
---

# v2rayN 下载与多核心（Xray / sing-box / Mihomo）使用说明

**v2rayN 是开源社区历史最悠久、跨协议兼容性最强的全能代理客户端之一。由著名开源作者 `2dust` 维护，现已从经典的 Windows 单平台发展为全面覆盖 Windows、macOS 与 Linux 的多核心图形前端——它支持在同一界面内灵活调用 `Xray-core`、`sing-box` 与 `Mihomo` 内核，是极客测试新协议（VLESS-Reality / Hysteria 2）与管理混合多渠道节点的标杆工具。**

---

## 一、软件基础档案与官方核验

| 属性 | 核心参数说明 |
|---|---|
| **官方开源仓库** | `github.com/2dust/v2rayN`（认准 `2dust` 唯一官方仓库，警惕第三方捆绑压缩包） |
| **支持操作系统** | Windows（x64 / ARM64）、macOS（Apple Silicon / Intel）、Linux（DEB / RPM / 通用包） |
| **核心引擎支持** | 多核心原生调度：`Xray-core`、`sing-box`、`Mihomo` |
| **支持导入格式** | V2Ray Base64 通用订阅、单条 URI 节点分享链接（`vless://`、`vmess://`、`trojan://`、`ss://`、`hysteria2://`、`tuic://`）及部分兼容 YAML |
| **核心优势** | 极低系统资源占用、内置“真连接延迟（Real Delay）”测速过滤假通节点、高度灵活的路由集（Routing）自定义 |

---

## 二、新手安装版本避坑：认准 `With-Core` 全量包

前往 `github.com/2dust/v2rayN/releases` 页面下载 Windows 版时，页面列表通常非常长，新手务必避开下载空壳版本：
1. **下载包含全套核心的版本**：找到名称中带有 **`v2rayN-windows-64-With-Core.zip`**（或标注 `SelfContained` 的含运行库全量安装包）。如果您贪小下载了不带 `With-Core` 的精简包，解压缩启动后由于缺少底层核心执行文件，在点击连接任何节点时都会报核心丢失错误。
2. **解压目录路径不要放桌面或 C 盘根目录，且尽量纯英文路径**：例如解压到 `D:\Tools\v2rayN\` 后双击 `v2rayN.exe` 启动即可。切勿在压缩软件预览窗口直接双击运行！

---

## 三、标准使用四步走（导入订阅 + 真延迟测速 + 分流）

### 第 1 步：确认品牌通用订阅并添加到分组
1. 核对机场是否支持通用订阅：在本站数据库支持第三方导入的品牌（如 [光速云](/brands/guangsuyun)、[星岛梦](/brands/xingdaomeng)、[暮光加速](/brands/muguang)、[一翻云](/brands/yifan)、[梯子云](/brands/tiziyun) 等）官网后台，复制 **“V2Ray / 通用订阅链接”**（优先复制通用 Base64 链接，避免直接塞入复杂 Clash 规则 YAML）。
2. 打开 v2rayN 顶部菜单 **“订阅分组” → “订阅分组设置” → “添加”**，输入备注名称并粘贴 URL 保存。
3. 回到主界面顶部点击 **“订阅分组” → “更新全部订阅（不通过代理）”**，节点即会全部列出。

### 第 2 步：用“真连接延迟”剔除假通节点
选中节点列表按 `Ctrl + A` 全选后：
- **切忌只看 `Ctrl + P`（Tcping）结果**：TCP 握手低延迟只表示对端中转入口 IP 通着，并不代表背后真正连接上了海外出口。
- **务必运行 `Ctrl + R`（测试服务器真连接延迟 / Real Delay）**：软件会真正尝试通过节点去请求一次海外测试网址（如 Cloudflare/Google generate_204），只有实实在在跑出毫秒数值且未超时的节点，才是真正可以打开网页的有效线路。选定其中一个稳定且倍率合理的节点，选中它并按 **`Enter`（回车）** 设为活动节点（左侧出现标记）。

### 第 3 步：选对底部“路由模式”与“系统代理”
在 v2rayN 界面最底栏通常有两个关键下拉选项：
- **系统代理**：选 **“自动配置系统代理”**（此时左下角托盘图标会变成醒目红色，代表已开启浏览器代理转发；暂时不用或退出时记得切回“清除系统代理”）。
- **路由（Routing）**：默认或推荐设置为 **`绕过大陆 (Bypass mainland)`**（即国内外智能分流，保证访问微信、B站、阿里系软件全速直连不扣流）。切忌无故设置为“全局（Global）”。

### 第 4 步：按需开启“Tun 模式”接管终端与 UWP 应用
如果您需要在 Windows 上让命令行终端（Git/npm/pip/curl）、WSL 或微软商店 UWP 应用也同样生效代理：
1. 关闭当前运行的 v2rayN；
2. 右键桌面快捷方式或 `v2rayN.exe` → **“以管理员身份运行”**；
3. 打开软件底部的 **`Tun 模式`** 开关，底层系统级虚拟网卡随即启用（注意避开与公司内网 VPN 或强反作弊游戏同时运行）。

---

## 四、信息边界与诚实披露

- **多核心切换门槛**：v2rayN 允许高级用户在设置中指定不同协议优先走 `Xray-core` 还是 `sing-box`，但对于普通用户而言保持最新全量包内置的默认自动核心调度即可，无需手动强改，以免因配置语法兼容度变化导致连接报错。
- **专属端限制边界**：采用纯专属端模式（不提供通用订阅）的品牌（如 [飞猫云](/brands/feimao)、[SOGO 云](/brands/sogo)、[隐形人](/brands/yinxingren) 等）无法接入 v2rayN，选型前请在 [品牌客户端矩阵](/database/clients) 二次核实。

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>下载 v2rayN 时看到 `With-Core` 与普通精简版，该下载哪个？</summary>

绝大多数 Windows 新手直接下载 **`v2rayN-windows-64-With-Core.zip`**（或对应系统的完整核心打包版）解压运行即可，免去了自己逐一查找配置 Xray/sing-box 核心的麻烦。

</details>

<details class="ad-faq-details">
<summary>v2rayN 和 Clash Verge Rev 怎么选？</summary>

如果机场提供了完善的 Clash 订阅且你喜欢直观的“自动测速+策略组分流（AI/流媒体分路）”，优先用 Clash Verge Rev；如果您日常习惯管理 V2Ray 通用 Base64 订阅、自建散装链接，或需要用多核心调试特定新协议，v2rayN 最顺手。

</details>

<details class="ad-faq-details">
<summary>为什么测试 Tcping 有几十毫秒但还是打不开海外网页？</summary>

因为 Tcping 仅检测中转入口端口联通与否，并不验证后端代理通路。全选节点运行 `Ctrl+R（测试真连接延迟）` 才能筛选出真正能完成海外网站请求的节点。

</details>

<details class="ad-faq-details">
<summary>如何开启 v2rayN 的 Tun 模式？</summary>

先彻底退出软件，右键 `v2rayN.exe` 选择“以管理员身份运行”，然后再打开底部栏的 `Tun 模式` 开关即可，否则会因权限不足无法建立虚拟网卡。

</details>

<details class="ad-faq-details">
<summary>为什么把 Clash 订阅地址放进 v2rayN 里更新不出来？</summary>

请回到机场官网后台复制标明为 **“通用订阅 / V2Ray 订阅 / Base64 订阅”** 的链接，部分未做跨格式解析的订阅组放进纯 Clash YAML 会直接格式解析失败。

</details>
---

## 下一步阅读与工具入口

- 返回一级专题：[客户端软件全平台总览](/clients/)
- 桌面平台全景对比：[Windows 电脑代理客户端大全](/clients/windows) ｜ [Clash Verge Rev 专题教程](/clients/clash-verge)
- 常见故障排错：[全部节点超时排查步骤](/diagnostics/all-timeout) ｜ [订阅更新失败处理](/diagnostics/subscription-failed)
