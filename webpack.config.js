const path = require('path');
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      'Vue': ['vue', 'default'],
      'G': [path.resolve(path.join(__dirname, 'src', 'G', 'index.js')), 'default'],
    })
  ]
}
