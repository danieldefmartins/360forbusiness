import Link from "next/link";
import { ArrowRight, CheckCircle, Star, Zap, Crown } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const packages = {
  en: {
    eyebrow: "Pricing",
    headline: "Transparent Pricing. Real Results.",
    subheadline: "Every package includes our proprietary CRM platform, AI-powered optimization, and a dedicated account manager. No hidden fees. No long-term contracts.",
    custom: "Need a custom solution?",
    customDesc: "Every business is different. Let's talk about what you need and build a custom package that fits your goals and budget perfectly.",
    customCta: "Schedule a Free Strategy Call",
    tiers: [
      {
        name: "Launchpad",
        icon: "Zap",
        price: "Starting at $1,500",
        period: "/month",
        desc: "Perfect for businesses that need a strong foundation. Get your brand, website, and CRM set up right from the start.",
        popular: false,
        features: [
          "Brand identity audit & recommendations",
          "Professional website (up to 5 pages)",
          "360 CRM platform setup & training",
          "Google Business Profile optimization",
          "Basic SEO setup & optimization",
          "Social media profile setup (3 platforms)",
          "Monthly strategy call",
          "Email & chat support",
        ],
        cta: "Get Started",
      },
      {
        name: "Growth",
        icon: "Star",
        price: "Starting at $3,500",
        period: "/month",
        desc: "For businesses ready to scale. Full marketing management, advertising, and automation to drive consistent leads and revenue.",
        popular: true,
        features: [
          "Everything in Launchpad, plus:",
          "Full brand identity design or refresh",
          "Custom website with advanced features",
          "Google Ads management (up to $5K spend)",
          "Meta Ads management (Facebook & Instagram)",
          "Social media management (4 platforms)",
          "Content creation (12 posts/month)",
          "CRM automation sequences",
          "Monthly performance reports",
          "Bi-weekly strategy calls",
          "Reputation management & review automation",
          "Email marketing campaigns",
        ],
        cta: "Start Growing",
      },
      {
        name: "360 Elite",
        icon: "Crown",
        price: "Starting at $7,500",
        period: "/month",
        desc: "The complete 360 experience. Every service, every platform, every advantage. For businesses that want to dominate their market.",
        popular: false,
        features: [
          "Everything in Growth, plus:",
          "Complete brand overhaul & guidelines",
          "Premium custom website with CMS",
          "Google + Meta + TikTok + LinkedIn Ads",
          "Unlimited ad spend management",
          "Daily social media management (all platforms)",
          "Professional video content (4/month)",
          "Advanced CRM automations & integrations",
          "Business mentorship sessions (weekly)",
          "Dedicated account manager",
          "Priority support (same-day response)",
          "Quarterly business strategy reviews",
          "Custom mobile app development",
          "Multilingual content (EN/PT/ES)",
        ],
        cta: "Go Elite",
      },
    ],
  },
  pt: {
    eyebrow: "Precos",
    headline: "Precos Transparentes. Resultados Reais.",
    subheadline: "Todos os pacotes incluem nossa plataforma de CRM proprietaria, otimizacao com IA e um gerente de conta dedicado. Sem taxas escondidas. Sem contratos de longo prazo.",
    custom: "Precisa de uma solucao personalizada?",
    customDesc: "Cada negocio e diferente. Vamos conversar sobre o que voce precisa e criar um pacote personalizado que se encaixe perfeitamente nos seus objetivos e orcamento.",
    customCta: "Agende uma Ligacao de Estrategia Gratuita",
    tiers: [
      {
        name: "Launchpad",
        icon: "Zap",
        price: "A partir de $1.500",
        period: "/mes",
        desc: "Perfeito para negocios que precisam de uma base solida. Configure sua marca, site e CRM da maneira certa desde o inicio.",
        popular: false,
        features: [
          "Auditoria de identidade de marca e recomendacoes",
          "Site profissional (ate 5 paginas)",
          "Configuracao e treinamento do CRM 360",
          "Otimizacao do Google Business Profile",
          "Configuracao basica de SEO",
          "Configuracao de redes sociais (3 plataformas)",
          "Ligacao mensal de estrategia",
          "Suporte por e-mail e chat",
        ],
        cta: "Comecar",
      },
      {
        name: "Growth",
        icon: "Star",
        price: "A partir de $3.500",
        period: "/mes",
        desc: "Para negocios prontos para escalar. Gestao completa de marketing, publicidade e automacao para gerar leads e receita consistentes.",
        popular: true,
        features: [
          "Tudo do Launchpad, mais:",
          "Design completo de identidade de marca",
          "Site personalizado com funcionalidades avancadas",
          "Gestao de Google Ads (ate $5K de investimento)",
          "Gestao de Meta Ads (Facebook e Instagram)",
          "Gestao de redes sociais (4 plataformas)",
          "Criacao de conteudo (12 posts/mes)",
          "Sequencias de automacao do CRM",
          "Relatorios mensais de performance",
          "Ligacoes quinzenais de estrategia",
          "Gestao de reputacao e automacao de avaliacoes",
          "Campanhas de email marketing",
        ],
        cta: "Comecar a Crescer",
      },
      {
        name: "360 Elite",
        icon: "Crown",
        price: "A partir de $7.500",
        period: "/mes",
        desc: "A experiencia 360 completa. Todos os servicos, todas as plataformas, todas as vantagens. Para negocios que querem dominar seu mercado.",
        popular: false,
        features: [
          "Tudo do Growth, mais:",
          "Reformulacao completa de marca e manual",
          "Site premium personalizado com CMS",
          "Google + Meta + TikTok + LinkedIn Ads",
          "Gestao ilimitada de investimento em anuncios",
          "Gestao diaria de redes sociais (todas as plataformas)",
          "Conteudo profissional em video (4/mes)",
          "Automacoes avancadas de CRM e integracoes",
          "Sessoes semanais de mentoria empresarial",
          "Gerente de conta dedicado",
          "Suporte prioritario (resposta no mesmo dia)",
          "Revisoes trimestrais de estrategia empresarial",
          "Desenvolvimento de app mobile personalizado",
          "Conteudo multilingue (EN/PT/ES)",
        ],
        cta: "Ir para Elite",
      },
    ],
  },
  es: {
    eyebrow: "Precios",
    headline: "Precios Transparentes. Resultados Reales.",
    subheadline: "Todos los paquetes incluyen nuestra plataforma CRM propia, optimizacion con IA y un gerente de cuenta dedicado. Sin cargos ocultos. Sin contratos a largo plazo.",
    custom: "Necesitas una solucion personalizada?",
    customDesc: "Cada negocio es diferente. Hablemos sobre lo que necesitas y creemos un paquete personalizado que se ajuste perfectamente a tus objetivos y presupuesto.",
    customCta: "Agenda una Llamada de Estrategia Gratuita",
    tiers: [
      {
        name: "Launchpad",
        icon: "Zap",
        price: "Desde $1,500",
        period: "/mes",
        desc: "Perfecto para negocios que necesitan una base solida. Configura tu marca, sitio web y CRM correctamente desde el inicio.",
        popular: false,
        features: [
          "Auditoria de identidad de marca y recomendaciones",
          "Sitio web profesional (hasta 5 paginas)",
          "Configuracion y capacitacion del CRM 360",
          "Optimizacion de Google Business Profile",
          "Configuracion basica de SEO",
          "Configuracion de redes sociales (3 plataformas)",
          "Llamada mensual de estrategia",
          "Soporte por email y chat",
        ],
        cta: "Empezar",
      },
      {
        name: "Growth",
        icon: "Star",
        price: "Desde $3,500",
        period: "/mes",
        desc: "Para negocios listos para escalar. Gestion completa de marketing, publicidad y automatizacion para generar leads e ingresos consistentes.",
        popular: true,
        features: [
          "Todo lo del Launchpad, mas:",
          "Diseno completo de identidad de marca",
          "Sitio web personalizado con funciones avanzadas",
          "Gestion de Google Ads (hasta $5K de inversion)",
          "Gestion de Meta Ads (Facebook e Instagram)",
          "Gestion de redes sociales (4 plataformas)",
          "Creacion de contenido (12 posts/mes)",
          "Secuencias de automatizacion del CRM",
          "Reportes mensuales de rendimiento",
          "Llamadas quincenales de estrategia",
          "Gestion de reputacion y automatizacion de resenas",
          "Campanas de email marketing",
        ],
        cta: "Empezar a Crecer",
      },
      {
        name: "360 Elite",
        icon: "Crown",
        price: "Desde $7,500",
        period: "/mes",
        desc: "La experiencia 360 completa. Todos los servicios, todas las plataformas, todas las ventajas. Para negocios que quieren dominar su mercado.",
        popular: false,
        features: [
          "Todo lo del Growth, mas:",
          "Renovacion completa de marca y manual",
          "Sitio web premium personalizado con CMS",
          "Google + Meta + TikTok + LinkedIn Ads",
          "Gestion ilimitada de inversion publicitaria",
          "Gestion diaria de redes sociales (todas las plataformas)",
          "Contenido profesional en video (4/mes)",
          "Automatizaciones avanzadas de CRM e integraciones",
          "Sesiones semanales de mentoria empresarial",
          "Gerente de cuenta dedicado",
          "Soporte prioritario (respuesta el mismo dia)",
          "Revisiones trimestrales de estrategia empresarial",
          "Desarrollo de app movil personalizada",
          "Contenido multilingue (EN/PT/ES)",
        ],
        cta: "Ir a Elite",
      },
    ],
  },
};

