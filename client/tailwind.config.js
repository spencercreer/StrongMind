/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#026B3B",
        red: "#B4073A",
        white: "#F5F5F5",
        yellow: "#FDBB12",
        tan: "#D7D7C5",
      },
      fontFamily: {
        sans: ["Cabin", ...defaultTheme.fontFamily.sans],
        pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};
