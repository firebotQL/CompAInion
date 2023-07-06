const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

const extensionConfig = {
  name: "chrome-extension",
  mode,
  entry: {
    // content: "./extension/src/content.ts",
    background: "./extension/src/background.ts",
    popup: "./extension/src/popup.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "extension/src/manifest.json"),
          to: ".", // Relative to the webpack output path
        },
        { from: "extension/src/popup.html", to: "." },
        { from: "extension/images", to: "images" },
      ],
    }),
  ],
};

const reactConfig = {
  entry: "./react-chrome-app/src/index.tsx",
  mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ["file-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [...getHtmlPlugins(["index"])],
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: "React extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}

const configurations = [extensionConfig, reactConfig];

const generateConfig = (configurations) => {
  return configurations.map((config) => ({
    ...config,
  }));
};

module.exports = generateConfig(configurations);
