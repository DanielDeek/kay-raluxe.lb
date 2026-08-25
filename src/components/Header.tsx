"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { count, openBag } = useCart();

  const isHome = pathname === "/";

  useEffect(() => {
    let frame = 0;
    const onScroll = () => setScrolled(window.scrollY > 40);
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        onScroll();
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [searchOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the transient search panel after navigation
    setSearchOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-[top,background-color,box-shadow] duration-500",
          transparent
            ? "top-8 bg-gradient-to-b from-charcoal/45 via-charcoal/15 to-transparent backdrop-blur-[1px]"
            : "top-0 bg-ivory/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(23,23,23,0.08)]"
        )}
      >
        <div className="container flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className={cn(
              "font-display text-xl tracking-[0.18em] transition-colors sm:text-2xl",
              transparent ? "text-ivory" : "text-charcoal"
            )}
          >
            KAY RALUXE
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative py-1 font-sans text-xs font-medium uppercase tracking-[0.15em] transition-colors",
                    transparent ? "text-ivory/90" : "text-charcoal/80",
                    "hover:text-champagne"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-300 group-hover:scale-x-100",
                      active && "scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen((open) => !open)}
                aria-label="Search products"
                aria-expanded={searchOpen}
                aria-controls="global-search-panel"
                className={cn("flex h-11 w-11 items-center justify-center", transparent ? "text-ivory" : "text-charcoal")}
              >
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    id="global-search-panel"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className={cn(
                      "global-search-panel absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(20rem,calc(100vw-2rem))] border p-3 shadow-lg",
                      transparent ? "border-ivory/20 bg-charcoal/95" : "border-charcoal/10 bg-ivory"
                    )}
                  >
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        router.push(`/shop${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ""}`);
                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Search className={cn("h-4 w-4 shrink-0", transparent ? "text-ivory/60" : "text-charcoal/50")} />
                      <label htmlFor="global-search" className="sr-only">Search products</label>
                      <input
                        ref={searchInputRef}
                        id="global-search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search the edit"
                        className={cn(
                          "min-w-0 flex-1 bg-transparent py-1.5 font-sans text-sm outline-none",
                          transparent ? "text-ivory placeholder:text-ivory/50" : "text-charcoal placeholder:text-charcoal/40"
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className={cn("shrink-0 px-1 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em]", transparent ? "text-ivory/60 hover:text-ivory" : "text-charcoal/50 hover:text-charcoal")}
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        aria-label="Submit search"
                        className="shrink-0 bg-charcoal px-3 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-mutedBrown"
                      >
                        Go
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={openBag}
              aria-label={`Open shopping bag${count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
              className={cn("relative flex h-11 w-11 items-center justify-center", transparent ? "text-ivory" : "text-charcoal")}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-champagne px-1 font-sans text-[9px] font-bold text-charcoal">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn("flex h-11 w-11 items-center justify-center lg:hidden", transparent ? "text-ivory" : "text-charcoal")}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}

