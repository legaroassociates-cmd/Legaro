/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: '#1E2535',
                gold: '#D4AF37',       // Primary Gold
                'gold-dark': '#C59D5F', // For gradients
                cream: '#F9F1E1',       // Updated to richer Cream
                'cream-dark': '#EEE4D0', // Darker cream for footer
                'cream-nav': '#Fdf6e7',   // Slightly richer cream for navbar to distinguish from body
            },
            fontFamily: {
                serif: ['"Playfair Display"', '"Times New Roman"', 'serif'],
                sans: ['"Inter"', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
