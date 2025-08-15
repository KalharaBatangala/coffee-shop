/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // scan all files in src for class names
  ],
  theme: {
    extend: {
      fontFamily: {
      royal: ['"Great Vibes"', 'cursive'],
    },
    },
  },
  plugins: [],
};
