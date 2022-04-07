const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 打包时将map文件去除
    productionSourceMap: false,

    // 关闭eslint
    lintOnSave: false,

    // 代理服务器
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
                // pathRewrite: { '^/api': '' },
            },
        },
    }

})