// 对axios进行二次封装

// 引入axios
import axios from 'axios'
// 引入nprogress进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入仓库store
import store from '@/store'

// 创建一个axios实例
let requests = axios.create({
    // 基础路径
    baseURL: "/api",
    //请求超时时间
    timeout: 5000
})

// 创建request请求拦截器，在请求发送之前，拦截器可以检测到，并做一些事情
requests.interceptors.request.use((config) => {
    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段（userTempId），和后台老师商量好的
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 判断首页是否登录，登录携带token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    // 进度条开始
    nprogress.start();
    // 返回配置对象，有一个配置很重要，Headers请求头
    return config
})

// 创建response响应拦截器，
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    // 响应成功，拦截器检测，并可以做一些事情
    return res.data
}, (error) => {
    return Promise.then(error)
})

export default requests