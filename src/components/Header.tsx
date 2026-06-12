"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/`, label: dict.nav.home },
    { href: `/${locale}/services/`, label: dict.nav.services },
    { href: `/${locale}/our-process/`, label: dict.nav.process },
    { href: `/${locale}/crm/`, label: dict.nav.crm },
    { href: `/${locale}/portfolio/`, label: dict.nav.portfolio },
    { href: `/${locale}/about/`, label: dict.nav.about },
    { href: `/${locale}/pricing/`, label: locale === "pt" ? "Precos" : locale === "es" ? "Precios" : "Pricing" },
    { href: `/${locale}/blog/`, label: "Blog" },
    { href: `/${locale}/contact/`, label: dict.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-gold-500 to-purple-600" />

      {/* Main nav */}
      <div
        className={`transition-all duration-300 border-b border-white/5 ${
          scrolled
            ? "bg-slate-900/98 backdrop-blur-lg shadow-lg"
            : "bg-slate-900/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href={`/${locale}/`} className="shrink-0">
              <Image
                src="/images/logos/logo-horizontal-dark.png"
                alt="360 For Business"
                width={180}
                height={48}
                className="h-9 sm:h-11 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-semibold text-white/70 hover:text-white transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <LanguageSwitcher current={locale} />
              </div>
              <Link
                href={`/${locale}/start/`}
                className="hidden md:inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                {dict.nav.getStarted}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-white/10 overflow-y-auto max-h-[80vh]">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base font-medium text-white/80 hover:text-white transition-colors border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 mt-4">
                <LanguageSwitcher current={locale} />
              </div>
              <Link
                href={`/${locale}/start/`}
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold px-8 py-3.5 rounded-lg transition-colors w-full text-base"
              >
                {dict.nav.getStarted}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
