import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Luxe Avenue customer account.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
