import Link from "next/link";
import { MessageCircle } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import {
  INSTAGRAM_URL,
  WHATSAPP_NUMBER,
  CONTACT_PHONE_DISPLAY,
  CONTACT_EMAIL,
  BUSINESS_HOURS,
} from "@/lib/config";

const SHOP_LINKS = [
  { href: "/collections/new-arrivals", label: "New Arrivals" },
  { href: "/collections/dresses", label: "Dresses" },
  { href: "/collections/sets", label: "Sets" },
  { href: "/collections/sale", label: "Sale" },
  { href: "/collections/best-sellers", label: "Best Sellers" },
];

const HELP_LINKS = [
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About Kay Reluxe" },
  { href: "/contact#faq", label: "FAQ" },
  { href: "/delivery-returns", label: "Delivery & Returns" },
];

export default function Footer() {
  return (
    <footer className="grain bg-charcoal text-ivory">
      <div className="container grid grid-cols-2 gap-10 py-16 sm:py-20 lg:grid-cols-5">
        <div className="col-span-2">
          <span className="font-display text-2xl tracking-[0.18em]">KAY RELUXE</span>
          <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-ivory/65">
            Curated fashion for every version of you. Designed with intention, worn with confidence.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kay Reluxe on Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-champagne hover:text-champagne"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Kay Reluxe on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-champagne hover:text-champagne"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/50">
            Shop
          </h3>
          <ul className="space-y-3">
            {SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-sans text-sm text-ivory/75 hover:text-champagne">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/50">
            Help
          </h3>
          <ul className="space-y-3">
            {HELP_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-sans text-sm text-ivory/75 hover:text-champagne">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory/50">
            Contact
          </h3>
          <ul className="space-y-3 font-sans text-sm text-ivory/75">
            <li>
              <a href={`tel:${CONTACT_PHONE_DISPLAY.replace(/\s/g, "")}`} className="hover:text-champagne">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-all hover:text-champagne">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">
                WhatsApp assistance
              </a>
            </li>
            <li className="text-ivory/55">{BUSINESS_HOURS}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="font-sans text-xs text-ivory/50">
            (c) {new Date().getFullYear()} Kay Reluxe. All rights reserved.
          </p>
          <div className="flex gap-5 font-sans text-xs text-ivory/50">
            <Link href="/delivery-returns" className="hover:text-champagne">
              Shipping &amp; Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

