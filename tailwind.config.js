/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f172a', // slate-900
          card: '#1e293b', // slate-800
          border: '#334155', // slate-700
          text: '#f8fafc', // slate-50
          muted: '#94a3b8', // slate-400
        },
        brand: {
          DEFAULT: '#3b82f6', // blue-500
          hover: '#2563eb', // blue-600
          accent: '#8b5cf6', // violet-500
        }
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}
