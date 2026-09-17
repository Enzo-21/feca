import type { Metadata, Viewport } from "next";
import { Montserrat, Zen_Dots } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/components/cart/cart-provider";
import CartDrawer from "@/components/cart/cart-drawer";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const zenDots = Zen_Dots({
  variable: "--font-zen-dots",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FECA® — Creatina pura | Impulsa tu rutina",
    template: "%s | FECA®",
  },
  description:
    "Creatina monohidrato pura, trazable y certificada por lote. FECA impulsa tu rutina con energía, fuerza y recuperación.",
  keywords: [
    "creatina",
    "creatina monohidrato",
    "FECA",
    "suplementos",
    "rendimiento",
    "fuerza",
  ],
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  category: "salud",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "es_AR",
    title: "FECA® — Creatina pura | Impulsa tu rutina",
    description:
      "Creatina monohidrato pura, trazable y certificada por lote. Energía, fuerza y recuperación para tu rutina.",
    images: [
      {
        url: "/icons/og.png",
        width: 1200,
        height: 630,
        alt: "FECA — Impulsa tu rutina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FECA® — Creatina pura",
    description: "Creatina monohidrato pura, certificada lote a lote.",
    images: ["/icons/og-twitter.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${zenDots.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}