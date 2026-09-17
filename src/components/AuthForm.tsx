"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { editorialImage } from "@/lib/data/images";

interface AuthFormProps {
  mode: "login" | "register";
}

const inputClass = "w-full border border-charcoal/20 bg-transparent px-4 py-3 font-sans text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-charcoal";

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLogin = mode === "login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const data = new FormData(event.currentTarget);

    try {
      if (isLogin) {
        await login(String(data.get("email") || "").trim(), String(data.get("password") || ""));
      } else {
        await register({
          name: String(data.get("name") || "").trim(),
          email: String(data.get("email") || "").trim(),
          phone: String(data.get("phone") || "").trim() || undefined,
          password: String(data.get("password") || ""),
          password_confirmation: String(data.get("password_confirmation") || ""),
        });
      }
      router.push("/account");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container grid min-h-[calc(100vh-9rem)] items-center gap-10 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(25rem,0.75fr)] lg:gap-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative hidden min-h-[620px] overflow-hidden bg-charcoal lg:block"
      >
        <Image
          src={editorialImage("kr-auth", 1000, 1300, 11)}
          alt="Luxe Avenue fashion editorial"
          fill
          priority
          sizes="(max-width: 1024px) 0vw, 45vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-charcoal/10" />
        <div className="absolute inset-x-8 bottom-8 text-ivory">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-ivory/70">Luxe Avenue</p>
          <p className="mt-3 max-w-sm font-display text-4xl leading-none">Your edit, kept close.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-lg"
      >
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-mutedBrown">{isLogin ? "Welcome back" : "Join the edit"}</p>
        <h1 className="mt-4 font-display text-5xl leading-none text-charcoal sm:text-6xl">{isLogin ? "Sign in." : "Create your account."}</h1>
        <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-charcoal/65">
          {isLogin ? "Keep your details ready for your next Luxe Avenue order." : "Save your details for a smoother way to shop the edit."}
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
          {!isLogin && <Field id="name" label="Full name" type="text" autoComplete="name" />}
          <Field id="email" label="Email" type="email" autoComplete="email" />
          {!isLogin && <Field id="phone" label="Phone (optional)" type="tel" autoComplete="tel" />}
          <Field id="password" label="Password" type="password" autoComplete={isLogin ? "current-password" : "new-password"} />
          {!isLogin && <Field id="password_confirmation" label="Confirm password" type="password" autoComplete="new-password" />}

          {error && <p className="border border-red-700/25 bg-red-700/5 px-4 py-3 font-sans text-xs text-red-800" role="alert">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-charcoal px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mutedBrown disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? "Please wait" : isLogin ? "Sign in" : "Create account"}
            {!isSubmitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
          </button>
        </form>

        <p className="mt-8 text-center font-sans text-sm text-charcoal/60">
          {isLogin ? "New to Luxe Avenue? " : "Already have an account? "}
          <Link href={isLogin ? "/register" : "/login"} className="font-medium text-charcoal underline underline-offset-4 hover:text-mutedBrown">
            {isLogin ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </motion.div>
    </section>
  );
}

function Field({ id, label, type, autoComplete }: { id: string; label: string; type: string; autoComplete: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">{label}</label>
      <input id={id} name={id} type={type} autoComplete={autoComplete} required={id !== "phone"} className={inputClass} />
    </div>
  );
}
