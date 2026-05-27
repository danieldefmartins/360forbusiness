import type { Locale } from "./config";
import type { Dictionary } from "./en";
import en from "./en";
import pt from "./pt";
import es from "./es";

const dictionaries: Record<Locale, Dictionary> = { en, pt, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
