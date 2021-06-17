<template>
    <div>
        <!-- 3 -->
        <!-- 歌手
        http://127.0.0.1:3000/top/artists?limit=100 -->
        <div class="artists">
            <ul class="rightList">
                <li v-for="(item,index) in rightList" :key="index">{{item}}</li>
            </ul>

            <div class="content" ref="leftss">
                <div class="ul">
                    <dl v-for="(item,index) in artistsList" :key="index">
                        <dt>{{item.name}}</dt>
                        <router-link :to="'/singer/singerlist?id='+data.id" tag="dd" v-for="(data,i) in item.data" :key="i">
                            <div class="img">
                                <img :src="data.picUrl" alt="">
                            </div>
                            <p>{{data.name}}</p>
                        </router-link>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core';
import {getArtistLists,getTopArtistLists} from "../api/singer";

export default {
    data() {
        return {
            rightList:["热","A","B","C","D","E","F","G"],
            // artistsList: {
            //     // "A":[]
            // },
            artistsList:[
                // {
                //     name:"A",
                //     data:[]
                // }
            ],
        }
    },

    methods:{
        _initScroll(){
                // 左侧滚动效果初始化
                console.log("22222");
                this.lefts = new BScroll(this.$refs.leftss,{
                    click:true, //点击触发
                    probeType:3, // 深针的效果，时时获取滚动高度
                })
            },
        getTopArtistListsFun(){
            getTopArtistLists({limit:10}).then(data=>{
                // console.log(data);
                this.artistsList.unshift({
                    name:"热",
                    data:data.artists
                })
            })
        },
        getArtistListsFun(){
            for(let key in this.artistsList){
                getArtistLists({type:1,area:96,initial:this.artistsList[key].name,limit:10}).then(data=>{
                    // console.log(data);
                    // this.artistsList[key] = data.artists
                    this.$set(this.artistsList[key],"data",data.artists);
                    // Object.assign(this.artistsList[key],data.artists)
                })
            }
            console.log("----",this.artistsList);
            
        },
        // 初始化对象
        artistsListFun(){
            for(let i = 1;i < this.rightList.length;i++){
                this.artistsList.push({
                    name:this.rightList[i]
                })
            }
            // console.log("----",this.artistsList);
        }
    },
    created(){
        this.artistsListFun(); //数据列表结构
        this.getArtistListsFun();
        this.getTopArtistListsFun();
    },
    mounted() {
        // $nextTick()保证生命周期与视图数据执行完成后，再调用第三方js库
        this.$nextTick(()=>{
            this._initScroll()
        })
    },
};
</script>

<style lang="less">
    .artists{
        position:absolute;
        left:0;
        right:0;
        top:1.9375rem;
        bottom:1.5625rem;
        margin: auto;
        overflow: hidden;
        .rightList{
            position: absolute;
            right: .15625rem;
            top:.46875rem;
            font-size: .28125rem;
            color:#636365;
            text-align: center;
            z-index: 999;
            li{
                margin-bottom: .046875rem;
            }
        }
        .content{
            position: absolute;
            top:0;
            bottom:0;
            width: 100%;
            height: 100%;
            dl{
                padding: .15625rem 10px 0 .15625rem;
                background-color: #F2F3F4;
                dt{
                    height: .5rem;
                    line-height: .5rem;
                    background-color: #DADBDC;
                    color:#fff;
                    text-indent: .234375rem;
                    font-size: .28125rem;
                }
                dd{
                    border-bottom: .015625rem solid #E1E2E3;
                    padding:.0625rem 0;
                    display: flex;
                    .img{
                        flex: 0 0 1.21875rem;
                        height: 1.21875rem;
                        img{
                            width: 100%;
                        }
                    }
                    p{
                        height: 1.21875rem;
                        line-height: 1.21875rem;
                        font-size: .375rem;
                        color:#2E2E35;
                        text-indent: 2em;
                    }
                }
            }
        }
        
    }
</style>