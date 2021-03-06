const webpack = require('webpack'),
  path = require('path'),
  srcDir = path.resolve( __dirname, 'src' ),
  publicDir = path.resolve( __dirname, 'public' ),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ReloadPlugin = require('reload-html-webpack-plugin')

module.exports = {
  context: srcDir,
  devtool: 'source-map',
  entry: {
    script: './js/index.js',
    contact: './js/contact.js'
  },
  output: {
    path: publicDir,
    filename: '[name].js',
    publicPath: './',
    sourceMapFilename: 'main.map'
  },
  devServer: {
    contentBase: srcDir,
    publicPath: '/',
    historyApiFallback: true,
    compress: true,
    open: true,
    hot: true,
    stats: 'errors-only',
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        use: [
          'file-loader?name=[path][name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?)$/,
        use: [
          'file-loader?name=[path][name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReloadPlugin(),
    //Generar los HTMLs en la carpeta pública
    new HtmlWebpackPlugin({
      title: 'Demo Starter Kit Webpack + ES6 + SASS',
      //usar un template
      template: path.join(srcDir, 'index.html'),
      //donde se pondrá el archivo compilado
      path: publicDir,
      //nombre del archivo compilado
      filename: 'index.html',
      //generar un hash único al archivo js
      hash: true,
      //excluir archivos del bundle
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      title: 'Contacto',
      //usar un template
      template: path.join(srcDir, 'contacto.html'),
      //donde se pondrá el archivo compilado
      path: publicDir,
      //nombre del archivo compilado
      filename: 'contacto.html',
      //generar un hash único al archivo js
      hash: true,
      //excluir archivos del bundle
      excludeChunks: ['script'],
      chunks: ['contact']
    })
  ]
}
