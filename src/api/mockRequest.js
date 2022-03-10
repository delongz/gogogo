// 对axios进行二次封装

// 引入axios
import axios from 'axios'
// 引入nprogress进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建一个axios实例
const requests = axios.create({
    // 基础路径
    baseURL: '/mock',
    //请求超时时间
    timeout: 5000
})

// 创建request请求拦截器，在请求发送之前，拦截器可以检测到，并做一些事情
requests.interceptors.request.use((config) => {
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