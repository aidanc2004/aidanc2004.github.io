/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      "gunmetal": "#2E3138",
      // "gunmetal": "#222222", // Eerie Black
      "dim-gray": "#6C6F7D",
      "coral": "#FC7753",
      //"tiffany-blue": "#66D7D1",
      "tiffany-blue": "#BBCDE5", // Powder Blue
      "seashell": "#FFF5EE",
      //"link": "#66D7D1",
      "link": "#639FAB", // Moonstone
      "lapis": "#1C5D99"
    },
    fontFamily: {
      'sans': ['Roboto', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

