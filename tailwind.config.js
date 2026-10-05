/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#F92B3E', dark: '#D91A2C', soft: '#FF5A69' },
        ink: { DEFAULT: '#070C10', 900: '#070C10', 800: '#0C1218', 700: '#121A21', 600: '#1A232C', 500: '#2A343F' },
        mist: { DEFAULT: '#F4F7FC', 200: '#E6EBF2', 300: '#CBD3DE' },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      maxWidth: { site: '1240px' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 32s linear infinite' },
    },
  },
  plugins: [],
}
