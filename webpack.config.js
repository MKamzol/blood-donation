const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const VENDOR_LIBS=[
];

module.exports = {
    entry:{
        bundle: './app/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {   test: /\.(ttf|eot|woff|woff2)$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options:{
                            limit:40000
                        }
                    },
                    {
                        loader:'image-webpack-loader',
                        options:{
                        }
                    }
                ]
            }
        ],
    },
    devtool: 'source-map',
    plugins:[
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        })
    ]
};

