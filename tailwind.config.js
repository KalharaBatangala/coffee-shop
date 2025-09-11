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
    cursor:{
      'custom-arrow': 'url(/assets/cursor.png), default',
      'custom-pointer': 'url(/assets/left.png), default',
    },
    colors:{
      primary: '#D99A16', // yellow
    },
    },
  },
  plugins: [],
};
