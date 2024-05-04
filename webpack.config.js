import CopyPlugin from 'copy-webpack-plugin';

/** @type {(env: Record<string, string>) => (import('webpack').Configuration)[]} */
const makeConfig = () => [
  {
    devtool: 'source-map',

    entry: {
      index: './src/index.js',
      userScript: {
        import: './src/userScript.js',
        filename: 'webOSUserScripts/[name].js'
      }
    },

    resolve: {
      extensions: ['.mjs', '.cjs', '.js', '.json']
    },

    performance : {
      hints : false
    },

    module: {
      rules: [
        {
          test: /\.[mc]?js$/i,

          loader: 'babel-loader',
          exclude: [
            // Some module should not be transpiled by Babel
            // See https://github.com/zloirock/core-js/issues/743#issuecomment-572074215
            // \\ for Windows, / for macOS and Linux
            /node_modules[\\/]core-js/,
            /node_modules[\\/]webpack[\\/]buildin/
          ],
          options: {
            cacheDirectory: true
          },
          resolve: {
            // File extension DOESN'T MATTER in a bundler.
            fullySpecified: false
          }
        },
        {
          test: /\.css$/i,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { esModule: false } }
          ]
        }
      ]
    },

    plugins: [
      new CopyPlugin({
        patterns: [
          { context: 'assets', from: '**/*' },
          { context: 'src', from: 'index.html' }
        ]
      })
    ]
  }
];

export default makeConfig;
