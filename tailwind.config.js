/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // modern electric indigo
          600: '#4f46e5', // primary action
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        dark: {
          bg: '#090d16',
          surface: '#0f172a',
          card: '#131c2e',
          border: '#1e293b',
          subtle: '#334155',
        }
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 28px -6px rgba(0, 0, 0, 0.09), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'glow-brand': '0 0 25px -4px rgba(79, 70, 229, 0.35)',
        'glow-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.35)',
        'figma': '0 0 0 1px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.08)',
        'figma-dark': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 20px -2px rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
