import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";

const config: webpack.ConfigurationFactory = (_env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: path.resolve(__dirname, "src/index.ts"),
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: "[name].bundle.[chunkhash].js",
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [{ loader: "ts-loader" }],
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.join(__dirname, "src/index.html"),
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    externals: isProd
      ? {
          react: "React",
          "react-dom": "ReactDOM",
        }
      : {},
    devServer: {
      port: 7778,
      historyApiFallback: true,
      contentBase: path.join(__dirname, "dist"),
    },
  };
};

export default config;
