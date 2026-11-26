---
title: Clash Verge Rev 无法启动、闪退或空白白屏怎么办？6 步修复清单
shortTitle: Clash Verge 启动故障
description: 全面排查 Windows 与 macOS 下 Clash Verge Rev 双击没反应、界面白屏加载不出、提示核心服务异常或 WebView2 缺失的根本原因与无损修复步骤。
pageType: docs
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: 客户端常见系统故障排查模型 + clients/clash-verge 排障梳理
faq:
  - q: Windows 下安装好 Clash Verge Rev 后双击打不开或者直接白屏怎么办？
    a: "Windows 端 **80% 以上的白屏或闪退原因是系统缺少最新版 Microsoft Edge WebView2 运行时**（常见于精简版 Win10/Win11 或 LTSC 系统）。去微软官网单独下载并安装“Evergreen Bootstrapper（常青引导程序）”版 WebView2 后重启 Clash Verge Rev 即可直接恢复渲染。"
  - q: Clash Verge Rev 启动时弹出“Clash Core 启动失败 / Service 权限异常”怎么解决？
    a: "按两步走：1）先打开任务管理器彻底结束残留的 `verge-mihomo.exe` 或 `clash-verge.exe` 进程；2）如果你之前勾选过 TUN 模式或服务模式，右键软件图标以 **“以管理员身份运行”**，进设置里先卸载旧 Service 再重新点击 Install（安装服务模式）。"
  - q: 以前能正常启动，某天突然打不开甚至找不到图标，是不是配置损坏了？
    a: "是的，有时自定义覆写脚本写错语法、或异常断电导致软件状态文件 `clash-verge.yaml` / `verge.yaml` 解析报错会卡死 UI 初始化。Windows 可前往 `%APPDATA%\\io.github.clash-verge-rev.clash-verge-rev\\` 先把 `profiles` 订阅目录备份，再重命名配置文件重启重置。"
  - q: 杀毒软件（如 Windows Defender、360、火绒）会把 Clash Verge 核心误杀导致打不开吗？
    a: "**非常常见！** 尤其从非正规渠道或自动升级下载 `verge-mihomo.exe` 后，部分安全软件会悄悄隔离核心二进制文件，结果界面外壳能点开却永远报错核心不存在。先检查保护历史记录恢复并加入白名单，且务必只从项目唯一官方 Releases 下载原版。"
  - q: macOS 打开 Clash Verge Rev 提示“已损坏，无法打开”或一直弹钥匙串权限怎么处理？
    a: "macOS 遇到“已损坏”属于苹果自带 Gatekeeper 隔离机制（未花高价签苹果企业公证），确认是从官方 Release 下载的原包后，在终端对 `/Applications/Clash Verge.app` 清除 `com.apple.quarantine` 属性并在系统隐私设置里点“仍要打开”即可。"
---

# Clash Verge Rev 无法启动、闪退或白屏？6 步无损排查与恢复指南

> **Answer-First 核心结论**：**Clash Verge Rev 无法启动、双击无响应或窗口纯白屏，绝大多数并非软件本身损坏，而是 Windows 缺 Microsoft Edge WebView2 组件、后台残留进程/杀毒误杀核心、旧版配置文件格式破坏或 macOS Gatekeeper 隔离导致。** 先备份订阅配置文件夹再按下方顺序逐一修复，即可避免重装后丢失原有策略配置。

---

## 一、先对号入座：4 种典型启动异常症状速查

| 故障症状表现 | 最可能原因（按概率排序） | 对应立即修复动作 |
|---|---|---|
| **双击没反应，或打开后是一个白屏空框** | Windows 精简版缺失 **WebView2 Runtime** / 显卡硬件加速渲染失败 | 补装微软官方 WebView2 Runtime；或禁用 GPU 渲染测试 |
| **窗口能开，但红字报 Core / Mihomo 核心异常** | 杀毒软件隔离了 `verge-mihomo` / 上一实例进程残留死锁 / 端口占用 | 任务管理器杀净残留进程 + 将软件目录加信任区 |
| **一直卡在加载圈，提示 Service / TUN 权限报错** | Service 服务版本与主程序跨版本不匹配，或普通权限启动了 TUN | 以管理员身份运行 → 进设置卸载并重装 Service 模式 |
| **macOS 弹窗“已损坏，无法打开。你应该将它移到废纸篓”** | macOS 对未在 App Store 上架的开源安装包启用隔离属性拦截 | 确认官方 Release 来源后清除隔离标记再系统设置放行 |

---

## 二、Windows 端完整 6 步排障流程

### 第 1 步：清理僵尸进程与误杀核查
1. 按 `Ctrl + Shift + Esc` 打开任务管理器，在“详细信息”里检查是否残留 **`clash-verge.exe`**、**`verge-mihomo.exe`** 或 **`clash-verge-service.exe`**，全部点击“结束任务”；
2. 打开电脑上的安全软件（Windows 安全中心、火绒、360 等）查看“隔离区 / 保护历史”，若发现核心 `.exe` 被误隔离，先确认安装包确实来源自官方开源仓库后再做恢复与目录白名单放行。

