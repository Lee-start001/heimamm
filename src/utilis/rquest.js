//  导入  axios
import axios from 'axios'

//  导入token
import { gettoken } from '../utilis/token.js'

let Request = axios.create({

    //  基地址
    baseURL: process.env.VUE_APP_URL,

    //请求头
    // headers: {
    //     token: gettoken()
    // }
})

// 添加请求拦截器
Request.interceptors.request.use(function (config) {


    //  给拦截下来的请求报文 添加上token值
    config.headers.token = gettoken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


export default Request