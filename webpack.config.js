const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWbpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev;

console.log(`isDev:${isDev}`);
const optimization = ()=>{
    const config = {
        splitChunks:{
            chunks:'all'
        }
    }
    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const fileName = (ext) => isDev? `[name].${ext}`: `[name].[hash].${ext}`

const cssLoaders = (addition)=>{
    const loaders = [
        isDev?'style-loader':MiniCssExtractPlugin.loader,
        'css-loader'
    ]
    if(addition){
        loaders.push(addition)
    }
    return loaders
}

const babelOptions = (preset)=>{
    const options = {
        presets:[
            '@babel/preset-env'
        ],
        plugins:[
            '@babel/plugin-proposal-class-properties'
        ]
    }
    if(preset){
        options.presets.push(preset)
    }
    return options
}

module.exports= {
    entry:{
        index:['@babel/polyfill','./src/js/index.js']
    },
    output:{
        filename:fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization:optimization(),
    devServer:{
        port:4001,
        hot: isDev,
        historyApiFallback: true,
        disableHostCheck:true,
        host:"192.168.56.43"
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:'./src/index.html',
            minify:{
                collapseWhitespace:isProd
            },
            base:isDev?"/":"./"
        }),
        new CleanWebpackPlugin(),
        // new CopyWbpackPlugin({
        //     patterns:[
        //         // {
        //         //     from:path.resolve(__dirname, './src/img/favicon.ico'),
        //         //     to:path.resolve(__dirname, 'dist')
        //         // },
        //         // {
        //         //     from:path.resolve(__dirname,'./src/404.html'),
        //         //     to:path.resolve(__dirname, 'dist')
        //         // },
        //         // {
        //         //     from:path.resolve(__dirname,'./db'),
        //         //     to:path.resolve(__dirname,'dist')
        //         // }
        //     ]
        // }),
        new MiniCssExtractPlugin({
            filename:fileName('css')
        })
    ],
    module:{
        rules:[
            {
                test: /\.js$/i,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:babelOptions('@babel/preset-react')
                }
            },
            {
                test: /\.ts$/i,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/i,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:babelOptions('@babel/preset-react')
                }
            },
            {
                test:/\.css$/i,
                use:cssLoaders()
            },
            {
             test:/\.less$/i,
             use:cssLoaders('less-loader')  
            },
            {
                test:/\.s[ac]ss$/i,
                use:cssLoaders('sass-loader')  
               },
            {
                test:/\.(png|jprg|svg|gif|jpg)$/i,
                use:[{
                    loader:'file-loader',
                }]
            },
            {
                test:/\.html$/i,
                use:['html-loader']
            },
            {
                test:/\.(ttf|woff|woff2|eot)$/i,
                use:[
                    {
                        loader:'file-loader',
                    }
            ]
            }
        ]
    }
    
}