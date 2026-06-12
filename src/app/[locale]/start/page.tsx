import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getIntakeContent } from "@/components/intake/content";
import IntakeWizard from "@/components/intake/IntakeWizard";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = getIntakeContent(locale as Locale);
  const url = `https://360forbusiness.com/${locale}/start/`;
  return {
    title: `${c.title} | 360 For Business`,
    description: c.subtitle,
    alternates: { canonical: url },
    openGraph: {
      title: c.title,
      description: c.subtitle,
      url,
      siteName: "360 For Business",
      images: [
        { url: "/og/start.png", width: 1200, height: 630, alt: "360 For Business — Start your marketing strategy" },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.subtitle,
      images: ["/og/start.png"],
    },
  };
}

export default async function StartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const c = getIntakeContent(locale);

  return (
    <>
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative bg-animated-gradient pt-28 sm:pt-32 pb-14 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              {c.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              {c.title}
            </h1>
            <p className="text-lg sm:text-xl text-purple-200 leading-relaxed max-w-2xl mx-auto">
              {c.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ WIZARD ═══════════════════════════ */}
      <section className="bg-slate-50 pt-10 sm:pt-12 pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <IntakeWizard locale={locale} />
        </div>
      </section>
    </>
  );
}
