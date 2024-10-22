/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Cabin", "sans-serif"],
      },
      boxShadow: {
        custom:
          "-10px 10px 20px rgba(0, 0, 0, 0.25), 10px 10px 20px rgba(0, 0, 0, 0.25), 0px 20px 30px rgba(0, 0, 0, 0.30)",
      },
    },
  },
  plugins: [],
};
