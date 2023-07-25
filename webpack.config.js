const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

const chromeExtensionDir = "./chrome-extension";
const enableDevTools = mode === "development";

const additionalConfig = enableDevTools ? { devtool: "inline-source-map" } : {};

const outputDir = path.resolve(__dirname, "dist");

const extensionConfig = {
  name: "core",
  mode,
  entry: {
    background: `${chromeExtensionDir}/core/src/background.ts`,
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
    path: outputDir,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            `${chromeExtensionDir}/core/src/manifest.json`
          ),
          to: ".", // Relative to the webpack output path
        },
        { from: `${chromeExtensionDir}/core/images`, to: "images" },
      ],
    }),
  ],
};

const reactConfig = {
  entry: `${chromeExtensionDir}/content/src/index.tsx`,
  mode,
  ...additionalConfig,
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
          {
            loader: "style-loader",
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
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
      "@": path.resolve(__dirname, `${chromeExtensionDir}/content/`),
    },
  },
  output: {
    filename: "content.js",
    path: outputDir,
    publicPath: "",
  },
  plugins: [...getHtmlPlugins(["index"])],
};

const reactPopConfig = {
  entry: `${chromeExtensionDir}/popup/src/index.tsx`,
  mode,
  ...additionalConfig,
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
          {
            loader: "style-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
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
      "@": path.resolve(__dirname, "chrome-extension/popup/"),
    },
  },
  output: {
    filename: "popup.js",
    path: outputDir,
  },
  plugins: [
    new HTMLPlugin({
      title: "React Popup",
      template: `${chromeExtensionDir}/popup/public/index.html`, // load the public/index.html file as the template
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
