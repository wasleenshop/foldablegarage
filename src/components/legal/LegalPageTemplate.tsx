'use client';

import { motion } from 'framer-motion';

interface LegalPageTemplateProps {
  title: string;
  subtitle: string;
  effectiveDate: string;
  children: React.ReactNode;
}

export function LegalPageTemplate({
  title,
  subtitle,
  effectiveDate,
  children,
}: LegalPageTemplateProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-bg-primary md:min-h-[340px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-1/2 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent-gold/5 blur-[100px]" />
          <div className="absolute -right-1/2 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent-cyan/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4 text-xs font-semibold tracking-[0.2em] text-accent-gold"
          >
            LEGAL
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-text-primary"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mx-auto mt-4 max-w-[650px] text-[clamp(0.875rem,1vw,1rem)] leading-relaxed text-text-secondary"
          >
            {subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mt-4 text-xs text-text-tertiary"
          >
            Effective {effectiveDate} &middot; UAE Jurisdiction
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-bg-secondary py-16 md:py-20">
        <div className="mx-auto max-w-[860px] px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared sub-components for legal content styling                    */
/* ------------------------------------------------------------------ */

export function PolicySection({
  id,
  number,
  title,
  intro,
  children,
}: {
  id?: string;
  number: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mb-14 scroll-mt-24 last:mb-0">
      <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-accent-gold uppercase">
        Section {number}
      </p>
      <h2 className="mb-5 font-sans text-2xl font-semibold leading-tight text-text-primary">
        {title}
      </h2>
      {intro && (
        <p className="mb-7 border-l-[3px] border-accent-gold pl-5 text-base italic leading-relaxed text-text-secondary">
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}

export function PolicyBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
      {children}
    </div>
  );
}

export function PolicySubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-3 border-b border-border-subtle pb-2 text-xs font-semibold uppercase tracking-[0.06em] text-text-primary">
        {title}
      </h3>
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        {children}
      </div>
    </div>
  );
}

export function PolicyList({
  items,
}: {
  items: { number: string; content: React.ReactNode }[];
}) {
  return (
    <ul className="space-y-0">
      {items.map((item) => (
        <li
          key={item.number}
          className="flex gap-4 border-b border-border-subtle py-3.5 text-sm leading-relaxed text-text-secondary last:border-b-0"
        >
          <span className="w-6 shrink-0 font-sans text-lg font-semibold text-accent-gold">
            {item.number}
          </span>
          <span>{item.content}</span>
        </li>
      ))}
    </ul>
  );
}

export function PolicyTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b-2 border-text-primary">
            {headers.map((h) => (
              <th
                key={h}
                className="pb-3 pr-4 text-xs font-semibold uppercase tracking-[0.1em] text-text-tertiary last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border-subtle last:border-b-0">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-3.5 pr-4 align-top text-sm leading-relaxed text-text-secondary last:pr-0 ${
                    ci === 0 ? 'font-medium text-text-primary' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AlertBox({
  title,
  caution = false,
  children,
}: {
  title: string;
  caution?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`my-6 rounded-r-lg border p-5 ${
        caution
          ? 'border-l-4 border-l-[#C9603A] border-border-subtle bg-[#FDF8F6]/50'
          : 'border-l-4 border-l-accent-gold border-border-subtle bg-card-bg'
      }`}
    >
      <p
        className={`mb-2 text-xs font-semibold uppercase tracking-[0.08em] ${
          caution ? 'text-[#C9603A]' : 'text-accent-gold'
        }`}
      >
        {title}
      </p>
      <div className="text-sm leading-relaxed text-text-secondary">
        {children}
      </div>
    </div>
  );
}

export function WarrantyTierCard({
  years,
  label,
  component,
  description,
}: {
  years: string;
  label: string;
  component: string;
  description: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border-subtle bg-card-bg p-6">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-accent-gold" />
      <p className="font-sans text-4xl font-bold text-accent-gold leading-none">
        {years}
      </p>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-text-tertiary">
        {label}
      </p>
      <p className="mb-2 text-sm font-semibold text-text-primary">{component}</p>
      <p className="text-xs leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}

export function PolicyDivider() {
  return <hr className="my-10 border-border-subtle" />;
}
