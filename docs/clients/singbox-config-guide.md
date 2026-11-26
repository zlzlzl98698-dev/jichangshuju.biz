---
title: sing-box 配置文件怎么理解？五大核心字段、路由规则与 Clash YAML 对照
shortTitle: sing-box 配置结构指南
description: 零门槛看懂新一代通用代理核心 sing-box JSON 配置文件结构：逐行拆解 log、dns、inbounds、outbounds、route 五大核心板块以及为什么必须匹配机场内核版本。
pageType: docs
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: 第三方代理客户端.txt + sing-box 官方架构文档对照
faq:
  - q: 机场发给我的订阅链接是 Clash 格式（YAML），可以直接原封不动放进 sing-box 核心里运行吗？
    a: "**不能直接原封不动读取！** Clash/Mihomo 使用缩进敏感的 `.yaml` 配置语法，而 sing-box 原生配置使用结构严谨的 **`.json` 格式**（虽然部分多核心图形壳如 Karing、Hiddify、v2rayN 或订阅转换后端会自动把你的通用订阅转换成 sing-box JSON）。如果用原生命令行或 HomeProxy，需要对应生成 sing-box 1.8+/1.11+ 的 JSON 配置。"
  - q: 为什么网上找来的旧 sing-box 配置文件在最新版（1.11 / 1.12+）软件里会直接报错退出？
    a: "因为 sing-box 迭代速度很快且官方会严格废弃旧版过时字段（Deprecation）：最典型的就是新版把旧式的 `geoip`/`geosite` 文本大数据库改成了高性能二进制规则集 **`rule_set`（`.srs` 文件）**，并且调整了部分 DNS 出站 `outbound: dns` 与 `sniff` 嗅探参数位置。写配置时必须对齐内核版本号！"
  - q: 一份标准的 sing-box JSON 配置文件里，最关键的五大顶层模块分别管什么？
    a: 分别是：`log`（运行日志级别）；`dns`（决定国内外域名分别交给谁解析，防泄漏与防污染的核心）；`inbounds`（软件从哪里接管你的本机或路由器流量，如 TUN 网卡或 Mixed 端口）；`outbounds`（节点列表、策略组如 `selector`/`urltest` 以及直连 `direct`）；`route`（总调度交通规则，决定什么请求走哪个 outbound）。
  - q: OpenWrt 软路由里的 HomeProxy 与 Mihomo/OpenClash 相比，sing-box 到底优势在哪里？
    a: sing-box 最大优势在于 **单二进制原生全兼容（同时把 Mihomo/Xray/Hysteria2/WireGuard 集成在一个进程里）且内存控制极佳**，在 128MB–256MB 低配小内存路由器或 OpenWrt 24.10 官方主线源环境中比传统方案更轻量省资源（详见 [OpenWrt 软路由指南](/guides/router-openwrt)）。
  - q: 我自己手写或修改 sing-box JSON 配置时，怎么最快检查语法有没有少括号或写错字段？
    a: 直接在命令行运行官方自带的校验指令 `sing-box check -c config.json`；如果使用图形端（如 Hiddify、Karing、SFI/SFA），也强烈建议每次只修改 `route` 或 `outbounds`，并在官方发布订阅模板基础上微调，不要混抄不同大版本的教程片段。
---

# sing-box 配置文件怎么理解？五大核心字段与避坑实战解析

> **Answer-First 核心结论**：**sing-box 的核心配置逻辑其实只有一句话——通过 `inbounds` 把系统或局域网流量收进来，配合 `dns` 精准解析域名，最后依据 `route` 里的 `rule_set` 把请求分流派发给 `outbounds` 中的机场节点或 `direct` 直连。** 它采用严谨的 JSON 结构而不是 Clash 的 YAML 语法，新手最容易踩的坑是把停用的旧版 `geoip/geosite` 教程直接抄到 1.11+ 新版内核里导致启动报错。

---

## 一、快速建立全局视角：Clash YAML vs sing-box JSON

在把订阅导入支持 sing-box 核心的工具（如 Hiddify、Karing、v2rayN、HomeProxy 或原版 SFI/SFA）前，先搞清楚两者的思维差异：

