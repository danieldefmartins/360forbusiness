import Link from "next/link";
import type { ReactNode } from "react";

// Shared shell for the Tiny Giant Run App Store pages (privacy + support).
// English-only on purpose: these back the App Store listing URLs.
export default function LegalPage({
  eyebrow,
  title,
  updated,
  locale,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  locale: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative bg-animated-gradient pt-36 sm:pt-44 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute top-10 left-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-[0.15em]">
            {eyebrow}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-white">{title}</h1>
          {updated && <p className="mt-4 text-white/70">Last updated {updated}</p>}
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-gray-700 leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-purple-900 [&_h2]:pt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-purple-700 [&_a]:underline">
          {children}
          <p className="pt-10 text-sm text-gray-500">
            Tiny Giant Run is published by 360 For Business LLC.{" "}
            <Link href={`/${locale}/tiny-giant-run/support`}>Support</Link> ·{" "}
            <Link href={`/${locale}/tiny-giant-run/privacy`}>Privacy Policy</Link>
          </p>
        </div>
      </section>
    </>
  );
}
