//  导入  
import Request from '../utilis/rquest.js'

// 获取企业列表信息
export function userList(data) {

    return Request({
        url: "/user/list",
        method: "get",
        params: data,
    })
}

//  改变按钮状态
export function userStatus(id) {

    return Request({
        url: "/user/status",
        method: "post",
        data:{
            id:id
        },
    })
}

//  增加企业
export function userAdd(data) {

    return Request({
        url: "/user/add",
        method: "post",
        data,
    })
}

//  企业编辑
export function userEdit(data) {

    return Request({
        url: "/user/edit",
        method: "post",
        data,
    })
}

//  企业删除
export function userRemove(data) {

    return Request({
        url: "/user/remove",
        method: "post",
        data:{
            id:data
        },
    })
}