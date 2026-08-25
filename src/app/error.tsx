"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <div data-gsap-reveal className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center"><p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-mutedBrown">A small interruption</p><h1 className="mt-3 font-display text-4xl text-charcoal">Something went wrong.</h1><p className="mt-3 max-w-sm font-sans text-sm text-charcoal/60">Please try again, or contact Kay Raluxe on WhatsApp if the problem continues.</p><button onClick={() => reset()} className="mt-7 bg-charcoal px-7 py-3.5 font-sans text-sm text-ivory hover:bg-mutedBrown">Try again</button></div>;
}
