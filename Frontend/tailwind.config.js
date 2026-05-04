/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ MUST BE THIS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};