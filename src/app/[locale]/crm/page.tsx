import Link from "next/link";
import {
  ArrowRight,
  Users,
  MessageSquare,
  Calendar,
  Zap,
  CreditCard,
  Star,
  CheckCircle,
  XCircle,
  BarChart3,
  Shield,
} from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const categoryIcons = [Users, MessageSquare, Calendar, Zap, CreditCard, Star];

export default async function CrmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const crm = dict.crmPage;

  return (
    <>
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center bg-animated-gradient pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
        {/* Animated background pattern */}
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
        <div className="absolute top-10 right-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-300/5 rounded-full blur-2xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              {crm.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">
              {crm.headline}
            </h1>
            <p className="text-lg sm:text-xl text-purple-200 leading-relaxed mb-10 max-w-2xl mx-auto">
              {crm.subheadline}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold px-10 py-5 rounded-xl transition-all text-lg cta-glow"
            >
              {dict.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ INTRO ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
                {crm.intro.title}
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                {crm.intro.text}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════ FEATURES GRID ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-purple-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3">
                {crm.eyebrow}
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                {crm.features.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {crm.features.categories.map((category, i) => {
              const Icon = categoryIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="group bg-white rounded-2xl p-8 sm:p-10 border border-slate-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                      <Icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-5">
                      {category.title}
                    </h3>
                    <ul className="space-y-3">
                      {category.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-gold-500 shrink-0 mt-1" />
                          <span className="text-sm text-slate-500 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ COMPARISON TABLE ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.15em] mb-3">
                {crm.eyebrow}
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                {crm.comparison.title}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr>
                    {crm.comparison.headers.map((header, i) => (
                      <th
                        key={i}
                        className={`text-left py-5 px-6 text-sm font-bold uppercase tracking-wider ${
                          i === 1
                            ? "bg-purple-600/30 text-gold-400 rounded-t-xl"
                            : i === 0
                              ? "text-slate-400"
                              : "text-slate-400"
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {crm.comparison.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-t border-white/5 ${
                        i === crm.comparison.rows.length - 1 ? "" : ""
                      }`}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`py-4 px-6 ${
                            j === 1
                              ? "bg-purple-600/30"
                              : ""
                          } ${
                            i === crm.comparison.rows.length - 1 && j === 1
                              ? "rounded-b-xl"
                              : ""
                          }`}
                        >
                          {typeof cell === "string" ? (
                            <span className="text-sm text-slate-300 font-medium">
                              {cell}
                            </span>
                          ) : cell ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400/60" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-slate-900 rounded-3xl p-12 sm:p-16 lg:p-20 text-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-400/10 rounded-full blur-3xl" />

              <div className="relative">
                <Shield className="w-12 h-12 text-gold-400 mx-auto mb-6" />
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
