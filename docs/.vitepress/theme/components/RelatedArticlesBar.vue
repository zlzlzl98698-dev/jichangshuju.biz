<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import clusterData from '../../../../data/keywords/cluster-map.json';
import articleMap from '../../../../data/keywords/article-keyword-map.json';
import brandsData from '../../../../data/brands/brands.json';

interface ArticleItem {
  targetUrl: string;
  articleTitle: string;
  parentTopic: string;
  parentCluster: string;
  parentSecondary: string;
  searchIntent: string;
  relatedArticles: string[];
  relatedBrands: string[];
}

const route = useRoute();
const normPath = computed(() => {
  const p = route.path.replace(/\.html$/, '');
  return p === '/' ? '/' : p.replace(/\/$/, '') || '/';
});

const articles = articleMap as ArticleItem[];
const brands = brandsData as Array<{ brandId: string; name: string; slug: string; positioning: string; completenessScore: number }>;
const planPages = new Set(clusterData.commercialBrandPlans as string[]);

const articleByUrl = new Map(articles.map((a) => [a.targetUrl, a]));
const brandBySlug = new Map(brands.map((b) => [b.slug, b]));

const currentArticle = computed(() => articleByUrl.get(normPath.value) || null);

const currentHub = computed(() => {
  const p = normPath.value;
  for (const pillar of clusterData.pillars) {
    for (const hub of pillar.secondaryHubs) {
      if (hub.url.replace(/\/$/, '') === p) {
        return { pillar, hub };
      }
    }
  }
  return null;
});

const currentBrandSlug = computed(() => {
  const m = normPath.value.match(/^\/brands\/([a-z0-9-]+)(?:\/(plans))?$/);
  if (!m) return null;
  const slug = m[1];
  if (!brandBySlug.has(slug)) return null;
  return { slug, isPlansPage: Boolean(m[2]) };
});

const compareTitles: Record<string, string> = {
  '/compare/guangsuyun-vs-muguang': '光速云 vs 暮光加速 对比',
  '/compare/guangsuyun-vs-feimao': '光速云 vs 飞猫云 对比',
  '/compare/guangsuyun-vs-xingdaomeng': '光速云 vs 星岛梦 对比',
  '/compare/guangsuyun-vs-ermao': '光速云 vs 二猫云 对比',
  '/compare/feimao-vs-xingdaomeng': '飞猫云 vs 星岛梦 对比',
  '/compare/weitu-vs-firefly': '唯兔云 vs Firefly 对比',
  '/compare/budget-tier-56': '5.6 元平价集群 5 家横向对比',
};

const brandReviewsForDisplay = computed(() => {
  if (currentArticle.value) {
    // Follow Section 10.2: no forced promo cards on troubleshooting pages unless genuinely part of mapped brands
    return currentArticle.value.relatedBrands
      .map((slug) => brandBySlug.get(slug))
      .filter((b): b is NonNullable<typeof b> => Boolean(b))
      .slice(0, 4);
  }
  if (currentHub.value) {
    return currentHub.value.hub.brandReviews
      .map((u) => brandBySlug.get(u.replace('/brands/', '')))
      .filter((b): b is NonNullable<typeof b> => Boolean(b))
      .slice(0, 4);
  }
  return [];
});

const childArticlesForHub = computed(() => {
  if (!currentHub.value) return [];
  return currentHub.value.hub.level3Articles
    .map((u) => articleByUrl.get(u))
    .filter((a): a is ArticleItem => Boolean(a));
});

const siblingArticlesForArticle = computed(() => {
  if (!currentArticle.value) return [];
  return currentArticle.value.relatedArticles
    .map((u) => articleByUrl.get(u))
    .filter((a): a is ArticleItem => Boolean(a));
});

const hasCommercialPlansPage = computed(() => {
  if (!currentBrandSlug.value) return false;
  return planPages.has(`/brands/${currentBrandSlug.value.slug}/plans`);
});

const showPanel = computed(() => {
  return Boolean(currentArticle.value || currentHub.value || currentBrandSlug.value);
});
</script>

