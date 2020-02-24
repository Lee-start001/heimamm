//  定义一个常量
const TOKEN = 'heimamm'

// 暴露出来  
//  保存token
export function settoken(data) {
    window.localStorage.setItem(TOKEN, data)
}

//  获取token
export function gettoken() {
    return window.localStorage.getItem(TOKEN)
}

//  删除token

export function removetoken() {
    window.localStorage.removetoken(TOKEN)
}