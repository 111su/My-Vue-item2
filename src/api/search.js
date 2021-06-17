import request  from "./http";

export function getSearch(params) {
    return request({
        // url: "/search",
        url: "/cloudsearch",
        method: "get",
        params
    })
}

export function getHotSearch(params) {
    return request({
        url: "/search/hot",
        method: "get",
        params
    })
}

export function getSuggest(params) {
    return request({
        url: "/search/suggest",
        method: "get",
        params
    })
}