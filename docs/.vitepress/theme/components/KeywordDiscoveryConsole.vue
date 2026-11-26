<script setup lang="ts">
import { computed, ref } from 'vue';
import { keywords } from '../../utils/data';

const priorityFilter = ref<'all' | 'S' | 'A' | 'B' | 'C'>('all');
const search = ref('');
const importedRows = ref<string[]>([]);

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return keywords.filter((k) => {
    if (priorityFilter.value !== 'all' && k.priority !== priorityFilter.value) return false;
    if (q) {
      const hay = `${k.keyword} ${k.parentKeyword} ${k.topicCluster} ${k.targetUrl}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
});

const handleCsvUpload = async (ev: Event) => {
  const file = (ev.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const text = await file.text();
  importedRows.value = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 15);
};
</script>

<template>
  <div>
    <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin-bottom: 0.75rem;">
      <input v-model="search" type="search" placeholder="筛选关键词、专题集群或目标 URL…" class="ad-input" style="max-width: 280px;" />
      <select v-model="priorityFilter" class="ad-input" style="max-width: 180px;">
        <option value="all">全部优先级（{{ keywords.length }}）</option>
        <option value="S">S 级：核心决策与数据词</option>
        <option value="A">A 级：品牌对比与性能词</option>
        <option value="B">B 级：客户端与故障词</option>
        <option value="C">C 级：储备与待核实选题</option>
      </select>
      <label class="ad-btn ad-btn--secondary" style="font-size: 0.8rem; padding: 0.42rem 0.75rem;">
        本地导入 GSC/Bing CSV 预览
        <input type="file" accept=".csv,.txt" style="display: none;" @change="handleCsvUpload" />
      </label>
    </div>

    <div v-if="importedRows.length" class="ad-meta-strip">
      <strong>已读取本地 CSV 前 {{ importedRows.length }} 行（仅浏览器端预览，不伪造服务端排名）：</strong>
      <pre style="margin: 0.4rem 0 0; width: 100%; overflow-x: auto; font-size: 0.76rem;">{{ importedRows.join('\n') }}</pre>
    </div>

    <div class="ad-table-scroll">
      <table>
        <thead>
          <tr>
            <th>优先级</th>
            <th>关键词</th>
            <th>搜索意图</th>
            <th>漏斗阶段</th>
            <th>专题集群</th>
            <th>唯一归属 URL</th>
            <th>真实搜索量/排名</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="k in filtered" :key="k.keyword + k.targetUrl">
            <td><span class="ad-badge">{{ k.priority }} 级</span></td>
            <td><strong>{{ k.keyword }}</strong></td>
            <td>{{ k.intent }}</td>
            <td class="ad-mono">{{ k.funnelStage }}</td>
            <td>{{ k.topicCluster }}</td>
            <td><a :href="k.targetUrl" class="ad-mono">{{ k.targetUrl }}</a></td>
            <td style="font-size: 0.78rem; color: var(--ad-text-muted);">
              {{ k.searchVolume !== null ? `${k.searchVolume} / #${k.position}` : '待接入 GSC/Bing（不虚构）' }}
            </td>
            <td><span class="ad-badge ad-badge--measured">{{ k.contentStatus === 'published' ? '已上线' : k.contentStatus }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.ad-input {
  width: 100%;
  padding: 0.46rem 0.65rem;
  border: 1px solid var(--ad-border);
  border-radius: 8px;
  background: var(--ad-surface);
  color: var(--ad-text);
  font-size: 0.85rem;
}
</style>
