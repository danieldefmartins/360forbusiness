import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Briefcase,
  Filter,
} from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const gradientVariants = [
  "from-purple-600 to-purple-900",
  "from-gold-500 to-purple-700",
  "from-slate-700 to-purple-800",
  "from-purple-500 to-gold-600",
  "from-purple-800 to-slate-900",
  "from-gold-600 to-purple-600",
];

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const portfolio = dict.portfolioPage;

  return (
    <>
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center bg-animated-gradient pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
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
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              {portfolio.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">
              {portfolio.headline}
            </h1>
            <p className="text-lg sm:text-xl text-purple-200 leading-relaxed max-w-2xl mx-auto">
              {portfolio.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FILTER BUTTONS ═══════════════════════════ */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Filter className="w-4 h-4 text-slate-400 mr-2" />
              {portfolio.categories.map((cat, i) => (
                <button
                  key={i}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    i === 0
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                      : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════ CASE STUDY GRID ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.caseStudies.map((study, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Gradient header */}
                  <div
                    className={`relative bg-gradient-to-br ${gradientVariants[i % gradientVariants.length]} p-8 sm:p-10`}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                          backgroundSize: "24px 24px",
                        }}
                      />
                    </div>
                    <div className="relative">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
                        {study.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                        {study.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                        {study.industry}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                      {study.desc}
                    </p>

                    {/* Result highlight */}
                    <div className="flex items-center gap-2 mb-6 py-3 px-4 bg-purple-50 rounded-xl">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-purple-700">
                        {study.result}
                      </span>
                    </div>

                    {/* Metrics 2x2 grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {study.metrics.map((metric, j) => (
                        <div
                          key={j}
                          className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100"
                        >
                          <span className="text-xs font-bold text-slate-800 leading-tight block">
                            {metric}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-slate-900 rounded-3xl p-12 sm:p-16 lg:p-20 text-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-400/10 rounded-full blur-3xl" />

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
