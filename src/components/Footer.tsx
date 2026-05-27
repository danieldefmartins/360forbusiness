import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight, Clock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-animated-gradient" />
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5">
            {dict.cta.headline}
          </h2>
          <p className="text-purple-200 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            {dict.cta.subheadline}
          </p>
          <Link
            href={`/${locale}/contact/`}
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold px-12 py-5 rounded-xl transition-all text-lg cta-glow"
          >
            {dict.cta.button}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer content */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href={`/${locale}/`} className="inline-block mb-5">
                <Image
                  src="/images/logos/logo-horizontal-dark.png"
                  alt="360 For Business"
                  width={160}
                  height={43}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {dict.footer.tagline}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                  {dict.footer.location}
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  (305) 555-0360
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  info@360forbusiness.com
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-5">
                {dict.footer.services}
              </h3>
              <ul className="space-y-3">
                {Object.values(dict.homeServices.items).slice(0, 6).map((item) => (
                  <li key={item.title}>
                    <Link
                      href={`/${locale}/services/`}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-5">
                {dict.footer.company}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${locale}/about/`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {dict.footer.aboutLink}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/services/`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {dict.footer.servicesLink}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/our-process/`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {dict.footer.processLink}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/crm/`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {dict.footer.crmLink}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/portfolio/`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {dict.footer.portfolioLink}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/blog/`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact/`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {dict.footer.contactLink}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-5">
                {dict.footer.connect}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+13055550360" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                    <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                    (305) 555-0360
                  </a>
                </li>
                <li>
                  <a href="mailto:info@360forbusiness.com" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
                    <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                    info@360forbusiness.com
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                    Mon–Fri: 9AM–6PM EST
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              {dict.footer.privacy}
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              {dict.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
