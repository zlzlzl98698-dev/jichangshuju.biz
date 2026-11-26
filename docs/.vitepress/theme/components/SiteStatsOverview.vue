<script setup lang="ts">
import { getDynamicSiteStats } from '../../utils/data';

const stats = getDynamicSiteStats();

const cards = [
  { label: '已收录唯一品牌', value: `${stats.brandCount} 家`, sub: '已完成 Firefly / 萤火虫实体合并去重' },
  { label: '已结构化套餐记录', value: `${stats.planCount} 档`, sub: '覆盖月付 / 季付 / 年付 / 多年 / 不限时' },
  { label: '历史测速批次记录', value: `${stats.speedtestCount} 批`, sub: `含 ${stats.speedtestPngCount} 份原始实测截图证据` },
  { label: '跨平台代理客户端', value: `${stats.clientCount} 款`, sub: '覆盖 Windows / Android / iOS / macOS / Linux / OpenWrt' },
  { label: '高完整度品牌档案', value: `${stats.fullDataBrands} 家`, sub: '完整度 ≥ 70%（不等于安全性或速度排名）' },
  { label: '来源冲突与缺口台账', value: `${stats.conflictCount} 条`, sub: `最近核实与更新：${stats.lastUpdated}` },
];
</script>

<template>
  <div class="ad-kpi-grid">
    <div v-for="c in cards" :key="c.label" class="ad-kpi-card">
      <div class="ad-kpi-label">{{ c.label }}</div>
      <div class="ad-kpi-value ad-mono">{{ c.value }}</div>
      <div class="ad-kpi-sub">{{ c.sub }}</div>
    </div>
  </div>
</template>

<style scoped>
.ad-kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 0.9rem;
}

.ad-kpi-card {
  background: var(--ad-surface);
  border: 1px solid var(--ad-border);
  border-radius: 10px;
  padding: 0.95rem 1.05rem;
}

.ad-kpi-label {
  font-size: 0.8rem;
  color: var(--ad-text-muted);
}

.ad-kpi-value {
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0.25rem 0;
}

.ad-kpi-sub {
  font-size: 0.77rem;
  color: var(--ad-text-muted);
  line-height: 1.45;
}
</style>
