'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const tagColours: Record<string, string> = {
    'buying-guide': 'bg-accents-gold/10 text-accents-gold',
    'dubai': 'bg-accents-cyan/10 text-accents-cyan',
    'carport-guide': 'bg-accents-gold/10 text-accents-gold',
    'materials': 'bg-violet-500/10 text-violet-400',
    'aluminium': 'bg-blue-500/10 text-blue-400',
    'technical': 'bg-violet-500/10 text-violet-400',
    'benefits': 'bg-green-500/10 text-green-400',
    'lifestyle': 'bg-accents-cyan/10 text-accents-cyan',
    'maintenance': 'bg-amber-500/10 text-amber-400',
    'care-guide': 'bg-amber-500/10 text-amber-400',
    'future-trends': 'bg-pink-500/10 text-pink-400',
    'smart-home': 'bg-accents-cyan/10 text-accents-cyan',
    'sustainability': 'bg-green-500/10 text-green-400',
    'permits': 'bg-red-500/10 text-red-400',
    'regulations': 'bg-red-500/10 text-red-400',
    'guide': 'bg-accents-gold/10 text-accents-gold',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-2xl border border-border-subtle bg-card-background transition-all duration-300 hover:-translate-y-1 hover:border-accents-gold/30 hover:shadow-[0_8px_32px_rgba(201,168,76,0.08)]"
      >
        {/* Featured Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.featuredImage || '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp'}
            alt={post.titleEn}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />

          {/* Tags */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize backdrop-blur-sm ${tagColours[tag] || 'bg-white/10 text-text-secondary'}`}
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
            {post.featured && (
              <span className="rounded-full bg-accents-gold/20 px-2.5 py-0.5 text-[11px] font-medium text-accents-gold backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="mb-2 text-xs text-text-tertiary">
            {formatRelativeTime(post.publishedAt)}
          </p>
          <h3 className="mb-2 font-heading text-base font-semibold leading-snug text-text-primary transition-colors duration-200 group-hover:text-accents-gold line-clamp-2">
            {post.titleEn}
          </h3>
          <p className="text-sm leading-relaxed text-text-secondary line-clamp-2">
            {post.excerptEn}
          </p>

          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accents-gold opacity-0 transition-all duration-200 group-hover:opacity-100">
            <span>Read More</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
