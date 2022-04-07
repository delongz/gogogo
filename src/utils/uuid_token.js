import { v4 as uuidv4 } from 'uuid'

// 生成一个随机字符串，且每次执行不能发生变化，游客身份持久生成
export const getUUID = () => {
    // 先从本地存储看一下是否有这个游客身份
    let uuid_token = sessionStorage.getItem('UUIDTOKEN')
        // 如果没有新生成一个uuid
    if (!uuid_token) {
        uuid_token = uuidv4()
            // 再存储一下
        sessionStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}