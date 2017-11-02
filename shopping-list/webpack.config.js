var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: __dirname+ "/src",
    target:'electron-renderer',
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
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
                loader: 'style-loader!css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ]
};