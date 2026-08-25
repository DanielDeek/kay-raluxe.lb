import type { Metadata } from "next";
import { Phone, Clock, Truck, Mail, MapPin } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import Accordion from "@/components/Accordion";
import InstagramIcon from "@/components/icons/InstagramIcon";
import ContactForm from "./ContactForm";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { editorialImage } from "@/lib/data/images";
import {
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  CONTACT_PHONE_DISPLAY,
  BUSINESS_HOURS,
  DELIVERY_NOTE,
  CONTACT_EMAIL,
  ADDRESS_PLACEHOLDER,
  DELIVERY_POLICY,
} from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kay Reluxe via WhatsApp, Instagram, or our contact form.",
};

const FAQ_ITEMS = [
  {
    question: "How do I place an order?",
    answer:
      "Choose your piece, size and color, then tap â€œOrder on WhatsApp.â€ We'll confirm delivery and payment directly in chat.",
  },
  {
    question: "What delivery areas do you cover?",
    answer: DELIVERY_POLICY.areas,
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "Payment details are shared and confirmed with you directly over WhatsApp once your order is finalized.",
  },
  {
    question: "Can I exchange a size?",
    answer:
      "Yes - size swaps are available, subject to availability. Message us on WhatsApp and we will help arrange it.",
  },
  {
    question: "Do you have a physical store?",
    answer:
      "You can find us on Saida Highway, facing Spot Mall. Message us on WhatsApp before visiting for the latest details.",
  },
];

export default function ContactPage() {
  return (
    <div className="pb-28">
      <PageIntro
        eyebrow="Get in Touch"
        title="We'd love to hear from you."
        description="For styling questions, delivery details, or help choosing your size, our fastest reply is on WhatsApp."
        image={editorialImage("kr-page-contact", 1100, 1000, 8)}
        imageAlt="Kay Reluxe fashion detail"
      />

      <section className="container grid grid-cols-1 gap-14 py-16 md:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <Reveal x={-24}>
          <SectionHeading eyebrow="Reach Us" title="Contact Details" className="mb-8" />
          <ul className="space-y-5">
            {CONTACT_EMAIL && (
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-mutedBrown" />
                <div><p className="font-sans text-sm font-medium text-charcoal">Email</p><a href={`mailto:${CONTACT_EMAIL}`} className="font-sans text-sm text-mutedBrown underline underline-offset-4">{CONTACT_EMAIL}</a></div>
              </li>
            )}
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-mutedBrown" />
              <div><p className="font-sans text-sm font-medium text-charcoal">Address</p><p className="font-sans text-sm text-charcoal/60">{ADDRESS_PLACEHOLDER}</p></div>
            </li>
            <li className="flex items-start gap-3">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-mutedBrown" />
              <div>
                <p className="font-sans text-sm font-medium text-charcoal">WhatsApp</p>
                <p className="font-sans text-sm text-charcoal/60">Fastest way to reach us and place an order.</p>
                <div className="mt-2">
                  <WhatsAppButton />
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-mutedBrown" />
              <div>
                <p className="font-sans text-sm font-medium text-charcoal">Instagram</p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-mutedBrown underline underline-offset-4 hover:text-champagne"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-mutedBrown" />
              <div>
                <p className="font-sans text-sm font-medium text-charcoal">Phone</p>
                <p className="font-sans text-sm text-charcoal/60">{CONTACT_PHONE_DISPLAY}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-mutedBrown" />
              <div>
                <p className="font-sans text-sm font-medium text-charcoal">Business Hours</p>
                <p className="font-sans text-sm text-charcoal/60">{BUSINESS_HOURS}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-mutedBrown" />
              <div>
                <p className="font-sans text-sm font-medium text-charcoal">Delivery</p>
                <p className="font-sans text-sm text-charcoal/60">{DELIVERY_NOTE}</p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal x={24} delay={0.1}>
          <SectionHeading eyebrow="Write to Us" title="Send a Message" className="mb-8" />
          <ContactForm />
        </Reveal>
      </section>

      <section id="faq" className="container mt-24 scroll-mt-28">
        <SectionHeading eyebrow="Good to Know" title="Frequently Asked Questions" className="mb-10" />
        <Accordion items={FAQ_ITEMS} />
      </section>
      <section className="container mt-20">
        <Reveal
          className="flex min-h-48 items-center justify-center border border-dashed border-charcoal/20 bg-beige/40 text-center"
        >
          <div><MapPin className="mx-auto h-6 w-6 text-mutedBrown" /><p className="mt-3 font-sans text-sm text-charcoal/60">Saida Highway, facing Spot Mall</p></div>
        </Reveal>
      </section>
    </div>
  );
}

