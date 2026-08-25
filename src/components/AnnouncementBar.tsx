import { DELIVERY_NOTE } from "@/lib/config";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-charcoal py-2 text-center">
      <p className="font-sans text-[11px] tracking-[0.15em] text-ivory/85 sm:text-xs">
        {DELIVERY_NOTE}
      </p>
    </div>
  );
}
