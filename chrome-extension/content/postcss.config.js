const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const path = require("path");
// const postcssparentselector = require("postcss-parent-selector");

module.exports = {
  plugins: [
    tailwindcss(path.resolve(__dirname, "tailwind.config.js")),
    autoprefixer,
    // postcssparentselector({ selector: ".companion-content" }),    // TODO: this is needed for the USE button!
  ],
};
