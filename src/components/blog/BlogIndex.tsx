'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogCard } from '@/components/blog/BlogCard';
import { BLOG_POSTS, getBlogTags } from '@/data/blog-posts';
import type { BlogPost } from '@/lib/types';

const POSTS_PER_PAGE = 6;
const ALL_TAG = 'all';

export function BlogIndex() {
  const [activeTag, setActiveTag] = useState<string>(ALL_TAG);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tags = useMemo(() => getBlogTags(), []);

  // Filter posts by tag and search
  const filteredPosts = useMemo(() => {
    let posts: BlogPost[] = BLOG_POSTS;

    // Filter by tag
    if (activeTag !== ALL_TAG) {
      posts = posts.filter((post) => post.tags.includes(activeTag));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      posts = posts.filter(
        (post) =>
          post.titleEn.toLowerCase().includes(query) ||
          post.excerptEn.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Sort by date (newest first)
    return posts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [activeTag, searchQuery]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE,
  );

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-[500px]">
            <svg
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-xl border border-border-subtle bg-card-background py-3 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-tertiary transition-colors duration-200 focus:border-accents-gold/50 focus:outline-none focus:ring-1 focus:ring-accents-gold/20"
            />
          </div>
        </div>

        {/* Tag Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => handleTagChange(ALL_TAG)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
              activeTag === ALL_TAG
                ? 'bg-accents-gold text-bg-primary'
                : 'bg-card-background text-text-secondary hover:text-text-primary border border-border-subtle'
            }`}
          >
            All Posts
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`rounded-full px-4 py-1.5 text-sm capitalize transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-accents-gold text-bg-primary'
                  : 'bg-card-background text-text-secondary hover:text-text-primary border border-border-subtle'
              }`}
            >
              {tag.replace(/-/g, ' ')}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            <div className="mb-4 flex justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-text-tertiary">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-lg font-medium text-text-primary">No articles found</p>
            <p className="mt-1 text-sm text-text-secondary">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTag(ALL_TAG);
              }}
              className="mt-4 text-sm font-medium text-accents-gold underline underline-offset-2 hover:text-accents-gold-hover transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {paginatedPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-card-background text-text-secondary transition-all duration-200 hover:border-accents-gold/30 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === safePage
                    ? 'bg-accents-gold text-bg-primary'
                    : 'border border-border-subtle bg-card-background text-text-secondary hover:border-accents-gold/30 hover:text-text-primary'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-card-background text-text-secondary transition-all duration-200 hover:border-accents-gold/30 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
