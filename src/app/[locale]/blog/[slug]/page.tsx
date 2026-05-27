import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { blogPosts } from "@/data/blog-posts";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">404</h1>
          <Link href={`/${locale}/blog/`} className="text-purple-600 font-semibold">
            {locale === "pt" ? "Voltar ao blog" : locale === "es" ? "Volver al blog" : "Back to blog"}
          </Link>
        </div>
      </section>
    );
  }

  const content = post[locale];
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className={`relative pt-32 sm:pt-40 pb-16 sm:pb-24 bg-gradient-to-br ${post.image} overflow-hidden`}>
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <Link
            href={`/${locale}/blog/`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === "pt" ? "Voltar ao blog" : locale === "es" ? "Volver al blog" : "Back to blog"}
          </Link>
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-5">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {content.title}
          </h1>
          <div className="flex items-center gap-5 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            <span>360 For Business</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-16 sm:py-24 bg-white">
        <article className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 font-medium">
            {content.excerpt}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-gold-400 rounded-full mb-10" />
          {content.content.map((paragraph, i) => (
            <p key={i} className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}

          {/* CTA Box */}
          <div className="mt-16 bg-gradient-to-br from-purple-50 to-gold-50 rounded-2xl p-8 sm:p-10 border border-purple-100">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {locale === "pt"
                ? "Pronto para aplicar isso no seu negocio?"
                : locale === "es"
                  ? "Listo para aplicar esto en tu negocio?"
                  : "Ready to apply this to your business?"}
            </h3>
            <p className="text-slate-600 mb-6">
              {locale === "pt"
                ? "Agende uma ligacao de estrategia gratuita e veja como podemos transformar seu negocio."
                : locale === "es"
                  ? "Agenda una llamada de estrategia gratuita y descubre como podemos transformar tu negocio."
                  : "Schedule a free strategy call and see how we can transform your business."}
            </p>
            <Link
              href={`/${locale}/contact/`}
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold px-8 py-3.5 rounded-lg transition-colors"
            >
              {dict.cta.button}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-10">
              {locale === "pt" ? "Artigos Relacionados" : locale === "es" ? "Articulos Relacionados" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/${locale}/blog/${rp.slug}/`} className="group">
                  <article className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all h-full">
                    <div className={`aspect-[16/9] bg-gradient-to-br ${rp.image}`} />
                    <div className="p-6">
                      <span className="text-xs text-purple-600 font-bold">{rp.category}</span>
                      <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-purple-600 transition-colors leading-snug">
                        {rp[locale].title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
