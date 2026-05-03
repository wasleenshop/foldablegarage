import type { MetadataRoute } from 'next';

/**
 * Dynamic robots.txt route.
 * Allows all crawlers, points to sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foldablegarage.wasleen.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/thank-you'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
