// webpack.config.js

var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders:[
      {
        test: /\.vue$/,           // 需要处理的文件
        include: /src/,           // 需要处理的文件目录
        loader: 'eslint',   // 需要使用的loader,可以用！连接多个loader
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,           // 需要处理的文件
        exclude: /node_modules/,   // 排除的文件
        loader: 'babel-loader',    // 需要使用的loader,可以用！连接多个loader
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,       // 文件大小小于10KB,转成base64,否则生成一个文件
          name: utils.assetsPath('img/[name].[hash:7].[ext]')   // 文件名规则
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};