<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  brands,
  calcAvgMonthlyCost,
  calcCostPerGb,
  getBrandById,
  plans,
} from '../../utils/data';

const props = withDefaults(
  defineProps<{
    brandFilter?: string;
    initialBilling?: string;
    compact?: boolean;
  }>(),
  { brandFilter: '', initialBilling: 'all', compact: false }
);

// Interactive Filters
const search = ref('');
const billingFilter = ref(props.initialBilling);
const budgetMax = ref<number>(200);
const minTraffic = ref<number>(0);
const sortBy = ref<'avgMonthlyAsc' | 'priceAsc' | 'perGbAsc' | 'trafficDesc'>('avgMonthlyAsc');

// Interactive Calculators State
const estMonthlyNeedGb = ref<number>(120);
const multiplierInput = ref<number>(1);
const customPay = ref<number>(99);
const customMonths = ref<number>(12);
const customGb = ref<number>(69);
const oneTimePrice = ref<number>(147);
const oneTimeGb = ref<number>(247);
const oneTimeMonthlyUse = ref<number>(20);
const compareMonthlyPay = ref<number>(25);
const compareAnnualPay = ref<number>(99);

const effectiveNeedGb = computed(() => +(estMonthlyNeedGb.value * multiplierInput.value).toFixed(1));

const calcCustomAvgMonthly = computed(() =>
  customMonths.value > 0 ? (customPay.value / customMonths.value).toFixed(2) : '—'
);
const calcCustomPerGb = computed(() =>
  customMonths.value > 0 && customGb.value > 0
    ? (customPay.value / customMonths.value / customGb.value).toFixed(3)
    : '—'
);
const calcOneTimePerGb = computed(() =>
  oneTimeGb.value > 0 ? (oneTimePrice.value / oneTimeGb.value).toFixed(3) : '—'
);
const calcOneTimeMonths = computed(() =>
  oneTimeMonthlyUse.value > 0 ? (oneTimeGb.value / (oneTimeMonthlyUse.value * multiplierInput.value)).toFixed(1) : '—'
);
const calc12MonthMonthlyTotal = computed(() => +(compareMonthlyPay.value * 12).toFixed(2));
const calc12MonthSavings = computed(() => +(compareMonthlyPay.value * 12 - compareAnnualPay.value).toFixed(2));

const billingLabel: Record<string, string> = {
  monthly: '月付',
  quarterly: '季付',
  semiannual: '半年付',
  annual: '年付',
  biennial: '两年付',
  triennial: '三年付',
  'one-time': '不限时/一次性',
};

const enrichedPlans = computed(() =>
  plans
    .filter((p) => (!props.brandFilter ? true : p.brandId === props.brandFilter))
    .map((p) => {
      const b = getBrandById(p.brandId);
      const avgMonthly = calcAvgMonthlyCost(p);
      const perGb = calcCostPerGb(p);
      return {
        ...p,
        brandName: b?.name || p.brandId,
        brandSlug: b?.slug || p.brandId,
        networkType: b?.networkTypes[0] || '待核实',
        couponCode: b?.couponCode || '—',
        avgMonthly,
        perGb,
      };
    })
);

