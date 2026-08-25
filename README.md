# Kay Reluxe — Fashion Boutique Website

A premium, editorial, frontend-only fashion e-commerce website for **Kay Reluxe**, built with Next.js (App Router), TypeScript, and Tailwind CSS. Checkout happens entirely through WhatsApp — there is no backend, database, authentication, or payment gateway.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — component animation & page transitions
- **GSAP + ScrollTrigger** — pinned horizontal scroll showcase
- **Lenis** — smooth scrolling
- **Lucide React** — icons
- Local static data + **localStorage** for the shopping bag and favorites (no database)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

`npm run build` has been verified to complete successfully with no TypeScript or ESLint errors.

## Project structure

```
src/
  app/                        Routes (App Router)
    page.tsx                  Home
    shop/                     Shop with client-side filters
    product/[slug]/           Product detail pages
    collections/              Collections index + [slug] detail
    about/                    Brand story
    contact/                  Contact info, form, FAQ
    bag/                      Full shopping bag page
    not-found.tsx             Custom 404
    sitemap.ts / robots.ts    SEO
  components/                 Reusable UI (Header, ProductCard, CartDrawer, ...)
  context/                    CartContext, FavoritesContext, ToastContext
  lib/
    config.ts                 <- Store-wide settings (edit this first)
    data/products.ts          <- Demo product catalog (replace with real data)
    data/collections.ts       Collection categories
    whatsapp.ts                WhatsApp order-message builder
    utils.ts                  Formatting helpers
  types/                      Shared TypeScript types
```

## What to edit before going live

All store-wide settings live in `src/lib/config.ts`:

| Setting | Constant |
|---|---|
| WhatsApp number (digits only, international format) | `WHATSAPP_NUMBER` |
| Instagram profile URL & handle | `INSTAGRAM_URL`, `INSTAGRAM_HANDLE` |
| Phone number shown on the Contact page | `CONTACT_PHONE_DISPLAY` |
| Business hours | `BUSINESS_HOURS` |
| Delivery note (announcement bar / contact page) | `DELIVERY_NOTE` |
| Site URL (used for SEO/sitemap) | `SITE_URL` |

**Products, prices, sizes, colors, images, and stock status** live in `src/lib/data/products.ts`. Each product is a single object — add, remove, or edit entries there. Image URLs are centralized via the `img()` helper at the top of the file so they're easy to swap for real photography (currently pointing to placeholder stock photos — see the comment at the top of that file).

**Collection categories** (New Arrivals, Dresses, Tops, Sets, Bottoms, Summer, Sale) live in `src/lib/data/collections.ts`.

**Brand colors** are CSS variables in `src/app/globals.css` (`:root`):

```css
--color-ivory: #f7f3ed;
--color-beige: #e8ded2;
--color-charcoal: #171717;
--color-mutedBrown: #8a7162;
--color-champagne: #c8a97e;
```

**Fonts** (Cormorant Garamond for display, Manrope for body/UI) are loaded via a Google Fonts `<link>` in `src/app/layout.tsx` — swap the `href` there to change typefaces.

## Important note on demo data

The 14 products in `src/lib/data/products.ts` are **placeholder data** — invented names, prices, sizes, and stock status for development purposes only, with generic stock-photo placeholders standing in for real product photography. None of this reflects real Kay Reluxe inventory. Replace every field with verified store data (and official photography) before launch. This is called out in a comment at the top of that file as well.

Likewise, the About page intentionally avoids inventing founding dates, physical locations, or unverifiable claims — add real details there once available.

## How WhatsApp ordering works

There's no backend, so "checkout" builds a pre-filled WhatsApp message and opens `https://wa.me/<number>?text=<encoded message>`. The message includes product names, sizes, colors, quantities, individual and total prices, and (on the bag page) the customer's name, delivery area, and an optional note. See `src/lib/whatsapp.ts` for the message-building logic — edit the template there if you want to change its wording or structure.

Ordering is disabled on the product page until both a size and a color are selected, with inline validation text (no browser alerts).

## Key features

- Animated "KAY RELUXE" loading screen (shown once per session)
- Transparent-to-solid header on scroll, animated fullscreen mobile menu
- Cinematic hero with parallax + scroll-linked fade
- Client-side shop filtering (category, size, color, sort, search, new/sale toggles, active-filter chips, mobile filter drawer, grid/list view, empty state)
- Product pages with gallery + fullscreen zoom, size guide modal, sticky mobile "Add to Bag," related products, recently viewed
- Slide-out cart drawer + full bag page, both backed by `localStorage`
- Favorites (heart) also persisted to `localStorage`
- Frontend-only contact form with inline validation (clearly labeled as a visual demo)
- Respects `prefers-reduced-motion` throughout; visible focus states; semantic HTML; alt text on all imagery
- `next/image` used throughout to avoid layout shift and optimize loading

## Known limitations (by design, per the brief)

- No backend, database, authentication, CMS, or payment gateway — this is a fully static, frontend-only project.
- The contact form does not send anywhere; it's a visual demo (clearly labeled in the UI) unless you wire it up to a form service of your choice.
- Product/catalog data is static TypeScript, not a live inventory system.
