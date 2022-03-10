// 引入mockjs
import Mock from 'mockjs'

// 引入mock数据
import banners from './banners'
import floors from './floors'

Mock.mock('/mock/banners', { code: 200, data: banners })
Mock.mock('/mock/floors', { code: 200, data: floors })