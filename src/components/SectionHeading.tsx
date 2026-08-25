import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      y={0}
      className={cn(align === "center" ? "text-center" : "text-left", className)}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.25em]",
            light ? "text-champagne" : "text-mutedBrown"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl leading-[1.05] sm:text-4xl lg:text-5xl",
          light ? "text-ivory" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl font-sans text-sm leading-relaxed sm:text-base",
            align === "center" && "mx-auto",
            light ? "text-ivory/75" : "text-charcoal/60"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
