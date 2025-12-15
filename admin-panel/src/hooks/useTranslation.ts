// Translation hook for Admin Panel - Stub
// Admin panel doesn't need multi-language support

export const useTranslation = () => {
    return {
        t: (key: string) => key,
        locale: 'en',
        setLocale: (locale: string) => { }
    };
};
