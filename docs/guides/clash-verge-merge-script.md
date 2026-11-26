---
title: Clash Verge Rev Merge 与 Script 覆写实战：永久锁定个人规则不随订阅刷新丢失
shortTitle: Merge 与 Script 覆写实战
description: 详细演示 Clash Verge Rev 下的局部 Merge 规则置顶（prepend-rules / prepend-proxies）与全局 JavaScript Script 动态注入，确保每次更新机场订阅后个人 AI 选区、公司内网直连与 Gemini 分流规则永久保留并生效。
pageType: docs
verifiedAt: 2026-11-26
publishedAt: 2026-11-26
updatedAt: 2026-11-26
author: 机场数据编辑与性能实验室
sourceNote: 语法严格依据 Mihomo / Clash Verge Rev 官方内置 Merge 扩展配置与 Script main(config) 规范编写。
faq:
  - q: 为什么在 Clash Verge Rev 里直接修改订阅文件，过几天又被还原了？
    a: 因为右键“编辑文件（Edit File）”修改的是从机场官网服务器直接拉取下来的**原始订阅缓存副本**。只要软件执行了一次“更新订阅（无论是手工点击还是 24 小时自动定时更新）”，新拉下来的 YAML 文件就会整份覆盖旧文件！要想永久保存自己的规则，必须改用“**编辑扩展配置 (Merge)**”或“**扩展脚本 (Script)**”——这两者在软件底层会在每次拉完机场最新节点之后，自动执行一次无损叠加合并。
  - q: Merge 和 Script 两种覆写模式选哪个更容易上手？
    a: 90% 的普通进阶用户优先选用 **Merge（YAML 覆写）**：语法极其简单，只需要用 `prepend-rules:` 把需要强制直连的公司内网或强行定向给 `AI` 组的域名置顶即可；只有当您需要动态遍历机场全部节点名称（例如自动抓取名字里含 `新加坡` 的节点自动新建一个专门给 Gemini 用的手动组、且随着机场增减新加坡节点自动同步），才需要用到 **Script（JS 脚本）**。
  - q: "写了 `prepend-rules` 后保存却报错或者根本没效果是什么原因？"
    a: 绝大多数情况是“策略组名称拼写没有一字不差地对齐”！举例来说，有的机场配置里 AI 策略组叫 `🤖 OpenAI`（前面带 Emoji 和空格），有的叫 `AI服务`，有的叫 `ChatGPT`；如果您的覆写规则最后写成了 `AI`，但当前配置里压根没有这个组名，Mihomo 内核加载时会直接报错拒收。务必先点进原始配置或界面上复制完全一致的准确名称再填。
  - q: 如何让覆写规则在切换备用机场时也能自动通用？
    a: Clash Verge Rev 把两者分得很清楚：在“订阅 (Profiles)”页某一张具体订阅卡片上右键选 **“编辑扩展配置 / 扩展脚本”**，它只对这一个机场生效；如果您同时买了两家机场备用并希望所有订阅切换时都继承同一套公司内网直连与 AI 分流，点击该页面的 **“全局扩展配置 (Global Merge)”** 或 **“全局扩展脚本 (Global Script)”** 即可一劳永逸全库通吃！
  - q: 更新覆写保存并切换了分组策略，为什么网页还报错地区不支持？
    a: YAML 对缩进（只能用空格，绝不能按 Tab 制表符）和英文半角标点非常敏感！常见失误包括：中文全角逗号 `，` 代替了英文 `,`；`- DOMAIN-SUFFIX...` 这一行前面的空格数跟上下没对齐（标准为 2 个空格）；或者策略组名字里包含冒号 Emoji 时外部没规范引用。写完先借助软件编辑器报错行号检查，再点激活测试。
---

# Clash Verge Rev Merge 与 Script 覆写实战：永久锁定个人规则不随订阅刷新丢失

**在电脑上调教好一套“公司内网 100% 直连、日常网页走香港、ChatGPT 固定走日本、Gemini 单独走新加坡”的完美分流体验后，最让人泄气的瞬间就是：机场例行更新了一次订阅列表，你辛苦手工加进去的规则一夜之间全被覆盖清空！解决这个痛点的官方正规方法，就是利用 [Clash Verge Rev](/clients/clash-verge) 内置的无损覆写（Merge & Script）机制。**

---

## 一、看懂底层执行顺序：为什么覆写不会丢？

每当 Clash Verge Rev 拉取更新一次订阅时，它在后台按固定流水线组装最终送给 Mihomo 内核的生效配置：

```text
[机场服务器最新原始 YAML (节点池变化)]
        │
        ▼ (自动加载叠加)
[局部 / 全局 Merge 扩展配置 (prepend-rules / dns)]
        │
        ▼ (动态脚本二次处理)
[局部 / 全局 Script JS 脚本 (自动生成策略组)]
        │
        ▼
[最终交给 Mihomo 内核运行的有效配置 ✅ (只增改你指定的局部，节点列表永远最新！)]
```

