"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "source-map",
    resolve: {
        alias: {
            "mobx-state-router": path.resolve(__dirname, "mobx-state-router/dist")
        }
    },
    entry: {
        app: [
            "./application/index.js"
        ],

    },
    output: {
        path: __dirname + "/public/static",
        filename: "[name].js",
        chunkFilename: "[name]-[id].js", // or whatever other format you want.
        publicPath: "/",
        library: "[name]",
        libraryTarget: "umd"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/application/template/index.tpl.html",
            inject: "body",
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: require.resolve('babel-loader'),
                options: {
                    // This is a feature of `babel-loader` for Webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    // plugins: ['transform-decorators-legacy', 'transform-class-properties', 'react-hot-loader/babel'],
                    // presets: ['env', 'react']
                },
            }
        ]
    }
};
