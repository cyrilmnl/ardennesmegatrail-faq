export type Translation = Record<string, Record<string, string>>;

export type TranslationKey<T extends Translation> = keyof T[keyof T];

export type Locale = keyof Translation;
