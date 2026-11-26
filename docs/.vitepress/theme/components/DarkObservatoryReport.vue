<script setup lang="ts">
import { computed } from 'vue';
import {
  getAvailabilityForBrand,
  getBrandById,
  getPlansForBrand,
  getSpeedtestsForBrand,
} from '../../utils/data';

const props = defineProps<{
  brandId: string;
}>();

const brand = computed(() => getBrandById(props.brandId));
const tests = computed(() => getSpeedtestsForBrand(props.brandId));
const primaryTest = computed(() => tests.value[0]);
const avail = computed(() => getAvailabilityForBrand(props.brandId));
const brandPlans = computed(() =>
  getPlansForBrand(props.brandId).filter((p) => p.trafficGB !== null && p.trafficGB > 0)
);

const maxDownload = computed(() => {
  const speeds = primaryTest.value?.metrics.map((m) => m.downloadMbps || 0) || [];
  return Math.max(100, ...speeds);
});

const statusLabel: Record<string, { text: string; cls: string }> = {
  supported: { text: '支持 / 解锁', cls: 'obs-pill--ok' },
  partial: { text: '部分支持 / 视节点', cls: 'obs-pill--warn' },
  unsupported: { text: '不支持 / 失败', cls: 'obs-pill--err' },
  vendor: { text: '品牌方声明', cls: 'obs-pill--info' },
  untested: { text: '未测试', cls: 'obs-pill--muted' },
  pending: { text: '待核实', cls: 'obs-pill--muted' },
};
</script>

