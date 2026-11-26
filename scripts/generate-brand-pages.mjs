import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));

const brands = readJson('data/brands/brands.json');
const plans = readJson('data/plans/plans.json');
const speedtests = readJson('data/speedtests/speedtests.json');
const availability = readJson('data/availability/availability.json');
const conflicts = readJson('data/sources/data-conflicts.json');

const billingMap = {
  monthly: '月付',
  quarterly: '季付',
  semiannual: '半年付',
  annual: '年付',
  biennial: '两年付',
  triennial: '三年付',
  'one-time': '不限时/一次性',
};

const statusMap = {
  supported: '支持 / 解锁',
  partial: '视节点而定',
  unsupported: '实测多失败',
  vendor: '品牌资料标注支持',
  untested: '未测试',
  pending: '待核实',
};

const peerCompareMap = {
  muguang: ['[光速云 vs 暮光加速](/compare/guangsuyun-vs-muguang)', '[光速云](/brands/guangsuyun)', '[二猫云](/brands/ermao)'],
  feimao: ['[光速云 vs 飞猫云](/compare/guangsuyun-vs-feimao)', '[无忧链接](/brands/wuyou)', '[SOGO 云](/brands/sogo)'],
  xingdaomeng: ['[光速云 vs 星岛梦](/compare/guangsuyun-vs-xingdaomeng)', '[唯兔云](/brands/weitu)', '[光速云](/brands/guangsuyun)'],
  weitu: ['[唯兔云 vs Firefly](/compare/weitu-vs-firefly)', '[星岛梦](/brands/xingdaomeng)', '[一翻云](/brands/yifan)'],
  firefly: ['[唯兔云 vs Firefly](/compare/weitu-vs-firefly)', '[闪跃](/brands/shanyue)', '[微风网络](/brands/weifeng)'],
  dalaoyun: ['[5.6元平价档 5 品牌对比](/compare/budget-tier-56)', '[闪电鼠](/brands/shandianshu)', '[榴莲云](/brands/liulianyun)'],
  shandianshu: ['[5.6元平价档 5 品牌对比](/compare/budget-tier-56)', '[大佬云](/brands/dalaoyun)', '[云界线](/brands/yunjiexian)'],
  yunjiexian: ['[5.6元平价档 5 品牌对比](/compare/budget-tier-56)', '[环球梯](/brands/huanqiuti)', '[闪电鼠](/brands/shandianshu)'],
  liulianyun: ['[5.6元平价档 5 品牌对比](/compare/budget-tier-56)', '[大佬云](/brands/dalaoyun)', '[闪电鼠](/brands/shandianshu)'],
  huanqiuti: ['[5.6元平价档 5 品牌对比](/compare/budget-tier-56)', '[云界线](/brands/yunjiexian)', '[大佬云](/brands/dalaoyun)'],
};

