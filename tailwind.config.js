/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}", // screen files
    "./components/**/*.{js,jsx,ts,tsx}", // components
  ],
  theme: {
    extend: {},
  },
  presets: [require("nativewind/preset")],
  plugins: [],
};
