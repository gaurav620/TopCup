'use client';

import { useLanguage } from '@/context/LanguageContext';
import { locales, localeNames, Locale } from '@/i18n/config';
import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (newLocale: Locale) => {
        setLocale(newLocale);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Select language"
            >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{localeNames[locale]}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {locales.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => handleLanguageChange(loc)}
                            className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${locale === loc ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                                }`}
                        >
                            <span className="font-medium">{localeNames[loc]}</span>
                            {locale === loc && <Check className="w-4 h-4" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
