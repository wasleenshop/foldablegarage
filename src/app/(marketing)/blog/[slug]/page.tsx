import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BLOG_POSTS, getBlogPostBySlug } from '@/data/blog-posts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

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
