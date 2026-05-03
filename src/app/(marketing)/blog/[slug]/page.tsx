import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { getBlogPostBySlug } from '@/data/blog-posts';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ISR: Revalidate every hour — pages are generated on first visit, then cached
export const revalidate = 3600;

// Allow generating new blog post pages at runtime (not pre-built)
export const dynamicParams = true;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found | Wasleen Blog' };
  }

  return {
    title: `${post.titleEn} | Wasleen Blog`,
    description: post.metaDescriptionEn,
    openGraph: {
      title: post.titleEn,
      description: post.metaDescriptionEn,
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJson = articleSchema(post);
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.titleEn, url: `/blog/${slug}` },
  ]);

  return (
    <main>
      {/* Article structured data for Google News / rich results */}
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />

      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <BlogPostContent post={post} />
    </main>
  );
}
