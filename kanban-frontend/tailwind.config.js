/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // Tailwind will look for classes in the `app` folder
    './pages/**/*.{js,ts,jsx,tsx}', // Also include `pages` folder if you have any
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
