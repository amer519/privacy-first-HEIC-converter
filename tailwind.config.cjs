
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./*.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};
