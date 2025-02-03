/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // Include tutti i file all'interno della cartella app
    "./pages/**/*.{js,ts,jsx,tsx}",     // Se hai una cartella pages
    "./components/**/*.{js,ts,jsx,tsx}" // Se hai componenti in una cartella components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
