const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const path = require("path");

console.log("Resolved path: " + path.resolve(__dirname, "tailwind.config.js"));
module.exports = {
  plugins: [
    tailwindcss(path.resolve(__dirname, "tailwind.config.js")),
    autoprefixer,
  ],
};
