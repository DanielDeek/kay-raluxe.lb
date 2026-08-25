import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${STORE_NAME} — ${STORE_TAGLINE}`,
    template: `%s — ${STORE_NAME}`,
  },
  description:
    "Kay Reluxe is a Lebanon-based women's fashion boutique offering curated dresses, tops, sets and more, with delivery across Lebanon and ordering via WhatsApp.",
  openGraph: {
    title: `${STORE_NAME} — ${STORE_TAGLINE}`,
    description: "Curated fashion for every version of you.",
    url: SITE_URL,
    siteName: STORE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} — ${STORE_TAGLINE}`,
    description: "Curated fashion for every version of you.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
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
