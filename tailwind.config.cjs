/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#F7F4FF",
        "primary-light": "#FFFFFF",
        "primary-dark": "#020617",
        secondary: "#625B7B",
        tertiary: "#ECE6FF",
        "tertiary-dark": "#020010",
        "black-100": "#EDE7F8",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