### 第 2 步：安装 / 修复 Microsoft Edge WebView2（白屏专治）
Clash Verge Rev 采用 Tauri 桌面框架开发，界面渲染强依赖系统的 WebView2。在很多精简版 Win10/Win11 或 LTSC 系统中它并没有预装：
- 直接搜索微软官方的 **WebView2 Evergreen Standalone Installer（常青独立安装包）** 下载安装后重开客户端，几乎所有纯白屏都能当场恢复。

### 第 3 步：检查默认端口 `7897` / `7890` 是否被抢占
如果你电脑里同时开过 v2rayN、旧版 Clash、或者 Steam 加速器残留代理进程，监听端口就会打架：
```powershell
netstat -ano | findstr ":7897"
```
查看返回 PID 对应的程序并退出占坑软件（详细 TUN 与端口冲突排查见 [Clash TUN 模式冲突排查](/diagnostics/clash-tun-conflict)）。

### 第 4 步：无损备份后排查配置文件损坏
有时因为写入错误的 JavaScript 覆写脚本（见 [Merge 与 Script 覆写语法](/guides/clash-verge-merge-script)）导致配置文件解析卡死：
1. 打开目录 `%APPDATA%\io.github.clash-verge-rev.clash-verge-rev\`；
2. 先复制整个 `profiles` 文件夹到桌面备份订阅节点；
3. 将 `verge.yaml` 与 `clash-verge.yaml` 临时重命名为 `.bak`，重新双击启动软件即可生成干净配置再导回节点。

### 第 5 步：重置 Service（系统服务）权限
如果之前在非管理员环境下升级过版本，TUN 模式所需系统服务容易版本错位：
- 右键软件快捷方式选择 **“以管理员身份运行”**；
- 在软件“设置 → Clash 设置 → 服务模式”旁点击设置图标，先执行 Uninstall 卸载服务，再点 Install 重新注册。

### 第 6 步：核对安装包来源与系统版本
部分老旧 **Windows 7 / Windows 8** 或非 64 位机器已不再受到现代 Tauri 2 / Mihomo 新版客户端支持，这类机器需检查适配的历史兼容版本或改用对应兼容架构客户端（如参考 [Windows 客户端选型专题](/clients/windows)）。

---

## 三、macOS 端无法启动专属排查点

1. **解决“已损坏，无法打开”**：只要你确定包下载自真实的开源官方 Releases，在终端执行下面命令即可去除隔离标记（切勿对来路不明网站下载的破解软件执行）：
```bash
sudo xattr -r -d com.apple.quarantine "/Applications/Clash Verge.app"
```
2. **CPU 架构选错**：M1/M2/M3/M4 芯片 Mac 请下载 **`aarch64` (Apple Silicon)** 版，老款 Intel Mac 请下载 **`x64`** 版；如果选错或强行依赖旧版 Rosetta 转译偶尔会造成内核启动报错。

---

## 四、实用日常预防建议

- **避免盲目在线热升级**：大版本跨越升级前，先点一下导出/备份配置文件，出现无法启动时回退上一稳定版只要 30 秒；
- **不要同时安装两款不同 Clash 分支壳**：例如同时混装旧版 Clash for Windows、Clash Nyanpasu 与 Clash Verge Rev，极易造成相同的注册表自启项与服务名互相覆盖抢占。相关对比看 [Mihomo、sing-box 与 FlClash 区别](/clients/mihomo-vs-singbox-vs-flclash)。

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>Windows 下安装好 Clash Verge Rev 后双击打不开或者直接白屏怎么办？</summary>

绝大部分属于缺少系统内置的 Microsoft Edge WebView2 运行组件，安装微软官方常青版 WebView2 Runtime 后重启客户端一般可立刻修复。

</details>

<details class="ad-faq-details">
<summary>Clash Verge Rev 启动时弹出“Clash Core 启动失败 / Service 权限异常”怎么解决？</summary>

结束全部后台残留进程与老核心服务，核实杀毒软件未隔离二进制核心，再以管理员权限运行软件重新卸载重装 Service 服务即可。

</details>

<details class="ad-faq-details">
<summary>以前能正常启动，某天突然打不开甚至找不到图标，是不是配置损坏了？</summary>

配置文件或自定义覆写脚本写坏时确实可能阻塞启动。进入 `%APPDATA%` 下配置目录先备份 `profiles`，重置 `verge.yaml` 后一般都能重新进入界面。

</details>

<details class="ad-faq-details">
<summary>杀毒软件（如 Windows Defender、360、火绒）会把 Clash Verge 核心误杀导致打不开吗？</summary>

会。许多国内安全引擎会将内核可执行文件列为风险进程隔离，务必要确认包源头绝对干净，再将其运行目录设为信任白名单。

</details>

<details class="ad-faq-details">
<summary>macOS 打开 Clash Verge Rev 提示“已损坏，无法打开”或一直弹钥匙串权限怎么处理？</summary>

这是 macOS 对未经过苹果付费公证的开源应用触发的 Gatekeeper 拦截，验证官方安装包无误后清除 `com.apple.quarantine` 属性并授予授权即可。

</details>