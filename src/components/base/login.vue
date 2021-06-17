<template>
    <div>
        <div class="box">
        <img src="../../assets/images/音乐.png" alt="">
        <h1>灵动音乐</h1>
        <h2></h2>
    </div>
    <div class="login">
        <h1>
            <span>登录</span>
            <p @click="getCode">发送验证码</p>
        </h1>
        <div class="phone">
            <input type="text" placeholder="请输入手机号" v-model="phone">
        </div>
        <div class="phone">
            <input type="text" placeholder="请输入登录密码" v-model="captcha">
        </div>
        <span class="btn"  @click="submit">立即登录</span>

    </div>
    </div>
</template>

<script>
import {getCaptcha} from "../../api/base"
import { Notify } from 'vant';
export default {
    data() {
        return {
            phone: "",
            captcha:""
        }
    },
    methods:{
        getCode(){
            let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if(!reg.test(this.phone)){
                Notify({ type: 'warning', message: '请输入正确手机号码' });
               return ; 
            }
            getCaptcha({"phone":this.phone}).then((data)=>{
                if(data.code == 200){
                    Notify({ type: 'success', message: '验证码发送成功' });
                }
            })
        },
        submit(){
            this.$store.commit("setLogin");
            // window.localStorage.setItem("login","true");
            this.$router.push("/recommend")
            // let reg = /^[0-9]{4}$/;
            // if(!reg.test(this.captcha)){
            //     Notify({ type: 'warning', message: '请输入正确验证码' });
            //    return ; 
            // }
            // getCaptchaVerify({"phone":this.phone,"captcha":this.captcha}).then(data=>{
            //     if(data.code == 200){
            //         // Notify({ type: 'success', message: '登录成功' });
            // window.localStorage.setItem("login","true");
            //         this.$store.commit("setLogin");
            //         this.$router.push("/recommend")
            //     }else{
            //         Notify({ type: 'warning', message: '登录失败' });
            //     }

            // })
        }
    }
}
</script>

<style lang="less" scoped>
    .box {
            width: 100%;
            height: 5.078125rem;
            box-sizing: border-box;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            padding-top: .625rem;
            background-color: orange;
        }

        .box img {
            width: 2.03125rem;
            height: 2.03125rem;

        }

        .box h1 {
            width: 100%;
            height: .625rem;
            font-size: .625rem;
            line-height: .625rem;
            color: #fff;
        }

        .box h2 {
            width: 100%;
            background-color: #fff;
            height: .3125rem;
            border-radius: .234375rem .234375rem 0 0;
            margin-bottom: -0.328125rem;
        }

        .login {
            width: 100%;
            height: 7.578125rem;
            background-color: #fff;
            box-sizing: border-box;
            padding: .5rem;
        }

        .login h1 {
            display: block;
            width: 100%;
            height: .78125rem;
            font-size: .78125rem;
            line-height: .78125rem;
            margin-bottom: .703125rem;
        }
        .login h1 p {
            display: block;
            float: right;
            font-size: .25rem;
        }

        .login h1 span {
            display: block;
            width: 50%;
            float: left;
        }

        .login .phone {
            width: 100%;
            height: 1.515625rem;
            border-bottom: .03125rem solid #dedede;
        }

        .login .phone input {
            width: 100%;
            height: 1.515625rem;
            outline: none;
            border: none;
            font-size: 32px;
            line-height: 1.515625rem;
        }

        .login .btn {
            display: block;
            width: 100%;
            height: 1.0625rem;
            margin-top: .9375rem;
            border-radius: .625rem;
            background-color: rgb(214, 180, 117);
            font-size: .546875rem;
            line-height: 1.0625rem;
            text-align: center;
            font-weight: bold;
            color: #fff;
        }
</style>