<template>
  <section v-if="brand" class="ad-observatory" :style="{ '--brand-accent': brand.accentColor }">
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
      <div>
        <div style="font-size: 0.74rem; letter-spacing: 0.08em; color: #38bdf8; font-weight: 700;">
          DARK NETWORK OBSERVATORY · 机场数据 · jichangshuju.biz
        </div>
        <h3 style="margin: 0.25rem 0 0; font-size: 1.2rem;">{{ brand.name }} 网络观测与结构化参数报告</h3>
      </div>
      <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
        <span class="obs-pill obs-pill--info">完整度 {{ brand.completenessScore }}%</span>
        <span class="obs-pill obs-pill--muted">核实日期 {{ brand.verifiedAt }}</span>
      </div>
    </div>

    <!-- A. Brand Parameter Snapshot KPIs -->
    <div class="ad-obs-grid">
      <div class="ad-obs-kpi">
        <div class="ad-obs-kpi__label">线路架构</div>
        <div class="ad-obs-kpi__value" style="font-size: 0.96rem;">{{ brand.networkTypes.join(' / ') }}</div>
      </div>
      <div class="ad-obs-kpi">
        <div class="ad-obs-kpi__label">记录协议</div>
        <div class="ad-obs-kpi__value" style="font-size: 0.96rem;">{{ brand.protocols.join(' / ') }}</div>
      </div>
      <div class="ad-obs-kpi">
        <div class="ad-obs-kpi__label">设备限制</div>
        <div class="ad-obs-kpi__value" style="font-size: 0.96rem;">{{ brand.deviceLimit }}</div>
      </div>
      <div class="ad-obs-kpi">
        <div class="ad-obs-kpi__label">客户端接入</div>
        <div class="ad-obs-kpi__value" style="font-size: 0.92rem;">
          {{ brand.thirdPartySupport === 'yes' ? '自研/第三方双兼容' : brand.officialClient === 'exclusive' ? '仅官方专属客户端' : '待核实' }}
        </div>
      </div>
    </div>

    <!-- B. Historical Speedtest SVG + HTML Table -->
    <div v-if="primaryTest" class="obs-panel">
      <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.6rem;">
        <h4 style="margin: 0;">历史测速数据记录（{{ primaryTest.batchLabel }}）</h4>
        <span class="obs-pill obs-pill--warn">{{ primaryTest.testPeriod }}</span>
      </div>
      <p style="font-size: 0.8rem; color: var(--ad-obs-muted); margin: 0 0 0.8rem;">
        测试日期：{{ primaryTest.testDate }} ｜ 环境：{{ primaryTest.networkEnvironment }} ｜ 工具：{{ primaryTest.testTool }}
      </p>

      <div v-if="primaryTest.metrics.length > 0" class="obs-bars">
        <div v-for="m in primaryTest.metrics" :key="m.region" class="obs-bar-row">
          <span class="obs-bar-label">{{ m.region }}</span>
          <div class="obs-bar-track">
            <div
              class="obs-bar-fill"
              :style="{
                width: `${Math.min(100, Math.round(((m.downloadMbps || 0) / maxDownload) * 100))}%`,
                background: brand.accentColor || '#38bdf8',
              }"
            ></div>
          </div>
          <span class="obs-bar-val ad-mono">
            {{ m.latencyMs ?? '—' }} ms / {{ m.downloadMbps ?? '—' }} Mbps
          </span>
        </div>
      </div>
      <p v-else style="font-size: 0.84rem; color: var(--ad-obs-muted); margin: 0.5rem 0;">
        该批次暂无可比逐地区数值汇总表，请查验下方原始截图或限制说明。
      </p>

      <ul v-if="primaryTest.limitations.length" class="obs-limits">
        <li v-for="lim in primaryTest.limitations" :key="lim">⚠ {{ lim }}</li>
      </ul>
    </div>

    <div v-if="primaryTest?.nodeSamples?.length" class="obs-panel">
      <h4 style="margin: 0 0 0.65rem;">实测截屏结构化节点明细（{{ primaryTest.nodeSamples.length }} 组实测采样）</h4>
      <div class="ad-table-scroll" style="border-color: var(--ad-obs-border);">
        <table style="color: var(--ad-obs-text); font-size: 0.8rem;">
          <thead>
            <tr>
              <th>实测批次/运营商</th>
              <th>地区</th>
              <th>协议</th>
              <th>TLS RTT</th>
              <th>HTTPS 延迟</th>
              <th>均速区间</th>
              <th>峰值/解锁摘要</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ns, idx) in primaryTest.nodeSamples" :key="idx" style="background: transparent;">
              <td>{{ ns.carrierOrEnv }}</td>
              <td><strong>{{ ns.region }}</strong></td>
              <td>{{ ns.protocol }}</td>
              <td class="ad-mono">{{ ns.tlsRttRange }}</td>
              <td class="ad-mono">{{ ns.httpsLatencyRange }}</td>
              <td class="ad-mono">{{ ns.avgSpeedRange }}</td>
              <td>{{ ns.maxSpeedRange }} · {{ ns.unlockSummary }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="obs-panel">
      <h4 style="margin: 0 0 0.4rem;">测速记录状态：待核实 / 暂无可比实测数据</h4>
      <p style="font-size: 0.84rem; color: var(--ad-obs-muted); margin: 0;">
        {{ brand.name }} 在当前资料库中尚未附带可比逐地区测速表或原始截图，本站不填入示例数字或虚构评分。
      </p>
    </div>

    <!-- C. AI & Streaming Service Matrix -->
    <div class="obs-panel">
      <h4 style="margin: 0 0 0.65rem;">AI 与流媒体服务可用性矩阵</h4>
      <div v-if="avail.length > 0" class="obs-matrix">
        <div v-for="a in avail" :key="`${a.serviceName}-${a.nodeId}`" class="obs-matrix-item">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.4rem;">
            <strong>{{ a.serviceName }}</strong>
            <span class="obs-pill" :class="statusLabel[a.availabilityStatus]?.cls || 'obs-pill--muted'">
              {{ statusLabel[a.availabilityStatus]?.text || a.availabilityStatus }}
            </span>
          </div>
          <div style="font-size: 0.75rem; color: var(--ad-obs-muted); margin-top: 0.35rem;">
            {{ a.accountConditions }}
          </div>
          <div style="font-size: 0.72rem; color: #64748b; margin-top: 0.2rem;">
            口径：{{ a.dataStatus === 'measured' ? '实测证据' : a.dataStatus === 'vendor' ? '品牌方声明' : '未测试/待核实' }} · {{ a.testDate }}
          </div>
        </div>
      </div>
      <p v-else style="font-size: 0.84rem; color: var(--ad-obs-muted); margin: 0;">
        当前暂无该品牌的逐项 AI 与流媒体测试记录（状态：待核实）。
      </p>
    </div>

    <!-- D. Network Path Topology (Explicitly tagged 原理示意) -->
    <div class="obs-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.6rem;">
        <h4 style="margin: 0;">{{ brand.name }} 逻辑传输链路示意图</h4>
        <span class="obs-pill obs-pill--warn">原理示意（非物理机房实勘拓扑）</span>
      </div>
      <svg viewBox="0 0 760 120" style="width: 100%; height: auto; display: block;" role="img" :aria-label="`${brand.name} 传输链路原理示意`">
        <rect x="10" y="25" width="145" height="64" rx="10" fill="#1e293b" stroke="#475569" />
        <text x="82" y="52" fill="#f8fafc" font-size="13" text-anchor="middle" font-weight="700">用户设备端</text>
        <text x="82" y="72" fill="#94a3b8" font-size="11" text-anchor="middle">
          {{ brand.officialClient === 'exclusive' ? '官方专属客户端' : '自研 / 第三方订阅' }}
        </text>

        <line x1="155" y1="57" x2="225" y2="57" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,4" />
        <text x="190" y="45" fill="#93c5fd" font-size="10" text-anchor="middle">{{ brand.protocols[0] || '加密隧道' }}</text>

        <rect x="225" y="25" width="160" height="64" rx="10" fill="#1e293b" stroke="#38bdf8" />
        <text x="305" y="52" fill="#f8fafc" font-size="13" text-anchor="middle" font-weight="700">国内入口 / 调度</text>
        <text x="305" y="72" fill="#94a3b8" font-size="11" text-anchor="middle">{{ brand.networkTypes[0] || '待核实架构' }}</text>

        <line x1="385" y1="57" x2="465" y2="57" :stroke="brand.accentColor || '#10b981'" stroke-width="4" />
        <text x="425" y="44" fill="#34d399" font-size="10" text-anchor="middle">跨境传输段</text>

        <rect x="465" y="25" width="145" height="64" rx="10" fill="#1e293b" stroke="#475569" />
        <text x="537" y="52" fill="#f8fafc" font-size="13" text-anchor="middle" font-weight="700">海外落地节点</text>
        <text x="537" y="72" fill="#94a3b8" font-size="11" text-anchor="middle">{{ brand.regions.slice(0, 3).join('/') || '待核实' }}</text>

        <line x1="610" y1="57" x2="645" y2="57" stroke="#94a3b8" stroke-width="2" />

        <rect x="645" y="25" width="105" height="64" rx="10" fill="#1e293b" stroke="#475569" />
        <text x="697" y="52" fill="#f8fafc" font-size="12" text-anchor="middle" font-weight="700">目标服务</text>
        <text x="697" y="72" fill="#94a3b8" font-size="10" text-anchor="middle">AI / 流媒体</text>
      </svg>
    </div>

    <!-- E. Plan Price & Traffic Bar Chart -->
    <div v-if="brandPlans.length > 0" class="obs-panel">
      <h4 style="margin: 0 0 0.65rem;">套餐价格与标称流量分布（来源：{{ brand.name }} 数据库记录）</h4>
      <div class="obs-bars">
        <div v-for="p in brandPlans.slice(0, 8)" :key="p.planId" class="obs-bar-row">
          <span class="obs-bar-label" style="width: 165px;">{{ p.planName }}</span>
          <div class="obs-bar-track">
            <div
              class="obs-bar-fill"
              :style="{ width: `${Math.min(100, Math.max(8, Math.round(((p.trafficGB || 0) / 1600) * 100)))}%`, background: '#38bdf8' }"
            ></div>
          </div>
          <span class="obs-bar-val ad-mono">¥{{ p.price }} / {{ p.trafficGB }}GB</span>
        </div>
      </div>
    </div>

    <!-- F. Original Evidence Screenshots -->
    <div v-if="primaryTest?.imagePath || primaryTest?.extraImages?.length" class="obs-panel">
      <h4 style="margin: 0 0 0.65rem;">原始测速与解锁截图证据</h4>
      <div class="obs-gallery">
        <figure v-if="primaryTest?.imagePath" class="obs-shot">
          <a :href="primaryTest.imagePath" target="_blank" rel="noopener">
            <img :src="primaryTest.imagePath" :alt="`${brand.name} 节点测速实测原图`" loading="lazy" decoding="async" />
          </a>
          <figcaption>{{ brand.name }} · {{ primaryTest.testTime || primaryTest.testDate }} 原始截图（点击放大）</figcaption>
        </figure>
        <figure v-for="ex in primaryTest?.extraImages || []" :key="ex.path" class="obs-shot">
          <a :href="ex.path" target="_blank" rel="noopener">
            <img :src="ex.path" :alt="ex.label" loading="lazy" decoding="async" />
          </a>
          <figcaption>{{ ex.label }} — {{ ex.summary }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.obs-panel {
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  background: var(--ad-obs-card);
  border: 1px solid var(--ad-obs-border);
  border-radius: 10px;
}

.obs-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.14rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
}
.obs-pill--ok { background: rgba(16, 185, 129, 0.16); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); }
.obs-pill--warn { background: rgba(245, 158, 11, 0.16); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.35); }
.obs-pill--err { background: rgba(239, 68, 68, 0.16); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.35); }
.obs-pill--info { background: rgba(56, 189, 248, 0.14); color: #7dd3fc; border: 1px solid rgba(56, 189, 248, 0.32); }
.obs-pill--muted { background: rgba(148, 163, 184, 0.14); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3); }

