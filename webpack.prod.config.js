"use strict";
var ReactLoadablePlugin = require("react-loadable/webpack").ReactLoadablePlugin;
var clone = require("clone");
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var autoprefixer = require("autoprefixer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

var base = {
    node: {
        fs: "empty"
    },
    externals: [
        {
            "isomorphic-fetch": {
                root: "isomorphic-fetch",
                commonjs2: "isomorphic-fetch",
                commonjs: "isomorphic-fetch",
                amd: "isomorphic-fetch"
            }
        }
    ],
    resolve: {
        extensions: [".js", ".css", ".styl", ".scss", ".ts", ".tsx"],
        alias: {
            Services: path.resolve(__dirname, "application/services"),
            Overlays: path.resolve(__dirname, "application/overlays"),
            Configs: path.resolve(__dirname, "configs"),
            Constants: path.resolve(__dirname, "application/constants"),
            Components: path.resolve(__dirname, "application/components"),
            ComponentsUsed: path.resolve(
                __dirname,
                "application/componentsUsed"
            ),
            Containers: path.resolve(__dirname, "application/containers"),
            CommonSCSS: path.resolve(__dirname, "application/styles/scss"),
            fonts: path.resolve(__dirname, "application/fonts"),
            icons: path.resolve(__dirname, "application/icons"),
            images: path.resolve(__dirname, "application/images"),
            Wrappers: path.resolve(__dirname, "application/wrappers"),
            Layouts: path.resolve(__dirname, "application/layouts"),
            Texts: path.resolve(__dirname, "texts")
        }
    },
    entry: {
        app: ["babel-polyfill", "./application/client.js"]
    },
    output: {
        path: __dirname + "/public/static",
        filename: "[name].js",
        chunkFilename: "[name].js", // or whatever other format you want.
        publicPath: "/"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new ExtractTextPlugin({
            filename: "[name].css",
            allChunks: true
        }),
        new CleanWebpackPlugin(["static"], {
            root: __dirname + "/public/",
            verbose: true,
            dry: false,
            exclude: [".gitignore"]
        }),
        new CleanWebpackPlugin(["dist"], {
            root: __dirname + "/",
            verbose: true,
            dry: false,
            exclude: [".gitignore"]
        })
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: false,
                        presets: [
                            // "minify",
                            [
                                "env",
                                {
                                    targets: {
                                        browsers: [
                                            "last 2 versions",
                                            "safari >= 7"
                                        ]
                                        // uglify: true
                                    }
                                }
                            ],
                            "react"
                        ],
                        plugins: [
                            "syntax-dynamic-import",
                            "transform-async-to-generator",
                            "transform-decorators-legacy",
                            "transform-class-properties",
                            "transform-object-rest-spread",
                            "graphql-tag",
                            "react-loadable/babel"
                        ]
                    }
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "awesome-typescript-loader"
                    }
                ]
            },
            {
                test: /\.txt$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "raw-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(["style-loader", "css-loader"])
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "stylus-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(pdf|png|jpg|ttf|eot|svg|woff|woff2)(\?[a-z0-9#=&.]+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            }
        ]
    }
};

var server = clone(base);
var client = clone(base);

client.plugins.push(
    new ReactLoadablePlugin({
        filename: "./dist/react-loadable.json"
    })
);

// client.plugins.push(
//     new webpack.optimize.CommonsChunkPlugin({
//         name: 'vendor',
//         filename: 'vendor.js',
//         minChunks: 2,
//     })
// );

// client.plugins.push(
//     new UglifyJsPlugin({
//         uglifyOptions: {
//             ie8: false,
//             ecma: 8,
//             warnings: false
//         }
//     })
// );
//
// client.plugins.push(
//     new CompressionPlugin({
//         asset: "[path].gz[query]",
//         algorithm: "gzip",
//         test: /\.(js|html)$/,
//         threshold: 10240,
//         minRatio: 0.8
//     })
// );

server.entry = {
    app: ["babel-polyfill", "./application/server.js"]
};

server.module.rules = [
    {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                babelrc: false,
                presets: ["es2015", "react"],
                plugins: [
                    "dynamic-import-node",
                    "transform-decorators-legacy",
                    "transform-class-properties",
                    "transform-object-rest-spread",
                    "graphql-tag",
                    "react-loadable/babel"
                ]
            }
        }
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(["style-loader", "css-loader"])
    },
    {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
            use: [
                {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                },
                {
                    loader: "stylus-loader"
                }
            ],
            // use style-loader in development
            fallback: "style-loader"
        })
    },
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            use: [
                {
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                },
                {
                    loader: "sass-loader"
                }
            ],
            // use style-loader in development
            fallback: "style-loader"
        })
    },
    {
        test: /\.(pdf|png|jpg|ttf|eot|svg|woff|woff2)(\?[a-z0-9#=&.]+)?$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "[path][name].[ext]"
                }
            }
        ]
    }
];

server.output = {
    path: __dirname + "/public/static/server",
    filename: "[name].js",
    publicPath: "/",
    library: "App",
    libraryTarget: "commonjs"
};

client.output.path = __dirname + "/public/static/client";

server.plugins.push(
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development")
    })
);

module.exports = [server, client];
