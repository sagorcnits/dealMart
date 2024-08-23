/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#17827D",
        paragraph: "#a0a0a0",
        darkBlue: "#073b53",
      },
    },
  },
  plugins: [require("daisyui")],
};
