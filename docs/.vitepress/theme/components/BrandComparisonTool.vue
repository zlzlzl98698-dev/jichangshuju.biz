<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  brands,
  calcCostPerGb,
  getAffiliateForBrand,
  getAvailabilityForBrand,
  getBrandHasOneTimePlan,
  getBrandLowestEquivalentMonthly,
  getBrandLowestMonthly,
  getPlansForBrand,
  getSpeedtestsForBrand,
} from '../../utils/data';

const selectedIds = ref<string[]>(['guangsuyun', 'muguang', 'feimao', 'xingdaomeng']);

const toggleBrand = (id: string) => {
  const idx = selectedIds.value.indexOf(id);
  if (idx >= 0) {
    if (selectedIds.value.length > 2) selectedIds.value.splice(idx, 1);
  } else if (selectedIds.value.length < 4) {
    selectedIds.value.push(id);
  }
};

const selectedRows = computed(() =>
  selectedIds.value
    .map((id) => brands.find((b) => b.brandId === id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b))
    .map((b) => {
      const bPlans = getPlansForBrand(b.brandId);
      const minPay = bPlans.length ? Math.min(...bPlans.map((p) => p.price)) : null;
      const minMonthly = getBrandLowestMonthly(b.brandId);
      const annualPlans = bPlans.filter((p) => p.billingType === 'annual');
      const minAnnualEq = annualPlans.length
        ? Math.min(...annualPlans.map((p) => +(p.price / (p.billingMonths || 12)).toFixed(2)))
        : null;
      const maxMonthlyTraffic = Math.max(
        0,
        ...bPlans.filter((p) => p.trafficResetCycle === 'monthly').map((p) => p.trafficGB || 0)
      );
      const perGbList = bPlans.map((p) => calcCostPerGb(p)).filter((v): v is number => v !== null);
      const minPerGb = perGbList.length ? Math.min(...perGbList) : null;
      const stList = getSpeedtestsForBrand(b.brandId);
      const hkMetric = stList.flatMap((s) => s.metrics).find((m) => m.region === '香港');
      const avail = getAvailabilityForBrand(b.brandId);
      const statusText: Record<string, string> = {
        supported: '支持',
        partial: '视节点而定',
        unsupported: '实测失败',
        vendor: '声明支持',
        untested: '未测试',
        pending: '待核实',
      };
      const fmtAvail = (svc: string) => {
        const entry = avail.find((a) => a.serviceName === svc);
        if (!entry) return '待核实';
        const label = statusText[entry.availabilityStatus] || entry.availabilityStatus;
        const src = entry.dataStatus === 'measured' ? '实测' : entry.dataStatus === 'vendor' ? '资料' : '待核实';
        return `${label}（${src}）`;
      };
      const aff = getAffiliateForBrand(b.brandId);
      return {
        brand: b,
        minPay,
        minMonthly,
        minAnnualEq,
        maxMonthlyTraffic: maxMonthlyTraffic || null,
        hasOneTime: getBrandHasOneTimePlan(b.brandId),
        minPerGb,
        hkLatency: hkMetric?.latencyMs ?? null,
        hkSpeed: hkMetric?.downloadMbps ?? null,
        testDate: stList[0]?.testDate ?? null,
        gptStatus: fmtAvail('ChatGPT'),
        nfStatus: fmtAvail('Netflix'),
        aff,
      };
    })
);
</script>

