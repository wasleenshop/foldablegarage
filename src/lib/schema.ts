// ═══════════════════════════════════════════════════
// Wasleen Foldable Garage — JSON-LD Schema Generators
// ═══════════════════════════════════════════════════
//
// Each function returns a structured data object
// conforming to schema.org. Call them from page-level
// <Script> blocks with type="application/ld+json".
//
// Usage:
//   import { productSchema, localBusinessSchema, ... } from '@/lib/schema';
//   <Script id="schema-product" type="application/ld+json"
//     dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema()) }}
//   />
// ═══════════════════════════════════════════════════

import { SITE_URL, WHATSAPP_NUMBER, COMPANY_EMAIL } from './constants';
import type { BlogPost } from './types';

// ─── Constants ─────────────────────────────────────

const SITE_NAME = 'Wasleen Foldable Garage';
const COMPANY_NAME = 'Wasleen Pergolas';
const DEFAULT_DESCRIPTION =
  'Architectural-grade retractable carports engineered in Dubai. 6063-T5 aluminium alloy frame with PVDF coating.';

const ADDRESS = {
  '@type': 'PostalAddress' as const,
  streetAddress: 'Al Hilal Bank Building, Al Qusais 1',
  addressLocality: 'Dubai',
  addressCountry: 'AE',
};

const SAME_AS: string[] = [
  'https://www.instagram.com/wasleen_pergolas_uae',
  'https://www.facebook.com/share/18KGH35hUw/',
  'https://www.tiktok.com/@wasleen_uae',
  'https://www.linkedin.com/in/wasleen-uae-a0b769291',
  'https://www.pinterest.com/wasleenoffice/',
  'https://share.google/T104IsopCfrZKI0qr',
];

// ─── FAQ Data ──────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_QUESTIONS: FAQItem[] = [
  {
    question: 'How much does a retractable carport cost in Dubai?',
    answer:
      'Prices range from AED 33,600 for a standard 3m×6m polycarbonate manual system up to AED 120,000+ for custom-sized automatic glass systems with optional tinting and roller shutters. Use our online configurator for an exact price based on your dimensions and requirements.',
  },
  {
    question: 'How long does it take to install a foldable garage in the UAE?',
    answer:
      'Most residential installations are completed within 60 days from order confirmation. The process includes: site survey and foundation preparation (1–2 days), main structure assembly and rail installation (3–5 days), panel fitting and finishing (1–2 days), and final inspection. Timelines may vary based on site complexity and permitting requirements.',
  },
  {
    question: 'Do I need a permit for carport installation in Dubai?',
    answer:
      'Yes, a building permit from Dubai Municipality or your respective emirate authority is typically required for permanent carport structures. Wasleen assists with permit documentation and coordination as part of our end-to-end service, ensuring full compliance with local building regulations.',
  },
  {
    question: 'What warranty does Wasleen offer on foldable garages?',
    answer:
      'All Wasleen structures carry a comprehensive 5-year structural warranty covering the aluminium frame and load-bearing components. The PVDF-coated aluminium carries a 15-year no-fade guarantee against UV discolouration. Mechanical components including rollers and motors have a 2-year warranty against manufacturing defects.',
  },
  {
    question: 'What size foldable garage do I need for one car?',
    answer:
      'A single standard car requires minimum dimensions of 3m width × 6m length. For a large SUV such as a Nissan Patrol, Toyota Land Cruiser, or Lexus LX, we recommend 3.5m × 6.5m to allow comfortable clearance. Our double-car configuration starts at 6m × 6m. Use our quote configurator for the perfect fit.',
  },
  {
    question: 'Does the foldable garage withstand Dubai\'s sand, heat, and humidity?',
    answer:
      'Yes. Every component is engineered for the UAE climate: the 6063-T5 aluminium frame is anodised for corrosion resistance against coastal humidity, the PVDF coating withstands 50°C+ surface temperatures without fading, the twin-wall polycarbonate panels block 99.9% of UV radiation, and the sealed roller assembly prevents sand and dust ingress.',
  },
  {
    question: 'Can I automate my foldable garage?',
    answer:
      'Absolutely. Our automatic system (AED 10,283) includes remote control operation, rain sensors that close the carport automatically, heat sensors for sun tracking, and full smartphone app compatibility. It can be installed during initial construction or retrofitted to an existing manual system.',
  },
  {
    question: 'Does Wasleen deliver foldable garages internationally?',
    answer:
      'Yes, we ship and install worldwide — including GCC countries (Saudi Arabia, Qatar, Kuwait, Bahrain, Oman), Europe, North and South America, Asia, Africa, and Australia. Delivery timelines vary based on vessel schedules, port availability, and regional customs clearance. Contact our team for a personalised delivery estimate based on your location.',
  },
  {
    question: 'Does Wasleen deliver and install across all UAE emirates?',
    answer:
      'Yes, we cover all seven emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Our team handles everything from site survey and foundation work through to final installation and handover.',
  },
];

