<script setup lang="ts">
import { computed } from 'vue';
import { getAffiliateForBrand, getBrandById } from '../../utils/data';

const props = defineProps<{
  brandId: string;
  compact?: boolean;
}>();

const brand = computed(() => getBrandById(props.brandId));
const link = computed(() => getAffiliateForBrand(props.brandId));
</script>

<template>
  <div v-if="brand && link" class="ad-cta-box" :style="{ '--brand-accent': brand.accentColor }">
    <div class="ad-cta-head">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <img :src="brand.logo" :alt="`${brand.name} Logo`" width="44" height="44" class="ad-cta-logo" />
        <div>
          <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
            <strong style="font-size: 1.05rem;">{{ brand.name }} 官方注册入口</strong>
            <span class="ad-badge ad-badge--vendor">商业推广入口</span>
          </div>
          <div style="font-size: 0.82rem; color: var(--ad-text-muted); margin-top: 0.15rem;">
            资料核实日期：<span class="ad-mono">{{ link.verifiedAt }}</span>
            <span v-if="link.couponCode"> · 优惠码：<code class="ad-mono">{{ link.couponCode }}</code></span>
          </div>
        </div>
      </div>

      <a
        v-if="link.affiliateUrl"
        :href="link.affiliateUrl"
        :target="link.target"
        :rel="link.rel"
        :data-brand-id="brand.brandId"
        class="ad-btn ad-btn--primary"
      >
        前往 {{ brand.name }} 注册页 ↗
      </a>
    </div>

    <p v-if="!compact && link.couponNote" style="margin: 0.65rem 0 0; font-size: 0.85rem; color: var(--ad-text);">
      <strong>优惠与限制说明：</strong>{{ link.couponNote }}
    </p>

    <p v-if="link.linkFormatWarning" class="ad-cta-warn">
      ⚠ 链接格式提示：{{ link.linkFormatWarning }}
    </p>

    <p class="ad-cta-disclosure">
      {{ link.disclosureText }}
    </p>
  </div>
</template>

<style scoped>
.ad-cta-box {
  border: 1px solid var(--ad-border);
  border-left: 4px solid var(--brand-accent, #0f4c81);
  border-radius: 10px;
  padding: 1rem 1.1rem;
  background: var(--ad-surface-muted);
  margin: 1.25rem 0;
}

.ad-cta-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.85rem;
}

.ad-cta-logo {
  border-radius: 10px;
  object-fit: cover;
  background: #ffffff;
  border: 1px solid var(--ad-border);
}

.ad-cta-warn {
  margin: 0.6rem 0 0;
  padding: 0.45rem 0.65rem;
  border-radius: 6px;
  background: rgba(245, 158, 11, 0.12);
  color: #b45309;
  font-size: 0.82rem;
}

.dark .ad-cta-warn {
  color: #fbbf24;
}

.ad-cta-disclosure {
  margin: 0.65rem 0 0;
  font-size: 0.78rem;
  color: var(--ad-text-muted);
}
</style>
