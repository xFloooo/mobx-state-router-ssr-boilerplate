"use strict";
// var ReactLoadablePlugin = require("react-loadable/webpack").ReactLoadablePlugin;
const clone = require("clone");
const path = require("path");
// const webpack = require("webpack");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var base = {
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    resolve: {
        alias: {
            "mobx-state-router": path.resolve(__dirname, "mobx-state-router/dist")
        }
    },
    // entry: {
    //     app: ["babel-polyfill", "./application/client.js"]
    // },
    // output: {
    //     path: __dirname + "/public/static",
    //     filename: "[name].js",
    //     chunkFilename: "[name].js",
    //     publicPath: "/"
    // },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: false,
                    presets: [
                        [
                            "env",
                            {
                                targets: {
                                    browsers: [
                                        "last 2 versions",
                                        "safari >= 7"
                                    ]
                                }
                            }
                        ],
                        "react"
                    ],
                    plugins: [
                        "transform-decorators-legacy",
                        "transform-class-properties"
                    ]
                }
            }
        ]
    }
};

const server = clone(base);
const client = clone(base);

server.entry = {
    app: ["babel-polyfill", "./application/server.js"]
};

client.entry = {
    app: ["babel-polyfill", "./application/client.js"]
};

server.output = {
    path: path.resolve(__dirname + "/public/static/server"),
    filename: "[name].js",
    publicPath: "/",
    library: "App",
    libraryTarget: "commonjs"
};

client.output = {
    path: path.resolve(__dirname + "/public/static/client"),
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath: "/"
},

module.exports = [server, client];
