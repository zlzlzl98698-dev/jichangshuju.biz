<script setup lang="ts">
import { computed } from 'vue';
import {
  brands,
  getAffiliateForBrand,
  getBrandLowestEquivalentMonthly,
  getBrandLowestMonthly,
} from '../../utils/data';

const props = withDefaults(
  defineProps<{
    limit?: number;
  }>(),
  { limit: 6 }
);

const featured = computed(() =>
  [...brands]
    .sort((a, b) => a.promotionPriority - b.promotionPriority)
    .slice(0, props.limit)
    .map((b) => ({
      ...b,
      affiliate: getAffiliateForBrand(b.brandId),
      lowestMonthly: getBrandLowestMonthly(b.brandId),
      lowestEq: getBrandLowestEquivalentMonthly(b.brandId),
    }))
);
</script>

<template>
  <div>
    <div class="ad-disclosure-banner">
      <strong>合作展示口径声明：</strong>以下排序严格遵循商业合作优先级（主推光速云），<strong>不代表真实测速排名或绝对稳定性评级</strong>；所有注册按钮均附 <code>nofollow sponsored noopener</code> 标记。
    </div>

    <div class="ad-partner-grid">
      <article
        v-for="item in featured"
        :key="item.brandId"
        class="ad-partner-card"
        :class="{ 'ad-partner-card--flagship': item.brandId === 'guangsuyun' }"
        :style="{ '--brand-accent': item.accentColor }"
      >
        <div class="ad-partner-top">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <img :src="item.logo" :alt="`${item.name} Logo`" width="46" height="46" class="ad-partner-logo" />
            <div>
              <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                <a :href="`/brands/${item.slug}`" class="ad-partner-name">{{ item.name }}</a>
                <span v-if="item.brandId === 'guangsuyun'" class="ad-badge ad-badge--vendor">核心主推</span>
                <span v-else class="ad-badge">推广顺位 #{{ item.promotionPriority }}</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--ad-text-muted);">
                {{ item.foundedYear ? `${item.foundedYear}年运营` : '运营年份待核实' }} · 完整度 <span class="ad-mono">{{ item.completenessScore }}%</span>
              </div>
            </div>
          </div>
        </div>

        <p class="ad-partner-desc">{{ item.positioning }}</p>

        <dl class="ad-partner-specs ad-mono">
          <div>
            <dt>月付起步</dt>
            <dd>{{ item.lowestMonthly !== null ? `¥${item.lowestMonthly}/月` : '暂无/待核实' }}</dd>
          </div>
          <div>
            <dt>年付折算</dt>
            <dd>{{ item.lowestEq !== null ? `¥${item.lowestEq}/月起` : '待核实' }}</dd>
          </div>
          <div>
            <dt>线路/协议</dt>
            <dd>{{ item.networkTypes[0] || '待核实' }} · {{ item.protocols[0] || '待核实' }}</dd>
          </div>
          <div>
            <dt>客户端接入</dt>
            <dd>{{ item.thirdPartySupport === 'yes' ? '支持第三方订阅' : item.thirdPartySupport === 'no' ? '仅专属客户端' : '待核实' }}</dd>
          </div>
        </dl>

        <div class="ad-partner-actions">
          <a :href="`/brands/${item.slug}`" class="ad-btn ad-btn--secondary">查看评测与数据</a>
          <a
            v-if="item.affiliate?.affiliateUrl"
            :href="item.affiliate.affiliateUrl"
            :target="item.affiliate.target"
            :rel="item.affiliate.rel"
            class="ad-btn ad-btn--primary"
          >
            官网注册 ↗
          </a>
        </div>
        <div class="ad-partner-foot">
          <span v-if="item.couponCode">优惠码：<code class="ad-mono">{{ item.couponCode }}</code> · </span>
          含推广链接，通过链接注册可能带来佣金。
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.ad-disclosure-banner {
  padding: 0.65rem 0.9rem;
  border: 1px solid var(--ad-border);
  border-radius: 8px;
  background: var(--ad-surface-muted);
  font-size: 0.84rem;
  color: var(--ad-text-muted);
  margin-bottom: 1rem;
}

.ad-partner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 1rem;
}

.ad-partner-card {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  border: 1px solid var(--ad-border);
  border-top: 3px solid var(--brand-accent, #0f4c81);
  border-radius: 10px;
  padding: 1rem;
  background: var(--ad-surface);
}

.ad-partner-card--flagship {
  box-shadow: 0 4px 18px rgba(15, 76, 129, 0.08);
}

.ad-partner-logo {
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid var(--ad-border);
  background: #ffffff;
}

.ad-partner-name {
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--ad-text);
  text-decoration: none;
}

.ad-partner-name:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.ad-partner-desc {
  margin: 0;
  font-size: 0.86rem;
  color: var(--ad-text-muted);
  line-height: 1.55;
}

.ad-partner-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem 0.75rem;
  margin: 0;
  padding: 0.65rem;
  border-radius: 8px;
  background: var(--ad-surface-muted);
  font-size: 0.8rem;
}

.ad-partner-specs dt {
  color: var(--ad-text-muted);
  font-size: 0.74rem;
}

.ad-partner-specs dd {
  margin: 0;
  font-weight: 600;
  color: var(--ad-text);
}

.ad-partner-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: auto;
}

.ad-partner-actions .ad-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.45rem 0.75rem;
  font-size: 0.84rem;
}

.ad-partner-foot {
  font-size: 0.74rem;
  color: var(--ad-text-muted);
}
</style>
