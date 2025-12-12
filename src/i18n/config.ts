export const locales = ['en', 'hi', 'bn'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
    en: 'English',
    hi: 'हिंदी',
    bn: 'বাংলা',
};

export const localeLabels: Record<Locale, string> = {
    en: 'EN',
    hi: 'हिं',
    bn: 'বাং',
};
