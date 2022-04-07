import { reqAddressInfo, reqOrderList } from "@/api"

const state = {
    address: [],
    orderList: {}
}
const mutations = {
    ADDRESSINFO(state, address) {
        state.address = address
    },
    ORDERLIST(state, orderList) {
        state.orderList = orderList
    }
}
const actions = {
    // 用户的地址信息
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('ADDRESSINFO', result.data)
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 商品清单
    async getOrderList({ commit }) {
        let result = await reqOrderList()
        if (result.code == 200) {
            commit('ORDERLIST', result.data)
            return 'OK'
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