/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: '#121212',
        'charcoal-light': '#1e1e1e',
        primary: '#3b82f6',
      }
    },
  },
  plugins: [],
}