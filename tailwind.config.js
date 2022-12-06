

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        smiletheme: {
          primary: '#19D3AE',
          secondary: '#0FCFEC',
          accent: "#3A4256",
          neutral: "#291334",

          "base-100": "#FAF7F5"
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
