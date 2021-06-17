<template>
  <div id="app">
    <div id="main">
      <!-- 顶部 -->
      <!-- false显示，否则隐藏 -->
      <header-navs v-if="!$route.meta.headerflag"></header-navs>
      <!-- 视图 -->
      <router-view ></router-view>
      <player-top></player-top>
    </div>
  </div>
</template>
<script>
import headerNavs from '../src/components/base/headerNavs'
import playerTop from '../src/components/base/playerTop'

export default {
  data(){
    return {
      headerflag: true,
      musicData:null
    }
  },
  watch:{
    musicData:function(){
      console.log("watch",this.musicData)
    }
  },
  components: {
    headerNavs,
    playerTop,
    // login
  },
  created(){
    window.addEventListener("setItem",()=>{
      this.musicData = this.resetSetItem.fetch();
    })
  }
  // 方法二
  // watch:{
  //   // newpath,oldpath分别是监听$route上一次和这一次的path内容
  //   "$route":function(newpath,oldpath){
  //     console.log(newpath.path);
  //     console.log(oldpath.path);
    
  //     if(newpath.path == "/recommend/musiclist"){
  //       this.headerflag = false
  //     }else{
  //       this.headerflag = true
  //     }
  //   },
  // }
  // v-if的作用- 多个元素 通过条件判断展示或者隐藏某个元素。或者多个元素
  // 2- 进行两个视图之间的切换  
}
</script>

<style lang="less">
@import "./assets/css/base.css";
html,body,#app {
  width: 100%;
  height: 100%;
  font-size: 1rem;
}
</style>