const filteredPlans = computed(() => {
  const q = search.value.trim().toLowerCase();
  const list = enrichedPlans.value.filter((p) => {
    if (q) {
      const hay = `${p.brandName} ${p.planName} ${p.networkType} ${p.couponCode}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (billingFilter.value !== 'all' && p.billingType !== billingFilter.value) return false;
    if (p.billingType !== 'one-time') {
      const monthlyRef = p.avgMonthly ?? p.price;
      if (monthlyRef > budgetMax.value) return false;
    } else if (budgetMax.value < 200 && p.price > budgetMax.value * 12) {
      return false;
    }
    if (minTraffic.value > 0 && (p.trafficGB === null || p.trafficGB < minTraffic.value)) return false;
    return true;
  });

  return [...list].sort((a, b) => {
    if (sortBy.value === 'priceAsc') return a.price - b.price;
    if (sortBy.value === 'trafficDesc') return (b.trafficGB ?? -1) - (a.trafficGB ?? -1);
    if (sortBy.value === 'perGbAsc') return (a.perGb ?? 9999) - (b.perGb ?? 9999);
    return (a.avgMonthly ?? a.price) - (b.avgMonthly ?? b.price);
  });
});
</script>

<template>
  <div class="ad-calc-suite">
    <!-- Interactive Calculation Lab -->
    <div v-if="!compact" class="ad-calc-grid">
      <section class="ad-calc-card">
        <h3>1. 每月流量需求与每 GB 成本计算器</h3>
        <p class="ad-formula">
          周期平均月成本 = <code>实际付款 ÷ 计费月数</code><br />
          周期标称每 GB 成本 = <code>平均月成本 ÷ 每月标称流量</code>
        </p>
        <div class="ad-calc-inputs">
          <label>
            <span>实际付款 (元)</span>
            <input v-model.number="customPay" type="number" min="1" step="0.1" />
          </label>
          <label>
            <span>计费月数</span>
            <input v-model.number="customMonths" type="number" min="1" step="1" />
          </label>
          <label>
            <span>每月标称流量 (GB)</span>
            <input v-model.number="customGb" type="number" min="1" step="1" />
          </label>
        </div>
        <div class="ad-calc-result ad-mono">
          <span>平均月成本：<strong>¥{{ calcCustomAvgMonthly }}/月</strong></span>
          <span>每 GB 成本：<strong>¥{{ calcCustomPerGb }}/GB</strong></span>
        </div>
      </section>

      <section class="ad-calc-card">
        <h3>2. 不限时套餐使用周期估算器</h3>
        <p class="ad-formula">
          不限时每 GB 成本 = <code>一次性付款 ÷ 总流量</code><br />
          预计可用月数 = <code>总流量 ÷ (月均需求 × 倍率)</code>
        </p>
        <div class="ad-calc-inputs">
          <label>
            <span>一次性付款 (元)</span>
            <input v-model.number="oneTimePrice" type="number" min="1" />
          </label>
          <label>
            <span>套餐总流量 (GB)</span>
            <input v-model.number="oneTimeGb" type="number" min="1" />
          </label>
          <label>
            <span>预计月用 (GB)</span>
            <input v-model.number="oneTimeMonthlyUse" type="number" min="1" />
          </label>
        </div>
        <div class="ad-calc-result ad-mono">
          <span>单价：<strong>¥{{ calcOneTimePerGb }}/GB</strong></span>
          <span>预计可用：<strong>{{ calcOneTimeMonths }} 个月</strong></span>
        </div>
      </section>

      <section class="ad-calc-card">
        <h3>3. 月付 vs 年付 12 个月总成本比较器</h3>
        <p class="ad-formula">
          12个月对比 = <code>月付价格 × 12 − 年付一次性价格</code><br />
          倍率实际消耗 = <code>基础流量需求 × 节点倍率 ({{ multiplierInput }}x)</code>
        </p>
        <div class="ad-calc-inputs">
          <label>
            <span>月付单价 (元)</span>
            <input v-model.number="compareMonthlyPay" type="number" min="1" />
          </label>
          <label>
            <span>年付总价 (元)</span>
            <input v-model.number="compareAnnualPay" type="number" min="1" />
          </label>
          <label>
            <span>节点倍率</span>
            <input v-model.number="multiplierInput" type="number" min="0.5" max="10" step="0.5" />
          </label>
        </div>
        <div class="ad-calc-result ad-mono">
          <span>连买12月：<strong>¥{{ calc12MonthMonthlyTotal }}</strong></span>
          <span>年付差额：<strong>{{ calc12MonthSavings >= 0 ? `省 ¥${calc12MonthSavings}` : `多 ¥${Math.abs(calc12MonthSavings)}` }}</strong></span>
        </div>
      </section>
    </div>

    <!-- Filter Controls -->
    <div class="ad-plan-filters">
      <input
        v-if="!brandFilter"
        v-model="search"
        type="search"
        placeholder="搜索品牌、套餐名称、线路或优惠码…"
        class="ad-input"
      />
      <select v-model="billingFilter" aria-label="计费方式筛选" class="ad-input">
        <option value="all">全部计费方式（分开标示）</option>
        <option value="monthly">仅月付套餐</option>
        <option value="annual">仅年付套餐</option>
        <option value="quarterly">仅季付套餐</option>
        <option value="one-time">仅不限时/一次性套餐</option>
      </select>
      <label class="ad-inline-label">
        <span>月均预算上限 ¥{{ budgetMax }}</span>
        <input v-model.number="budgetMax" type="range" min="10" max="700" step="10" />
      </label>
      <label class="ad-inline-label">
        <span>最低流量 ≥ {{ minTraffic }} GB</span>
        <input v-model.number="minTraffic" type="range" min="0" max="1000" step="50" />
      </label>
      <select v-model="sortBy" aria-label="排序" class="ad-input">
        <option value="avgMonthlyAsc">排序：平均月成本从低到高</option>
        <option value="perGbAsc">排序：每GB流量成本从低到高</option>
        <option value="priceAsc">排序：实际付款金额从低到高</option>
        <option value="trafficDesc">排序：标称流量从高到低</option>
      </select>
    </div>

    <p style="font-size: 0.84rem; color: var(--ad-text-muted); margin: 0.5rem 0;">
      匹配套餐：<strong class="ad-mono">{{ filteredPlans.length }}</strong> 条（注：不限时套餐不折算固定月成本；折算价 ≠ 普通月付价；不同折扣能否叠加需以官网结账页为准）。
    </p>

    <div class="ad-table-scroll">
      <table>
        <thead>
          <tr>
            <th>品牌</th>
            <th>套餐名称</th>
            <th>实付金额</th>
            <th>计费周期</th>
            <th>平均月成本</th>
            <th>流量口径</th>
            <th>标称每GB成本</th>
            <th>设备限制</th>
            <th>线路 / 优惠码</th>
            <th>记录日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filteredPlans" :key="p.planId">
            <td><a :href="`/brands/${p.brandSlug}`" style="font-weight: 600;">{{ p.brandName }}</a></td>
            <td>
              {{ p.planName }}
              <div v-if="p.trafficNote" style="font-size: 0.74rem; color: var(--ad-text-muted);">{{ p.trafficNote }}</div>
            </td>
            <td class="ad-mono">¥{{ p.price }}</td>
            <td>{{ billingLabel[p.billingType] || p.billingType }}</td>
            <td class="ad-mono">
              <span v-if="p.avgMonthly !== null">¥{{ p.avgMonthly }}/月</span>
              <span v-else style="color: var(--ad-text-muted);">不限时按需</span>
            </td>
            <td class="ad-mono">
              <template v-if="p.trafficGB !== null">
                {{ p.trafficGB }} GB{{ p.trafficResetCycle === 'monthly' ? '/月' : ' 一次性' }}
              </template>
              <template v-else>待核实</template>
            </td>
            <td class="ad-mono">{{ p.perGb !== null ? `¥${p.perGb}/GB` : '待核实' }}</td>
            <td>{{ p.deviceLimit }}</td>
            <td>
              <div>{{ p.networkType }}</div>
              <div style="font-size: 0.74rem; color: var(--ad-text-muted);">码: <code>{{ p.couponCode }}</code></div>
            </td>
            <td class="ad-mono">{{ p.recordedAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.ad-calc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.9rem;
  margin-bottom: 1.25rem;
}

.ad-calc-card {
  border: 1px solid var(--ad-border);
  border-radius: 10px;
  padding: 0.95rem 1rem;
  background: var(--ad-surface-muted);
}

.ad-calc-card h3 {
  margin: 0 0 0.4rem;
  font-size: 0.98rem;
}

.ad-formula {
  font-size: 0.78rem;
  color: var(--ad-text-muted);
  margin: 0 0 0.7rem;
  line-height: 1.5;
}

.ad-calc-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.45rem;
}

.ad-calc-inputs label {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.74rem;
  color: var(--ad-text-muted);
}

.ad-calc-inputs input {
  width: 100%;
  padding: 0.38rem 0.45rem;
  border: 1px solid var(--ad-border);
  border-radius: 6px;
  background: var(--ad-surface);
  color: var(--ad-text);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
}

.ad-calc-result {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding-top: 0.55rem;
  border-top: 1px dashed var(--ad-border);
  font-size: 0.84rem;
}

.ad-plan-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  gap: 0.65rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.ad-input {
  width: 100%;
  padding: 0.48rem 0.65rem;
  border: 1px solid var(--ad-border);
  border-radius: 8px;
  background: var(--ad-surface);
  color: var(--ad-text);
  font-size: 0.85rem;
}

.ad-inline-label {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.78rem;
  color: var(--ad-text-muted);
}
</style>
