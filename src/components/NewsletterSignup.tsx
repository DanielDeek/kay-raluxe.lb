"use client";

import { FormEvent, useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="border-b border-ivory/15 py-10 sm:py-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="min-w-0">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne">
            The private edit
          </span>
          <h2 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">Stay close to what is new.</h2>
          <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-ivory/55">
            New arrivals, styling notes and occasional private offers. No noise.
          </p>
        </div>

        {submitted ? (
          <p className="w-full max-w-md border border-champagne/40 px-4 py-3 font-sans text-sm text-champagne" role="status">
            You are on the list. We will be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
            <input
              id="footer-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              className="min-h-11 min-w-0 flex-1 border border-ivory/25 bg-transparent px-4 font-sans text-sm text-ivory outline-none placeholder:text-ivory/40 focus:border-champagne"
            />
            <button type="submit" className="min-h-11 bg-ivory px-5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-champagne">
              Join the list
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
