<script setup lang="ts">
import { computed, ref } from 'vue';
import { brands, clients } from '../../utils/data';
import type { PlatformKey } from '../../../../data/types';

const props = withDefaults(
  defineProps<{
    initialPlatform?: PlatformKey | 'all';
    showBrandMatrix?: boolean;
  }>(),
  { initialPlatform: 'all', showBrandMatrix: true }
);

const platformFilter = ref<PlatformKey | 'all'>(props.initialPlatform);
const search = ref('');

const platformNames: Record<PlatformKey, string> = {
  windows: 'Windows',
  android: 'Android',
  ios: 'iOS / iPadOS',
  macos: 'macOS',
  linux: 'Linux',
  openwrt: 'OpenWrt 软路由',
};

const filteredClients = computed(() => {
  const q = search.value.trim().toLowerCase();
  return clients.filter((c) => {
    if (platformFilter.value !== 'all' && !c.platforms.includes(platformFilter.value)) return false;
    if (q) {
      const hay = [c.name, ...c.aliases, c.core, ...c.protocols, c.compatibility].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
});

const thirdPartyBrands = computed(() => brands.filter((b) => b.thirdPartySupport === 'yes'));
const exclusiveBrands = computed(() => brands.filter((b) => b.officialClient === 'exclusive'));
</script>

<template>
  <div>
    <div class="ad-client-controls">
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
        <button type="button" class="ad-pill-btn" :class="{ active: platformFilter === 'all' }" @click="platformFilter = 'all'">全部平台 ({{ clients.length }})</button>
        <button
          v-for="(label, key) in platformNames"
          :key="key"
          type="button"
          class="ad-pill-btn"
          :class="{ active: platformFilter === key }"
          @click="platformFilter = key"
        >
          {{ label }}
        </button>
      </div>
      <input v-model="search" type="search" placeholder="搜索客户端名、小火箭、Mihomo、sing-box…" class="ad-input" style="max-width: 280px;" />
    </div>

    <div class="ad-table-scroll">
      <table>
        <thead>
          <tr>
            <th>客户端软件</th>
            <th>支持平台</th>
            <th>内核</th>
            <th>支持协议</th>
            <th>订阅格式</th>
            <th>维护与收费状态</th>
            <th>官方项目来源</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filteredClients" :key="c.clientId">
            <td>
              <strong>{{ c.name }}</strong>
              <div style="font-size: 0.74rem; color: var(--ad-text-muted);">{{ c.securityNotes }}</div>
            </td>
            <td>{{ c.platforms.map((p) => platformNames[p]).join(' / ') }}</td>
            <td>{{ c.core }}</td>
            <td>{{ c.protocols.join(' / ') }}</td>
            <td>{{ c.subscriptionFormats.join('、') }}</td>
            <td>
              <div>{{ c.maintenanceStatus }}</div>
              <div style="font-size: 0.74rem; color: var(--ad-text-muted);">
                {{ c.pricingModel === 'free-oss' ? '免费开源' : c.pricingModel === 'paid-appstore' ? 'App Store 付费应用' : '基础免费/内购' }}
              </div>
            </td>
            <td>
              <a v-if="c.officialProject.startsWith('http')" :href="c.officialProject" target="_blank" rel="noopener nofollow">官方项目↗</a>
              <span v-else>{{ c.officialProject }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showBrandMatrix" class="ad-compat-split">
      <div class="ad-compat-box">
        <h3 style="margin-top: 0;">支持第三方订阅导入的机场（Clash / Shadowrocket 等）</h3>
        <p style="font-size: 0.84rem; color: var(--ad-text-muted);">
          以下品牌资料明确标注支持第三方客户端或通用订阅导入（部分同时提供自研客户端）：
        </p>
        <div class="ad-brand-pills">
          <a v-for="b in thirdPartyBrands" :key="b.brandId" :href="`/brands/${b.slug}`" class="ad-badge ad-badge--measured">
            {{ b.name }}
          </a>
        </div>
      </div>

      <div class="ad-compat-box">
        <h3 style="margin-top: 0;">仅支持官方专属客户端的机场（不提供订阅链接）</h3>
        <p style="font-size: 0.84rem; color: var(--ad-text-muted);">
          以下品牌在 2026 年最新资料中注明仅支持官方 App 账号登录，无法导入 Clash Verge Rev、v2rayN 或小火箭：
        </p>
        <div class="ad-brand-pills">
          <a v-for="b in exclusiveBrands" :key="b.brandId" :href="`/brands/${b.slug}`" class="ad-badge ad-badge--conflict">
            {{ b.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ad-client-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.ad-pill-btn {
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--ad-border);
  background: var(--ad-surface);
  color: var(--ad-text);
  font-size: 0.8rem;
  cursor: pointer;
}

.ad-pill-btn.active {
  background: #0f4c81;
  border-color: #0f4c81;
  color: #ffffff;
}

.ad-input {
  width: 100%;
  padding: 0.45rem 0.65rem;
  border: 1px solid var(--ad-border);
  border-radius: 8px;
  background: var(--ad-surface);
  color: var(--ad-text);
  font-size: 0.85rem;
}

.ad-compat-split {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.ad-compat-box {
  border: 1px solid var(--ad-border);
  border-radius: 10px;
  padding: 1rem;
  background: var(--ad-surface-muted);
}

.ad-brand-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.ad-brand-pills a {
  text-decoration: none;
}
</style>