const iconMap = { Zap, Star, Crown };

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const pkg = packages[locale];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-animated-gradient pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">{pkg.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">{pkg.headline}</h1>
          <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto">{pkg.subheadline}</p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pkg.tiers.map((tier, i) => {
              const Icon = iconMap[tier.icon as keyof typeof iconMap];
              return (
                <ScrollReveal key={tier.name} delay={i * 120}>
                  <div className={`relative rounded-2xl h-full flex flex-col ${
                    tier.popular
                      ? "bg-slate-900 text-white border-2 border-gold-400 shadow-2xl scale-[1.03]"
                      : "bg-white border-2 border-slate-100 shadow-sm"
                  }`}>
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-400 text-white text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wide">
                        Most Popular
                      </div>
                    )}
                    <div className="p-8 sm:p-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tier.popular ? "bg-gold-500/20" : "bg-purple-50"
                        }`}>
                          <Icon className={`w-5 h-5 ${tier.popular ? "text-gold-400" : "text-purple-600"}`} />
                        </div>
                        <h3 className={`text-xl font-bold ${tier.popular ? "text-white" : "text-slate-900"}`}>
                          {tier.name}
                        </h3>
                      </div>
                      <div className="mb-4">
                        <span className={`text-3xl sm:text-4xl font-extrabold ${tier.popular ? "text-white" : "text-slate-900"}`}>
                          {tier.price}
                        </span>
                        <span className={`text-sm font-medium ${tier.popular ? "text-slate-400" : "text-slate-500"}`}>
                          {tier.period}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed mb-8 ${tier.popular ? "text-slate-300" : "text-slate-500"}`}>
                        {tier.desc}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, fi) => (
                          <li key={fi} className="flex items-start gap-3">
                            <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                              tier.popular ? "text-gold-400" : "text-purple-500"
                            }`} />
                            <span className={`text-sm ${tier.popular ? "text-slate-300" : "text-slate-600"}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-8 sm:px-10 pb-8 sm:pb-10 mt-auto">
                      <Link
                        href={`/${locale}/contact/`}
                        className={`flex items-center justify-center gap-2 w-full font-bold py-4 rounded-xl transition-all text-base ${
                          tier.popular
                            ? "bg-cta hover:bg-cta-dark text-white cta-glow"
                            : "bg-purple-600 hover:bg-purple-700 text-white"
                        }`}
                      >
                        {tier.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom solution */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-5">
              {pkg.custom}
            </h2>
            <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto">
              {pkg.customDesc}
            </p>
            <Link
              href={`/${locale}/contact/`}
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold px-10 py-5 rounded-xl transition-all text-lg cta-glow"
            >
              {pkg.customCta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
