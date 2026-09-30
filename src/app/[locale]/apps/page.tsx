import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type AppCopy = { tagline: string; description: string; status: string; cta: string };

const APPS: {
  id: string;
  name: string;
  icon: string;
  href: string;
  platforms: string;
  copy: Record<Locale, AppCopy>;
}[] = [
  {
    id: "tiny-giant-run",
    name: "Tiny Giant Run",
    icon: "/images/apps/tiny-giant-run.png",
    href: "https://testflight.apple.com/join/afNQuBcc",
    platforms: "iPhone · iPad",
    copy: {
      en: {
        tagline: "Grow giant. Smash. Run!",
        description:
          "A colorful 3D city runner: dodge, jump and slide, grow giant to smash everything, warp into secret Coin Worlds and collect 50 characters. Includes a Kids Mode with easy teaching levels.",
        status: "Beta on TestFlight",
        cta: "Join the beta",
      },
      pt: {
        tagline: "Fique gigante. Esmague. Corra!",
        description:
          "Um jogo de corrida 3D colorido pela cidade: desvie, pule e deslize, fique gigante para esmagar tudo, entre em Mundos de Moedas secretos e colecione 50 personagens. Inclui o Modo Kids com fases fáceis que ensinam.",
        status: "Beta no TestFlight",
        cta: "Entrar no beta",
      },
      es: {
        tagline: "Hazte gigante. Aplasta. ¡Corre!",
        description:
          "Un colorido juego de carreras 3D por la ciudad: esquiva, salta y deslízate, hazte gigante para aplastarlo todo, entra en Mundos de Monedas secretos y colecciona 50 personajes. Incluye un Modo Niños con niveles fáciles que enseñan.",
        status: "Beta en TestFlight",
        cta: "Unirse a la beta",
      },
    },
  },
  {
    id: "tavvy",
    name: "Tavvy",
    icon: "/images/apps/tavvy.png",
    href: "https://tavvy.com",
    platforms: "Web · iPhone",
    copy: {
      en: {
        tagline: "Reviews that actually tell you something",
        description:
          "A new kind of review platform built on quick, specific signals instead of long star ratings, with digital menus, city guides and places to discover everywhere you go.",
        status: "Live",
        cta: "Visit tavvy.com",
      },
      pt: {
        tagline: "Avaliações que realmente dizem algo",
        description:
          "Um novo tipo de plataforma de avaliações baseada em sinais rápidos e específicos em vez de longas notas com estrelas, com cardápios digitais, guias de cidades e lugares para descobrir onde você estiver.",
        status: "No ar",
        cta: "Visitar tavvy.com",
      },
      es: {
        tagline: "Reseñas que realmente dicen algo",
        description:
          "Un nuevo tipo de plataforma de reseñas basada en señales rápidas y específicas en lugar de largas calificaciones con estrellas, con menús digitales, guías de ciudades y lugares para descubrir dondequiera que vayas.",
        status: "En línea",
        cta: "Visitar tavvy.com",
      },
    },
  },
  {
    id: "psiu",
    name: "psiu!",
    icon: "/images/apps/psiu.png",
    href: "https://psiu.app",
    platforms: "Web",
    copy: {
      en: {
        tagline: "Secret Santa, made easy",
        description:
          "Organize a Secret Santa or gift exchange in minutes: invite friends, draw names automatically and share wish lists, in six languages.",
        status: "Live",
        cta: "Visit psiu.app",
      },
      pt: {
        tagline: "Amigo Secreto sem complicação",
        description:
          "Organize um Amigo Secreto ou troca de presentes em minutos: convide os amigos, sorteie os nomes automaticamente e compartilhe listas de desejos, em seis idiomas.",
        status: "No ar",
        cta: "Visitar psiu.app",
      },
      es: {
        tagline: "Amigo Secreto, sin complicaciones",
        description:
          "Organiza un Amigo Secreto o intercambio de regalos en minutos: invita a tus amigos, sortea los nombres automáticamente y comparte listas de deseos, en seis idiomas.",
        status: "En línea",
        cta: "Visitar psiu.app",
      },
    },
  },
  {
    id: "ipeptide",
    name: "i-Peptide",
    icon: "/images/apps/ipeptide.png",
    href: "https://ipeptide.org",
    platforms: "Web",
    copy: {
      en: {
        tagline: "Peptide research, simplified",
        description:
          "A research reference with study citations for each peptide, plus a precise reconstitution and dose calculator.",
        status: "Live",
        cta: "Visit ipeptide.org",
      },
      pt: {
        tagline: "Pesquisa de peptídeos, simplificada",
        description:
          "Uma referência de pesquisa com citações de estudos para cada peptídeo, além de uma calculadora precisa de reconstituição e dosagem.",
        status: "No ar",
        cta: "Visitar ipeptide.org",
      },
      es: {
        tagline: "Investigación de péptidos, simplificada",
        description:
          "Una referencia de investigación con citas de estudios para cada péptido, además de una calculadora precisa de reconstitución y dosis.",
        status: "En línea",
        cta: "Visitar ipeptide.org",
      },
    },
  },
];

const HERO: Record<Locale, { eyebrow: string; title: string; subtitle: string }> = {
  en: {
    eyebrow: "Built by 360 For Business",
    title: "Our Apps",
    subtitle: "Products we design, build and run ourselves, the same way we build for our clients.",
  },
  pt: {
    eyebrow: "Criados pela 360 For Business",
    title: "Nossos Apps",
    subtitle: "Produtos que nós mesmos criamos, desenvolvemos e operamos, do mesmo jeito que fazemos para nossos clientes.",
  },
  es: {
    eyebrow: "Creadas por 360 For Business",
    title: "Nuestras Apps",
    subtitle: "Productos que diseñamos, desarrollamos y operamos nosotros mismos, igual que lo hacemos para nuestros clientes.",
  },
};

export default async function AppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = (locales as readonly string[]).includes(localeParam) ? (localeParam as Locale) : "en";
  const hero = HERO[locale];

  return (
    <>
      <section className="relative bg-animated-gradient pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-[0.15em]">{hero.eyebrow}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white">{hero.title}</h1>
            <p className="mt-6 text-lg sm:text-xl text-white/75">{hero.subtitle}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 grid gap-8 md:grid-cols-2">
          {APPS.map((app, i) => {
            const copy = app.copy[locale];
            return (
              <ScrollReveal key={app.id} delay={i * 80}>
                <a
                  href={app.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center gap-5">
                    <Image
                      src={app.icon}
                      alt={`${app.name} icon`}
                      width={88}
                      height={88}
                      className="h-[88px] w-[88px] rounded-[22px] shadow-md ring-1 ring-black/5"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{app.name}</h2>
                      <p className="mt-1 font-medium text-purple-700">{copy.tagline}</p>
                      <p className="mt-1 text-sm text-slate-500">{app.platforms}</p>
                    </div>
                  </div>
                  <p className="mt-6 flex-1 leading-relaxed text-slate-600">{copy.description}</p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-600">
                      {copy.status}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-purple-700 group-hover:text-purple-900">
                      {copy.cta}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
