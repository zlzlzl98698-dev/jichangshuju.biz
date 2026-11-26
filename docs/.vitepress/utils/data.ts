import brandsJson from '../../../data/brands/brands.json';
import plansJson from '../../../data/plans/plans.json';
import speedtestsJson from '../../../data/speedtests/speedtests.json';
import availabilityJson from '../../../data/availability/availability.json';
import clientsJson from '../../../data/clients/clients.json';
import affiliateLinksJson from '../../../data/affiliate-links.json';
import conflictsJson from '../../../data/sources/data-conflicts.json';
import sourcesJson from '../../../data/sources/sources.json';
import keywordsJson from '../../../data/keywords/keywords.json';
import brandHistoryJson from '../../../data/history/brand-history.json';
import priceHistoryJson from '../../../data/history/price-history.json';
import riskEventsJson from '../../../data/history/risk-events.json';
import verificationLogJson from '../../../data/history/verification-log.json';

import type {
  AffiliateLinkEntry,
  AvailabilityEntry,
  BrandEntity,
  ClientEntity,
  DataConflict,
  KeywordEntry,
  PlanEntity,
  SourceRecord,
  SpeedtestRecord,
} from '../../../data/types';

export const SITE_URL = 'https://jichangshuju.biz';
export const SITE_BRAND = '机场数据';
export const SITE_BRAND_EN = 'Airport Data';

export const brands = brandsJson as BrandEntity[];
export const plans = plansJson as PlanEntity[];
export const speedtests = speedtestsJson as SpeedtestRecord[];
export const availability = availabilityJson as AvailabilityEntry[];
export const clients = clientsJson as ClientEntity[];
export const affiliateLinks = affiliateLinksJson as AffiliateLinkEntry[];
export const conflicts = conflictsJson as DataConflict[];
export const sources = sourcesJson as SourceRecord[];
export const keywords = keywordsJson as KeywordEntry[];
export const brandHistory = brandHistoryJson;
export const priceHistory = priceHistoryJson;
export const riskEvents = riskEventsJson;
export const verificationLog = verificationLogJson;

export function getBrandById(brandId: string): BrandEntity | undefined {
  return brands.find((b) => b.brandId === brandId || b.slug === brandId);
}

export function getPlansForBrand(brandId: string): PlanEntity[] {
  return plans.filter((p) => p.brandId === brandId);
}

export function getSpeedtestsForBrand(brandId: string): SpeedtestRecord[] {
  return speedtests.filter((s) => s.brandId === brandId);
}

export function getAvailabilityForBrand(brandId: string): AvailabilityEntry[] {
  return availability.filter((a) => a.brandId === brandId);
}

export function getAffiliateForBrand(brandId: string): AffiliateLinkEntry | undefined {
  return affiliateLinks.find((l) => l.brandId === brandId);
}

export function getConflictsForBrand(brandId: string): DataConflict[] {
  return conflicts.filter((c) => c.brandId === brandId);
}

export function calcAvgMonthlyCost(plan: PlanEntity): number | null {
  if (plan.billingType === 'one-time' || !plan.billingMonths || plan.billingMonths <= 0) return null;
  return +(plan.price / plan.billingMonths).toFixed(2);
}

export function calcCostPerGb(plan: PlanEntity): number | null {
  if (!plan.trafficGB || plan.trafficGB <= 0) return null;
  if (plan.billingType === 'one-time') {
    return +(plan.price / plan.trafficGB).toFixed(3);
  }
  const monthly = calcAvgMonthlyCost(plan);
  if (monthly === null) return null;
  return +(monthly / plan.trafficGB).toFixed(3);
}

export function getBrandLowestMonthly(brandId: string): number | null {
  const bPlans = getPlansForBrand(brandId).filter((p) => p.billingType === 'monthly');
  if (!bPlans.length) return null;
  return Math.min(...bPlans.map((p) => p.price));
}

export function getBrandLowestEquivalentMonthly(brandId: string): number | null {
  const bPlans = getPlansForBrand(brandId)
    .map((p) => calcAvgMonthlyCost(p))
    .filter((v): v is number => v !== null);
  if (!bPlans.length) return null;
  return Math.min(...bPlans);
}

export function getBrandHasOneTimePlan(brandId: string): boolean {
  return getPlansForBrand(brandId).some((p) => p.billingType === 'one-time');
}

export function getDynamicSiteStats() {
  const fullDataBrands = brands.filter((b) => b.completenessScore >= 70).length;
  const speedtestPngCount = speedtests.filter((s) => Boolean(s.imagePath)).length;
  return {
    brandCount: brands.length,
    planCount: plans.length,
    speedtestCount: speedtests.length,
    speedtestPngCount,
    clientCount: clients.length,
    fullDataBrands,
    conflictCount: conflicts.length,
    lastUpdated: '2026-11-26',
  };
}
