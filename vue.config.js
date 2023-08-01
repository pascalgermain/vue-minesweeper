const { defineConfig } = require('@vue/cli-service')

const productionMode = process.env.NODE_ENV === 'production'

module.exports = defineConfig({
  publicPath: productionMode ? '/vue-minesweeper' : '/',
  productionSourceMap: false,

  css: {
    loaderOptions: {
      css: {
        modules: {
          auto: true,
          ...(productionMode && { localIdentName: '[hash:base64:5]' }),
        },
      },
    },
  },

  chainWebpack: (config) => {
    ;['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((type) =>
      config.module
        .rule('scss')
        .oneOf(type)
        .use('style-resource')
        .loader('style-resources-loader')
        .options({ patterns: ['src/styles/variables.scss'] }),
    )

    config.plugin('html').tap((args) => {
      args[0].title = 'Vue Minesweeper'
      return args
    })
  },
})
