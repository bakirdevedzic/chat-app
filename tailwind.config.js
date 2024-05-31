/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-black": "#1D2024",
        "primary-gray": "#ebf0f4",
        "primary-white": "#f5f6f7",
      },
      height: {
        screen: "100dvh",
      },
      screens: {
        xl: { max: "1380px" },
        md: { min: "901px", max: "1200px" },
        sm: { max: "850px" },
        us: { max: "400px" },
      },
    },
  },
  plugins: [],
};
