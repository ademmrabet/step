/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter:['inter', 'sans-serif'],
        Lato : ['Lato', 'Sans-serif'],
        Open: ['Open-sans', 'sans-serif']

      }
    },
  },
  plugins: [],
}