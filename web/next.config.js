const path = require('path')
const withLess = require('next-with-less')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const withPlugins = require('next-compose-plugins')

const nextConfiguration = {
  webpack(config, { defaultLoaders }) {
    config.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
        extensions: ['.ts', '.tsx', '.js', 'svg'],
        logLevel: 'ERROR',
        baseUrl: path.resolve(__dirname, '.'),
        mainFields: ['browser', 'main'],
      }),
    )

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.resolve.alias['axios'] = path.join(__dirname, 'node_modules', 'axios')
    config.resolve.alias['react'] = path.join(__dirname, 'node_modules', 'react')
    config.resolve.alias['faker'] = path.join(__dirname, 'node_modules', 'faker')
    config.resolve.alias['react-dom'] = path.resolve(__dirname, 'node_modules', 'react-dom')
    config.resolve.alias['fuse.js'] = path.join(__dirname, 'node_modules', 'fuse.js')

    config.module.rules.push({
      test: /\.tsx?|\.ts?$/,
      use: [defaultLoaders.babel],
    })

    return config
  },
}

module.exports = async (phase) => withPlugins([withLess], nextConfiguration)(phase, { undefined })
