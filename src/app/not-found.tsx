import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found | Wasleen Foldable Garage',
  robots: { index: false, follow: false },
};

/**
 * Custom 404 page with navigation back to the homepage.
 */
export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
      <div className="mx-auto max-w-[480px] text-center">
        <h1 className="font-sans text-[clamp(3rem,6vw,5rem)] font-bold text-accent-gold">
          404
        </h1>
        <h2 className="mt-4 font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-text-primary">
          Page Not Found
        </h2>
        <p className="mt-3 text-text-secondary">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-accent-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-gold-hover"
        >
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}
