import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "360 For Business | Miami's All-In-One Marketing Agency",
  description:
    "Transform your brand, dominate your market, and grow with our proven 360 Funnel. 15+ years helping businesses in Miami. Branding, Web, Ads, CRM & Business Mentorship.",
  icons: {
    icon: "/images/logos/logo-icon-blue.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
