import { derived, writable, type Readable } from "svelte/store";
import { translations } from "../locales";
import type { Locale, TranslationKey, Translation } from "../types/Translation";

export const locale = writable<Locale>("fr");

export const locales = Object.keys(translations) as Locale[];

function translate<T extends Translation>(
  locale: Locale,
  key: TranslationKey<T>,
  vars: Record<string, string>,
): string {
  if (!key) throw new Error("No key provided to $t()");
  if (!locale) throw new Error(`No translation for key "${String(key)}"`);

  let text = translations[locale][key as string];
  if (!text)
    throw new Error(`No translation found for ${locale}.${String(key)}`);

  Object.keys(vars).forEach((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t: Readable<
  (
    key: TranslationKey<typeof translations>,
    vars?: Record<string, string>,
  ) => string
> = derived(
  locale,
  ($locale) =>
    (key: TranslationKey<typeof translations>, vars = {}) =>
      translate<typeof translations>($locale, key, vars),
);
