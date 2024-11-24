/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                special: ['Special Elite', 'cursive'], // Ajoutez votre police avec un nom de clé
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
            animation: {
                scroll: 'scroll 10s linear infinite',
            },
        },
    },
    plugins: [],
}
