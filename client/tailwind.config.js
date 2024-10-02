/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#191B1F",
        lightblue: "#3DBCD0",
        red: "#FF2732",
        yellow: "#FDBB12",
        green: "#62C46F",
        tan: "#D7D7C5",
      },
    },
  },
  plugins: [],
};
