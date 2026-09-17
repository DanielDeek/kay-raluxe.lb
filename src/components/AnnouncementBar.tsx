"use client";

import { DELIVERY_NOTE } from "@/lib/config";
import { useSiteContent } from "@/context/SiteContentContext";

export default function AnnouncementBar() {
  const { getContent } = useSiteContent();
  return (
    <div className="w-full bg-charcoal py-2 text-center">
      <p className="font-sans text-[11px] tracking-[0.15em] text-ivory/85 sm:text-xs">
        {getContent("announcement", DELIVERY_NOTE)}
      </p>
    </div>
  );
}
