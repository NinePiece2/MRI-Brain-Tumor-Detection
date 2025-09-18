/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // Next.js app directory
    './pages/**/*.{js,ts,jsx,tsx}',    // pages directory
    './components/**/*.{js,ts,jsx,tsx}' // components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;