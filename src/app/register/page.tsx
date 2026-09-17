import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Luxe Avenue customer account and keep your details ready for your next order.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