let count = 0;
for (const b of brands) {
  if (b.brandId === 'guangsuyun') continue;

  const bPlans = plans.filter((p) => p.brandId === b.brandId);
  const bTests = speedtests.filter((s) => s.brandId === b.brandId);
  const bAvail = availability.filter((a) => a.brandId === b.brandId);
  const bConflicts = conflicts.filter((c) => c.brandId === b.brandId);

  const isLowData = b.completenessScore < 60;
  const isExclusive = b.officialClient === 'exclusive';
  const isHistoricalTail = ['lingdong', 'langwang', 'edgenova'].includes(b.brandId);

  const periodicPlans = bPlans.filter((p) => p.billingType !== 'one-time' && p.billingMonths);
  const annualPlans = bPlans.filter((p) => p.billingType === 'annual' && p.billingMonths);
  const monthlyPlans = bPlans.filter((p) => p.billingType === 'monthly');
  const oneTimePlans = bPlans.filter((p) => p.billingType === 'one-time');

  const periodicPrices = periodicPlans.map((p) => +(p.price / p.billingMonths).toFixed(2));
  const minEq = periodicPrices.length ? Math.min(...periodicPrices) : null;
  const minMonthly = monthlyPlans.length ? Math.min(...monthlyPlans.map((p) => p.price)) : null;

  const planRows = bPlans
    .map((p) => {
      const avg = p.billingType !== 'one-time' && p.billingMonths ? `¥${(p.price / p.billingMonths).toFixed(2)}/月` : '一次性按需';
      const perGb =
        p.trafficGB && p.trafficGB > 0
          ? p.billingType === 'one-time'
            ? `¥${(p.price / p.trafficGB).toFixed(3)}/GB`
            : p.billingMonths
              ? `¥${(p.price / p.billingMonths / p.trafficGB).toFixed(3)}/GB`
              : '待核实'
          : '待核实';
      const trafficStr = p.trafficGB !== null ? `${p.trafficGB} GB${p.trafficResetCycle === 'monthly' ? '/月' : ' 一次性'}` : '待核实';
      const note = p.trafficNote ? `（${p.trafficNote}）` : '';
      return `| ${p.planName}${note} | ${billingMap[p.billingType] || p.billingType} | ¥${p.price} | ${avg} | ${trafficStr} | ${perGb} | ${p.discountRestrictions} |`;
    })
    .join('\n');

  // Unit economics & 12-month scenario section for brands with multi-tier plans
  const unitEconSection = (() => {
    if (bPlans.length <= 1) {
      return `## 单位流量成本与预算定位\n\n${b.name} 在现有资料中仅收录了单一参考档位（${bPlans[0]?.planName || '待核实'}），折算月均成本约为 ${minEq !== null ? `¥${minEq}/月` : '待核实'}。由于缺少同品牌月付、季付及大流量档明细，尚无法建立内部多周期差价对照；建议查看 [10元以内预算账本](/pricing/10-yuan-budget) 或 [套餐成本计算器](/database/plans) 进行跨品牌比价。`;
    }
    const lines = [];
    if (annualPlans.length && monthlyPlans.length) {
      const a = annualPlans[0];
      const m = monthlyPlans[0];
      const m12 = +(m.price * 12).toFixed(2);
      const diff = +(m12 - a.price).toFixed(2);
      lines.push(`- **入门年付 vs 连续12个月月付**：年付档 **${a.planName}**（¥${a.price}/年，每月 ${a.trafficGB ?? '—'} GB）折合 **¥${(a.price / 12).toFixed(2)}/月**；而最入门月付档 **${m.planName}**（¥${m.price}/月，每月 ${m.trafficGB ?? '—'} GB）连买 12 个月总支出为 **¥${m12}**，年付总支出比连买月付低 **¥${diff}**，但年付月流量通常低于月付起步档，适合月流量稳定在 ${a.trafficGB ?? 60}GB 以内的固定轻度用户。`);
    }
    const bestPeriodicPerGb = periodicPlans
      .filter((p) => p.trafficGB && p.trafficGB > 0 && p.billingMonths)
      .map((p) => ({ name: p.planName, val: +(p.price / p.billingMonths / p.trafficGB).toFixed(3), price: p.price, gb: p.trafficGB }))
      .sort((x, y) => x.val - y.val)[0];
    if (bestPeriodicPerGb) {
      lines.push(`- **最低单位流量成本拐点**：在 ${b.name} 周期套餐中，**${bestPeriodicPerGb.name}**（¥${bestPeriodicPerGb.price} / ${bestPeriodicPerGb.gb}GB）标称每 GB 成本最低，达到 **¥${bestPeriodicPerGb.val}/GB**。`);
    }
    if (oneTimePlans.length) {
      const ot = oneTimePlans[0];
      const otPerGb = ot.trafficGB ? (ot.price / ot.trafficGB).toFixed(3) : null;
      const m10 = ot.trafficGB ? (ot.trafficGB / 10).toFixed(1) : '—';
      const m30 = ot.trafficGB ? (ot.trafficGB / 30).toFixed(1) : '—';
      lines.push(`- **不限时包寿命估算（以 ${ot.planName} ¥${ot.price} / ${ot.trafficGB ?? '—'}GB 为例）**：标称单价为 **¥${otPerGb ?? '—'}/GB**；按每月消耗 10GB 估算可使用约 **${m10} 个月**，按每月 30GB 估算可用约 **${m30} 个月**。若月消费稳定超过 50GB，改选周期月付更划算。`);
    }
    return `## 付费周期比较与 12 个月使用成本测算\n\n${lines.join('\n')}`;
  })();

  const speedSection = (() => {
    if (!bTests.length) {
      return `## 性能与测速证据状态\n\n**当前状态：暂无可比测速数据或原始测速截图。** ${b.name} 在现有资料批次中未附带逐地区延迟与下载数值，亦未列入 2026-08-11 测速资料包，本站严格保持留空，不填入示例数值或推断结论。建议在决策前优先通过小额周期套餐亲自实测本地晚高峰连通率。`;
    }
    const primary = bTests[0];
    const rows = primary.metrics
      .map((m) => `| ${m.region} | ${m.latencyMs ?? '—'} ms | ${m.downloadMbps ?? '—'} Mbps | ${primary.testPeriod} |`)
      .join('\n');
    const metricTable = primary.metrics.length
      ? `\n| 地区 | 历史延迟 | 历史下载速度 | 测试时段 |\n|---|---:|---:|---|\n${rows}\n`
      : '\n该测试批次未拆出五地区汇总数值表，请直接查验下方截图结构化明细或限制说明。\n';
    const sampleTable = primary.nodeSamples?.length
      ? `\n### 原始截图抽样节点明细\n\n| 实测批次 | 地区 | 协议 | TLS RTT | HTTPS 延迟 | 均速区间 | 峰值与状态摘要 |\n|---|---|---|---|---|---|---|\n` +
        primary.nodeSamples
          .map(
            (ns) =>
              `| ${ns.batch}（${ns.carrierOrEnv}） | ${ns.region} | ${ns.protocol} | ${ns.tlsRttRange} | ${ns.httpsLatencyRange} | ${ns.avgSpeedRange} | ${ns.maxSpeedRange}；${ns.unlockSummary} |`
          )
          .join('\n')
      : '';
    const lims = primary.limitations.map((l) => `- ${l}`).join('\n');
    return `## 历史测速与网络性能记录\n\n- **测试批次**：${primary.batchLabel}\n- **测试日期 / 环境**：\`${primary.testDate}\` ｜ ${primary.networkEnvironment}\n- **数据限制**：\n${lims}\n${metricTable}${sampleTable}`;
  })();

  const availSection = bAvail.length
    ? `## AI 工具与流媒体可用性记录\n\n| 服务 | 状态 | 区域 / 节点条件 | 口径与说明 |\n|---|---|---|---|\n` +
      bAvail
        .map(
          (a) =>
            `| ${a.serviceName} | ${statusMap[a.availabilityStatus] || a.availabilityStatus} | ${a.region} | ${a.accountConditions}（${a.dataStatus === 'measured' ? '实测证据' : a.dataStatus === 'vendor' ? '品牌方声明' : '未测试/待核实'}） |`
        )
        .join('\n')
    : `## AI 工具与流媒体可用性记录\n\n当前资料库暂无 ${b.name} 的逐项 AI（ChatGPT / Claude / Gemini）与流媒体独立测试记录，统一标为**待核实**，不根据线路宣传直接推断解锁能力。`;

  const clientGuidanceSection = isExclusive
    ? `## 客户端接入实操与锁定限制说明\n\n**重要提醒：${b.name} 当前采用官方专属客户端模式，不提供 Clash、v2rayN 或 Shadowrocket 通用订阅链接。**\n\n- **优点**：免去订阅转换与分流配置教程，新手下载对应桌面或手机客户端登录后即可一键切换节点。\n- **硬性限制**：无法导入 [Clash Verge Rev](/clients/clash-verge)、[Shadowrocket 小火箭](/clients/shadowrocket) 或 [OpenWrt 软路由](/guides/router-openwrt)。若你有软路由全家科学需求，建议查看 [专属客户端锁定分析与替代方案](/risks/exclusive-client-lockin)。`
    : b.thirdPartySupport === 'yes'
      ? `## 客户端接入方式与多平台支持\n\n${b.name} 支持第三方客户端通用订阅导入（记录协议：${b.protocols.join(' / ')}）${b.officialClient === 'yes' ? '，同时提供自研客户端供新手一键登录' : ''}。\n\n- **Windows / macOS / Linux**：推荐 [Clash Verge Rev](/clients/clash-verge) 或 [v2rayN](/clients/v2rayn)。\n- **iOS / iPadOS**：推荐正版 [Shadowrocket 小火箭](/clients/shadowrocket) 或免费替代 Karing。\n- **OpenWrt 软路由**：导入通用订阅前先核对固件与内存要求，详见 [OpenWrt 软路由客户端指南](/guides/router-openwrt)。`
      : `## 客户端接入方式说明\n\n${b.name} 当前对自研客户端与第三方通用订阅的细节尚不完整（标注为：${b.clientAccessMode}）。下单前建议先向官网客服确认是否下发 Clash / V2Ray 订阅链接。`;

  const conflictSection = bConflicts.length
    ? `## 来源冲突与核查记录\n\n` +
      bConflicts
        .map(
          (c) =>
            `- **${c.conflictId}（${c.field}）**：${c.values.join('；')}。**处理口径**：${c.resolution}`
        )
        .join('\n')
    : '';

  const clientFaqAnswer = isExclusive
    ? `不支持。${b.name} 在当前资料中标注仅使用官方专属客户端下载登录即用，不提供 Clash、v2rayN 或 Shadowrocket 通用订阅链接。`
    : b.thirdPartySupport === 'yes'
      ? `支持。${b.name} 资料标注兼容第三方通用订阅导入（具体可用协议包括：${b.protocols.join(' / ')}），可在 Clash Verge Rev、v2rayN 或 Shadowrocket 中导入使用。`
      : `当前资料对 ${b.name} 是否开放 Clash/Shadowrocket 通用订阅尚未明确统一说明，建议下单前先向客服确认。`;

  const faqs = [
    {
      q: `${b.name}支持 Clash 或 Shadowrocket（小火箭）等第三方客户端吗？`,
      a: clientFaqAnswer,
    },
    {
      q: `${b.name}最低价格是多少？有不限时套餐吗？`,
      a: `${b.name} 当前记录的最低折算月均门槛约为 ${minEq !== null ? `¥${minEq}/月` : '待核实'}${minMonthly !== null ? `，普通月付最低 ¥${minMonthly}/月` : ''}；${oneTimePlans.length ? `同时提供不限时一次性流量包（¥${oneTimePlans[0].price} 起），具体见套餐明细表。` : '当前资料中未列出不限时一次性流量包。'}`,
    },
    {
      q: `${b.name}的测速与 AI 解锁数据能保证晚高峰长期稳定吗？`,
      a: `不能作绝对保证。本站收录的历史测速属于单日或非晚高峰快照，AI 与流媒体解锁也受目标平台风控及 IP 变动影响；购买任何长周期套餐前建议先以小额套餐实测本地网络。`,
    },
    {
      q: `${b.name}支持多少台设备同时连接？`,
      a: `${b.name} 在当前资料中的设备限制记录为：${b.deviceLimit}。即便标注不限设备，也应避免在公共网络公开分享账号或订阅以防触发风控封禁。`,
    },
    {
      q: `使用 ${b.name} 的优惠码 ${b.couponCode || '时'} 有哪些注意事项？`,
      a: `${b.couponDetails || '具体折扣比例与适用套餐需以官网结账页为准。'} 注意部分品牌的入门特价年付版与不限时套餐不参与折扣。`,
    },
  ];

  const peerLinks = peerCompareMap[b.brandId] || [
    '[光速云（旗舰对照）](/brands/guangsuyun)',
    '[暮光加速](/brands/muguang)',
    '[多品牌并排对比工具](/compare/)',
  ];

  const focusIntro = isHistoricalTail
    ? `> **Answer-First 核心结论（历史归档提示）**：${b.name} 属于 \`2026-08-09\` 历史品牌库记录（按原始规范靠后展示），${b.summary} 当前有效入口、实时价格与近 30 日性能仍标注为**待核实**。`
    : isExclusive
      ? `> **Answer-First 核心结论（专属客户端提示）**：${b.name} ${b.positioning}。**重要限制**：该品牌目前标注**仅支持官方专属客户端**，不提供 Clash / Shadowrocket 通用订阅链接；如你依赖软路由或第三方开源客户端，请直接参考替代方案。`
      : isLowData
        ? `> **Answer-First 核心结论（摘要级档案）**：${b.name} 目前在原始资料中属于**摘要级档案（完整度 ${b.completenessScore}%）**，${b.summary} 本页如实列出已核实参数与缺失项，不使用通用文本强行填充。`
        : `> **Answer-First 核心结论**：${b.name} ${b.positioning}。${b.summary}`;

  const yamlFaq = faqs
    .map((f) => `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}`)
    .join('\n');

  const md = `---
title: ${b.name}评测与档案：套餐价格、线路协议、客户端兼容性与数据核实
description: ${b.name}结构化档案（完整度 ${b.completenessScore}%）：覆盖${b.networkTypes.join('/')}架构、套餐与每GB成本、${b.clientAccessMode}、历史测速证据及来源冲突提示。
pageType: review
shortTitle: ${b.name}
verifiedAt: ${b.verifiedAt}
publishedAt: 2026-11-26
updatedAt: ${b.updatedAt}
author: 机场数据编辑与性能实验室
sourceNote: ${b.sources.join(' + ')}
faq:
${yamlFaq}
---

# ${b.name}评测与品牌数据档案

${focusIntro}

<AffiliateCtaCard brandId="${b.brandId}" />

## 品牌基础参数与数据状态

| 参数项 | 当前核实记录 | 状态 / 备注 |
|---|---|---|
| **品牌名称 / 别名** | ${b.name}（${b.aliases.join(' / ')}） | 唯一实体 ID：\`${b.brandId}\` |
| **开业时间** | ${b.foundedYear ? `${b.foundedYear} 年` : '待核实'} | 资料核实日期：${b.verifiedAt} |
| **优惠码与规则** | ${b.couponCode ? `\`${b.couponCode}\`` : '待核实'} | ${b.couponDetails || '以官网结账页为准'} |
| **网络线路** | ${b.networkTypes.join('、')} | 口径：${b.networkStatus} |
| **传输协议** | ${b.protocols.join(' / ')} | 口径：${b.protocolStatus} |
| **覆盖地区 / 节点数** | ${b.regions.join('、')}（节点数：${b.nodeCount || '待核实'}） | 实际以订阅或客户端列表为准 |
| **设备限制 / 倍率** | ${b.deviceLimit} ｜ 倍率：${b.trafficMultiplier || '待核实'} | — |
| **客户端接入方式** | ${b.clientAccessMode} | 第三方支持：${b.thirdPartySupport === 'yes' ? '支持' : b.thirdPartySupport === 'no' ? '不支持' : '待核实'} |
| **支付与退款** | ${b.paymentMethods.join(' / ')} ｜ 退款：${b.refundPolicy} | — |
| **资料完整度** | **${b.completenessScore}%**（缺口：${b.missingFields.length ? b.missingFields.join('、') : '无'}） | 完整度不等于速度或安全评分 |

