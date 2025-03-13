/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        Inter: ["Inter", "serif"],
        Monomakh: ["Monomakh","serif"],
        Bagel:["Bagel Fat One", "serif"],
        Rubik:["Rubik Spray Paint", "serif"],
        Modak:["Modak", "serif"]
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}