| 对比维度 | Clash / Mihomo 核心 | sing-box 核心 |
|---|---|---|
| **配置文件格式** | **YAML**（依赖空格缩进，允许行内 `#` 注释） | **JSON**（成对花括号 `{}`，标准 JSON 不支持注释） |
| **入站接管方式** | 全局 `mixed-port` 与 `tun` 平级字段 | 统一归口在 `inbounds` 数组中定义不同入口对象 |
| **节点与分组概念** | `proxies`（节点）与 `proxy-groups` 分开写 | **全部统一叫做 `outbounds`**（机场节点、自动测速组、`direct`、`block` 全在一起） |
| **分流规则格式** | `rules` 字符串列表 + 内置规则提供者 | `route.rules` 对象数组 + 高性能二进制 `.srs` `rule_set` |
| **架构与跨端覆盖** | 在开源桌面客户端与 OpenClash 上生态最庞大 | OpenWrt 官方推荐 HomeProxy 核心、Hiddify/SFI 原生核心 |

*(两款核心的完整软件矩阵差异详见 [Mihomo、sing-box 与 FlClash 核心区别](/clients/mihomo-vs-singbox-vs-flclash))*。

---

## 二、拆解一份精简 sing-box 配置的五大核心区块

下面是一份高度浓缩的结构化模型，帮你看懂每一段代码在整套网络流转中负责什么工作（注意：不同小版本对 DNS 与实验字段要求可能有微调，仅作结构演示）：

```json
{
  "log": { "level": "info", "timestamp": true },
  "dns": {
    "servers": [
      { "tag": "dns_proxy", "address": "https://8.8.8.8/dns-query", "detour": "proxy" },
      { "tag": "dns_direct", "address": "223.5.5.5", "detour": "direct" }
    ],
    "rules": [
      { "rule_set": "geosite-cn", "server": "dns_direct" }
    ],
    "final": "dns_proxy"
  },
  "inbounds": [
    { "type": "tun", "tag": "tun-in", "address": ["172.19.0.1/30"], "auto_route": true },
    { "type": "mixed", "tag": "mixed-in", "listen": "127.0.0.1", "listen_port": 7890 }
  ],
  "outbounds": [
    { "type": "selector", "tag": "proxy", "outbounds": ["auto", "HK-01", "JP-01"] },
    { "type": "urltest", "tag": "auto", "outbounds": ["HK-01", "JP-01"] },
    { "type": "direct", "tag": "direct" }
  ],
  "route": {
    "auto_detect_interface": true,
    "rule_set": [
      { "tag": "geosite-cn", "type": "remote", "format": "binary", "url": "https://example.com/geosite-cn.srs" }
    ],
    "rules": [
      { "protocol": "dns", "action": "hijack-dns" },
      { "ip_is_private": true, "outbound": "direct" },
      { "rule_set": "geosite-cn", "outbound": "direct" }
    ],
    "final": "proxy"
  }
}
```

### 各部分人话解说：
1. **`log`（日志模块）**：排障时把 `level` 调为 `debug` 能看见每条域名究竟走了哪一条规则和哪一个出口；日常设为 `info` 或 `warn`。
2. **`dns`（域名解析模块）**：防止 DNS 泄漏与国内网站解析慢的关键。常见思路是把命中中国域名规则集 (`geosite-cn`) 的域名发往本地阿里/腾讯 DNS 并走 `direct`，其余国外域名走加密代理通道解析。
3. **`inbounds`（流量入口）**：相当于客户端张开耳朵听请求的地方——`mixed` 对应桌面传统系统代理端口，而 `tun` 负责拦截全机层级的三层数据包。
4. **`outbounds`（流量出口与策略组）**：不管是机场的 Shadowsocks / VLESS / Hysteria 2 节点，还是手动切换器 (`selector`)、自动低延迟测速 (`urltest`)、直连 (`direct`)，全都在这里用 `tag` 命名，供 `route` 点名调遣。
5. **`route`（总交通指挥中心）**：从上到下按规则逐行匹配：`rules` 里把私有内网 IP、国内域名转交 `direct`，找不到匹配项的海外流量最后全部兜底交给 `final: "proxy"`。

