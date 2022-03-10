import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router'

// 引入store仓库
import store from '@/store'

// 引入mockServer
import '@/mock/mockServer'

// 引入swiper样式
import 'swiper/css/swiper.css'


// 三级联动--全局组件
import TypeNav from '@/components/TypeNav'
// 注册三级联动
// 第一个参数全局组件的名称，第二个参数哪一个组件
Vue.component(TypeNav.name, TypeNav)

// 注册carousel全局组件(轮播图)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)

// 注册分页器全局组件（pagination）
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 全局事件总线$bus
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    // 注册路由，以下k v省略写法
    router,
    // 注册仓库
    store
}).$mount('#app')