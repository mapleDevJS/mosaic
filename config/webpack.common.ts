import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { paths } from './paths';
import { Configuration } from 'webpack';

const common: Configuration = {
    entry: [paths.src + '/index.tsx'],

    output: {
        path: paths.build,
        filename: '[name].[contenthash].js',
        publicPath: '/',
        clean: true,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),

        new HtmlWebpackPlugin({
            favicon: paths.src + '/assets/favicon.png',
            template: paths.src + '/index.html',
            filename: 'index.html', // output file
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    },
};

export default common;