---

## 三、新手改写 sing-box 最容易出错的 4 个高频坑

1. **直接把“官方 Clash 订阅”硬塞进原版 sing-box App**：请先确认你买的品牌面板本身提供 **sing-box 订阅链接**（或者选择支持把通用订阅自动格式化的跨端工具如 Karing、Hiddify、v2rayN，并且记住 [专属客户端机场](/risks/exclusive-client-lockin) 根本没订阅可转）。
2. **忽略版本号差异复制旧文章**：sing-box 从 1.8 → 1.11 → 1.12 经历了数次字段重构（例如废除旧 `outbound: dns` 改用 `action: "hijack-dns"`、`geoip/geosite` 彻底迁往 `rule_set` 二进制文件）。复制网上配置报错时，第一时间看日志明确提示哪一行 `deprecated`（已弃用）。
3. **JSON 末尾多了一个逗号**：JSON 语法不允许数组或对象最后一行带尾随逗号 `,`，手改后最好用命令跑一遍：
   ```bash
   sing-box check -c config.json
   ```
4. **忘记 `rule_set` 本身需要下载外链**：如果配置的远程 `.srs` 规则集地址刚好被本地屏蔽、同时忘了写 `download_detour: "proxy"` 或 `direct` 下载通道，客户端首次启动就会卡死在拉取规则上！

---

## 四、实用建议：普通人需不需要自己手写 sing-box 配置？

不需要从零手敲！对于绝大多数想省心使用 sing-box 内核的用户，推荐下面两条稳妥路径：
- **桌面与移动端用户**：直接使用 **Hiddify**、**Karing** 或 **v2rayN（内置 sing-box 核心切换）**，软件会自动帮你处理协议转换、`.srs` 分流规则集更新与 DNS 防泄漏模板；
- **OpenWrt 软路由用户**：选用 **HomeProxy**（或继续使用 Mihomo 生态的 OpenClash / Nikki），只需输入机场提供的标准订阅 URL 即可在 LuCI 网页勾选国内绕过规则，无需手写数百行 JSON。

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>机场发给我的订阅链接是 Clash 格式（YAML），可以直接原封不动放进 sing-box 核心里运行吗？</summary>

不能直接通用，YAML 与 JSON 结构完全不兼容。需要机场本身提供 sing-box 订阅链接，或者通过支持格式兼容的图形端（如 v2rayN、Hiddify、Karing）自动解析转换。

</details>

<details class="ad-faq-details">
<summary>为什么网上找来的旧 sing-box 配置文件在最新版（1.11 / 1.12+）软件里会直接报错退出？</summary>

sing-box 更新节奏快且会移除旧版不推荐用法（如旧内置 `geoip`/`geosite`、旧 DNS 劫持出站），新版强推 `.srs` 二进制 `rule_set` 与 `route.rules` 新 `action` 语法。

</details>

<details class="ad-faq-details">
<summary>一份标准的 sing-box JSON 配置文件里，最关键的五大顶层模块分别管什么？</summary>

分别由 `log` 管排错记录、`dns` 管域名分流解析、`inbounds` 管收流量入口、`outbounds` 管出口与节点分组、`route` 管最终路由规则调度。

</details>

<details class="ad-faq-details">
<summary>OpenWrt 软路由里的 HomeProxy 与 Mihomo/OpenClash 相比，sing-box 到底优势在哪里？</summary>

sing-box 原生支持极全协议且内存占显著更低、多核调度效率高，在轻量级路由器和 OpenWrt 官方包库中维护度与响应速度优势突出。

</details>

<details class="ad-faq-details">
<summary>我自己手写或修改 sing-box JSON 配置时，怎么最快检查语法有没有少括号或写错字段？</summary>

运行核心命令 `sing-box check -c config.json` 可立刻输出精准到具体字段的语法与版本兼容报错；日常小改建议只调 `outbounds` 与 `route` 里的目标规则集。

</details>