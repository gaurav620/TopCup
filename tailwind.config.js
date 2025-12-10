/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fef7ee',
                    100: '#fdedd6',
                    200: '#fad5ac',
                    300: '#f6b777',
                    400: '#f19040',
                    500: '#ee7520',
                    600: '#df5a14',
                    700: '#b94312',
                    800: '#933617',
                    900: '#772f16',
                    950: '#401509',
                },
                secondary: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16',
                },
                cream: {
                    50: '#fefdfb',
                    100: '#fdf8f0',
                    200: '#faf0e0',
                    300: '#f6e4c8',
                    400: '#f0d4a8',
                    500: '#e8c088',
                },
                accent: {
                    saffron: '#ff9933',
                    gold: '#ffd700',
                    maroon: '#800000',
                },
            },
            fontFamily: {
                sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
                display: ['var(--font-playfair)', 'Georgia', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'bounce-soft': 'bounceSoft 0.5s ease-out',
                'shimmer': 'shimmer 2s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                bounceSoft: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'hero-pattern': "url('/images/pattern.svg')",
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
                'warm': '0 4px 20px 0 rgba(238, 117, 32, 0.15)',
                'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
            },
            backdropBlur: {
                'glass': '10px',
            },
        },
    },
    plugins: [],
}
