
import axios from 'axios'

export function getMsg(data) {
    // 把axios调用后的返回值返回出去了
    
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data,
        withCredentials: true,
    })
}


export function register(data) {
    return axios({
        url: process.env.VUE_APP_URL + '/register',
        method: "post",
        data,
        //  允许携带cookie
        withCredentials: true,
    })
}