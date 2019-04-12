const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/theme.less'), 'utf8'));
// http://www.cnblogs.com/auok/p/6420843.html

const conf = require('./config');

const FILE_ENV = process.env.ENV || 'dev';
const NODE_ENV = conf[FILE_ENV].NODE_ENV;

// 环境 development
console.warn(`ENV环境为：${NODE_ENV}`);
console.warn(`配置文件为：${FILE_ENV}\n`);

const env = {
  development: {
    devtool: 'source-map',
    entry: {
      app: './src/index.js',
    },
    output: {},
    stats: {},
    devServer: {
      inline: true,
      open: true,
      overlay: true,
      port: 8080,
      stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      },
    },
    plugins: [
      // 生成HTMl并引用资源
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      // 生成环境
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        },
        URL: conf[FILE_ENV].url
      }),
      // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id
      new webpack.optimize.OccurrenceOrderPlugin(),
      // 样式打包
      new ExtractTextPlugin({filename: '[name].[contenthash:4].bundle.css', allChunks: true}),
    ],
  },
  production: {
    devtool: '',
    entry: {
      app: './src/index.js',
      vendor: ['react', 'react-dom', 'react-router-dom', 'axios']
    },
    output: {
      path: path.resolve(__dirname, conf[FILE_ENV].dist),
      filename: 'js/[name].[chunkhash:5].chunk.js',
      chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
      publicPath: conf[FILE_ENV].publicPath
    },
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },
    devServer: {},
    plugins: [
      // 替换上下文
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      // 打包依赖性能视图
      // new BundleAnalyzerPlugin(),
      // 删除旧文件
      new CleanWebpackPlugin(conf[FILE_ENV].dist, {
        root: __dirname, // 根目录
        verbose: true, // 开启在控制台输出信息
        dry: false // 启用删除文件
      }),
      // 生成HTMl并引用资源
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: './index.html',
        showErrors: true
      }),
      // 定义变量，一般用于开发环境log或者全局变量
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        },
        URL: conf[FILE_ENV].url
      }),
      // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id
      new webpack.optimize.OccurrenceOrderPlugin(),
      // 多个 html共用一个js文件(chunk)
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/vendor.bundle.js'}),
      // 将样式文件(css,sass,less)合并成一个css文件
      new ExtractTextPlugin({filename: 'css/[name].[contenthash:4].bundle.css', allChunks: true,}),
      // 压缩
      new webpack.optimize.UglifyJsPlugin({
        output: {comments: false,},
        compress: {warnings: false, drop_console: true}
      }),
    ]
  },
};

module.exports = {
  // map
  devtool: env[NODE_ENV].devtool,
  // 根目录
  context: path.resolve(__dirname, './'),
  // 需要打包的文件入口
  entry: env[NODE_ENV].entry,
  // 打包输出文件
  output: env[NODE_ENV].output,
  // 控制台输出信息配置
  stats: env[NODE_ENV].stats,
  // 入口文件路径
  resolve: {
    alias: {
      'Public': path.resolve(__dirname, './src/public/js'),
      'Api': path.resolve(__dirname, './src/api/'),
    }
  },
  // webpack服务器
  devServer: env[NODE_ENV].devServer,
  // 模块处理
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,  // antd 中的less
        include: path.resolve(__dirname, 'node_modules/antd'),  //这个路径要写准确，否则报错
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                modules: false,
                modifyVars: themeVariables,
              },
            },
          ],
        }),
      },
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, 'node_modules/antd'),  //这个路径要写准确，否则报错
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[hash:base64:4]_[local]',
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                }
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              }
            },
          ]
        })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf|pdf)\??.*$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 50000,
              name: '[path][name].[ext]'
            }
          },
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          }]
        })
      },
    ]
  },
  // 插件
  plugins: env[NODE_ENV].plugins
};
