import { reqDetailInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from '@/utils/uuid_token'

const state = {
    goodsInfo: {},
    // 生成一个随机的游客身份，且只能生成一次
    uuid_token: getUUID()
}
const mutations = {
    GOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const actions = {
        // 发送商品信息
        async getGoodsInfo({ commit }, skuId) {
            let result = await reqDetailInfo(skuId)
            if (result.code === 200) {
                commit('GOODSINFO', result.data)
            }
        },
        // 加入购物车，将数据发送给服务器
        // 因为不需要服务器返回数据，所以也就不用写三连环
        async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
            let result = await reqAddOrUpdateShopCart(skuId, skuNum)
                //   判断是否成功
            if (result.code == 200) {
                return "OK"
            } else {
                return Promise.reject(new Error('fail'))
            }
        }
    }
    // 简化写法
const getters = {
    // 手机导航页的简写
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    // 详情信息的简写
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 商品属性选择的简写
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}