// api统一管理

import requests from "./request";
import mockRequest from "./mockRequest"

// 三级联动接口
//  /api/product/getBaseCategoryList
export const getCategoryList = () => requests({ url: '/product/getBaseCategoryList', methods: 'get' })

// banner轮播图的get请求
export const reqGetBannerList = () => mockRequest.get('/banners')

// floors楼梯的get请求
export const reqFloorsList = () => mockRequest.get('/floors')

// search模块的post请求
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// detail的get模块请求
export const reqDetailInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 加入购物车发送请求
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// shopCart的购物车列表信息
export const reqShopCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车中的某一个商品
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 购物车的勾选状态
export const reqUpdateCartChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 用户注册的验证码
export const reqCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 用户注册--携带手机号 密码 验证码
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data: data, method: 'post' })

// 用户登录接口
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

// 登陆后首页获取登录信息
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 商品清单
export const reqOrderList = () => requests({ url: '/order/auth/trade', method: 'get' })

// 确认后提交订单(不用Vuex)
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取订单支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 我的订单列表
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })