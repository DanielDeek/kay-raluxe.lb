"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_NUMBER } from "@/lib/config";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-[100] flex flex-col bg-charcoal text-ivory lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div className="container flex h-16 items-center justify-between sm:h-20">
            <span className="font-display text-xl tracking-[0.18em]">KAY RELUXE</span>
            <button onClick={onClose} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="container flex flex-1 flex-col justify-center gap-2">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display block py-2.5 text-4xl tracking-wide text-ivory transition-colors hover:text-champagne sm:text-5xl"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="container mb-10 flex items-center gap-6 border-t border-ivory/15 pt-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ivory/80 hover:text-champagne"
            >
              <InstagramIcon className="h-4 w-4" />
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ivory/80 hover:text-champagne"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

