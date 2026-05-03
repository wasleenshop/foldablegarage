import type { MetadataRoute } from 'next';

/**
 * Dynamic sitemap.xml route.
 * Lists all public pages for search engine indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foldablegarage.wasleen.com';

  // Base routes
  const routes = ['', '/quote', '/contact'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
