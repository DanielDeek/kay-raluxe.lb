import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The Luxe Avenue page you requested could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div data-gsap-reveal className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20 text-center">
      <span className="font-display text-8xl text-charcoal/15 sm:text-9xl">404</span>
      <h1 className="mt-4 font-display text-3xl text-charcoal sm:text-4xl">This page has stepped out.</h1>
      <p className="mt-3 max-w-sm font-sans text-sm text-charcoal/60">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back to shopping.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-charcoal px-7 py-3.5 font-sans text-sm text-ivory transition-colors hover:bg-mutedBrown"
        >
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center border border-charcoal px-7 py-3.5 font-sans text-sm text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
        >
          Shop All
        </Link>
      </div>
    </div>
  );
}
