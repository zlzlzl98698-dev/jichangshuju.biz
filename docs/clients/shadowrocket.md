---
title: Shadowrocket（小火箭）iOS 安装、订阅导入与分流规则完全指南
shortTitle: Shadowrocket 小火箭
description: Shadowrocket（小火箭）iPhone/iPad 技术档案与教程：非大陆区 App Store 购买与防锁机守则、VLESS/Trojan/HY2 全协议导入、分流配置选择、50MB 内存优化及兼容品牌清单。
pageType: docs
verifiedAt: 2026-10-19
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑组
sourceNote: 依据第三方代理客户端核查清单及 iOS 端兼容性矩阵整理；商店售价随汇率及各区 App Store 实时展示浮动。
softwareApp:
  name: Shadowrocket
  os: iOS, iPadOS
faq:
  - q: Shadowrocket（小火箭）在 iPhone 上是免费的吗？去哪下？
    a: 不是免费软件。Shadowrocket 在中国大陆区 App Store 已下架，在美区、港区、日区等海外区 App Store 显示为一次性付费买断应用（具体金额以登录对应区商店的实时标价为准）。切勿下载应用商店里名字类似且免费但包含“每周自动高额扣费订阅”的高仿山寨应用；若预算为零，可优先改用外区完全免费的 Karing、Streisand 或 Hiddify。
  - q: 借用共享 Apple ID 下载小火箭有什么必须遵守的安全红线？
    a: 最核心的一条生命线：只能在 iPhone 的“App Store”应用内右上角头像处退出自己账号并登录下载，下载完毕后立刻退出切回自己的国区 ID；绝对不能在 iPhone“系统设置”最顶部的“Apple ID（iCloud）”登录他人账号！一旦登进系统 iCloud，账号持有者可随时远程开启丢失模式将你的手机直接锁死变砖。
  - q: 为什么有的机场找不到小火箭导入按钮或导入后提示无节点？
    a: 请先核查所购机场是否开放第三方通用订阅。例如飞猫云、隐形人、SOGO 云以及 2026-10 之后的 Firefly、无忧链接、灵猫网络近期采取专属客户端策略，完全不向用户输出通用订阅链接，因此无法导入 Shadowrocket；需要配小火箭的用户请选购光速云、星岛梦、暮光加速、一翻云、梯子云等开放第三方订阅的品牌。
  - q: 小火箭的“全局路由”应当选“配置”还是“代理”？
    a: 日常使用务必保持在“配置（Config）”模式！选“代理（Proxy）”等于强制全局代理，会导致微信、淘宝、支付宝、网银等全部国内流量绕地球一圈再回来，不仅国内软件卡成慢动作，还会急速浪费掉你买的珍贵套餐流量；选“配置”则会由分流规则自动判断国内直连、国外走节点。
  - q: 如何保证机场换节点 IP 时小火箭能自动跟上？
    a: 强烈建议打开 Shadowrocket 底部“设置 → 订阅”页面，将“打开时更新”以及“后台自动更新”打开。这样每次开启小火箭时会自动向机场服务器拉取最新的有效节点端口与域名，不会出现节点列表过期的问题。
---

# Shadowrocket（小火箭）iOS 安装、订阅导入与分流规则完全指南

**Shadowrocket（中文用户俗称“小火箭”）是苹果 iPhone 与 iPadOS 平台上装机率最高、运行最稳定且内存控制极其克制的第三方代理客户端。它原生支持 Shadowsocks、VMess、VLESS（含 Reality）、Trojan、Hysteria 2 与 WireGuard 等主流协议，并内置精确的 URL 连通性测速、按 Wi-Fi/蜂窝网络策略切换及流量统计面板。**

---

## 一、软件基础档案与购买防骗指南

| 属性 | 核实详情 |
|---|---|
| **适用平台** | iOS / iPadOS（以及搭载 Apple Silicon M 芯片并允许侧载的 Mac，但 Mac 端建议优先使用原生桌面端） |
| **付费与上架状态** | 中国大陆区 App Store **未上架**；美区/日区/港区等海外商店为**一次性付费买断应用**（以目标区 App Store 实时展示价格为准） |
| **免费替代推荐** | 暂不愿购买小火箭的用户，可直接在外区 App Store 免费下载正版 `Karing`、`Streisand` 或 `Hiddify` |
| **兼容协议与格式** | 通用 Base64 节点列表、单节点二维码扫描、Clash YAML 链接转换解析（SS/VMess/VLESS/Trojan/HY2） |

> [!CAUTION] 三大购买与账号安全警报
> 1. **切勿误购李鬼高仿应用**：外区商店中存在大量名称带有 `Shadowrocket VPN`、`小火箭 Pro` 的假冒 App，主打“免费下载 + 七天免费试用后每周自动扣费数十美元”，下载前请认准原版开发者 `Shadow Launch Technology Limited`（以及商店里明确标明一次性买断标价的正版）。
> 2. **绝不登录共享账号到系统设置（iCloud）**：只可在 **App Store 商店内部** 右上角切换登录买断账号；绝对不要在手机“系统设置 → 顶部 Apple ID”登录陌生人的号，防范隐私泄密与恶意锁机。
> 3. **国内微信/淘宝代充前先注册自己的号**：最长期安全的资产逻辑是用自己的邮箱注册并持有一个独立海外区 Apple ID，即使购买礼品卡兑换余额充值买断小火箭，软件升级永久绑定在你自己账号名下。

---

## 二、机场兼容性说明：哪些品牌支持导入小火箭？

