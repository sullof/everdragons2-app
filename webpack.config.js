const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    entry: './client/index.js',
    
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions']
                  }
                }],
                '@babel/preset-react'
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle/bundle.min.js',
      clean: true
    },
    
    resolve: {
      extensions: ['.js', '.jsx'],
      fallback: {
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/"),
        "util": require.resolve("util/"),
        "process": require.resolve("process/browser")
      }
    },
    
    optimization: {
      minimize: isProduction
    },
    
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  };
};
