//  导入  axios
import axios from 'axios'

//  导入token
import { gettoken } from '../utilis/token.js'

let indexRequest = axios.create({

    //  基地址
    baseURL: process.env.VUE_APP_URL,

    //请求头
    // headers: {
    //     token: gettoken()
    // }
})

// 添加请求拦截器
indexRequest.interceptors.request.use(function (config) {


    //  给拦截下来的请求报文 添加上token值
    config.headers.token = gettoken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 获取用户登录信息

export function info() {

    return indexRequest({
        url: "/info",
        method: "get"
    })
}


//  退出请求  
export function logout() {
    return indexRequest({
        url: "/logout",
        method: "get"
    })
}