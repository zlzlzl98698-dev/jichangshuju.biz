---
title: Clash Verge Rev 下载、安装与机场订阅配置完整教程（2026）
shortTitle: Clash Verge Rev 教程
description: Clash Verge Rev 完整技术文档：Mihomo 内核协议能力、Windows/macOS/Linux 官方仓库下载校验、订阅导入四步法、Service 服务模式安装与 TUN/覆写进阶技巧。
pageType: docs
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑组
sourceNote: 软件信息依据第三方代理客户端核查清单及 clash-verge-rev 官方公开项目说明整理。
softwareApp:
  name: Clash Verge Rev
  os: Windows, macOS, Linux
howTo:
  name: Clash Verge Rev 下载安装与机场订阅配置四步流程
  steps:
    - name: 核实 GitHub 官方仓库并下载对应架构安装包
      text: Windows 选 x64/ARM64 安装包，macOS M 系列芯片选 arm64、Intel 选 x64，拒用非官方打包版。
    - name: 导入机场 Clash 订阅链接
      text: 在品牌后台复制 Clash 专用订阅 URL，进入 Clash Verge Rev 左侧“订阅”栏粘贴并点 Import，点击高亮激活新卡片。
    - name: 设置 Rule 规则模式并测速选点
      text: 进入“代理”页保持 Rule（规则）模式而非 Global，点击测速按钮确认节点存在有效延迟；AI 访问节点切换至新加坡、日本或美国。
    - name: 开启系统代理或安装服务模式开启 TUN
      text: 仅浏览网页开启“系统代理”即可；终端/IDE 需管理员权限安装 Service Mode 后再打开 TUN 虚拟网卡，并用 Merge/Script 覆写保留个人规则。
faq:
  - q: Clash Verge Rev 和原版 Clash for Windows 有什么区别？
    a: 原版 Clash for Windows (CFW) 已停止开源更新维护，底层内核滞后，完全不支持 VLESS-Reality、Hysteria 2、TUIC 等现代抗阻断传输协议，且市面上流传的所谓“新版破解汉化包”暗藏严重木马风险；Clash Verge Rev 是在停止维护后由社区重新激活维护的跨平台现代分支，内置最新 Mihomo (Clash.Meta) 内核，对新协议、新系统安全规范支持极为完善。
  - q: 哪些机场可以直接导入 Clash Verge Rev？
    a: 凡在本站品牌数据库中标注“支持第三方订阅”或兼容 Clash YAML 配置的品牌均可直接导入使用，例如光速云、星岛梦、暮光加速、唯兔云、一翻云、二猫云、梯子云、速界、可信云、极连云、光年梯等；而仅支持各自官方自研专属软件的品牌（如飞猫云、SOGO 云、隐形人等）不开放标准 Clash 链接，无法导入。
  - q: 导入订阅报错“Fetch failed”怎么办？
    a: 首先检查复制的订阅链接是否完整且没有多余空格，并核实选中的是“Clash 专用订阅链接”而非单纯的 Base64 格式；其次部分机场订阅域名在当前直连网络环境下可能被 DNS 污染，可临时勾选客户端设置里的“通过系统代理/已有代理更新订阅”或向机场官方后台确认最新备用订阅域名。详细排错见“机场订阅失败排查”。
  - q: TUN 模式怎么打开？老提示服务模式未安装怎么弄？
    a: 开启 TUN 虚拟网卡必须创建底层的系统级网卡接口，在 Windows 与 macOS 上需要更高权限。只需进入 Clash Verge Rev 左侧“设置（Settings）”，找到“服务模式（Service Mode）”右侧的齿轮或盾牌安装按钮，按提示输入管理员密码完成安装并重启客户端，即可顺滑开关 TUN 模式。
  - q: 怎么避免每次刷新订阅把我写好的分流规则覆盖掉？
    a: 如果直接去修改下载下来的原始配置文件，确实会在下一次“更新订阅”时被服务器发来的新文件彻底覆盖。在 Clash Verge Rev 里正确的做法是在“订阅”页面右键点击对应订阅，使用“覆写（Merge / Script）”功能编写你的自定义增删规则，这样无论订阅如何自动更新，你的个人白名单与 AI 分流组都能永久自动叠加生效。
