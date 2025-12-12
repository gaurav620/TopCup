'use client';

import { useLanguage } from '@/context/LanguageContext';
import en from '@/i18n/locales/en/common.json';
import hi from '@/i18n/locales/hi/common.json';
import bn from '@/i18n/locales/bn/common.json';

const translations = {
    en,
    hi,
    bn,
};

type TranslationKey = string;

export function useTranslation() {
    const { locale } = useLanguage();

    const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
        const keys = key.split('.');
        let value: any = translations[locale];

        for (const k of keys) {
            value = value?.[k];
        }

        // If translation not found, return key
        if (typeof value !== 'string') {
            return key;
        }

        // Replace parameters like {{name}} with actual values
        if (params) {
            return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
                return params[paramKey]?.toString() || match;
            });
        }

        return value;
    };

    return { t, locale };
}
