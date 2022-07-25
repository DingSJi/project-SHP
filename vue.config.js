module.exports = {
  //关闭eslint
  lintOnSave: false,
  publicPath: './',
  //打包时不要map映射文件（文件大）
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
        //不需要路径重写
      }
    }
  }
}