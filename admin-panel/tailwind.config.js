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
                    50: '#fef3f2',
                    100: '#fee5e2',
                    200: '#fecfca',
                    300: '#fcaea5',
                    400: '#f87f71',
                    500: '#ef5844',
                    600: '#dc3b26',
                    700: '#b92f1c',
                    800: '#992a1a',
                    900: '#7f281c',
                },
            },
        },
    },
    plugins: [],
}
