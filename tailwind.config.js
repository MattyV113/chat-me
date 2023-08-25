/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'match-orange': '#FFB592',
        navdark: '#1F2833',
        navlight: '#F0F8FF',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  lightMode: 'class',
};
