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
import { SITE_URL, STORE_NAME, STORE_TAGLINE } from "@/lib/config";

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
    "Kay Reluxe offers Turkish outfits and trendy pieces with delivery all over Lebanon, size swaps, and WhatsApp ordering.",
  openGraph: {
    title: `${STORE_NAME} — ${STORE_TAGLINE}`,
    description: "Turkish outfits. Trendy pieces. Infinite style.",
    url: SITE_URL,
    siteName: STORE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} — ${STORE_TAGLINE}`,
    description: "Turkish outfits. Trendy pieces. Infinite style.",
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
