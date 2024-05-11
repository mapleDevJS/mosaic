/* eslint-disable @typescript-eslint/no-var-requires */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { merge } from 'webpack-merge';
import { paths } from './paths';
import common from './webpack.common';
import { Configuration, WebpackPluginInstance } from 'webpack';

const prod: Configuration = {
    mode: 'production',
    devtool: false,

    output: {
        path: paths.build,
        publicPath: '/',
        filename: 'js/[name].[contenthash].js',
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            modules: true,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false,
                            additionalData: '@import "variables";',
                            sassOptions: {
                                includePaths: [paths.src + '/styles'],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // Extracts CSS into separate files
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
            chunkFilename: '[id].css',
        }) as unknown as WebpackPluginInstance,
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), '...'],
        runtimeChunk: true,
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};

export default merge(common, prod);
