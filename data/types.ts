export type DataStatus =
  | 'measured'
  | 'historical'
  | 'vendor'
  | 'third-party'
  | 'pending'
  | 'conflict'
  | 'expired'
  | 'untested';

export type SupportStatus =
  | 'supported'
  | 'partial'
  | 'unsupported'
  | 'untested'
  | 'vendor'
  | 'pending';

export type BillingType =
  | 'monthly'
  | 'quarterly'
  | 'semiannual'
  | 'annual'
  | 'biennial'
  | 'triennial'
  | 'one-time';

export interface BrandEntity {
  brandId: string;
  name: string;
  slug: string;
  aliases: string[];
  logo: string;
  accentColor: string;
  foundedYear: number | null;
  officialWebsite: string | null;
  affiliateUrl: string | null;
  affiliateLinkNote?: string;
  couponCode: string | null;
  couponDetails: string | null;
  protocols: string[];
  protocolStatus: DataStatus;
  networkTypes: string[];
  networkStatus: DataStatus;
  regions: string[];
  nodeCount: string | null;
  trafficMultiplier: string | null;
  deviceLimit: string;
  officialClient: 'yes' | 'exclusive' | 'no' | 'pending';
  thirdPartySupport: 'yes' | 'no' | 'pending';
  clientAccessMode: string;
  paymentMethods: string[];
  refundPolicy: string;
  promotionPriority: number;
  operatingStatus: 'active-in-archive' | 'pending-verification';
  positioning: string;
  summary: string;
  targetAudience: string[];
  unsuitableFor: string[];
  sources: string[];
  verifiedAt: string;
  updatedAt: string;
  completenessScore: number;
  missingFields: string[];
  conflictIds: string[];
}

export interface PlanEntity {
  planId: string;
  brandId: string;
  planName: string;
  price: number;
  currency: 'CNY';
  billingMonths: number | null;
  billingType: BillingType;
  trafficGB: number | null;
  trafficNote?: string;
  trafficResetCycle: 'monthly' | 'one-time' | 'pending';
  trafficMultiplier: string | null;
  expiresAt: string;
  deviceLimit: string;
  discountRestrictions: string;
  availability: 'listed-in-source' | 'seasonal-or-limited' | 'pending';
  sourceId: string;
  recordedAt: string;
  verifiedAt: string;
  dataStatus: DataStatus;
}

export interface SpeedtestRegionMetric {
  region: string;
  nodeName: string;
  latencyMs: number | null;
  downloadMbps: number | null;
  uploadMbps: number | null;
  packetLoss: string | null;
  jitterMs: number | null;
  note?: string;
}

export interface SpeedtestRecord {
  testId: string;
  brandId: string;
  batchLabel: string;
  testDate: string;
  testTime: string | null;
  testPeriod: string;
  networkEnvironment: string;
  testTool: string;
  protocolDisplayed: string | null;
  sampleSize: string;
  sourceId: string;
  imagePath: string | null;
  extraImages?: { label: string; path: string; env: string; protocol: string; summary: string }[];
  nodeSamples?: {
    batch: string;
    carrierOrEnv: string;
    region: string;
    protocol: string;
    tlsRttRange: string;
    httpsLatencyRange: string;
    avgSpeedRange: string;
    maxSpeedRange: string;
    unlockSummary: string;
  }[];
  dataStatus: DataStatus;
  limitations: string[];
  metrics: SpeedtestRegionMetric[];
}

export interface AvailabilityEntry {
  brandId: string;
  nodeId: string;
  region: string;
  serviceName: 'ChatGPT' | 'Claude' | 'Gemini' | 'Netflix' | 'Disney+' | 'YouTube' | 'HBO Max' | 'TikTok' | 'Spotify';
  availabilityStatus: SupportStatus;
  testDate: string;
  testMethod: string;
  accountConditions: string;
  sourceId: string;
  dataStatus: DataStatus;
}

export type PlatformKey = 'windows' | 'android' | 'ios' | 'macos' | 'linux' | 'openwrt';

export interface ClientEntity {
  clientId: string;
  name: string;
  aliases: string[];
  platforms: PlatformKey[];
  core: string;
  protocols: string[];
  subscriptionFormats: string[];
  officialProject: string;
  downloadSources: string;
  maintenanceStatus: string;
  pricingModel: 'free-oss' | 'paid-appstore' | 'freemium';
  version: string;
  compatibility: string;
  securityNotes: string;
  sourceId: string;
  updatedAt: string;
}

export interface DataConflict {
  conflictId: string;
  brandId: string;
  brandName: string;
  field: string;
  values: string[];
  resolution: string;
  status: '来源冲突' | '待核实' | '已归档合并' | '审计说明';
  detectedAt: string;
}

export interface SourceRecord {
  sourceId: string;
  title: string;
  category: 'vendor' | 'measured' | 'editorial';
  observedAt: string;
  notes: string;
}

export interface AffiliateLinkEntry {
  brandId: string;
  brandName: string;
  affiliateUrl: string | null;
  couponCode: string | null;
  couponNote: string | null;
  linkFormatWarning?: string;
  rel: 'nofollow sponsored noopener';
  target: '_blank';
  disclosureText: string;
  sourceId: string;
  verifiedAt: string;
}

export interface KeywordEntry {
  keyword: string;
  normalizedKeyword: string;
  parentKeyword: string;
  entityId: string;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  topicCluster: string;
  funnelStage: 'TOFU' | 'MOFU' | 'BOFU';
  targetUrl: string;
  priority: 'S' | 'A' | 'B' | 'C';
  source: string;
  searchVolume: number | null;
  impressions: number | null;
  clicks: number | null;
  ctr: number | null;
  position: number | null;
  contentStatus: 'published' | 'candidate' | 'upgrade' | 'pending-verification';
  lastUpdated: string;
}
