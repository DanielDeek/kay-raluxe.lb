import { HeartHandshake, PackageCheck, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const BENEFITS = [
  { icon: Sparkles, title: "Curated quality", text: "Thoughtful pieces, selected to be worn often." },
  { icon: PackageCheck, title: "Across Lebanon", text: "Delivery details confirmed with every order." },
  { icon: HeartHandshake, title: "Easy exchanges", text: "We will help you find the right fit." },
  { icon: WhatsAppIcon, title: "WhatsApp assistance", text: "A real person to answer your questions." },
];

export default function BenefitsSection() {
  return (
    <section className="border-y border-charcoal/10 bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The Luxe Avenue way"
              title="A little more considered."
              description="Shopping should feel personal, clear, and easy from first look to final order."
            />
            <WhatsAppButton label="Talk to us" variant="outline" className="mt-7" />
          </div>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div key={title} data-gsap-reveal className="border-t border-charcoal/15 pt-4">
                <Icon className="h-4 w-4 text-mutedBrown" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-2xl text-charcoal">{title}</h3>
                <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-charcoal/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