<template>
  <div class="ad-compare-root">
    <div class="ad-selector-panel">
      <p style="margin: 0 0 0.55rem; font-size: 0.88rem; font-weight: 600;">
        选择 2–4 家机场进行并排对比（当前已选 <span class="ad-mono">{{ selectedIds.length }}/4</span>）：
      </p>
      <div class="ad-chip-pool">
        <button
          v-for="b in brands"
          :key="b.brandId"
          type="button"
          class="ad-chip"
          :class="{ active: selectedIds.includes(b.brandId) }"
          :disabled="!selectedIds.includes(b.brandId) && selectedIds.length >= 4"
          @click="toggleBrand(b.brandId)"
        >
          {{ b.name }}
        </button>
      </div>
      <p style="margin: 0.55rem 0 0; font-size: 0.78rem; color: var(--ad-text-muted);">
        注：缺失字段统一显示“待核实/未提供”，绝不填入 0；不同测试批次日期与环境不直接作为公平速度排名依据。
      </p>
    </div>

    <div class="ad-table-scroll">
      <table>
        <thead>
          <tr>
            <th style="min-width: 145px;">比较维度</th>
            <th v-for="col in selectedRows" :key="col.brand.brandId" style="min-width: 185px;">
              <a :href="`/brands/${col.brand.slug}`">{{ col.brand.name }}</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr><td>运营时间</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.brand.foundedYear ? `${c.brand.foundedYear}年` : '待核实' }}</td></tr>
          <tr><td>最低实付门槛</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.minPay !== null ? `¥${c.minPay}` : '待核实' }}</td></tr>
          <tr><td>最低普通月付</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.minMonthly !== null ? `¥${c.minMonthly}/月` : '未单列/待核实' }}</td></tr>
          <tr><td>年付折算月均</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.minAnnualEq !== null ? `¥${c.minAnnualEq}/月` : '未提供/待核实' }}</td></tr>
          <tr><td>周期月流量上限</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.maxMonthlyTraffic ? `最高 ${c.maxMonthlyTraffic} GB/月` : '待核实' }}</td></tr>
          <tr><td>不限时套餐</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.hasOneTime ? '支持' : '未提供/待核实' }}</td></tr>
          <tr><td>流量倍率</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.brand.trafficMultiplier || '待核实' }}</td></tr>
          <tr><td>最低标称每GB成本</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.minPerGb !== null ? `¥${c.minPerGb}/GB` : '待核实' }}</td></tr>
          <tr><td>协议类型</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.brand.protocols.join(' / ') }}</td></tr>
          <tr><td>线路类型</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.brand.networkTypes.join('、') }}</td></tr>
          <tr><td>节点地区</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.brand.regions.join('、') }}</td></tr>
          <tr><td>节点数量</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.brand.nodeCount || '待核实' }}</td></tr>
          <tr><td>历史香港延迟（非高峰）</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.hkLatency !== null ? `${c.hkLatency} ms` : '无/待核实' }}</td></tr>
          <tr><td>历史香港下载（非高峰）</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.hkSpeed !== null ? `${c.hkSpeed} Mbps` : '无/待核实' }}</td></tr>
          <tr><td>ChatGPT 可用性</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.gptStatus }}</td></tr>
          <tr><td>Netflix 可用性</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.nfStatus }}</td></tr>
          <tr><td>自研客户端</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.brand.officialClient === 'yes' ? '提供（兼支持订阅）' : c.brand.officialClient === 'exclusive' ? '仅专属客户端' : '待核实' }}</td></tr>
          <tr><td>第三方订阅支持</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.brand.thirdPartySupport === 'yes' ? '支持' : c.brand.thirdPartySupport === 'no' ? '不支持' : '待核实' }}</td></tr>
          <tr><td>设备数限制</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.brand.deviceLimit }}</td></tr>
          <tr><td>退款条件</td><td v-for="c in selectedRows" :key="c.brand.brandId">{{ c.brand.refundPolicy }}</td></tr>
          <tr><td>资料完整度（非评分）</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.brand.completenessScore }}%</td></tr>
          <tr><td>数据记录日期</td><td v-for="c in selectedRows" :key="c.brand.brandId" class="ad-mono">{{ c.testDate || c.brand.verifiedAt }}</td></tr>
          <tr>
            <td>官方入口（含推广披露）</td>
            <td v-for="c in selectedRows" :key="c.brand.brandId">
              <a v-if="c.aff?.affiliateUrl" :href="c.aff.affiliateUrl" :target="c.aff.target" :rel="c.aff.rel">官网注册↗</a>
              <span v-else>待核实</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.ad-selector-panel {
  border: 1px solid var(--ad-border);
  border-radius: 10px;
  padding: 0.9rem 1rem;
  background: var(--ad-surface-muted);
  margin-bottom: 1rem;
}

.ad-chip-pool {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.ad-chip {
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--ad-border);
  background: var(--ad-surface);
  color: var(--ad-text);
  font-size: 0.8rem;
  cursor: pointer;
}

.ad-chip.active {
  background: #0f4c81;
  border-color: #0f4c81;
  color: #ffffff;
}

.ad-chip:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
