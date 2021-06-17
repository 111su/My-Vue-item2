<template>
  <!-- 一定要加空白div包裹 -->
  <div>
    <div class="header center">
        <router-link to="/login" tag="div" class="header-left left iconfont icon-user"></router-link>

        <div class="header-center left">SU-MUSIC</div>

        <router-link to="/search" tag="div" class="header-right left iconfont icon-search"></router-link>
    </div>

    <div class="nav">
      <!-- 要选择的路由           要添加的属性      只有少数文字加span-->
      <router-link to="/recommend" tag="div" class="item left">
        <span>推荐</span>
      </router-link>

      <router-link to="/rank" tag="div" class="item left">
        <span>排行</span>
      </router-link>

      <router-link to="/singer" tag="div" class="item left">
        <span>歌手</span>
      </router-link>

      <router-link to="/newmv" tag="div" class="item left">
        <span>MV</span>
      </router-link>
    </div>
  </div>
</template>

<style lang="less">
// 长度不定义
.header {
  height: 1.3125rem;
  background-color: #d44538;
  display: flex;
  font-size: 0.3125rem;
  line-height: 1.3125rem;
  color: #fff;
  .header-left {
    height: 100%;
    flex: 0 0 1.5625rem;
    font-size: 0.46875rem;
  }
  .header-center {
    height: 100%;
    flex: 1;
    font-weight: bold;
  }
  .header-right {
    height: 100%;
    flex: 0 0 1.5625rem;
    font-size: 0.46875rem;
  }
}
.nav {
  background-color: #d44538;
  font-size: 0.234375rem;
  // 要给它的父元素加才行
  display: flex;
  .item {
    height: 0.625rem;
    flex: 1;
    text-align: center;
    span {
      display: inline-block;
      height: 0.234375rem;
      line-height: 0.234375rem;
      padding-bottom: 0.0625rem;
      margin-top: 0.195313rem;
    }
    &.router-link-active span {
      font-weight: bold;
      color: #fff;
      border-bottom: 0.046875rem solid #fff;
    }
  }
}
</style>