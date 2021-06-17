<template >
  <div>
    <div class="mvlists" ref="mvlists">
      <ul>
        <li v-for="(item, index) in mvlists" :key="index">
          <div
            class="imgs" :style="{ 'background-image': 'url(' + item.cover + ')'}" v-show="playNum != index" @click="getUrlShow(index,item.id)">
            <span class="iconfont icon-bofang"></span>
            </div>
            <div class="imgs" v-if="playNum == index" @click="mvplayend(event)">
              <video id="video1" @click.stop="canplayfun($event)">
                <source :src="item.mvurl" type="video/mp4">
                <source :src="item.mvurl" type="video/ogg">
              </video>
            </div>
          <p>
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getMvlist,getMvUrl } from "../api/mv";
export default {
  data() {
    return {
      mvlists: [],
      offset: 0, //页码
      fleg: true,
      playNum:null,   //对应视频下标
    };
  },
  methods: {
    getMvlistFun() {
      getMvlist({ limit: 5, offset: this.offset }).then((data) => {
        this.mvlists = data.data;
        console.log(this.mvlists);
      });
    },
    add() {
      // 防抖效果
      if (this.flag) {
        this.flag = false;
        this.offset += 5;
        getMvlist({ limit: 5, offset: this.offset }).then((data) => {
          this.mvlists = this.mvlists.concat(data.data);
          this.flag = true;
        });
      }
    },
    handleScroll() {
      // 滚动条偏移量
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let lis = this.$refs.mvlists.getElementsByTagName("li");
      let num = lis.length;
      let liHeight = lis[num - 3].offsetTop;
      if (scrollTop > liHeight) {
        this.add();
      }
    },
    getUrlShow(index,id){
      this.playNum = index
      getMvUrl({id}).then(data=>{
        // this.mvlists[index].mvurl = data.data.url;
        this.$set(this.mvlists[index],"mvurl",data.data.url);
      })
    },
    mvplay(index){
      this.playNum = index;
    },
    mvplayend(event){
      event.target.pause();
      this.playNum = null;
    },
    canplayfun(event){
        console.log("22222222")
      event.target.play();
    }
  },
  created() {
    //不加数据渲染不了
    this.getMvlistFun();
  },
  mounted(){
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll);
    })
  }
};
</script>

<style lang="less">
.mvlists {
  width: 100%;
  li {
    margin-bottom: 0.15625rem;
    .imgs {
      width: 100%;
      height: 4.6875rem;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      video{
        height: 100%;
        margin: 0 auto;
        display: block;
      }
      span{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 1.25rem;
        height: 1.25rem;
        text-align: center;
        line-height: 1.25rem;
        color: #fff;
        font-size: .5rem;
        background-color: rgba(0,0,0,0.5);
        border-radius: 50%;
      }
    }
    p {
      font-size: 0.375rem;
      text-indent: 1em;
      height: 0.625rem;
      line-height: 0.625rem;
      overflow: hidden;
    }
  }
}
</style>