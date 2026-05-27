import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const contact = dict.contactPage;

  return (
    <>
      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="relative min-h-[50vh] flex items-center bg-animated-gradient pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
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
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold-400 font-semibold text-sm uppercase tracking-[0.2em] mb-6">
              {contact.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">
              {contact.headline}
            </h1>
            <p className="text-lg sm:text-xl text-purple-200 leading-relaxed max-w-2xl mx-auto">
              {contact.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ TWO-COLUMN LAYOUT ═══════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN — Contact info & reasons */}
            <ScrollReveal>
              <div className="lg:sticky lg:top-32">
                {/* Contact info */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-10">
                  {contact.info.title}
                </h2>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Location
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {contact.info.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${contact.info.email}`}
                        className="text-lg font-bold text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        {contact.info.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${contact.info.phone.replace(/[^+\d]/g, "")}`}
                        className="text-lg font-bold text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        {contact.info.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Hours
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {contact.info.hours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reasons to call */}
                <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageCircle className="w-5 h-5 text-gold-500" />
                    <h3 className="text-xl font-bold text-slate-900">
                      {contact.reasons.title}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {contact.reasons.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT COLUMN — Contact form */}
            <ScrollReveal delay={200}>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10">
                <ContactForm dict={dict} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