.obs-bars {
  display: grid;
  gap: 0.5rem;
}

.obs-bar-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.82rem;
}

.obs-bar-label {
  width: 72px;
  flex-shrink: 0;
  color: #e2e8f0;
}

.obs-bar-track {
  flex: 1;
  height: 10px;
  background: rgba(148, 163, 184, 0.18);
  border-radius: 999px;
  overflow: hidden;
}

.obs-bar-fill {
  height: 100%;
  border-radius: 999px;
}

.obs-bar-val {
  min-width: 145px;
  text-align: right;
  color: #f8fafc;
}

.obs-limits {
  margin: 0.65rem 0 0;
  padding-left: 1.1rem;
  font-size: 0.78rem;
  color: #fbbf24;
}

.obs-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.65rem;
}

.obs-matrix-item {
  border: 1px solid var(--ad-obs-border);
  border-radius: 8px;
  padding: 0.65rem 0.75rem;
  background: rgba(15, 23, 42, 0.65);
}

.obs-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 0.85rem;
}

.obs-shot {
  margin: 0;
  border: 1px solid var(--ad-obs-border);
  border-radius: 8px;
  overflow: hidden;
  background: #020617;
}

.obs-shot img {
  width: 100%;
  max-height: 280px;
  object-fit: cover;
  display: block;
}

.obs-shot figcaption {
  padding: 0.5rem 0.65rem;
  font-size: 0.76rem;
  color: var(--ad-obs-muted);
}

@media (max-width: 640px) {
  .obs-bar-row {
    flex-wrap: wrap;
  }
  .obs-bar-val {
    min-width: auto;
    text-align: left;
  }
}
</style>