// ─── Organization Schema ────────────────────────────

/**
 * Organization schema for Google Knowledge Panel.
 * Includes founder info, founding date, and social profiles (sameAs).
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description: DEFAULT_DESCRIPTION,
    foundingDate: '2015',
    founders: [
      {
        '@type': 'Person',
        name: 'Jamsheed Khalid',
      },
      {
        '@type': 'Person',
        name: 'Kavya Ramachandran Nair',
      },
    ],
    address: ADDRESS,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${WHATSAPP_NUMBER}`,
      contactType: 'sales',
      availableLanguage: ['English', 'Arabic'],
      areaServed: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'US', 'GB', 'AU', 'DE', 'FR', 'CA', 'SG'],
    },
    sameAs: SAME_AS,
    knowsAbout: [
      'Retractable Carports',
      'Foldable Garages',
      'Aluminium Structures',
      'PVDF Coating',
      'Automated Carport Systems',
      'UV Protection Solutions',
    ],
  };
}

// ─── LocalBusiness Schema ───────────────────────────

/**
 * LocalBusiness schema for local search pack + Knowledge Panel.
 * Includes full street address, opening hours, and telephone.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    image: `${SITE_URL}/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp`,
    telephone: `+${WHATSAPP_NUMBER}`,
    email: COMPANY_EMAIL,
    address: ADDRESS,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      { '@type': 'City', name: 'Abu Dhabi' },
      { '@type': 'City', name: 'Sharjah' },
      { '@type': 'City', name: 'Ajman' },
      { '@type': 'City', name: 'Ras Al Khaimah' },
      { '@type': 'City', name: 'Fujairah' },
      { '@type': 'City', name: 'Umm Al Quwain' },
    ],
    priceRange: 'AED 33,600 – AED 120,000+',
    currenciesAccepted: 'AED',
    paymentAccepted: ['Card', 'Bank Transfer', 'Paddle'],
    sameAs: SAME_AS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Foldable Garage Products',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manual Foldable Garage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automatic Foldable Garage' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Carport Systems' } },
      ],
    },
  };
}

// ─── Product Schema ─────────────────────────────────

/**
 * Product schema for Google product rich results.
 * Includes AggregateOffer pricing, brand, materials, colours.
 */
