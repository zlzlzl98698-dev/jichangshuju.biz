import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import './styles/custom.css';

import AffiliateCtaCard from './components/AffiliateCtaCard.vue';
import SiteStatsOverview from './components/SiteStatsOverview.vue';
import FeaturedPartnersGrid from './components/FeaturedPartnersGrid.vue';
import BrandDatabaseTable from './components/BrandDatabaseTable.vue';
import PlanDatabaseCalculator from './components/PlanDatabaseCalculator.vue';
import BrandComparisonTool from './components/BrandComparisonTool.vue';
import DarkObservatoryReport from './components/DarkObservatoryReport.vue';
import ClientCompatibilityMatrix from './components/ClientCompatibilityMatrix.vue';
import KeywordDiscoveryConsole from './components/KeywordDiscoveryConsole.vue';
import HomePortal from './components/HomePortal.vue';
import RelatedArticlesBar from './components/RelatedArticlesBar.vue';
import FaqSection from './components/FaqSection.vue';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('AffiliateCtaCard', AffiliateCtaCard);
    app.component('SiteStatsOverview', SiteStatsOverview);
    app.component('FeaturedPartnersGrid', FeaturedPartnersGrid);
    app.component('BrandDatabaseTable', BrandDatabaseTable);
    app.component('PlanDatabaseCalculator', PlanDatabaseCalculator);
    app.component('BrandComparisonTool', BrandComparisonTool);
    app.component('DarkObservatoryReport', DarkObservatoryReport);
    app.component('ClientCompatibilityMatrix', ClientCompatibilityMatrix);
    app.component('KeywordDiscoveryConsole', KeywordDiscoveryConsole);
    app.component('HomePortal', HomePortal);
    app.component('RelatedArticlesBar', RelatedArticlesBar);
    app.component('FaqSection', FaqSection);
  },
} satisfies Theme;
