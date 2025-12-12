/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'loading-smooth': 'loading-smooth 3s ease-in-out infinite',
        'shine': 'shine 2s ease-in-out infinite',
        'meteorFall': 'meteorFall 4s linear infinite',
        'meteorFallFast': 'meteorFallFast 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'loading-smooth': {
          '0%': { width: '0%' },
          '30%': { width: '45%' },
          '60%': { width: '75%' },
          '100%': { width: '100%' },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'meteorFall': {
          '0%': { transform: 'translate(0, 0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translate(100vw, 100vh)', opacity: '0' },
        },
        'meteorFallFast': {
          '0%': { transform: 'translate(0, 0)', opacity: '0' },
          '5%': { opacity: '1' },
          '95%': { opacity: '1' },
          '100%': { transform: 'translate(120vw, 120vh)', opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}