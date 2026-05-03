import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blog-posts';

/**
 * Dynamic sitemap.xml route.
 * Lists all public pages for search engine indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foldablegarage.wasleen.com';

  // Static routes
  const staticRoutes = [
    { url: `${siteUrl}`, priority: 1.0 },
    { url: `${siteUrl}/product`, priority: 0.9 },
    { url: `${siteUrl}/about`, priority: 0.8 },
    { url: `${siteUrl}/gallery`, priority: 0.8 },
    { url: `${siteUrl}/blog`, priority: 0.8 },
    { url: `${siteUrl}/contact`, priority: 0.7 },
    { url: `${siteUrl}/quote`, priority: 0.9 },
    { url: `${siteUrl}/warranty`, priority: 0.5 },
    { url: `${siteUrl}/returns`, priority: 0.5 },
    { url: `${siteUrl}/terms`, priority: 0.5 },
    { url: `${siteUrl}/privacy`, priority: 0.5 },
  ];

  // Blog post routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    priority: 0.7 as const,
    lastModified: new Date(post.publishedAt),
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: route.url,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route.priority,
    })),
    ...blogRoutes,
  ];
}
