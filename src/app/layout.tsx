import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnnouncementBar from "@/components/AnnouncementBar";
import PageTransition from "@/components/PageTransition";
import GsapEffects from "@/components/GsapEffects";
import CartDrawer from "@/components/CartDrawer";
import CustomCursor from "@/components/CustomCursor";
import { INSTAGRAM_URL, SITE_URL, SOCIAL_IMAGE_URL, STORE_ADDRESS, STORE_NAME, STORE_TAGLINE } from "@/lib/config";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-next",
});

const sansFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans-next",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${STORE_NAME} — ${STORE_TAGLINE}`,
    template: `%s — ${STORE_NAME}`,
  },
  description:
    "Kay Raluxe offers Turkish outfits and trendy pieces with delivery all over Lebanon, size swaps, and WhatsApp ordering.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${STORE_NAME} — ${STORE_TAGLINE}`,
    description: "Turkish outfits. Trendy pieces. Infinite style.",
    url: SITE_URL,
    siteName: STORE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: SOCIAL_IMAGE_URL, width: 1200, height: 630, alt: "Kay Raluxe editorial fashion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} — ${STORE_TAGLINE}`,
    description: "Turkish outfits. Trendy pieces. Infinite style.",
    images: [SOCIAL_IMAGE_URL],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171717",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${sansFont.variable} font-sans antialiased`}>
        <ToastProvider>
          <CartProvider>
            <SmoothScroll>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "OnlineStore",
                    name: STORE_NAME,
                    description: "Turkish outfits and trendy pieces with delivery all over Lebanon.",
                    url: SITE_URL,
                    logo: `${SITE_URL}/favicon.ico`,
                    image: SOCIAL_IMAGE_URL,
                    telephone: "+9613954746",
                    address: { "@type": "PostalAddress", streetAddress: STORE_ADDRESS, addressCountry: "LB" },
                    sameAs: [INSTAGRAM_URL],
                  }),
                }}
              />
              <AnnouncementBar />
              <Header />
              <main id="main-content">
                <GsapEffects>
                  <PageTransition>{children}</PageTransition>
                </GsapEffects>
              </main>
              <Footer />
              <CartDrawer />
              <WhatsAppButton variant="floating" />
              <CustomCursor />
            </SmoothScroll>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
