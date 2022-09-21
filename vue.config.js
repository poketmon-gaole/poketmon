const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "포켓몬 가오레 공략 정보";
              return args;
          })
  }  
})
