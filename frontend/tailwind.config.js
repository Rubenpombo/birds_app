/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        nature: {
          50: '#f2f8f5',
          100: '#e1efe8',
          200: '#c5e0d4',
          300: '#9cc7b8',
          400: '#6fa596',
          500: '#4d887a',
          600: '#3a6c61',
          700: '#31574f',
          800: '#2a4640',
          900: '#253b36',
        },
        earth: {
          dark: '#1B2621', // Deep Forest Green
          sand: '#F4F1EA', // Warm Sand
          teal: '#4D887A', // Soft Teal
          accent: '#D4A373' // A warm brown accent
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }
    },
  },
  plugins: [],
}
