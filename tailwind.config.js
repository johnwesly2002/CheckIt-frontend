/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lexend", "Calibre", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
