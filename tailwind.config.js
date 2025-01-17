/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "default-blue" : "#2aa2c7",
      white : "#fff",
      black : "#000",
      grey : "#dcdcdc",
    },
  },
  plugins: [],
}