- **原生完美兼容品牌**：**[光速云](/brands/guangsuyun)**、**[星岛梦](/brands/xingdaomeng)**、**[暮光加速](/brands/muguang)**、**[唯兔云](/brands/weitu)**、**[一翻云](/brands/yifan)**、**[二猫云](/brands/ermao)**、**[梯子云](/brands/tiziyun)**、**[速界](/brands/sujie)**、**[可信云](/brands/kexin)** 等提供第三方通用订阅的品牌，均可在官网一键导入小火箭或复制订阅地址手动添加。
- **不兼容提示**：**[飞猫云](/brands/feimao)**、**[SOGO 云](/brands/sogo)**、**[隐形人](/brands/yinxingren)** 以及部分近期仅限自研客户端的品牌无法获取通用订阅，无法在小火箭里配置。详细边界见 [31 品牌兼容性全表](/database/clients)。

---

## 三、三分钟配置完成：从导入订阅到分流设置

### 1. 导入订阅链接
1. 登录您的机场官网后台，点击 **“复制通用订阅链接 / 一键导入 Shadowrocket”**（若网页一键导入提示在 Safari 中打开，点击允许跳转即可自动导入）。
2. 手动导入方法：打开小火箭右上角 **`+`** 号 → 第一行“类型”选择 **`Subscribe`（订阅）** → 在 URL 栏粘贴链接 → 在备注填写机场品牌名称 → 点击右上角 **“完成”** 保存并等待自动拉取节点清单。

### 2. 正确设定“全局路由”与分流配置
- 在小火箭首页列表找到 **“全局路由 (Global Routing)”** 一栏，点击进去务必将其设定为 **`配置（Config）`**（严禁长期挂在“代理 Proxy”上导致国内软件和网银龟速且狂烧流量）。
- 切换到小火箭底部导航栏第二个 **“配置（Config）”** 页面：确保当前“本地文件”或“远程文件”里有一份已激活的规则配置（如默认配置或您信赖的常见国内外分流规则，能确保常见国内 IP/域名自动直连 `DIRECT`）。

### 3. 开启自动更新订阅与真延迟测试
- 点击首页中部的 **“连通性测试”**，可以看到每个节点右侧出现绿色数字（单位为毫秒 ms，越小越快；显示 `Timeout` 说明该节点超时或已维护）。
- 切到底部 **“设置 → 订阅”**，强烈建议打开 **“打开时更新”**（避免后续机场更换节点地址或域名后旧名单全部失效）。

### 4. iOS 内存稳定性小贴士（防后台 50MB 爆内存断连）
苹果 iOS 限制 VPN 网络插件进程的内存上限仅约 50MB。如果在小火箭中引入了几十万行的全量去广告规则或极其臃肿的重写规则集，会导致手机熄屏一会就杀进程断开连接。保持轻量级常规国内外分流规则，是在 iPhone 上获得全天不断连体验的秘诀。

---

## 四、信息边界与诚实披露

- **软件与线路职责分离**：Shadowrocket 本身只是一个纯本地软件工具，本身不包含任何海外服务器节点。即使买好了小火箭，后续访问速度、ChatGPT 解锁与 Netflix 4K 流畅度仍然完全取决于你往里面导入的机场节点品质。
- **更多参考入口**：若需对比 iOS 端免费开源替代软件（Karing/Streisand）与付费高阶方案（Stash/Surge 5），请直接查看 [iOS 客户端全集](/clients/ios)。

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>Shadowrocket（小火箭）在 iPhone 上是免费的吗？去哪下？</summary>

不是免费的。在中国大陆区 App Store 无法搜索到，需使用非大陆区（如美区、港区、日区）Apple ID 在正版 App Store 付费买断下载；暂不愿付费的用户可以先在外区商店下载完全免费的 Karing 或 Streisand。

</details>

<details class="ad-faq-details">
<summary>借用共享 Apple ID 下载小火箭有什么必须遵守的安全红线？</summary>

只能在 App Store 应用内右上角短暂切换账户下载，下载完即刻退回自己的账号；绝对禁止在 iPhone“系统设置 → iCloud”登录别人发来的共享账号，防止设备被远程锁死。

</details>

<details class="ad-faq-details">
<summary>为什么有的机场找不到小火箭导入按钮或导入后提示无节点？</summary>

部分品牌（如飞猫云、SOGO 云、隐形人等）采用纯粹的品牌专属 App 模式，不向外界开放标准通用订阅链接。必须选购如光速云、星岛梦、一翻云等明确支持第三方订阅导入的机场才能导入小火箭。

</details>

<details class="ad-faq-details">
<summary>小火箭的“全局路由”应当选“配置”还是“代理”？</summary>

日常务必选 **“配置（Config）”**，实现国内流量直连不扣费、国外流量走节点代理；只有在特殊排查测试所有本地直连干扰时，才临时切到“代理（Proxy）”用完即切回。

</details>

<details class="ad-faq-details">
<summary>如何保证机场换节点 IP 时小火箭能自动跟上？</summary>

进入小火箭底部“设置 → 订阅”，打开“打开时更新”开关即可每次启动代理自动从机场同步最新可用节点列表。

</details>
---

## 下一步阅读与工具入口

- 返回一级专题：[客户端软件全平台总览](/clients/)
- 移动与系统级比对：[iPhone / iPad 客户端大全](/clients/ios) ｜ [手机端 VPN 安全与避坑](/vpn/mobile)
- 故障自助排除：[机场订阅更新失败怎么修](/diagnostics/subscription-failed) ｜ [全节点超时故障排查](/diagnostics/all-timeout)
