import Link from "next/link";
import Image from "next/image";
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
  Star,
  TrendingUp,
  Users,
  Clock,
  Award,
  Zap,
  Target,
  Rocket,
  Quote,
  BarChart3,
} from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const serviceIcons = [Palette, Globe, Megaphone, Share2, Search, Cog, GraduationCap, Smartphone];
const funnelIcons = [Search, Target, Palette, Rocket, Cog, TrendingUp];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const serviceKeys = Object.keys(dict.homeServices.items) as Array<keyof typeof dict.homeServices.items>;
  const funnelKeys = Object.keys(dict.homeFunnel.steps) as Array<keyof typeof dict.homeFunnel.steps>;

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center bg-animated-gradient pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl">
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.2em] mb-6">{dict.hero.eyebrow}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">{dict.hero.headline}</h1>
            <p className="text-lg sm:text-xl text-purple-200 leading-relaxed mb-10 max-w-2xl">{dict.hero.subheadline}</p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href={`/${locale}/contact/`} className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold px-10 py-5 rounded-xl transition-all text-lg cta-glow">
                {dict.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={`/${locale}/our-process/`} className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-white/50 text-white font-semibold px-10 py-5 rounded-xl transition-colors text-lg">
                {dict.hero.ctaSecondary}
              </Link>
            </div>
            <div className="mt-14 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["C", "M", "R", "A"].map((l, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-gold-400 border-2 border-purple-900 flex items-center justify-center text-xs font-bold text-white">{l}</div>
                ))}
              </div>
              <div className="flex items-center gap-1 ml-1">
                {[0, 1, 2, 3, 4].map((i) => (<Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />))}
              </div>
              <span className="text-purple-300 text-sm">{dict.hero.trustedBy}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STATS ═══════════════════════ */}
      <section className="relative bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 -mt-10 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {[
              { value: "15+", label: dict.stats.years, icon: Clock },
              { value: "500+", label: dict.stats.clients, icon: Users },
              { value: "3", label: dict.stats.languages, icon: Globe },
              { value: "98%", label: dict.stats.satisfaction, icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="p-6 sm:p-8 text-center">
                <stat.icon className="w-6 h-6 text-purple-600 mx-auto mb-3" />
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SERVICES PREVIEW ═══════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-purple-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3">{dict.homeServices.eyebrow}</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">{dict.homeServices.headline}</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">{dict.homeServices.subheadline}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceKeys.map((key, i) => {
              const item = dict.homeServices.items[key];
              const Icon = serviceIcons[i];
              return (
                <ScrollReveal key={key} delay={i * 80}>
                  <div className="group p-6 sm:p-8 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-12 h-12 bg-purple-50 group-hover:bg-purple-100 rounded-xl flex items-center justify-center mb-5 transition-colors">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href={`/${locale}/services/`} className="inline-flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all text-base">
                {dict.homeServices.cta} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ 360 FUNNEL PREVIEW ═══════════════════════ */}
      <section className="py-24 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold-500 font-semibold text-sm uppercase tracking-[0.15em] mb-3">{dict.homeFunnel.eyebrow}</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">{dict.homeFunnel.headline}</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">{dict.homeFunnel.subheadline}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {funnelKeys.map((key, i) => {
              const step = dict.homeFunnel.steps[key];
              const Icon = funnelIcons[i];
              return (
                <ScrollReveal key={key} delay={i * 80}>
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center h-full">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-white font-bold text-sm mx-auto mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href={`/${locale}/our-process/`} className="inline-flex items-center gap-2 text-gold-600 font-bold hover:gap-3 transition-all text-base">
                {dict.homeFunnel.cta} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════ ABOUT PREVIEW ═══════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <p className="text-purple-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3">{dict.homeAbout.eyebrow}</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">{dict.homeAbout.headline}</h2>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">{dict.homeAbout.description}</p>
                <ul className="space-y-3 mb-10">
                  {dict.homeAbout.highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gold-500 shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/about/`} className="inline-flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all">
                  {dict.homeAbout.cta} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-gold-100 rounded-3xl overflow-hidden flex items-center justify-center">
                  <Image src="/images/logos/logo-full-color.png" alt="360 For Business" width={280} height={280} className="drop-shadow-lg" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-5 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-slate-900">15+</p>
                      <p className="text-xs text-slate-500 font-medium">{dict.stats.years}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CRM PREVIEW ═══════════════════════ */}
      <section className="py-24 sm:py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.15em] mb-3">{dict.homeCrm.eyebrow}</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">{dict.homeCrm.headline}</h2>
                <p className="text-lg text-slate-400 mb-10">{dict.homeCrm.subheadline}</p>
                <ul className="space-y-4 mb-10">
                  {dict.homeCrm.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-gold-400 shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/crm/`} className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold px-8 py-4 rounded-xl transition-colors">
                  {dict.homeCrm.cta} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Users, label: "Lead Management" },
                    { icon: Megaphone, label: "Marketing Automation" },
                    { icon: BarChart3, label: "Analytics & Reports" },
                    { icon: Star, label: "Review Management" },
                    { icon: Zap, label: "AI Optimization" },
                    { icon: Globe, label: "Multi-Channel" },
                  ].map((f) => (
                    <div key={f.label} className="bg-white/5 rounded-xl p-4 text-center">
                      <f.icon className="w-6 h-6 text-gold-400 mx-auto mb-2" />
                      <p className="text-xs font-medium text-slate-400">{f.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-purple-600 font-semibold text-sm uppercase tracking-[0.15em] mb-3">{dict.homeTestimonials.eyebrow}</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">{dict.homeTestimonials.headline}</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dict.homeTestimonials.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 h-full border border-slate-100">
                  <Quote className="w-8 h-8 text-purple-200 mb-5" />
                  <p className="text-slate-700 leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-gold-400 rounded-full flex items-center justify-center text-white font-bold text-sm">{item.name.charAt(0)}</div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                      <p className="text-slate-500 text-xs">{item.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((s) => (<Star key={s} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
