/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          "0%" : {transform: "translateY(-25px)", opacity:"0.6"},
          "100%" : {transform: "translateY(0px)" , opacity:"1"},
        },
      },
      animation: {
        "slide-down" : "slideDown 0.5s linear",
      }
    },
  },
  plugins: [],
}

