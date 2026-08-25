import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import SectionHeading from "@/components/SectionHeading";
import { DELIVERY_POLICY } from "@/lib/config";
import { editorialImage } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Delivery & Returns",
  alternates: { canonical: "/delivery-returns" },
  description: "Editable delivery, exchange and returns information for Kay Raluxe.",
};

const sections = [
  ["Areas covered", DELIVERY_POLICY.areas],
  ["Delivery fees", DELIVERY_POLICY.fees],
  ["Estimated delivery", DELIVERY_POLICY.timing],
  ["Exchanges", DELIVERY_POLICY.exchanges],
  ["Returns", DELIVERY_POLICY.returns],
  ["Damaged products", DELIVERY_POLICY.damaged],
  ["Order modifications", DELIVERY_POLICY.modifications],
  ["Customer support", DELIVERY_POLICY.support],
];

export default function DeliveryReturnsPage() {
  return (
    <div className="pb-28">
      <PageIntro
        eyebrow="Good to know"
        title="Delivery & Returns"
        description="Delivery all over Lebanon, with size swaps available subject to stock."
        image={editorialImage("kr-page-delivery", 1100, 1000, 1)}
        imageAlt="Kay Raluxe fashion piece ready for delivery"
      />
      <section className="container grid gap-x-16 gap-y-12 py-16 md:grid-cols-2 md:py-20 lg:py-24">
        {sections.map(([title, body]) => (
          <article key={title} className="border-t border-charcoal/15 pt-5">
            <h2 className="font-display text-3xl text-charcoal">{title}</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/65">{body}</p>
          </article>
        ))}
      </section>
      <section className="container pb-4">
        <SectionHeading
          eyebrow="Need help?"
          title="We can talk it through."
          description="For a specific order or fit question, message Kay Raluxe directly on WhatsApp."
        />
        <Link href="/contact" className="mt-7 inline-flex bg-charcoal px-7 py-3.5 font-sans text-sm text-ivory hover:bg-mutedBrown">
          Contact us
        </Link>
      </section>
    </div>
  );
}
