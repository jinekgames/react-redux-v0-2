const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    // watch: true,
    mode: 'development',
    entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.jsx')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // для стилей в теге style
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // }
            // для стилей с отдельным файлом
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './',
                            // esModule: true,
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'dist'),
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new BrowserSyncWebpackPlugin({
            host: 'localhost',
            port: 4000,
            server: { baseDir: ['./dist'] }
        })
    ],
    resolve: {
        extensions: ['.js', '.css', '.jsx']
    }
}
