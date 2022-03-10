// home存放数据的小仓库

import { getCategoryList, reqGetBannerList, reqFloorsList } from "@/api"

const state = {
    // 数据中的类型不能瞎写，必须与传过来的一样
    categoryList: [],
    bannerList: [],
    floorsList: []
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    FLOORSLIST(state, floorsList) {
        state.floorsList = floorsList
    }
}
const actions = {
    // 通过api里面的接口函数调用，获取数据
    //  返回的是一个promise对象
    async categoryList({ commit }) {
        let result = await getCategoryList()
        commit('CATEGORYLIST', result)
    },
    // 获取轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code === 200) {
            commit('BANNERLIST', result.data)
        }
    },
    // 获取floors楼梯数据
    async getFloorsList({ commit }) {
        let result = await reqFloorsList()
        commit('FLOORSLIST', result.data)
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