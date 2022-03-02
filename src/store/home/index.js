// home存放数据的小仓库

import { getCategoryList } from "@/api"

const state = {
    // 数据中的类型不能瞎写，必须与传过来的一样
    categoryList: [],
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    }
}
const actions = {
    // 通过api里面的接口函数调用，获取数据
    //  返回的是一个promise对象
    async categoryList({ commit }) {
        let result = await getCategoryList()
        commit('CATEGORYLIST', result)
    }
}
const getters = {}

export default {
    // namespaced: true,
    state,
    actions,
    mutations,
    getters
}