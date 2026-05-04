// ═══════════════════════════════════════════════════
// Wasleen Foldable Garage — TypeScript Types
// ═══════════════════════════════════════════════════

// ─── Product Configuration ─────────────────────────

export type ColourOption =
  | 'bronze'
  | 'sapphire-blue'
  | 'light-smoke'
  | 'medium-smoke'
  | 'dark-charcoal';

export type RoofType = 'polycarbonate' | 'glass';

export type ProductVariant = 'manual' | 'automatic' | 'commercial';

export interface ProductConfig {
  width: number; // meters (2-12, step 0.5)
  length: number; // meters (6-30, step 0.5)
  roofType: RoofType;
  colour: ColourOption;
  hasAutomaticSystem: boolean;
  hasRollerShutter: boolean;
  hasGlassTint: boolean;
}

// ─── Colour Information ────────────────────────────

export interface ColourInfo {
  id: ColourOption;
  name: string;
  nameAr: string;
  hex: string;
  description: string;
}

// ─── Pricing ───────────────────────────────────────

export interface PricingConfig {
  polycarbonateRate: number; // 286 USD/sqm
  glassRate: number; // 417 USD/sqm
  automaticSystemPrice: number; // 2802 USD
  rollerShutterPrice: number; // 1804 USD
  glassTintRate: number; // 150 USD/sqm
}

// ─── Quote / Lead ──────────────────────────────────

export type Emirate =
  | 'Dubai'
  | 'Abu Dhabi'
  | 'Sharjah'
  | 'Ajman'
  | 'Ras Al Khaimah'
  | 'Fujairah'
  | 'Umm Al Quwain';

export type PropertyType = 'Villa' | 'Apartment' | 'Commercial' | 'Other';

export type LeadSource = 'quote' | 'contact' | 'spec-download' | 'whatsapp';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  emirate: Emirate;
  propertyType: PropertyType;
  message?: string;
}

export interface QuoteSubmission extends ProductConfig, QuoteFormData {
  totalPrice: number;
  status: 'pending' | 'paid' | 'confirmed';
  createdAt: string;
}

// ─── Lead ──────────────────────────────────────────

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  emirate: string;
  propertyType: string;
  message?: string;
  source: LeadSource;
  config?: ProductConfig;
  status: LeadStatus;
  createdAt: string;
}

// ─── Order ─────────────────────────────────────────

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  leadId: string;
  paddleTransactionId?: string;
  paddleOrderId?: string;
  config: ProductConfig;
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Review ────────────────────────────────────────

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface Review {
  id: string;
  name: string;
  email?: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  productVariant?: ProductVariant;
  colour?: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  response?: string;
  status: ReviewStatus;
  createdAt: string;
}

// ─── Blog ──────────────────────────────────────────

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  excerptEn: string;
  excerptAr: string;
  metaDescriptionEn: string;
  metaDescriptionAr: string;
  featuredImage?: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
}

// ─── Product ───────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priceFrom: number;
  specs: Record<string, string>;
  images: string[];
  active: boolean;
}
