import request  from "./http";


// 获取url
export function getSongUrl(params){
    return request({
        url:"song/url",
        method:"get",
        params
    })
}


// 获取歌词
export function getSongLyric(params){
    return request({
        url:"lyric",
        method:"get",
        params
    })
}

// 获取验证码

export function getCaptcha(params){
    return request({
        url:"captcha/sent",
        method:"get",
        params
    })
}


// 验证验证码

export function getCaptchaVerify(params){
    return request({
        url:"captcha/verify",
        method:"get",
        params
    })
}