---

# Clash Verge Rev 下载、安装与机场订阅配置教程（2026）

**Clash Verge Rev 是目前 Windows、macOS 与 Linux 桌面端生态最完善、维护最活跃的开源代理客户端。它基于高性能的 Mihomo（原 Clash.Meta）内核重构，全面原生兼容 Shadowsocks、VMess、VLESS（含 Reality）、Trojan、Hysteria 2 与 TUIC 等协议，是彻底替代已停更原版 Clash for Windows 的标准主力选择。**

---

## 一、软件基础档案与官方核验入口

| 属性 | 核心参数说明 |
|---|---|
| **支持操作系统** | Windows（x64 / ARM64）、macOS（Apple Silicon `arm64` / Intel `x64`）、Linux（`.deb` / `.rpm` / `.AppImage`） |
| **底层代理内核** | Mihomo（Clash.Meta） |
| **官方 GitHub 仓库** | `github.com/clash-verge-rev/clash-verge-rev`（请务必核实发布者为此官方地址，拒绝搜索引擎野站打包版） |
| **原生支持订阅格式** | Clash YAML / Mihomo YAML |
| **特色进阶功能** | 定时自动更新订阅、URL-Test 自动测速容灾、Rule/Global/Direct 切换、Service TUN 虚拟网卡、Merge/Script 无损配置覆写 |

---

## 二、机场兼容性核查：你的品牌能直接导入吗？

并非所有品牌都允许直接导入第三方桌面客户端，安装前请先核对机场技术路线：
- **支持通用 Clash 订阅导入**：**[光速云](/brands/guangsuyun)**、**[星岛梦](/brands/xingdaomeng)**、**[暮光加速](/brands/muguang)**、**[唯兔云](/brands/weitu)**、**[一翻云](/brands/yifan)**、**[二猫云](/brands/ermao)**、**[梯子云](/brands/tiziyun)**、**[速界](/brands/sujie)**、**[可信云](/brands/kexin)**、**极连云**、**光年梯**等。
- **不支持导入（仅自研专属客户端）**：**[飞猫云](/brands/feimao)**、**[SOGO 云](/brands/sogo)**、**[隐形人](/brands/yinxingren)** 及近阶段转纯专属策略的渠道（无法获取 Clash YAML，只能使用对应官网独立桌端）。完整列表见 [31 品牌兼容性全表](/database/clients)。

---

## 三、从安装到连网：新手四步配置实操

### 第 1 步：下载并安装对应系统包
- **Windows**：下载官方 `.exe` 安装程序；安装后若杀毒软件弹窗拦截注册虚拟网卡驱动或修改系统代理注册表，确认官方源后加入信任白名单。
- **macOS**：M 系列芯片选 `aarch64` / `arm64`，Intel Mac 选 `x64`。首次打开若遭苹果安全系统拦截提示“已损坏或未验证”，在确认官网下载前提下于“系统设置 → 隐私与安全性”点击“仍要打开”。

### 第 2 步：获取并导入机场 Clash 订阅
1. 登录机场官网后台，在首页寻找 **“一键导入 Clash”** 或 **“复制 Clash 订阅链接”**。
2. 打开 Clash Verge Rev 左侧 **“订阅 (Profiles)”** 菜单。
3. 在顶部输入框粘贴订阅地址，点击右侧 **“导入 (Import)”**；等待进度条提示“Success”，并单击刚才生成的新卡片使之处于**高亮激活状态**。

### 第 3 步：检查分流模式与测速选点
1. 切回左侧 **“代理 (Proxies)”** 页面：
   - **顶部模式保持在 `Rule`（规则模式）**：保证访问国内网站、微信、网银全直连，只有海外域名才走机场扣流量。**千万不要长期无故开启 `Global`（全局）**。
   - 点击组名旁的测速闪电图标，查看节点真实 URL 连通延迟（若出现大量 `Timeout` 报错，优先核对本机系统时间是否准确，或参阅 [全部节点超时排查](/diagnostics/all-timeout)）。
   - 如果需要登录 ChatGPT、Claude 或看 Gemini，手动把 AI 策略组指向**新加坡、日本或美国**（避开香港，详见 [AI 工具节点指南](/streaming-ai/chatgpt)）。

