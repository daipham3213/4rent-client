const forms = require('@tailwindcss/forms');
const colors = require('./colors.config');
const fontSize = require('./font-sIze.config');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize,
    extend: {
      maxWidth: {
        '1/4': '25%',
        '1/2': '300px',
        '3/4': '75%',
        '11/12': '91%',
      },
      animation: {
        wave: 'wave 2s infinite',
      },
      colors,
    },
  },
  plugins: [forms],
};
