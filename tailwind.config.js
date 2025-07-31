// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {                  // ← langsung di sini, bukan theme.theme
      keyframes: {
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'zoom-pulse': 'zoom 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}