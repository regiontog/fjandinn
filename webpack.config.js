const path = require("path");
const webpack = require("webpack");
const CircularDependencyPlugin = require('circular-dependency-plugin')
const debug = process.env.NODE_ENV !== "production";

const common_plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
    }),
    new CircularDependencyPlugin({ failOnError: true }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "commons",
        filename: "common.chunk.js",
    }),
]

module.exports = {
    context: path.resolve(__dirname, "./src/static"),
    debug: debug,
    entry: {
        index: path.join("scripts", "index.jsx"),
        login: path.join("scripts", "login.jsx")
    },
    output: {
        path: path.resolve(__dirname, "./dist/static/scripts"),
        filename: "[name].bundle.js"
    },
    resolve: {
        root: path.resolve(__dirname, './src/static'),
        extensions: [".jsx", ".js", "", ".webpack.js", ".web.js"],
        modulesDirectories: ["node_modules"],
    },
    module: {
        loaders: [{
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /.html?$/,
                loader: 'file-loader',
                query: {
                    name: '[path][name].[ext]',
                    outputPath: '../'
                }
            }
        ]
    },
    devtool: debug ? 'source-map' : false,
    plugins: debug ? common_plugins.concat([]) : common_plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ sourcemap: false }),
    ])
};