因此，**绝对不要直接点“编辑文件”去改下载来的机场主配置**；全部个人诉求一律放进 **Merge** 或 **Script** 里！

---

## 二、方案 A：新手最省心的 `Merge (YAML 扩展配置)` 实战模板

适合绝大多数场景：**机场本身已经配好了各种国家或 AI 策略组**，您只是需要把漏掉的域名塞进去、或者把公司内网 IP 置顶保护起来。

### 操作步骤与直接可用模板
1. 打开 **Clash Verge Rev** → 左侧 **“订阅 (Profiles)”**；
2. 鼠标右键单击当前正在使用并打勾激活的订阅卡片（或点击页面右上角的全局图标配置“全局扩展配置”），选择 **“编辑扩展配置 (Edit Merge)”**；
3. 将下方对应您需求的代码段复制粘贴进去（**注意将策略组名称改成您配置里实际显示一模一样的名字**）：

```yaml
# ==========================================
# Clash Verge Rev 实用置顶分流 Merge 模板
# 注意：使用空格缩进（2格），切勿用中文逗号或 Tab！
# ==========================================

# 1. 置顶规则（优先级最高，First-Match 最先匹配拦截）
prepend-rules:
  # [保护公司/校园内网与开发本地回环] 强制直连不走节点也不扣流量
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - DOMAIN-SUFFIX,internal.company.com,DIRECT
  - DOMAIN-SUFFIX,local,DIRECT

  # [AI 域名精准补漏防拦截] 假设你订阅里的 AI 组名正好叫 "AI"（若叫 "OpenAI" 或带表情，请严格替换！）
  - DOMAIN-SUFFIX,claude.ai,AI
  - DOMAIN-SUFFIX,anthropic.com,AI
  - DOMAIN-SUFFIX,claudeusercontent.com,AI
  - DOMAIN-SUFFIX,openai.com,AI
  - DOMAIN-SUFFIX,chatgpt.com,AI
  - DOMAIN-SUFFIX,oaistatic.com,AI
  - DOMAIN-SUFFIX,oaiusercontent.com,AI

# 2. 若需防止开启 Fake-IP 模式后某些内网/网银/NTP 校验报错，可安全追加跳过列表
dns:
  fake-ip-filter-mode: blacklist
  fake-ip-filter:
    - "+.lan"
    - "+.local"
    - "time.*.com"
    - "ntp.*.com"
```

4. 点击右下角 **Save（保存）** → 重新点击激活一次该订阅卡片让内核重载（或进“连接”页面点 **Close All** 关闭旧连接）即可实时生效！

---

## 三、方案 B：高阶 `Script (JavaScript)` —— 自动为您抓出独立“Gemini 新加坡组”

如果某家机场原始配置压根**没有独立分出 `Gemini` 组和 `Claude` 固定组**（或者每次换用不同机场时不想一条条核对它们千奇百怪的中文策略组名字），**全局 Script（JavaScript）** 才是最一劳永逸的终极写法：它能在代码里自动扫描机场下发的所有节点，自己挑出名字带新加坡或美国的节点自动建好一个独立 `select` 手动策略组，完全不受原机场怎么命名影响！

### 在“扩展脚本 (Edit Script)”中填入以下逻辑：
```javascript
// Clash Verge Rev (Mihomo) 实用全局扩展脚本示例
function main(config) {
  if (!config || !Array.isArray(config.proxies)) return config;

  // 1. 从全部节点中自动筛选出新加坡节点（用于 Gemini 防地区出错）
  const sgNodes = config.proxies
    .filter((p) => /新加坡|狮城|SG|Singapore/i.test(p.name))
    .map((p) => p.name);

  // 2. 自动筛选出日本或美国节点（用于 Claude 固定单一出口防封号）
  const aiNodes = config.proxies
    .filter((p) => /日本|JP|Tokyo|美国|US|America|新加坡|SG/i.test(p.name))
    .map((p) => p.name);

  config["proxy-groups"] = config["proxy-groups"] || [];

  // 如存在可用节点，自动注入两个纯手动选择(select)策略组，绝不乱跳切 IP！
  if (sgNodes.length > 0) {
    config["proxy-groups"].unshift({
      name: "My-Gemini",
      type: "select",
      proxies: sgNodes,
    });
  }

  if (aiNodes.length > 0) {
    config["proxy-groups"].unshift({
      name: "My-AI-Fixed",
      type: "select",
      proxies: aiNodes,
    });
  }

  // 3. 在规则列表最顶部强制插入精准路由
  const customRules = [
    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
  ];

  if (sgNodes.length > 0) {
    customRules.push(
      "DOMAIN-SUFFIX,gemini.google.com,My-Gemini",
      "DOMAIN-SUFFIX,aistudio.google.com,My-Gemini",
      "DOMAIN-SUFFIX,generativelanguage.googleapis.com,My-Gemini"
    );
  }

  if (aiNodes.length > 0) {
    customRules.push(
      "DOMAIN-SUFFIX,claude.ai,My-AI-Fixed",
      "DOMAIN-SUFFIX,anthropic.com,My-AI-Fixed",
      "DOMAIN-SUFFIX,openai.com,My-AI-Fixed",
      "DOMAIN-SUFFIX,chatgpt.com,My-AI-Fixed"
    );
  }

  config.rules = [...customRules, ...(config.rules || [])];
  return config;
}
```

