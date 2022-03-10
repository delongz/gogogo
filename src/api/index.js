// api统一管理

import requests from "./request";
import mockRequest from "./mockRequest"

// 三级联动接口
//  /api/product/getBaseCategoryList
export const getCategoryList = () => requests({ url: '/api/product/getBaseCategoryList', methods: 'get' })

// banner轮播图的get请求
export const reqGetBannerList = () => mockRequest.get('/banners')

// floors楼梯的get请求
export const reqFloorsList = () => mockRequest.get('/floors')

// search模块的post请求
export const reqGetSearchInfo = (params) => requests({ url: 'api/list', method: 'post', data: params })