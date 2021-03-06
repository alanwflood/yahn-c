import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";

const config: webpack.ConfigurationFactory = (_env, argv) => {
  return {
    entry: {
      main: path.resolve(__dirname, "src/index.ts"),
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: "[name].bundle.[hash].js",
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
        env: argv.mode,
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    devServer: {
      hot: true,
      port: 7778,
      historyApiFallback: true,
      contentBase: path.join(__dirname, "dist"),
    },
  };
};

export default config;
