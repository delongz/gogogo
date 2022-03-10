// 配置路由

// 引入Vue
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入配置项
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

Vue.use(VueRouter)

// 重写push和replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

export default new VueRouter({
    routes: [{
            path: '/home',
            name: 'home',
            component: Home,
            meta: { show: true }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        // 重定向，当页面在/的时候，自动跳往home
        {
            path: '*',
            redirect: '/home'
        }
    ]
})