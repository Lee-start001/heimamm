// //  导入  axios
// import axios from 'axios'

// //  导入token
// import { gettoken } from '../utilis/token.js'

// let subjectRequest = axios.create({

//     //  基地址
//     baseURL: process.env.VUE_APP_URL,

//     // 允许携带cookie
//     withCredentials: true

// })

// // 添加请求拦截器
// subjectRequest.interceptors.request.use(function (config) {


//     //  给拦截下来的请求报文 添加上token值
//     config.headers.token = gettoken();
//     // 在发送请求之前做些什么
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });


//   导入 
import Request from '../utilis/rquest.js'
// 获取科目列表信息
export function subjectList(data) {

    return Request({
        url: "/subject/list",
        method:"get",
        params:data,
    })
}

//  改变按钮状态
export function getStatus(id) {

    return Request({
        url: "/subject/status",
        method: "post",
        data:{
            id:id
        },
    })
}

//  增加学科
export function subjectAdd(data) {

    return Request({
        url: "/subject/add",
        method: "post",
        data,
    })
}

//  学科编辑
export function subjectEdit(data) {

    return Request({
        url: "/subject/edit",
        method: "post",
        data,
    })
}

//  学科删除
export function subjectRemove(data) {

    return Request({
        url: "/subject/remove",
        method: "post",
        data:{
            id:data
        },
    })
}