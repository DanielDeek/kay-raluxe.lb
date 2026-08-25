"use client";

import { FormEvent, useState } from "react";

export default function Newsletter({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div data-gsap-reveal className={dark ? "text-ivory" : "text-charcoal"}>
      <span className={`font-sans text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-champagne" : "text-mutedBrown"}`}>
        The Kay Reluxe edit
      </span>
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">A little inspiration, delivered.</h2>
      <p className={dark ? "mt-4 max-w-md font-sans text-sm leading-relaxed text-ivory/65" : "mt-4 max-w-md font-sans text-sm leading-relaxed text-charcoal/60"}>
        New arrivals, styling notes and occasional private offers. No noise, just the good pieces.
      </p>
      {submitted ? (
        <p className="mt-7 font-sans text-sm text-champagne" role="status">
          Thanks for your interest. Newsletter signup will be connected soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 flex max-w-md flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            className={dark ? "min-h-12 flex-1 border border-ivory/25 bg-transparent px-4 font-sans text-sm text-ivory placeholder:text-ivory/40" : "min-h-12 flex-1 border border-charcoal/20 bg-transparent px-4 font-sans text-sm text-charcoal placeholder:text-charcoal/40"}
          />
          <button type="submit" className="min-h-12 bg-charcoal px-6 font-sans text-sm text-ivory transition-colors hover:bg-mutedBrown">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
