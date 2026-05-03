import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { getBlogPostBySlug } from '@/data/blog-posts';

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

  return (
    <main>
      <BlogPostContent post={post} />
    </main>
  );
}
