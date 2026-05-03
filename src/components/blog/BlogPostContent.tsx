'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';

interface BlogPostContentProps {
  post: BlogPost;
}

/**
 * Renders markdown-like content as HTML.
 * Supports: ## H2, ### H3, **bold**, tables (|...|...|), numbered lists (1.), bullet lists (-), paragraphs.
 */
function renderContent(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let keyCounter = 0;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    const key = `node-${keyCounter++}`;

    // Skip empty lines
    if (trimmed === '') {
      i++;
      continue;
    }

    // H2 headings
    if (trimmed.startsWith('## ')) {
      nodes.push(
        <h2 key={key} className="mb-4 mt-10 font-heading text-xl font-bold text-text-primary md:text-2xl">
          {trimmed.replace('## ', '')}
        </h2>,
      );
      i++;
      continue;
    }

    // H3 headings
    if (trimmed.startsWith('### ')) {
      nodes.push(
        <h3 key={key} className="mb-3 mt-8 font-heading text-lg font-semibold text-text-primary">
          {trimmed.replace('### ', '')}
        </h3>,
      );
      i++;
      continue;
    }

    // Tables (detect pipe-separated rows)
    if (trimmed.startsWith('|') && line.includes('---')) {
      // Skip separator row
      i++;
      continue;
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const headerRow = trimmed;
      const separatorLine = i + 1 < lines.length ? lines[i + 1].trim() : '';

      if (separatorLine.startsWith('|') && separatorLine.includes('---')) {
        // It's a table
        const headers = headerRow
          .split('|')
          .filter((c) => c.trim())
          .map((c) => c.trim());

        const bodyRows: string[][] = [];
        let rowIdx = i + 2;
        while (rowIdx < lines.length) {
          const rowTrimmed = lines[rowIdx].trim();
          if (!rowTrimmed.startsWith('|') || !rowTrimmed.endsWith('|')) break;
          const cells = rowTrimmed
            .split('|')
            .filter((c) => c.trim())
            .map((c) => c.trim());
          bodyRows.push(cells);
          rowIdx++;
        }

        nodes.push(
          <div key={key} className="my-6 overflow-x-auto rounded-lg border border-border-subtle">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-card-background">
                  {headers.map((h, hi) => (
                    <th key={hi} className="px-4 py-3 text-left font-semibold text-text-primary">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border-subtle last:border-b-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-text-secondary">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );

        i = rowIdx;
        continue;
      }
    }

    // Numbered lists
    if (/^\d+\.\s/.test(trimmed)) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length) {
        const listLine = lines[i].trim();
        const listKey = `li-${keyCounter++}`;
        const match = listLine.match(/^\d+\.\s(.+)$/);
        if (!match) break;
        const itemContent = parseInlineFormatting(match[1]);
        listItems.push(
          <li key={listKey} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accents-gold/10 text-xs font-bold text-accents-gold">
              {listItems.length + 1}
            </span>
            <span className="text-text-secondary">{itemContent}</span>
          </li>,
        );
        i++;
      }
      nodes.push(
        <ul key={key} className="my-5 space-y-3">
          {listItems}
        </ul>,
      );
      continue;
    }

    // Bullet lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('**')) {
      // Check if this is a bold bullet point (like "**Item:** description")
      if (trimmed.includes('**') && trimmed.includes('—')) {
        const listItems: React.ReactNode[] = [];
        while (i < lines.length) {
          const listLine = lines[i].trim();
          const listKey = `bl-${keyCounter++}`;
          if (!listLine.startsWith('- ') && !listLine.startsWith('**')) break;
          const content = listLine.replace(/^- /, '');
          listItems.push(
            <li key={listKey} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accents-gold" />
              <span className="text-text-secondary">{parseInlineFormatting(content)}</span>
            </li>,
          );
          i++;
        }
        nodes.push(
          <ul key={key} className="my-5 space-y-2">
            {listItems}
          </ul>,
        );
        continue;
      }

      const listItems: React.ReactNode[] = [];
      while (i < lines.length) {
        const listLine = lines[i].trim();
        const listKey = `bl-${keyCounter++}`;
        if (!listLine.startsWith('- ')) break;
        const content = listLine.replace(/^- /, '');
        listItems.push(
          <li key={listKey} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accents-gold" />
            <span className="text-text-secondary">{parseInlineFormatting(content)}</span>
          </li>,
        );
        i++;
      }
      nodes.push(
        <ul key={key} className="my-5 space-y-2">
          {listItems}
        </ul>,
      );
      continue;
    }

    // Regular paragraph with inline formatting
    nodes.push(
      <p key={key} className="mb-4 text-text-secondary leading-relaxed">
        {parseInlineFormatting(trimmed)}
      </p>,
    );
    i++;
  }

  return nodes;
}

/**
 * Parses inline formatting: **bold**, and returns React nodes.
 */
function parseInlineFormatting(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = regex.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Bold text
    parts.push(
      <strong key={`b-${keyCounter++}`} className="font-semibold text-text-primary">
        {match[1]}
      </strong>,
    );
    lastIndex = regex.lastIndex;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="bg-bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-[800px] px-4 md:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accents-gold"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border-subtle"
        >
          <Image
            src={post.featuredImage || '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp'}
            alt={post.titleEn}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </motion.div>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-4 flex flex-wrap items-center gap-3"
        >
          <span className="text-sm text-text-tertiary">{formatRelativeTime(post.publishedAt)}</span>
          <span className="text-text-tertiary">·</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-card-background px-2.5 py-0.5 text-[11px] font-medium capitalize text-text-secondary border border-border-subtle"
            >
              {tag.replace(/-/g, ' ')}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 font-heading text-[clamp(1.5rem,_3vw,_2.5rem)] font-bold leading-[1.1] text-text-primary"
        >
          {post.titleEn}
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose-custom"
        >
          {renderContent(post.contentEn)}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl border border-border-subtle bg-card-background p-8 text-center"
        >
          <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary">
            Ready to Protect Your Vehicle?
          </h3>
          <p className="mb-6 text-sm text-text-secondary">
            Get a free quote for your Wasleen Foldable Premium Garage today.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-xl bg-accents-gold px-6 py-3 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accents-gold-hover"
          >
            Get a Free Quote
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
