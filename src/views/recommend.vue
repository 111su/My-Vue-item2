<template>
  <!-- 1 -->
  <div class="recommend">
    <div>
      <div class="banner">
        <div class="imgs">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in banners" :key="index">
              <img :src="item.pic" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="remLists">
        <div class="title">推荐</div>
        <div class="content">
          <ul class="clearfix">
            <router-link
              tag="li"
              :to="'/recommend/musiclist?id=' + item.id"
              v-for="(item, index) in personalized"
              :key="index"
            >
              <img :src="item.picUrl" alt="" />
              <span class="remd_lnum">{{ item.playCount | playCountA }}</span>
              <p>{{ item.name }}</p>
            </router-link>
          </ul>
        </div>
      </div>

      <div class="comment">
        <div class="title">热门评论</div>
          <div class="list" v-for="(item,index) in lists" :key="index" >
            <div class="imgs">
              <img :src="item.user.avatarUrl" />
            </div>
            <div class="font">
              <h1>{{item.user.nickname}}</h1>
              <h2>{{item.time}}</h2>
              <h3>{{item.content}}</h3>
              <p >1111<span class="iconfont icon-ban"></span> </p>
            </div>
          </div> 
      </div> 
    </div>
  </div>
</template>

<script>
import { getBanner, getPersonalized , getCmtLists } from "../api/recommend";
export default {
  data() {
    return {
      banners: "",
      personalized: "",
      lists:"",
    };
  },

  methods: {
    getBannerFun() {
      console.log(1);
      getBanner().then((data) => {
        console.log(3);
        if (data.code == 200) {
          this.banners = data.banners;
        }
        console.log("getBannerFun", data);
      });
    },
    getPersonalizedFun() {
      getPersonalized({ limit: 9 }).then((data) => {
        console.log(data);

        this.personalized = data.result;
      });
    },
    getCmtListsFun() {
      getCmtLists({ limit:10}).then((data) =>{
        console.log(data);

        this.lists = data.hotComments;
        console.log(this.lists)
      })
    }
  },
  created() {
    this.getBannerFun();
    this.getPersonalizedFun();
    this.getCmtListsFun();
  },
  filters: {
    playCountA(value) {
      let w = value > 10000 ? value / 10000 : value; // 万计算
      let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万"; //亿计算
      return y;
    },
  },
};
</script>



<style lang="less">
.banner {
  width: 100%;
  height: 3.5625rem;
  background-color: #d4473c;
  min-width: 3.5625rem;
  position: relative;
  .van-swipe__indicator {
    width: 0.3125rem;
    height: 0.3125rem;
  }
  .imgs {
    height: 3.5625rem;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    margin: auto;
    width: 96%;
    background-color: orange;
    border-radius: 8px;
  }
  img {
    width: 100%;
    border-radius: 8px;
  }
}

.remLists {
  .title {
    font-size: 0.34375rem;
    height: 1.5625rem;
    line-height: 1.5625rem;
    font-weight: bold;
    text-indent: 0.5em;
  }
  .content li {
    width: 33.33%;
    float: left;
    position: relative;
    margin-bottom: 0.25rem;
    img {
      display: block;
      width: 3.125rem;
      height: 3.125rem;
      margin: 0 auto;
      border-radius: 3px;
    }
    p {
      font-size: 0.28125rem;
      color: #2f3035;
      height: 0.78125rem;
      overflow: hidden;
      line-height: 0.4375rem;
      padding: 0.15625rem 0.109375rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .remd_lnum {
      position: absolute;
      top: 0px;
      right: 20px;
      font-size: 0.234375rem;
      color: #fff;
    }
  }
}
// 热门评论
.comment {
  .title {
    font-size: 0.34375rem;
    height: .625rem;
    line-height: .625rem;
    font-weight: bold;
    text-indent: 0.5em;
    border-bottom: 2px solid #f5f5f5;
  }
  .list{
    width: 100%;
    min-height: 1.421875rem;
    border-bottom: 2px solid #f5f5f5;
    padding: 0;
    display: flex;
    .imgs{
      display: flex;
      box-sizing: border-box;
      width: 1.046875rem;
      padding-left: .21875rem;
      padding-top: .109375rem;
      img{
        width: .671875rem;
        height: .671875rem;
        border-radius: 50%;
      }
    }
    .font{
      width: 100%;
      position: relative;
      padding-bottom: .1875rem;
      h1{
        display: block;
        font-size: .265625rem;
        height: .265625rem;
        line-height: .265625rem;
        margin-top: .15625rem;
      }
      h2{
        display: block;
        font-size: .234375rem;
        height: .234375rem;
        line-height: .234375rem;
        margin-top: .078125rem;
      }
      h3{
        display: block;
        font-size: .265625rem;
        height: .265625rem;
        line-height: .3125rem;
        margin-top: .09375rem;
        margin-bottom: .21875rem;
      }
      p{
        position: absolute;
        top: .25rem;
        right: .21875rem;
        display: inline-block;
        font-size: .21875rem;
        height: .3125rem;
        line-height: .3125rem;
        span{
          .iconfont{
            font-size: .3125rem;
            margin-left: .046875rem;
          }
        }
      }
    }
  }
}
</style>
