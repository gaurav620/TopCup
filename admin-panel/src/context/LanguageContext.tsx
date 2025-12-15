// Language Context for Admin Panel - Stub
'use client';

import { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
    locale: string;
    setLocale: (locale: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: 'en',
    setLocale: () => { }
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    return (
        <LanguageContext.Provider value={{ locale: 'en', setLocale: () => { } }}>
            {children}
        </LanguageContext.Provider>
    );
};