### 第 4 步：开启“系统代理”或安装“TUN 模式”
1. 切到左侧 **“设置 (Settings)”** 页面：
   - **日常仅用浏览器查资料、看流媒体**：直接开启 **“系统代理 (System Proxy)”** 开关即可，简洁省电。
   - **需要用终端（Git/npm/pip/curl）、Cursor/VS Code、Docker 或 Microsoft Store 等不读系统代理的软件**：先点击“服务模式 (Service Mode)”右侧的安装图标并授权管理员权限完成安装；重启应用后再开启 **“TUN 模式”**。

---

## 四、高阶必学：“覆写（Merge / Script）”保住你的自定义规则

很多用户辛辛苦苦手动修改 YAML 给某个网站（比如把 AI 域名单独绑给美国节点、把内网公司 IP 设为直连），结果几天后订阅自动更新一刷新，自己写的东西全没了。
- **正确做法**：在“订阅”列表右键你的当前激活卡片 → **“编辑规则覆写 (Merge)”** 或使用全局 Scripts（JavaScript 脚本）。通过覆写注入的规则会在每次订阅更新拉取完最新机场节点后**自动追加合并**，彻底解决更新丢配置痛点。详情可进一步学习 [Clash 分流规则撰写指南](/guides/clash-rules)。

---

## 五、信息边界与诚实披露

- **防止山寨下载渠道**：请勿通过任何中文软件站或百度广告结果下载 Clash 安装包；务必经由开源社区认可的 GitHub 仓库入口校验发布者。
- **内核差异**：少数极为老旧的机场后台面板可能下发早已被废弃的 `Clash Premium` 老旧字段格式（例如已废止的特定混淆或老旧规则关键字），在 Mihomo 内核中可能触发 YAML 报错；此时可在机场后台选择“Mihomo / Clash Meta 专用订阅”或在客户端设置开启兼容模式。

---

## 六、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>Clash Verge Rev 和原版 Clash for Windows 有什么区别？</summary>

原版 Clash for Windows 已停更且不支持 VLESS-Reality、Hysteria 2 等抗封锁新协议；Clash Verge Rev 基于开源活跃的 Mihomo 内核持续更新，安全性与兼容性全面胜出。

</details>

<details class="ad-faq-details">
<summary>哪些机场可以直接导入 Clash Verge Rev？</summary>

支持第三方订阅的品牌（如光速云、星岛梦、暮光加速、唯兔云、一翻云、二猫云、梯子云、速界、可信云等）均可直接导入；纯专属端品牌（飞猫云、SOGO 云、隐形人等）不开放通用配置，无法导入。

</details>

<details class="ad-faq-details">
<summary>导入订阅报错“Fetch failed”怎么办？</summary>

确认复制的链接完整无误、且格式属于 Clash YAML 而非 Base64 链接；若订阅官网域名被当前网络 DNS 干扰屏蔽，可找品牌官方确认最新备用地址或参考订阅失败排查指南。

</details>

<details class="ad-faq-details">
<summary>TUN 模式怎么打开？老提示服务模式未安装怎么弄？</summary>

在“设置”里点击“服务模式 (Service Mode)”旁的安装盾牌按钮授予系统管理员权限，然后重启一次 Clash Verge Rev 即可正常开启 TUN 虚拟网卡。

</details>

<details class="ad-faq-details">
<summary>怎么避免每次刷新订阅把我写好的分流规则覆盖掉？</summary>

不要直接更改机场同步过来的基础 YAML，而是右键订阅卡片使用内置的 Merge（覆写配置文件）或 Global Script（全局脚本），即可实现每次自动更新节点同时保留个人分流策略。

</details>
---

## 下一步阅读与工具入口

- 返回一级专题：[客户端软件全平台总览](/clients/)
- 跨平台系统指导：[Windows 客户端大全](/clients/windows) ｜ [macOS 客户端大全](/clients/macos)
- 排错与深度规则：[TUN 与 DNS 配置实战](/guides/tun-dns) ｜ [TUN 与企业 VPN/游戏冲突修复](/diagnostics/clash-tun-conflict)
