const webpack = require('webpack');
const htmlWebpack = require('html-webpack-plugin');
const env = require('dotenv-webpack');
var path = require('path');

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // { test: /\.png/, use: [
            //     {
            //         loader: 'url-loader',
            //         options: {
            //            MimeType: 'images/png' 
            //         }
            //     }
            // ] },




            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },

            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },

    
        devServer: {
            static: {
                directory: path.join(__dirname, 'app'),
            },
            compress: true,
            port: 9000,
        },


    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpack({
            template: 'app/index.html',
            filename: 'index.html',
            inject: 'body'
        }),

        new env()
    ]


}