<template>
  <aside v-if="showPanel" class="ad-related-panel" aria-label="专题延伸与内链导航">
    <div v-if="currentHub" class="ad-related-grid">
      <div v-if="childArticlesForHub.length" class="ad-related-block">
        <div class="ad-related-label">所属专题下游三级长尾攻略</div>
        <ul class="ad-related-list">
          <li v-for="art in childArticlesForHub" :key="art.targetUrl">
            <a :href="art.targetUrl">{{ art.articleTitle }}</a>
            <span class="ad-related-tag">{{ art.searchIntent }}</span>
          </li>
        </ul>
      </div>
      <div v-if="brandReviewsForDisplay.length || currentHub.hub.comparisons.length" class="ad-related-block">
        <div class="ad-related-label">关联品牌深度评测与对比</div>
        <ul class="ad-related-list">
          <li v-for="b in brandReviewsForDisplay" :key="b.slug">
            <a :href="`/brands/${b.slug}`">{{ b.name }}深度评测与档案</a>
            <span v-if="planPages.has(`/brands/${b.slug}/plans`)" class="ad-related-sub">
              · <a :href="`/brands/${b.slug}/plans`">套餐与优惠页</a>
            </span>
          </li>
          <li v-for="cmp in currentHub.hub.comparisons" :key="cmp">
            <a :href="cmp">{{ compareTitles[cmp] || cmp }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="currentArticle" class="ad-related-grid">
      <div class="ad-related-block">
        <div class="ad-related-label">上级专题与相关深度文章</div>
        <ul class="ad-related-list">
          <li>
            <a :href="currentArticle.parentCluster">返回一级专题：{{ currentArticle.parentTopic }}</a>
          </li>
          <li v-if="currentArticle.parentSecondary !== currentArticle.parentCluster">
            <a :href="currentArticle.parentSecondary">所属二级中心：浏览同主题汇总与对比</a>
          </li>
          <li v-for="sib in siblingArticlesForArticle" :key="sib.targetUrl">
            <a :href="sib.targetUrl">{{ sib.articleTitle }}</a>
          </li>
        </ul>
      </div>

      <div v-if="brandReviewsForDisplay.length" class="ad-related-block">
        <div class="ad-related-label">文中涉及可核查品牌评测与套餐</div>
        <ul class="ad-related-list">
          <li v-for="b in brandReviewsForDisplay" :key="b.slug">
            <a :href="`/brands/${b.slug}`">{{ b.name }}深度评测（完整度 {{ b.completenessScore }}%）</a>
            <span v-if="planPages.has(`/brands/${b.slug}/plans`)" class="ad-related-sub">
              · <a :href="`/brands/${b.slug}/plans`">套餐价格与优惠</a>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="currentBrandSlug" class="ad-related-grid">
      <div class="ad-related-block">
        <div class="ad-related-label">品牌评测 ↔ 商业详情双通道</div>
        <ul class="ad-related-list">
          <li v-if="!currentBrandSlug.isPlansPage && hasCommercialPlansPage">
            <a :href="`/brands/${currentBrandSlug.slug}/plans`">
              查看 {{ brandBySlug.get(currentBrandSlug.slug)?.name }} 套餐价格、折扣测算与注册入口 →
            </a>
          </li>
          <li v-if="currentBrandSlug.isPlansPage">
            <a :href="`/brands/${currentBrandSlug.slug}`">
              ← 返回 {{ brandBySlug.get(currentBrandSlug.slug)?.name }} 完整深度评测（含测速、AI/流媒体与风险）
            </a>
          </li>
          <li><a href="/compare/">使用多品牌 22 项参数并排对比工具</a></li>
          <li><a href="/brands/how-to-verify-brand-authenticity">阅读：如何核实机场官网真伪与评测可信度</a></li>
        </ul>
      </div>
      <div class="ad-related-block">
        <div class="ad-related-label">上游选购决策与替代参考</div>
        <ul class="ad-related-list">
          <li><a href="/recommend/how-to-judge-airport">机场推荐应该看哪些核心指标？</a></li>
          <li><a href="/pricing/20-yuan-monthly-guide">20 元以内月付机场对比清单</a></li>
          <li><a href="/risks/exclusive-client-lockin">专属客户端 vs 第三方订阅限制解读</a></li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.ad-related-panel {
  margin-top: 2rem;
  padding: 1.15rem 1.25rem;
  border: 1px solid var(--ad-border);
  border-radius: 10px;
  background: var(--ad-surface-muted);
}

.ad-related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.ad-related-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--ad-primary);
  margin-bottom: 0.55rem;
}

.ad-related-list {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.88rem;
  line-height: 1.65;
}

.ad-related-list li + li {
  margin-top: 0.35rem;
}

.ad-related-tag {
  margin-left: 0.4rem;
  font-size: 0.72rem;
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
  border: 1px solid var(--ad-border);
  color: var(--ad-text-muted);
}

.ad-related-sub {
  font-size: 0.82rem;
  color: var(--ad-text-muted);
}
</style>
