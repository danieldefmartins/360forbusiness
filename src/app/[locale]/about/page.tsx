import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Target,
  Handshake,
  Layers,
  GraduationCap,
  Globe,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const valueIcons = [Heart, Target, Handshake, Layers];

export default async function AboutPage({
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
        <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 font-semibold text-sm uppercase tracking-[0.15em]">
                  {dict.aboutPage.eyebrow}
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">
                {dict.aboutPage.headline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-lg sm:text-xl text-purple-200 leading-relaxed max-w-2xl mx-auto">
                {dict.aboutPage.subheadline}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ STORY ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {dict.aboutPage.story.title}
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              {dict.aboutPage.story.paragraphs.map((paragraph, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <p className="text-lg text-slate-500 leading-relaxed">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            {/* Decorative divider */}
            <ScrollReveal delay={300}>
              <div className="mt-16 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
                <div className="w-3 h-3 rounded-full bg-gold-400" />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ VALUES ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-purple-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3">
                {dict.aboutPage.values.title}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {dict.aboutPage.values.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {dict.aboutPage.values.items.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="group bg-white rounded-2xl p-8 sm:p-10 border border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-purple-50 group-hover:bg-purple-100 rounded-2xl flex items-center justify-center transition-colors">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-purple-100 to-transparent" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ MENTORSHIP ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-purple-600" />
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                  {dict.aboutPage.mentorship.title}
                </h2>
                <p className="text-lg text-slate-500 leading-relaxed">
                  {dict.aboutPage.mentorship.text}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-3xl p-10 sm:p-12 text-white overflow-hidden">
                  {/* Decorative orb */}
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold-500/10 rounded-full blur-3xl" />

                  <div className="relative">
                    <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.15em] mb-4">
                      Beyond Marketing
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      We Build the Business Behind the Brand
                    </h3>
                    <p className="text-purple-200 leading-relaxed mb-8">
                      Operations, team structure, workflow optimization, SOPs, KPI tracking, and the systems that let you scale without burning out.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-gold-400" />
                      </div>
                      <span className="text-sm text-purple-200 font-medium">
                        Included with every partnership
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ LANGUAGES ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-7 h-7 text-purple-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
                {dict.aboutPage.languages.title}
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-12">
                {dict.aboutPage.languages.text}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg mx-auto">
                {[
                  { lang: "English", flag: "EN" },
                  { lang: "Portugues", flag: "PT" },
                  { lang: "Espanol", flag: "ES" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-sm">
                      {item.flag}
                    </div>
                    <p className="font-bold text-slate-900 text-sm">
                      {item.lang}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ NUMBERS ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.15em] mb-3">
                {dict.aboutPage.numbers.title}
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {dict.aboutPage.numbers.title}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {dict.aboutPage.numbers.items.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-3xl sm:text-4xl font-extrabold text-gold-400 tracking-tight mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
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
