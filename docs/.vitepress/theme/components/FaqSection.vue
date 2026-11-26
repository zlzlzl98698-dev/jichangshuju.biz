<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();

interface FaqItem {
  q: string;
  a: string;
}

const items = computed<FaqItem[]>(() => {
  const raw = frontmatter.value.faq;
  return Array.isArray(raw) ? raw.filter((x) => x && x.q && x.a) : [];
});

const escapeHtml = (str: string): string =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const formatInline = (text: string): string => {
  let html = escapeHtml(text);
  html = html.replace(/\[([^\]]+)\]\((\/[^)\s]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  return html;
};
</script>

<template>
  <section v-if="items.length" class="ad-faq-section" aria-label="常见问题">
    <h2 id="faq-section">常见问题（FAQ）</h2>
    <div class="ad-faq-list">
      <details
        v-for="(item, idx) in items"
        :key="idx"
        class="ad-faq-details"
        :open="idx === 0"
      >
        <summary>{{ item.q }}</summary>
        <div class="ad-faq-answer" v-html="formatInline(item.a)"></div>
      </details>
    </div>
  </section>
</template>

<style scoped>
.ad-faq-section {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--ad-border);
}

.ad-faq-section h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.85rem;
  border: 0;
  padding: 0;
}

.ad-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
</style>
