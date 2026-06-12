import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://360forbusiness.com"),
  title: "360 For Business | Miami's All-In-One Marketing Agency",
  description:
    "Transform your brand, dominate your market, and grow with our proven 360 Funnel. 15+ years helping businesses in Miami. Branding, Web, Ads, CRM & Business Mentorship.",
  icons: {
    icon: "/images/logos/logo-icon-blue.png",
  },
  openGraph: {
    title: "360 For Business | Miami's All-In-One Marketing Agency",
    description:
      "Transform your brand, dominate your market, and grow with our proven 360 Funnel.",
    url: "https://360forbusiness.com",
    siteName: "360 For Business",
    images: [{ url: "/og/start.png", width: 1200, height: 630, alt: "360 For Business" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "360 For Business | Miami's All-In-One Marketing Agency",
    description:
      "Transform your brand, dominate your market, and grow with our proven 360 Funnel.",
    images: ["/og/start.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
