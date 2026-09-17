"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Check, LockKeyhole, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";
import { CustomerOrder, CustomerUser } from "@/types";

export default function AccountClient() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <section className="container flex min-h-[60vh] items-center justify-center py-24"><p className="font-sans text-sm text-charcoal/60">Loading your account...</p></section>;
  }

  if (!user) {
    return (
      <section className="container flex min-h-[60vh] items-center justify-center py-24">
        <div className="w-full max-w-xl text-center">
          <UserRound className="mx-auto h-8 w-8 text-mutedBrown" />
          <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-mutedBrown">Your account</p>
          <h1 className="mt-4 font-display text-5xl text-charcoal sm:text-6xl">Keep your edit close.</h1>
          <p className="mx-auto mt-5 max-w-md font-sans text-sm leading-relaxed text-charcoal/65">Sign in to manage your details, or create an account before your next order.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/login" className="inline-flex items-center justify-center gap-3 bg-charcoal px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-mutedBrown">Sign in <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/register" className="inline-flex items-center justify-center border border-charcoal px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory">Create account</Link>
          </div>
        </div>
      </section>
    );
  }

  return <AuthenticatedAccount key={user.id} user={user} />;
}

function AuthenticatedAccount({ user }: { user: CustomerUser }) {
  const { getOrders, updatePassword, updateProfile, logout } = useAuth();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [profile, setProfile] = useState({ name: user.name, email: user.email, phone: user.phone || "" });
  const [passwords, setPasswords] = useState({ current_password: "", password: "", password_confirmation: "" });
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((requestError) => setOrdersError(requestError instanceof Error ? requestError.message : "Orders could not be loaded."))
      .finally(() => setOrdersLoading(false));
  }, [getOrders]);

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setProfileMessage("");
    setSavingProfile(true);
    try {
      await updateProfile(profile);
      setProfileMessage("Your account details have been saved.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Your details could not be saved.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPasswordMessage("");
    setSavingPassword(true);
    try {
      await updatePassword(passwords);
      setPasswords({ current_password: "", password: "", password_confirmation: "" });
      setPasswordMessage("Your password has been updated.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Your password could not be updated.");
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <section className="container min-h-[60vh] py-24 sm:py-32">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-mutedBrown">My account</p>
      <h1 className="mt-4 font-display text-5xl text-charcoal sm:text-7xl">Welcome, {user.name.split(" ")[0]}.</h1>

      {error && <p className="mt-8 max-w-2xl border border-red-700/25 bg-red-700/5 px-4 py-3 font-sans text-xs text-red-800" role="alert">{error}</p>}

      <div className="mt-12 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-20">
        <div>
          <AccountSectionHeading eyebrow="Your details" title="Account details" />
          <form onSubmit={handleProfileSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
            <AccountField id="account-name" label="Full name" value={profile.name} onChange={(value) => setProfile({ ...profile, name: value })} autoComplete="name" />
            <AccountField id="account-email" label="Email" type="email" value={profile.email} onChange={(value) => setProfile({ ...profile, email: value })} autoComplete="email" />
            <AccountField id="account-phone" label="Phone" type="tel" value={profile.phone} onChange={(value) => setProfile({ ...profile, phone: value })} autoComplete="tel" />
            <div className="flex items-center gap-4 sm:col-span-2">
              <button type="submit" disabled={savingProfile} className="inline-flex min-h-11 items-center gap-3 bg-charcoal px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-mutedBrown disabled:cursor-not-allowed disabled:opacity-60">{savingProfile ? "Saving" : "Save details"} {!savingProfile && <Check className="h-4 w-4" />}</button>
              {profileMessage && <p className="font-sans text-xs text-mutedBrown" role="status">{profileMessage}</p>}
            </div>
          </form>

          <div className="mt-16 border-t border-charcoal/15 pt-10">
            <AccountSectionHeading eyebrow="Security" title="Change password" icon={<LockKeyhole className="h-4 w-4 text-mutedBrown" />} />
            <form onSubmit={handlePasswordSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
              <AccountField id="current-password" label="Current password" type="password" value={passwords.current_password} onChange={(value) => setPasswords({ ...passwords, current_password: value })} autoComplete="current-password" />
              <AccountField id="new-password" label="New password" type="password" value={passwords.password} onChange={(value) => setPasswords({ ...passwords, password: value })} autoComplete="new-password" />
              <AccountField id="confirm-password" label="Confirm new password" type="password" value={passwords.password_confirmation} onChange={(value) => setPasswords({ ...passwords, password_confirmation: value })} autoComplete="new-password" />
              <div className="flex items-end gap-4"><button type="submit" disabled={savingPassword} className="inline-flex min-h-11 items-center gap-3 border border-charcoal px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory disabled:cursor-not-allowed disabled:opacity-60">{savingPassword ? "Updating" : "Update password"}</button>{passwordMessage && <p className="font-sans text-xs text-mutedBrown" role="status">{passwordMessage}</p>}</div>
            </form>
          </div>
        </div>

        <div>
          <AccountSectionHeading eyebrow="Your orders" title="Order history" />
          {ordersLoading && <p className="mt-7 font-sans text-sm text-charcoal/60">Loading your orders...</p>}
          {!ordersLoading && ordersError && <p className="mt-7 border border-charcoal/15 bg-beige/30 px-4 py-3 font-sans text-sm text-charcoal/65">{ordersError}</p>}
          {!ordersLoading && !ordersError && orders.length === 0 && <div className="mt-7 border border-dashed border-charcoal/20 bg-beige/30 px-6 py-10"><p className="font-display text-3xl text-charcoal">No orders yet.</p><p className="mt-3 font-sans text-sm leading-relaxed text-charcoal/60">Your orders will appear here once they are confirmed by Luxe Avenue.</p><Link href="/shop" className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-charcoal underline underline-offset-8">Shop the edit <ArrowRight className="h-4 w-4" /></Link></div>}
          <div className="mt-7 space-y-4">
            {orders.map((order) => <OrderCard key={order.id} order={order} />)}
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-charcoal/15 pt-8"><button type="button" onClick={() => void logout()} className="border-b border-charcoal/50 pb-1 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-charcoal hover:text-mutedBrown">Logout</button></div>
    </section>
  );
}

function OrderCard({ order }: { order: CustomerOrder }) {
  const message = `Hello Luxe Avenue, I need help with order ${order.order_number}.`;
  return (
    <article className="border border-charcoal/15 bg-ivory p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-charcoal/10 pb-4"><div><p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-mutedBrown">{order.order_number}</p><p className="mt-1 font-sans text-xs text-charcoal/50">{new Intl.DateTimeFormat("en-LB", { dateStyle: "medium" }).format(new Date(order.created_at))}</p></div><span className="bg-beige px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-charcoal">{order.status}</span></div>
      <div className="divide-y divide-charcoal/10">{order.items.map((item, index) => <div key={`${order.id}-${index}`} className="flex items-start justify-between gap-4 py-3"><div><p className="font-display text-xl text-charcoal">{item.name}</p><p className="font-sans text-xs text-charcoal/55">{item.color} · {item.size} · Qty {item.quantity}</p></div><p className="shrink-0 font-sans text-sm text-charcoal">{formatPrice(Number(item.line_total))}</p></div>)}</div>
      <div className="flex items-center justify-between border-t border-charcoal/10 pt-4"><span className="font-sans text-xs uppercase tracking-[0.14em] text-charcoal/50">Total</span><span className="font-sans text-sm font-semibold text-charcoal">{formatPrice(Number(order.total))}</span></div>
      <a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center font-sans text-xs font-semibold uppercase tracking-[0.14em] text-charcoal underline underline-offset-8 hover:text-mutedBrown">Chat about this order</a>
    </article>
  );
}

function AccountSectionHeading({ eyebrow, title, icon }: { eyebrow: string; title: string; icon?: React.ReactNode }) {
  return <div><p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-mutedBrown">{icon}{eyebrow}</p><h2 className="mt-2 font-display text-3xl text-charcoal">{title}</h2></div>;
}

function AccountField({ id, label, value, onChange, autoComplete, type = "text" }: { id: string; label: string; value: string; onChange: (value: string) => void; autoComplete: string; type?: string }) {
  return <div><label htmlFor={id} className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-charcoal">{label}</label><input id={id} name={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} required={id !== "account-phone"} className="w-full border border-charcoal/20 bg-transparent px-4 py-3 font-sans text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/40 focus:border-charcoal" /></div>;
}
