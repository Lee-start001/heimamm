//  导入  
import Request from '../utilis/rquest.js'

// 获取企业列表信息
export function questionList(data) {

    return Request({
        url: "/question/list",
        method: "get",
        params: data,
    })
}
