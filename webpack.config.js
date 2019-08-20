const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "none",

    entry: ["./src/js/index.js", "./src/styles/default.sass"],

    output: {
        filename: "main.js?hash=[contenthash]",
        path: path.resolve(__dirname, "dist"),
        chunkFilename: "[name].js?hash=[contenthash]",
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "initial",
                },
                images: {
                    test: /[\\/]src[\\/]base64[\\/]/,
                    name: "images",
                    chunks: "initial",
                },
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.(sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                }),
            },

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|dist)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            title: "Galaxy",
            template: "index.html",
        }),
    ],
    
    resolve: {
        alias: {
            "@images": path.resolve(__dirname, "./src/base64/images.js"),
            "@styles": path.resolve(__dirname, "./src/styles/default.sass"),
        },
    },
};
