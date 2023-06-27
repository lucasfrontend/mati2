module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  },
  devServer: {
    https: false
  }
}


/*
module.exports = {
    transpileDependencies: ['vuetify'],
    configureWebpack: {
        devServer: {
          https: false
        }
      }
}

*/