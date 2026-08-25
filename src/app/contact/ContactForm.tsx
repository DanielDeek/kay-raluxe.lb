"use client";

import { FormEvent, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function ContactForm() {
  const { showToast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email.";
    if (!message) nextErrors.message = "Please enter a message.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    window.open(buildWhatsAppLink(`Hello Kay Reluxe, my name is ${name}. My email is ${email}.\n\n${message}`), "_blank", "noopener,noreferrer");
    showToast({ title: "Opening WhatsApp", description: "Your message is ready to send.", variant: "success" });
    event.currentTarget.reset();
  }

  return <form onSubmit={handleSubmit} noValidate className="space-y-5">
    <p className="rounded-sm border border-champagne/40 bg-champagne/10 px-4 py-3 font-sans text-xs text-charcoal/70">This form prepares a message in WhatsApp. No information is stored on this website.</p>
    {([["name", "Name", "text"], ["email", "Email", "email"]] as const).map(([id, label, type]) => <div key={id}><label htmlFor={id} className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal">{label}</label><input id={id} name={id} type={type} autoComplete={id} className="w-full border border-charcoal/20 bg-transparent px-4 py-3 font-sans text-sm text-charcoal focus:border-charcoal" aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `${id}-error` : undefined} />{errors[id] && <p id={`${id}-error`} className="mt-1 font-sans text-xs text-red-700" role="alert">{errors[id]}</p>}</div>)}
    <div><label htmlFor="message" className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-charcoal">Message</label><textarea id="message" name="message" rows={5} className="w-full resize-none border border-charcoal/20 bg-transparent px-4 py-3 font-sans text-sm text-charcoal focus:border-charcoal" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <p id="message-error" className="mt-1 font-sans text-xs text-red-700" role="alert">{errors.message}</p>}</div>
    <button type="submit" className="w-full bg-charcoal py-3.5 font-sans text-sm text-ivory transition-colors hover:bg-mutedBrown">Send via WhatsApp</button>
  </form>;
}
