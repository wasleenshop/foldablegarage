'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Fires a GTM page_view event on every route change.
 * Place once in the root layout — it monitors all client-side navigation.
 *
 * GTM will read this event and forward it to GA4 as a page_view hit.
 */
export function GtmPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page: {
          path: pathname,
          search: searchParams.toString(),
          title: document.title,
        },
      });
    }
  }, [pathname, searchParams]);

  // This component does not render anything
  return null;
}
