"use client";

import { WHATSAPP_NUMBER } from "@/lib/config";
import { cn } from "@/lib/utils";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  className?: string;
  variant?: "solid" | "outline" | "floating";
  disabled?: boolean;
}

export default function WhatsAppButton({
  message = "Hello Luxe Avenue, I have a question about your collection.",
  label = "Order on WhatsApp",
  className,
  variant = "solid",
  disabled = false,
}: WhatsAppButtonProps) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={cn(
          "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8",
          className
        )}
      >
        <WhatsAppIcon className="h-5 w-5" />
      </a>
    );
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40";
  const styles =
    variant === "outline"
      ? "border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory"
      : "bg-charcoal text-ivory hover:bg-mutedBrown";

  if (disabled) {
    return (
      <button type="button" disabled className={cn(base, styles, className)}>
        <WhatsAppIcon className="h-3.5 w-3.5" />
        {label}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, styles, className)}
    >
      <WhatsAppIcon className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}
