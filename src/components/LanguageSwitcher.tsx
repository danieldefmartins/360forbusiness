"use client";

import { useState } from "react";
import Link from "next/link";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span>{localeFlags[current]} {localeNames[current]}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}/`}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  locale === current
                    ? "bg-purple-50 text-purple-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg">{localeFlags[locale]}</span>
                {localeNames[locale]}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
