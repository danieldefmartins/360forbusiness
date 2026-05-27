import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Search,
  Map,
  Palette,
  Rocket,
  Cog,
  TrendingUp,
} from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const stepIcons = [Search, Map, Palette, Rocket, Cog, TrendingUp];

export default async function OurProcessPage({
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
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 font-semibold text-sm uppercase tracking-[0.15em]">
                  {dict.processPage.eyebrow}
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">
                {dict.processPage.headline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-lg sm:text-xl text-purple-200 leading-relaxed max-w-2xl mx-auto mb-6">
                {dict.processPage.subheadline}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-base text-gold-300 font-medium">
                {dict.processPage.intro}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PROCESS STEPS ═══════════════════════════ */}
      {dict.processPage.steps.map((step, i) => {
        const Icon = stepIcons[i];
        const isEven = i % 2 === 0;
        const bgClass = isEven ? "bg-white" : "bg-slate-50";

        // Split details into two columns
        const midpoint = Math.ceil(step.details.length / 2);
        const leftDetails = step.details.slice(0, midpoint);
        const rightDetails = step.details.slice(midpoint);

        return (
          <section key={i} className={`py-24 sm:py-32 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              {/* Step header */}
              <ScrollReveal>
                <div className="max-w-4xl mx-auto mb-14">
                  <div className="flex items-center gap-6 mb-8">
                    {/* Step number */}
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-extrabold text-gold-400">
                          {step.number}
                        </span>
                      </div>
                      {/* Connector line (not on last step) */}
                      {i < dict.processPage.steps.length - 1 && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-purple-300 to-transparent hidden sm:block" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-purple-600" />
                        <p className="text-purple-600 font-semibold text-sm uppercase tracking-[0.15em]">
                          {step.title}
                        </p>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {step.headline}
                      </h2>
                    </div>
                  </div>

                  <p className="text-lg text-slate-500 leading-relaxed ml-0 sm:ml-[104px]">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>

              {/* Details grid */}
              <ScrollReveal delay={200}>
                <div className="max-w-4xl mx-auto ml-0 sm:ml-auto">
                  <div className="grid sm:grid-cols-2 gap-4 sm:ml-[104px]">
                    <div className="space-y-4">
                      {leftDetails.map((detail, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-3 bg-white rounded-xl p-5 border border-slate-100 shadow-sm"
                        >
                          <CheckCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 leading-relaxed text-sm">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {rightDetails.map((detail, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-3 bg-white rounded-xl p-5 border border-slate-100 shadow-sm"
                        >
                          <CheckCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 leading-relaxed text-sm">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
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
