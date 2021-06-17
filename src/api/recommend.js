import request  from "./http";


// 获取广告图
export function getBanner(){
    console.log(2);
    return request({
        url:"/banner?type=2",
        method:"get",
    })
}

// 推荐歌单
export function getPersonalized(params){
    return request({
        url:"/personalized",
        method:"get",
        params
    })
}

// 推荐歌单--详情
export function getDetail(params){
    return request({
        url:"playlist/detail",
        method:"get",
        params
    })
}

// 推荐歌单--热门评论
export function getCmtLists(params) {
    return request({
        url: "/comment/playlist?id=705123491",
        method: "get",
        params
    })
}