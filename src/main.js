import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router'

// 引入store仓库
import store from '@/store'

// 三级联动--全局组件
import TypeNav from '@/components/TypeNav'
// 注册三级联动
// 第一个参数全局组件的名称，第二个参数哪一个组件
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 注册路由，以下k v省略写法
    router,
    // 注册仓库
    store
}).$mount('#app')