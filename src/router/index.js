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

export default new VueRouter({
    routes: [{
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            path: '/search/:keyword',
            name: 'search',
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