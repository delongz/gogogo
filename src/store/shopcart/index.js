// 购物车的数据库
import { reqShopCartList, reqDeleteCartById, reqUpdateCartChecked } from "@/api"

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车的数据
    async getCartList({ commit }) {
        let result = await reqShopCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车商品
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return "OK"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 更新购物车商品的勾选状态
    async updatedCartChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCartChecked(skuId, isChecked)
        if (result.code == 200) {
            return "OK"
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    // 删除选中的商品
    deleteIsCheckedCart({ dispatch, getters }) {
        // context相当于小仓库，存储着commit，dispatch，state，getters
        // 获取购物车中所有的商品
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : ''
                // 将每一次返回的promise添加到数组当中
            promiseAll.push(promise)
        });
        // 每一个promise的参数都成功了即为成功，
        // 有一个失败则返回失败结果
        return Promise.all(promiseAll)
    },
    // 全选和不全选
    updateAllCheckCart({ dispatch, state }, change) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updatedCartChecked', { skuId: item.skuId, isChecked: change })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}