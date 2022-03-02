// api统一管理

import requests from "./request";

// 三级联动接口
//  /api/product/getBaseCategoryList
export const getCategoryList = () => requests({ url: '/api/product/getBaseCategoryList', methods: 'get' })