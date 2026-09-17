import type { Metadata } from "next";
import AccountClient from "./AccountClient";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Luxe Avenue customer account.",
  alternates: { canonical: "/account" },
};

export default function AccountPage() {
  return <AccountClient />;
}
