import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { blogPosts } from "@/data/blog-posts";
import ScrollReveal from "@/components/ScrollReveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  const categories = [...new Set(blogPosts.map((p) => p.category))];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-animated-gradient pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Blog</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            {locale === "pt" ? "Insights e Estrategias" : locale === "es" ? "Insights y Estrategias" : "Insights & Strategies"}
          </h1>
          <p className="text-lg sm:text-xl text-purple-200 max-w-2xl mx-auto">
            {locale === "pt"
              ? "Artigos sobre marketing, IA, branding, leads e tudo que um empresario precisa saber para crescer."
              : locale === "es"
                ? "Articulos sobre marketing, IA, branding, leads y todo lo que un empresario necesita saber para crecer."
                : "Articles about marketing, AI, branding, leads, and everything a business owner needs to know to grow."}
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-white border-b border-slate-100 sticky top-[65px] sm:top-[81px] z-30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <span key={cat} className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-medium rounded-full whitespace-nowrap hover:bg-purple-50 hover:text-purple-600 transition-colors cursor-pointer">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Featured post */}
          <ScrollReveal>
            <Link href={`/${locale}/blog/${blogPosts[0].slug}/`} className="group block mb-16">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${blogPosts[0].image} flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500`}>
                  <span className="text-white/20 text-8xl font-extrabold">360</span>
                </div>
                <div>
                  <span className="inline-block bg-purple-50 text-purple-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-4">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {blogPosts[0][locale].title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    {blogPosts[0][locale].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{blogPosts[0].date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{blogPosts[0].readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 60}>
                <Link href={`/${locale}/blog/${post.slug}/`} className="group block h-full">
                  <article className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className={`aspect-[16/9] bg-gradient-to-br ${post.image} flex items-center justify-center`}>
                      <span className="text-white/15 text-6xl font-extrabold">360</span>
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-purple-50 text-purple-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors leading-snug">
                        {post[locale].title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1">
                        {post[locale].excerpt}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-600 group-hover:gap-3 transition-all">
                        {locale === "pt" ? "Ler mais" : locale === "es" ? "Leer mas" : "Read more"}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
