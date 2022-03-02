// 存放数据的仓库

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'

export default new Vuex.Store({
    // 实现Vuex仓库 模块化 开发存储数据
    modules: {
        home,
        search
    }
})