### 为什么这套脚本极受程序员和重度 AI 用户欢迎？
- 您把 **`My-Gemini`** 和 **`My-AI-Fixed`** 均定义为了 **`select`（纯手动固定挑选）**，彻底杜绝了机场默认自动测速切换在后台每隔 10 分钟帮您的 Claude 账号换国家从而触发封号！
- 哪怕您同时购买了主力机场 A 和备胎机场 B（均支持通用订阅，如 [光速云](/brands/guangsuyun)、[星岛梦](/brands/xingdaomeng)、[唯兔云](/brands/weitu)），只要在全局扩展脚本开启它，切到任何一家都立刻自带这套安全架构。

---

## 四、改完覆写后的排错与生效验证 checklist

1. **查看“订阅卡片预览”或运行时日志确认无 Syntax Error**：保存时如果左下角弹出红色错误通知，检查是不是脚本末尾缺花括号 `}` 或 YAML 复制时误删了开头空格。
2. **切进“代理 (Proxies)”看一眼新组有没有出现**：使用 Script 模式后，顶部应该会多出 `My-Gemini` 和 `My-AI-Fixed` 两个分组；手动点开它并固定选定一个低编号以外的新/日/美稳定节点。
3. **验证命中率**：打开 Clash Verge Rev 左侧 **“连接 (Connections)”**，浏览器新开无痕窗口访问 `gemini.google.com` 或 `claude.ai`，在连接日志搜索对应域名，看到最右边“规则与链路”清晰写着走了 **`My-Gemini`** 或 **`My-AI-Fixed`** 而非原来的默认香港大组，才代表 100% 大功告成！

---

## 五、常见问题（FAQ）

<details class="ad-faq-details" open>
<summary>为什么在 Clash Verge Rev 里直接修改订阅文件，过几天又被还原了？</summary>

直接修改原配置文件会在下次自动或手动“更新订阅”时被新下发的服务器配置整份覆盖。个人长期保留自定义规则必须写在“扩展配置 (Merge)”或“扩展脚本 (Script)”内，每次更新会自动在底包之上重新叠加合并。

</details>

<details class="ad-faq-details">
<summary>Merge 和 Script 两种覆写模式选哪个更容易上手？</summary>

只想在机场原有策略组名上增减几条域名和直连 IP，用简洁的 **Merge (`prepend-rules`)** 就够；希望无论换哪家机场都能自动筛选国家节点并创建独立的 `select` 防封固定分组，用一次写好终身省心的 **Script (JS)**。

</details>

<details class="ad-faq-details">
<summary>写了 `prepend-rules` 后保存却报错或者根本没效果是什么原因？</summary>

90% 原因是目标策略组名字没和原始配置完全一致（比如原配置带有表情符号 `🤖 OpenAI` 而规则只写了 `OpenAI`），或者是 YAML 缩进使用了 Tab 键以及中文全角逗号 `，`。

</details>

<details class="ad-faq-details">
<summary>如何让覆写规则在切换备用机场时也能自动通用？</summary>

在 Clash Verge Rev 订阅页启用 **“全局扩展配置 (Global Merge)”** 或 **“全局扩展脚本 (Global Script)”**（而非仅仅挂载到单一某张卡片的局部扩展），即可对所有支持通用订阅的机场自动统一直出。

</details>

<details class="ad-faq-details">
<summary>更新覆写保存并切换了分组策略，为什么网页还报错地区不支持？</summary>

改完策略组之后，浏览器底层和服务器之间依然连着旧的长连接，同时缓存着上一次访问留下的地域 Cookie。必须进“连接”页面点 **Close All** 关闭活跃长连接，再用无痕窗口重新打开测试网页验证。

</details>
---

## 下一步阅读与工具入口

- 返回二级中心：[Clash 分流规则策略配置](/guides/clash-rules) ｜ [使用教程首页](/guides/)
- 对应客户端专篇：[Clash Verge Rev 下载安装与配置](/clients/clash-verge) ｜ [Clash TUN 冲突排查](/diagnostics/clash-tun-conflict)
- AI 实际防封配置：[Claude 连接与防封排查](/streaming-ai/claude-access-and-ban-guide) ｜ [Gemini 地区不支持排查](/streaming-ai/gemini-region-and-error-fix)
