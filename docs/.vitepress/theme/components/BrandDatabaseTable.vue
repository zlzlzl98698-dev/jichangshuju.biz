<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  brands,
  getAffiliateForBrand,
  getBrandHasOneTimePlan,
  getBrandLowestEquivalentMonthly,
  getBrandLowestMonthly,
  getPlansForBrand,
  getSpeedtestsForBrand,
} from '../../utils/data';

const searchQuery = ref('');
const filterLine = ref('all');
const filterClient = ref('all');
const filterBilling = ref('all');
const filterPrice = ref('all');
const sortBy = ref<'priority' | 'eqPriceAsc' | 'completenessDesc' | 'foundedAsc'>('priority');
const viewMode = ref<'table' | 'cards'>('table');

const enriched = computed(() =>
  brands.map((b) => {
    const bPlans = getPlansForBrand(b.brandId);
    const maxTraffic = Math.max(0, ...bPlans.map((p) => p.trafficGB || 0));
    const lowestMonthly = getBrandLowestMonthly(b.brandId);
    const lowestEq = getBrandLowestEquivalentMonthly(b.brandId);
    const hasOneTime = getBrandHasOneTimePlan(b.brandId);
    const hasSpeedPng = getSpeedtestsForBrand(b.brandId).some((s) => Boolean(s.imagePath));
    const affiliate = getAffiliateForBrand(b.brandId);
    return {
      ...b,
      planCount: bPlans.length,
      maxTraffic,
      lowestMonthly,
      lowestEq,
      hasOneTime,
      hasSpeedPng,
      affiliate,
    };
  })
);

const filtered = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  const list = enriched.value.filter((b) => {
    if (q) {
      const hay = [b.name, b.slug, ...b.aliases, ...b.protocols, ...b.networkTypes, b.couponCode || '']
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filterLine.value !== 'all') {
      const joined = b.networkTypes.join(' ').toUpperCase();
      if (filterLine.value === 'iepl' && !joined.includes('IEPL')) return false;
      if (filterLine.value === 'iplc' && !joined.includes('IPLC')) return false;
      if (filterLine.value === 'transit' && !joined.includes('中转') && !joined.includes('BGP')) return false;
    }
    if (filterClient.value !== 'all') {
      if (filterClient.value === 'third-party' && b.thirdPartySupport !== 'yes') return false;
      if (filterClient.value === 'exclusive' && b.officialClient !== 'exclusive') return false;
    }
    if (filterBilling.value !== 'all') {
      if (filterBilling.value === 'one-time' && !b.hasOneTime) return false;
      if (filterBilling.value === 'monthly' && b.lowestMonthly === null) return false;
    }
    if (filterPrice.value !== 'all') {
      const refPrice = b.lowestEq ?? b.lowestMonthly;
      if (refPrice === null) return false;
      if (filterPrice.value === 'under10' && refPrice >= 10) return false;
      if (filterPrice.value === '10to20' && (refPrice < 10 || refPrice > 20)) return false;
      if (filterPrice.value === 'over20' && refPrice <= 20) return false;
    }
    return true;
  });

  return [...list].sort((a, b) => {
    if (sortBy.value === 'priority') return a.promotionPriority - b.promotionPriority;
    if (sortBy.value === 'completenessDesc') return b.completenessScore - a.completenessScore;
    if (sortBy.value === 'foundedAsc') return (a.foundedYear ?? 9999) - (b.foundedYear ?? 9999);
    if (sortBy.value === 'eqPriceAsc') {
      return (a.lowestEq ?? a.lowestMonthly ?? 9999) - (b.lowestEq ?? b.lowestMonthly ?? 9999);
    }
    return 0;
  });
});

const resetFilters = () => {
  searchQuery.value = '';
  filterLine.value = 'all';
  filterClient.value = 'all';
  filterBilling.value = 'all';
  filterPrice.value = 'all';
  sortBy.value = 'priority';
};
</script>

