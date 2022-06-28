/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        trello: "#1A76E3",
        velog: "#63E6BE",
        project: "#282A36",
      },
      backgroundImage: {
        me: "url('/me.jpg')",
      },
      keyframes: {
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-bottom": {
          "0%": { opacity: 0.1, transform: "translateY(-40px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        "slide-left": {
          "0%": { opacity: 0.1, transform: "translateX(-40px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
        "slide-right": {
          "0%": { opacity: 0.1, transform: "translateX(40px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
      },
      animation: {
        appear: "appear 1.6s ease-in forwards",
        "slide-bottom": "slide-bottom 1.6s ease-out forwards",
        "slide-left": "slide-left 1.6s ease-out forwards",
        "slide-right": "slide-right 1.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
