const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const path = require("path");

module.exports = {
  plugins: [
    tailwindcss(path.resolve(__dirname, "tailwind.config.js")),
    autoprefixer,
  ],
};