<template>
  <div class="ad-db-wrap">
    <div class="ad-filter-bar">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="搜索品牌名、别名、VLESS / Trojan、优惠码…"
        aria-label="搜索机场品牌"
        class="ad-input ad-input--search"
      />
      <select v-model="filterPrice" aria-label="按月均成本筛选" class="ad-select">
        <option value="all">全部月均预算</option>
        <option value="under10">¥10/月以下（折算）</option>
        <option value="10to20">¥10–¥20/月</option>
        <option value="over20">¥20/月以上</option>
      </select>
      <select v-model="filterLine" aria-label="按线路类型筛选" class="ad-select">
        <option value="all">全部线路类型</option>
        <option value="iepl">IEPL 专线</option>
        <option value="iplc">IPLC 专线</option>
        <option value="transit">中转 / BGP 优化</option>
      </select>
      <select v-model="filterClient" aria-label="按客户端兼容性筛选" class="ad-select">
        <option value="all">全部客户端模式</option>
        <option value="third-party">支持第三方订阅（Clash/小火箭）</option>
        <option value="exclusive">仅官方专属客户端</option>
      </select>
      <select v-model="filterBilling" aria-label="按计费方式筛选" class="ad-select">
        <option value="all">全部计费周期</option>
        <option value="monthly">提供普通月付</option>
        <option value="one-time">提供不限时流量包</option>
      </select>
      <select v-model="sortBy" aria-label="排序方式" class="ad-select">
        <option value="priority">排序：合作/收录顺位</option>
        <option value="eqPriceAsc">排序：最低月均成本升序</option>
        <option value="completenessDesc">排序：资料完整度降序</option>
        <option value="foundedAsc">排序：开业年份由早到晚</option>
      </select>
    </div>

    <div class="ad-toolbar-meta">
      <span>当前匹配 <strong class="ad-mono">{{ filtered.length }}</strong> / {{ brands.length }} 个唯一品牌实体（点击品牌进入完整评测与套餐明细）</span>
      <div style="display: flex; gap: 0.4rem;">
        <button type="button" class="ad-mini-btn" :class="{ active: viewMode === 'table' }" @click="viewMode = 'table'">数据表格</button>
        <button type="button" class="ad-mini-btn" :class="{ active: viewMode === 'cards' }" @click="viewMode = 'cards'">摘要卡片</button>
        <button type="button" class="ad-mini-btn" @click="resetFilters">重置条件</button>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="ad-empty">
      <p style="margin: 0 0 0.6rem; font-weight: 600;">未找到符合当前筛选条件的品牌</p>
      <button type="button" class="ad-btn ad-btn--secondary" @click="resetFilters">清除全部筛选条件</button>
    </div>

    <div v-else-if="viewMode === 'table'" class="ad-table-scroll">
      <table>
        <thead>
          <tr>
            <th>品牌</th>
            <th>开业</th>
            <th>普通月付最低</th>
            <th>年付折算最低</th>
            <th>不限时包</th>
            <th>线路 / 协议</th>
            <th>客户端兼容</th>
            <th>资料完整度</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in filtered" :key="b.brandId">
            <td>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <img :src="b.logo" :alt="b.name" width="28" height="28" style="border-radius: 6px; object-fit: cover; background: #fff;" />
                <div>
                  <a :href="`/brands/${b.slug}`" style="font-weight: 600;">{{ b.name }}</a>
                  <div style="font-size: 0.74rem; color: var(--ad-text-muted);">
                    {{ b.hasSpeedPng ? '含实测截图' : '缺测速图' }} · {{ b.planCount }} 档套餐
                  </div>
                </div>
              </div>
            </td>
            <td class="ad-mono">{{ b.foundedYear ?? '待核实' }}</td>
            <td class="ad-mono">{{ b.lowestMonthly !== null ? `¥${b.lowestMonthly}` : '待核实' }}</td>
            <td class="ad-mono">{{ b.lowestEq !== null ? `¥${b.lowestEq}/月` : '待核实' }}</td>
            <td>{{ b.hasOneTime ? '支持' : '未提供/待核实' }}</td>
            <td>
              <div>{{ b.networkTypes[0] || '待核实' }}</div>
              <div style="font-size: 0.75rem; color: var(--ad-text-muted);">{{ b.protocols.join(' / ') }}</div>
            </td>
            <td>
              <span v-if="b.thirdPartySupport === 'yes'" class="ad-badge ad-badge--measured">支持第三方订阅</span>
              <span v-else-if="b.officialClient === 'exclusive'" class="ad-badge ad-badge--historical">仅专属客户端</span>
              <span v-else class="ad-badge ad-badge--pending">待核实</span>
            </td>
            <td class="ad-mono">
              {{ b.completenessScore }}%
              <span v-if="b.conflictIds.length" class="ad-badge ad-badge--conflict" style="margin-left: 0.25rem;">有冲突</span>
            </td>
            <td style="white-space: nowrap;">
              <a :href="`/brands/${b.slug}`">评测</a>
              <template v-if="b.affiliate?.affiliateUrl">
                · <a :href="b.affiliate.affiliateUrl" :target="b.affiliate.target" :rel="b.affiliate.rel">注册↗</a>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="ad-card-grid">
      <article v-for="b in filtered" :key="b.brandId" class="ad-brand-card" :style="{ '--brand-accent': b.accentColor }">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <img :src="b.logo" :alt="b.name" width="40" height="40" style="border-radius: 8px; object-fit: cover; background: #fff; border: 1px solid var(--ad-border);" />
          <div>
            <a :href="`/brands/${b.slug}`" style="font-weight: 700; font-size: 1rem;">{{ b.name }}</a>
            <div style="font-size: 0.76rem; color: var(--ad-text-muted);">
              {{ b.foundedYear ?? '年份待核实' }} · 完整度 {{ b.completenessScore }}% · 核实 {{ b.verifiedAt }}
            </div>
          </div>
        </div>
        <p style="font-size: 0.84rem; color: var(--ad-text-muted); margin: 0.6rem 0;">{{ b.positioning }}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
          <span class="ad-badge">{{ b.networkTypes[0] || '待核实' }}</span>
          <span class="ad-badge ad-mono">{{ b.lowestEq !== null ? `¥${b.lowestEq}/月起` : '待核实' }}</span>
          <span class="ad-badge">{{ b.thirdPartySupport === 'yes' ? '第三方订阅' : b.officialClient === 'exclusive' ? '专属客户端' : '待核实' }}</span>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <a :href="`/brands/${b.slug}`" class="ad-btn ad-btn--secondary" style="flex: 1; padding: 0.4rem;">档案评测</a>
          <a
            v-if="b.affiliate?.affiliateUrl"
            :href="b.affiliate.affiliateUrl"
            :target="b.affiliate.target"
            :rel="b.affiliate.rel"
            class="ad-btn ad-btn--primary"
            style="flex: 1; padding: 0.4rem;"
          >
            官网注册↗
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.ad-filter-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  gap: 0.6rem;
  margin-bottom: 0.75rem;
}

.ad-input,
.ad-select {
  width: 100%;
  padding: 0.5rem 0.65rem;
  border: 1px solid var(--ad-border);
  border-radius: 8px;
  background: var(--ad-surface);
  color: var(--ad-text);
  font-size: 0.86rem;
}

.ad-toolbar-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.84rem;
  color: var(--ad-text-muted);
  margin-bottom: 0.75rem;
}

.ad-mini-btn {
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  border: 1px solid var(--ad-border);
  background: var(--ad-surface);
  color: var(--ad-text);
  font-size: 0.8rem;
  cursor: pointer;
}

.ad-mini-btn.active {
  background: #0f4c81;
  border-color: #0f4c81;
  color: #ffffff;
}

.ad-empty {
  border: 1px dashed var(--ad-border);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  color: var(--ad-text-muted);
}

.ad-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.9rem;
}

.ad-brand-card {
  border: 1px solid var(--ad-border);
  border-left: 3px solid var(--brand-accent, #0f4c81);
  border-radius: 10px;
  padding: 0.95rem;
  background: var(--ad-surface);
}
</style>
