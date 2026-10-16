/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FBF9F5',
          200: '#F5F2EB',
          300: '#EFECE4',
          400: '#E4DFD5',
        },
        brand: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          dark: '#1C1917',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 30px -4px rgba(0, 0, 0, 0.08)',
        'soft-xl': '0 20px 40px -6px rgba(0, 0, 0, 0.12)',
        'floating': '0 12px 36px -4px rgba(28, 25, 23, 0.18)',
      },
      screens: {
        'xs': '380px',
      }
    },
  },
  plugins: [],
}
