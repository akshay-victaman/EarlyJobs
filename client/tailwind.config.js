/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa",   
        foreground: "#1a1a1a",   
        primary: "#4f46e5",      
        accent: "#f59e0b",
     },
    },
  },
  plugins: [],
}
