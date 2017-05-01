// webpack.config.js

// 常用包
npm install --save-dev autoprefixer postcss-loader html-webpack-plugin extract-text-webpack-plugin
var path = require('path');

module.exports = {
  entry: {
    app:path.resolve(__dirname, 'src/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/',   // 静态资源的绝对路径
    filename: '[name].js'   // name对应entry的key，也就是app
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],    // 文件后缀名补全
    fallback: [path.join(__dirname, '../node_modules')],   //找不到模块时，去fallback指定的路径找
    alias: {                                               // alias路径别名
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
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
  eslint: {
      configFile: '.eslintrc' // Rules for eslint
  },

  postcss: [
      require('autoprefixer') //调用autoprefixer插件，例如 display: flex
  ],
};

//resolve模块
resolve:{
  // The directory (absolute path) that contains your modules. May also be an array of directories. 
  root: [
    path.resolve('./app/modules'),
    path.resolve('./vendor/modules')
  ]
  // A directory (or array of directories absolute paths), in which webpack should look for modules that weren’t found in resolve.root or resolve.modulesDirectories.
  fallback:[path.join(__dirname, '../node_modules')],  // root或modulesDirectories找不到时来这里找
}



// postcss用法
postcss是一个使用js插件转换css的工具
//常用插件
autoprefixer   // 自动添加前缀

// 如何在webpack中使用
module.exports = {
    devtool: 'eval-source-map',   // 编译后的代码排查比较困难，开启source map方便排查
    module: {
        loaders: [
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    }
    plugins: [
      require('autoprefixer')
    ]
}


// html-webpack-plugin 它会在dist目录下自动生成一个index.html,自动引入js，css
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 设置title的名字   
      filename: 设置这个html的文件名   
      template:要使用的模块的路径  
      inject: 把模板注入到哪个标签后 'body',   
      favicon: 给html添加一个favicon  './images/favico.ico',   
      minify:{
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      hash:是否hash化 true false ,     
      cache:是否缓存,   
      showErrors:是否显示错误,  
    }) 
  ]
};


// extract-text-webpack-plugin  
// 抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
# webpack 2
npm install --save-dev extract-text-webpack-plugin
# webpack 1
npm install --save-dev extract-text-webpack-plugin@1.0.1

// extract css into its own file
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
          // use: ['css-loader', 'sass-loader']  // 如果是sass
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css'))
  ]
}

//  BannerPlugin  头部信息
new webpack.BannerPlugin('This file is created by zhaoda')

// NoErrorsPlugin 报错但不退出webpack进程

// UglifyJsPlugin，代码丑化，开发过程中不建议打开
new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
})

// CommonsChunkPlugin 多个 html共用一个js文件(chunk)
// ProvidePlugin 引用第三方库



// 生成Hash名称的script来防止缓存
output: {
  path: BUILD_PATH,
  filename: '[name].[hash].js'  //只要再加上hash这个参数就可以了
},