/* eslint-disable @typescript-eslint/no-var-requires */
import { Configuration as Webpack, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServer } from 'webpack-dev-server';
import { merge } from 'webpack-merge';
import { paths } from './paths';
import common from './webpack.common';

interface Loader {
    loader: string;
    options?: { [k in string]: unknown };
}

const inlineOptions = (loaders: Loader[]) => {
    return loaders.map(({ loader, options = {} }) => {
        return loader + '?' + JSON.stringify(options);
    });
};

interface Configuration extends Webpack {
    devServer: WebpackDevServer;
}

const dev: Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',

    devServer: {
        historyApiFallback: true,
        contentBase: paths.build,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                use: (info: any) => {
                    return inlineOptions([
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: {
                                    localIdentName: !info.resource.includes(
                                        'rc-',
                                    )
                                        ? '[path]-[name]__[local]'
                                        : '[local]',
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                additionalData: '@import "variables";',
                                sassOptions: {
                                    includePaths: [paths.src + '/styles'],
                                },
                            },
                        },
                    ]);
                },
            },
        ],
    },
    plugins: [new HotModuleReplacementPlugin()],
};

export default merge(common, dev);
