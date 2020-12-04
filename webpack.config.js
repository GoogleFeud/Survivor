/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
//const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader",
            include: path.resolve(__dirname, "src")
        }, ]
    },
    resolve: {
        alias: {
            "jquery": path.join(__dirname, "./fake-jquery.js")
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/src"),
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, "src/client/css"),
                to: path.resolve(__dirname, "dist/css")
            },
            {
                from: path.resolve(__dirname, "src/client/index.html"),
                to: path.resolve(__dirname, "dist/index.html")
            }
            ]
        })
    ] 
};