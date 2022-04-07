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
// 引入elementUI
// import 'element-ui/lib/theme-chalk/index.css';
import { Button, MessageBox, Message } from 'element-ui'
// 全局组件
Vue.component(Button.name, Button);
// 全局事件总线
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

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

// 统一接口API里的全部请求函数
// 统一引入
import * as API from '@/api'

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
import gif from '@/assets/lazy.gif'
// 注册懒加载
Vue.use(VueLazyload, {
    loading: gif
})

// 引入表单验证
import '@/utils/validate'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 全局事件总线$bus
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    // 注册路由，以下k v省略写法
    router,
    // 注册仓库
    store
}).$mount('#app')