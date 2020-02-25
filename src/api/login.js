import axios from 'axios'

//  暴露出去  
export function getcode(data){
    return axios({
        url: process.env.VUE_APP_URL + '/login',
        method: 'post',
        data,
        // 允许携带cookie
        withCredentials: true
    })
}