export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Wasleen Foldable Premium Garage',
    alternateName: 'Retractable Carport',
    description: DEFAULT_DESCRIPTION,
    brand: {
      '@type': 'Brand',
      name: COMPANY_NAME,
    },
    sku: 'WFG-2025',
    mpn: 'WFG-6063T5',
    image: [
      `${SITE_URL}/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp`,
      `${SITE_URL}/images/foldable-garage-wasleen-pergolas-dubai-og-image.webp`,
      `${SITE_URL}/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp`,
      `${SITE_URL}/images/foldable-carport-material-choice-by-wasleen-pergolas.webp`,
      `${SITE_URL}/images/foldable-and-retractable-carport-engineering-specification-drawing-by-wasleen-pergolas.webp`,
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AED',
      lowPrice: 33600,
      highPrice: 120000,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/quote`,
      offers: [
        {
          '@type': 'Offer',
          name: 'Manual Foldable Garage',
          price: 33600,
          priceCurrency: 'AED',
          priceValidUntil: '2026-12-31',
        },
        {
          '@type': 'Offer',
          name: 'Automatic Foldable Garage',
          price: 54000,
          priceCurrency: 'AED',
          priceValidUntil: '2026-12-31',
        },
        {
          '@type': 'Offer',
          name: 'Commercial Foldable Garage',
          price: 120000,
          priceCurrency: 'AED',
          priceValidUntil: '2026-12-31',
        },
      ],
    },
    material: '6063-T5 Aluminium Alloy',
    color: ['Bronze/Tea', 'Sapphire Blue', 'Light Smoke', 'Medium Smoke', 'Dark Charcoal'],
    countryOfOrigin: 'AE',
    category: 'Building & Construction',
    manufacturer: {
      '@type': 'Organization',
      name: COMPANY_NAME,
    },
    award: ['ISO Certified', 'DED Approved', 'DDA Compliant'],
  };
}

// ─── AggregateRating Schema ─────────────────────────

/**
 * AggregateRating schema from the 142 seed reviews.
 * Shows star rating in Google search results.
 */
export function aggregateRatingSchema() {
  // Calculated from 142 reviews: ~79% 5-star, ~15% 4-star, ~4% 3-star, ~1% 2-star, ~<1% 1-star
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'Product',
      name: 'Wasleen Foldable Premium Garage',
    },
    ratingValue: '4.7',
    bestRating: '5',
    worstRating: '1',
    ratingCount: 142,
    reviewCount: 142,
  };
}

// ─── FAQPage Schema ─────────────────────────────────

/**
 * FAQPage schema for Google FAQ rich snippets.
 * Each question-answer pair can appear as an expandable snippet in search.
 *
 * @param questions - Array of {question, answer} objects. Defaults to FAQ_QUESTIONS.
 */
export function faqSchema(questions?: FAQItem[]) {
  const items = questions ?? FAQ_QUESTIONS;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

// ─── BreadcrumbList Schema ──────────────────────────

/**
 * BreadcrumbList schema for breadcrumb rich results in search.
 * Call this on every page with the page's breadcrumb trail.
 *
 * @param crumbs - Array of {name, url} objects, e.g.
 *   [{name: 'Home', url: '/'}, {name: 'Product', url: '/product'}]
 */
export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.url}`,
    })),
  };
}

// ─── Article Schema ─────────────────────────────────

/**
 * Article schema for blog posts.
 * Enables news/article rich results in Google Search and Google News.
 *
 * @param post - BlogPost object from the data layer
 */
export function articleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.titleEn,
    description: post.excerptEn,
    image: post.featuredImage ? `${SITE_URL}${post.featuredImage}` : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
    inLanguage: 'en',
  };
}

// ─── VideoObject Schema ─────────────────────────────

/**
 * VideoObject schema for product mechanism video.
 * Enables video rich results in search.
 */
export function videoObjectSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Wasleen Foldable Garage — Mechanism Demonstration',
    description:
      'Watch the Wasleen Foldable Premium Garage retraction mechanism in action. Three-panel aluminium system with smooth automatic operation.',
    thumbnailUrl: [
      `${SITE_URL}/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp`,
    ],
    contentUrl: `${SITE_URL}/videos/foldable-garage-wasleen-pergolas-video.mp4`,
    embedUrl: `${SITE_URL}/videos/foldable-garage-wasleen-pergolas-video.mp4`,
    uploadDate: '2025-01-01',
    duration: 'PT30S',
    publisher: {
      '@type': 'Organization',
      name: COMPANY_NAME,
    },
  };
}

// ─── Combined @graph (Root Layout) ──────────────────

/**
 * Returns a combined @graph array with the core schemas
 * used in the root layout: Organization, LocalBusiness,
 * Product, FAQPage, VideoObject, BreadcrumbList.
 */
export function rootLayoutGraph() {
  const org = organizationSchema();
  const localBiz = localBusinessSchema();
  const product = productSchema();
  const faq = faqSchema();
  const video = videoObjectSchema();
  const breadcrumb = breadcrumbSchema([{ name: 'Home', url: '/' }]);

  // Strip @context from individual items — only needed once at @graph level
  const items = [org, localBiz, product, faq, video, breadcrumb].map(
    ({ '@context': _ctx, ...rest }) => rest
  );

  return {
    '@context': 'https://schema.org',
    '@graph': items,
  };
}
