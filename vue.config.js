module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            'src/assets/scss/utils/_variables.scss',
            'src/assets/scss/utils/_mixins.scss'
          ]
        })
        .end()
    })
  }
}