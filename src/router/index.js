// 配置路由

// 引入Vue
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
// 获取仓库
import store from '@/store'

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

let router = new VueRouter({
    routes,
    // 滚动条返回顶部
    scrollBehavior() {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

//  全局路由守卫
router.beforeEach(async(to, from, next) => {
    next();
    // 获取登录的token
    let token = store.state.user.token
        // 判断是否有token
    if (token) {
        // 有的话就判断不能去登录页面
        if (to.path == '/login') {
            next('/home')
        } else {
            // 如果去其他页面(search/home/detail/AddCart/shopCart)
            // 判断是否登录成功(不能判断userInfo，空对象返回的也是true)
            if (store.state.user.userInfo.name) {
                next()
            } else {
                try {
                    // 如果没有登录，则派发action,获取登陆后展示登录信息
                    await store.dispatch('getUserInfo');
                    // 然后再放行
                    next()
                } catch (error) {
                    // 如果token过期重新派发action，并使用退出登录action
                    await store.dispatch('userLogout');
                    // 重新登录
                    next('/login')
                }
            }
        }
    } else {
        // 没有token没有登录
        // 则不能去订单页面/支付页面
        let toPath = to.path
        if (toPath.indexOf('/center') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/paysuccess') != -1 || toPath.indexOf('/trade') != -1) {
            // 跳转到登录页面
            next('/login?redirect=' + toPath)
        } else {
            // 其他地方放行
            next();
        }
    }

})

export default router