/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'Helvetica': ['"Helvetica"', 'sans-serif'],
    },
    extend: {
      'colors': {
        'dark': {
          100: '#adb5bd',
          200: '#0b090a',
        }
      }
    },
  },
  plugins: [],
}