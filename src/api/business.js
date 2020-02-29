// //  导入  axios
// import axios from 'axios'

// //  导入token
// import { gettoken } from '../utilis/token.js'

// let businessRequest = axios.create({

//     //  基地址
//     baseURL: process.env.VUE_APP_URL,

//     // 允许携带cookie
//     withCredentials: true

// })

// // 添加请求拦截器
// businessRequest.interceptors.request.use(function (config) {


//     //  给拦截下来的请求报文 添加上token值
//     config.headers.token = gettoken();
//     // 在发送请求之前做些什么
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });


//  导入  
import Request from '../utilis/rquest.js'

// 获取企业列表信息
export function businessList(data) {

    return Request({
        url: "/enterprise/list",
        method: "get",
        params: data,
    })
}

//  改变按钮状态
export function getStatus(id) {

    return Request({
        url: "/enterprise/status",
        method: "post",
        data:{
            id:id
        },
    })
}

//  增加企业
export function businessAdd(data) {

    return Request({
        url: "/enterprise/add",
        method: "post",
        data,
    })
}

//  企业编辑
export function businessEdit(data) {

    return Request({
        url: "/enterprise/edit",
        method: "post",
        data,
    })
}

//  企业删除
export function businessRemove(data) {

    return Request({
        url: "/enterprise/remove",
        method: "post",
        data:{
            id:data
        },
    })
}