## Dark Network Observatory：性能与可用性面板

<DarkObservatoryReport brandId="${b.brandId}" />

## 套餐价格与每 GB 流量成本明细

| 套餐名称 | 计费方式 | 实付金额 | 折算月均 | 流量配额 | 标称每 GB 成本 | 折扣与限制 |
|---|---|---:|---:|---:|---:|---|
${planRows || '| 待核实 | — | — | — | — | — | 缺少完整套餐记录 |'}

${unitEconSection}

${speedSection}

${availSection}

${clientGuidanceSection}

## 优点、局限与适用人群

- **已知优势**：${b.positioning}；${b.targetAudience.join('；')}。
- **客观局限与缺口**：缺失字段包括 **${b.missingFields.join('、') || '暂无显著字段缺口'}**。${b.affiliateLinkNote ? `特别提示：${b.affiliateLinkNote}。` : ''}
- **适合人群**：${b.targetAudience.join('；')}。
- **不适合人群**：${b.unsuitableFor.join('；')}。

${conflictSection}

## 同类对比与延伸入口

- **横向对照入口**：${peerLinks.join(' ｜ ')}
- **交互工具**：[机场套餐成本计算器](/database/plans) ｜ [客户端兼容矩阵](/clients/) ｜ [风险预警与跑路核查](/risks/exit-scam-warning)

## 常见问题（FAQ）

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

<AffiliateCtaCard brandId="${b.brandId}" compact />
`;

  fs.writeFileSync(path.join(root, `docs/brands/${b.slug}.md`), md, 'utf8');
  count++;
}

console.log(`Generated ${count} enriched brand dossier pages under docs/brands/.`);
