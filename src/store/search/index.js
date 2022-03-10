// search存放数据的小仓库

// 导入req请求
import { reqGetSearchInfo } from "@/api"

const state = {
    searchInfo: {}
}
const mutations = {
    SEARCHINFO(state, searchInfo) {
        state.searchInfo = searchInfo
    }
}
const actions = {
        async getSearchInfo({ commit }, params = {}) {
            let result = await reqGetSearchInfo(params)
            if (result.code == 200) {
                commit('SEARCHINFO', result.data)
            }
        }
    }
    // 计算属性，用于简化数据展示
const getters = {
    goodsList(state) {
        // 当网络较慢时，不能显示undefined，而是一个空数组
        return state.searchInfo.goodsList || []
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || []
    },
    attrsList(state) {
        return state.searchInfo.attrsList || []
    },
    totals(state) {
        return state.searchInfo.total
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}