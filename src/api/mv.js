import request  from "./http";

// 获取mv
export function getMvlist(params){
    return request({
        url:"mv/exclusive/rcmd",
        method:"get",
        params
    })
}

export function getMvUrl(params){
    return request({
        url:"mv/url",
        method:"get",
        params
    })
}