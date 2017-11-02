var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: __dirname+ "/js",
    target:'electron-renderer',
    output: {
        path: path.resolve(__dirname, 'assets/scripts'),
        publicPath:'/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    presets: ["es2015","react"]
                }
            },
            {
              test: /\.css$/,
              loader: 'style!css',
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
};