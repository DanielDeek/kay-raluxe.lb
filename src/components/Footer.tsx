import Link from "next/link";
import InstagramIcon from "@/components/icons/InstagramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import NewsletterSignup from "@/components/NewsletterSignup";
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

const linkClass = "font-sans text-sm text-ivory/65 transition-colors hover:text-champagne";

export default function Footer() {
  return (
    <footer className="grain bg-charcoal text-ivory">
      <div className="container">
        <div className="grid gap-12 border-b border-ivory/15 py-14 sm:gap-14 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-20 lg:py-20">
          <div className="min-w-0">
            <Link href="/" className="inline-block font-display text-2xl tracking-[0.18em] text-ivory transition-colors hover:text-champagne sm:text-3xl">
              KAY RELUXE
            </Link>
            <p className="mt-5 max-w-sm font-sans text-sm leading-7 text-ivory/60">
              Turkish outfits and trendy pieces for every version of your style. Delivery all over Lebanon.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kay Reluxe on Instagram"
                title="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory/75 transition-colors hover:border-champagne hover:text-champagne"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Kay Reluxe on WhatsApp"
                title="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory/75 transition-colors hover:border-champagne hover:text-champagne"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-10">
            <FooterColumn title="Shop" links={SHOP_LINKS} />
            <FooterColumn title="Help" links={HELP_LINKS} />

            <div className="col-span-2 min-w-0 sm:col-span-1">
              <h3 className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/45">
                Contact
              </h3>
              <ul className="space-y-3.5 font-sans text-sm text-ivory/65">
                <li>
                  <a href={`tel:${CONTACT_PHONE_DISPLAY.replace(/\s/g, "")}`} className={linkClass}>
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </li>
                {CONTACT_EMAIL && (
                  <li>
                    <a href={`mailto:${CONTACT_EMAIL}`} className={`${linkClass} break-all`}>
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                )}
                <li className="text-ivory/45">{BUSINESS_HOURS}</li>
              </ul>
            </div>
          </div>
        </div>

        <NewsletterSignup />

        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="font-sans text-[11px] text-ivory/40">
            (c) {new Date().getFullYear()} Kay Reluxe. All rights reserved.
          </p>
          <Link href="/delivery-returns" className="font-sans text-[11px] text-ivory/45 transition-colors hover:text-champagne">
            Shipping &amp; Returns
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="min-w-0">
      <h3 className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/45">
        {title}
      </h3>
      <ul className="space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
