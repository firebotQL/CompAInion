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
  entry: "./ui/src/index.tsx",
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
        test: /\.css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "ui/"),
    },
  },
  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  plugins: [...getHtmlPlugins(["index"])],
};

const reactPopConfig = {
  entry: "./ui-popup/src/index.tsx",
  mode: "development",
  devtool: "inline-source-map",
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
        test: /\.css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
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
    alias: {
      "@": path.resolve(__dirname, "ui-popup/"),
    },
  },
  output: {
    filename: "popup.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HTMLPlugin({
      title: "React Popup",
      template: "./ui-popup/public/index.html", // load the public/index.html file as the template
      filename: "popup.html", // output HTML in dist folder
      inject: "body", // inject scripts into body
    }),
  ],
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

const configurations = [extensionConfig, reactConfig, reactPopConfig];

const generateConfig = (configurations) => {
  return configurations.map((config) => ({
    ...config,
  }));
};

module.exports = generateConfig(configurations);
