// 路由接口

// 引入配置项(路由懒加载)
// 一级路由
const Home = () =>
    import ('@/pages/Home')
const Search = () =>
    import ('@/pages/Search')
const Login = () =>
    import ('@/pages/Login')
const Register = () =>
    import ('@/pages/Register')
const Detail = () =>
    import ('@/pages/Detail')
const AddCartSuccess = () =>
    import ('@/pages/AddCartSuccess')
const ShopCart = () =>
    import ('@/pages/ShopCart')
const Trade = () =>
    import ('@/pages/Trade')
const Pay = () =>
    import ('@/pages/Pay')
const PaySuccess = () =>
    import ('@/pages/PaySuccess')
const Center = () =>
    import ('@/pages/Center')
    // 二级路由
    // import MyOrder from '@/pages/Center/MyOrder'
const MyOrder = () =>
    import ('@/pages/Center/MyOrder')
    // import GroupOrder from '@/pages/Center/GroupOrder'
const GroupOrder = () =>
    import ('@/pages/Center/GroupOrder')

export default [{
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
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: false }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: false }
    },
    {
        path: '/shopcart',
        name: 'shopcart',
        component: ShopCart,
        meta: { show: false }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: false },
        // 路由独享守卫
        // 当用户登录是也是不能跳转到交易页面的
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                // 表示从哪来回哪去
                next('shopcart')
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: false },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: false },

    },
    {
        path: '/center',
        component: Center,
        meta: { show: false },
        children: [{
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            // 重定向
            {
                path: '/center',
                redirect: 'myOrder'
            }
        ]
    }
]