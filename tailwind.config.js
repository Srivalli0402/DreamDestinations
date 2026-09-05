/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#d9f0ff',
          200: '#bce5ff',
          300: '#8ed5ff',
          400: '#59bdff',
          500: '#329bff',
          600: '#1b7cf5',
          700: '#1463e0',
          800: '#1751b5',
          900: '#19478f',
          950: '#142b57',
        },
        accent: {
          50: '#fff8eb',
          100: '#ffe0c2',
          200: '#ffbf7a',
          300: '#ff9d32',
          400: '#ff830c',
          500: '#f56600',
          600: '#d94f00',
          700: '#b33a00',
          800: '#8f2e06',
          900: '#76290c',
          950: '#421100',
        },
        sand: {
          50: '#faf8f3',
          100: '#f3eee0',
          200: '#e6dcc0',
          300: '#d4c397',
          400: '#c0a76e',
          500: '#b08f55',
          600: '#9c7849',
          700: '#805f3d',
          800: '#684e36',
          900: '#56412e',
          950: '#32210d',
        },
      },
      fontFamily: {
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(0,0,0,0.15)',
        'card-hover': '0 20px 40px -12px rgba(0,0,0,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'fade-up': 'fadeUp 0.6s ease-out both',
        'slide-down': 'slideDown 0.4s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
