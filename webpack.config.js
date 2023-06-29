/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");


module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "./src/index.ts"),
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "dist"),
        filename: "chat.bundle.js"
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "index.html",
        }) 
    ],
    resolve: {
        extensions: [".ts", ".js", ".json", ".scss", ".css"]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        liveReload: true,
        compress: true,
        port: 3000,
        hot: false,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                {
                    loader: "ts-loader",
                    options: {
                        configFile: path.resolve(__dirname, "tsconfig.json"),
                    },
                },
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: "sass-loader",
                    }
                ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline",
            },
            { 
                test: /\.hbs$/, 
                loader: "handlebars-loader" 
            }
        ]
    }
}
