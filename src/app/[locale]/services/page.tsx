import Link from "next/link";
import {
  ArrowRight,
  Palette,
  Globe,
  Megaphone,
  Share2,
  Search,
  Cog,
  GraduationCap,
  Smartphone,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const serviceIcons = [
  Palette,
  Globe,
  Megaphone,
  Share2,
  Search,
  Cog,
  GraduationCap,
  Smartphone,
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center bg-animated-gradient pt-36 sm:pt-44 pb-24 sm:pb-32 overflow-hidden">
        {/* Background pattern */}
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

        {/* Gradient orbs */}
        <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 font-semibold text-sm uppercase tracking-[0.15em]">
                  {dict.servicesPage.eyebrow}
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">
                {dict.servicesPage.headline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-lg sm:text-xl text-purple-200 leading-relaxed max-w-2xl mx-auto">
                {dict.servicesPage.subheadline}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SERVICE BLOCKS ═══════════════════════════ */}
      {dict.servicesPage.items.map((service, i) => {
        const Icon = serviceIcons[i];
        const isEven = i % 2 === 0;
        const bgClass = isEven ? "bg-white" : "bg-slate-50";

        return (
          <section
            key={i}
            className={`py-24 sm:py-32 ${bgClass}`}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div
                className={`grid lg:grid-cols-2 gap-16 lg:gap-20 items-center ${
                  !isEven ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text column */}
                <div className={!isEven ? "lg:col-start-2" : ""}>
                  <ScrollReveal>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-purple-600" />
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-purple-200 to-transparent" />
                    </div>
                    <p className="text-purple-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3">
                      {service.title}
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                      {service.headline}
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </ScrollReveal>
                </div>

                {/* Features column */}
                <div className={!isEven ? "lg:col-start-1" : ""}>
                  <ScrollReveal delay={200}>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-10">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.15em] mb-6">
                        What&apos;s Included
                      </h3>
                      <ul className="space-y-4">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                            <span className="text-slate-700 leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="relative rounded-3xl bg-gradient-to-br from-purple-900 to-purple-800 p-12 sm:p-16 lg:p-20 text-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-400/10 rounded-full blur-3xl" />

              <div className="relative">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
                  {dict.cta.headline}
                </h2>
                <p className="text-lg text-purple-200 max-w-2xl mx-auto mb-10">
                  {dict.cta.subheadline}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold px-10 py-5 rounded-xl transition-all text-lg cta-glow"
                >
                  {dict.cta.button}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
