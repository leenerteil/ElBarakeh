/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1A73E8',
        'primary-light': '#00AEEF',
      },
      fontFamily: {
        'arabic': ['"Noto Sans Arabic"', 'sans-serif'],
      },
    },
  },
}