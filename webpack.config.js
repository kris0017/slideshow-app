const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const debug = (process.env.NODE_ENV || '').trim() == 'development';

const cssLoader = debug ? { 
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader'], 
  } : { 
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: ['css-loader'], 
    })
};
const lessLoader = debug ? { 
  test: /\.less$/,
  loaders: ['style-loader', 'css-loader', 'less-loader'], 
} : { 
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
    use: ['css-loader', 'less-loader'], 
  })
};


module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug  ? 'inline-sourcemap' : false,
  entry:  debug ?  
  {
    'index.min.js' : [
      './js/index.js',
      './index.html',
     './styles/main.less'
    ]
  } : {
    'index.min.js' : [
      './js/index.js',
      './index.html',
      './manifest.json',
      './favicon.ico',
    ],
    'main.css' : [
      './styles/main.less',
    ]
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }      
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        use: 'url-loader?limit=8192&name=[name].[ext]&publicPath=./&outputPath=images/'
      },
      {
        test: /\.(html|ico)?$/, 
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.json?$/, 
        loader: 'json-loader?name=[name].json'
      },
      lessLoader,
      cssLoader
    ]
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: '[name]'
  },
  devServer: {
    compress: false,
    port: 8080 
  },
  plugins: debug ? [ ] : [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.js$/g,
    }),
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath('[name]');
      },
      allChunks: true
    })
  ],
};