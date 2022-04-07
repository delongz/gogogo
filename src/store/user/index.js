// 登录和注册的小仓库
import { reqCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token"

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEARUSER(state) {
        // 清除token
        state.token = '';
        // 清除localStorage的token
        removeToken();
        // 清除user
        state.userInfo = {}
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqCode(phone)
        commit('GETCODE', result.data)
        if (result.code == 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册发送请求
    async sendUserResister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户登录发送请求
    async sendUserLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code) {
            commit("USERLOGIN", result.data.token)
                // 将token持久化
            setToken(result.data.token)
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 登录后首页的登录信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
            // console.log(result.data);
        if (result.code == 200) {
            commit('USERINFO', result.data)
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEARUSER')
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}