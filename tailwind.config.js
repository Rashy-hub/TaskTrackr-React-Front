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
                    '0%': { transform: 'translateX(12.5%)' }, // Départ
                    '50%': { transform: 'translateX(-12.5%)' }, // Au centre à droite
                    '100%': { transform: 'translateX(12.5%)' }, // Retour au départ
                },
            },
            animation: {
                scroll: 'scroll 20s ease-in-out infinite', // Animation fluide et infinie
            },
        },
    },
    plugins: [],
}
