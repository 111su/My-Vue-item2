<template>
  <div class="musiclist">
    <div>
      <div class="topheader">
        <div class="img">
          <img :src="playlist.coverImgUrl" alt="" />
        </div>
        <div class="title">
          {{ playlist.name }}
        </div>
        <div class="button" @click="$router.go(-1)">
          <p class="iconfont icon-arrow-left-bold">歌手</p>
        </div>
      </div>
    </div>
    <dl class="musiclist">
      <dt>
        <span class="iconfont icon-bofang1 icon">
          <label style="color: #3a3c3c; font-size: .390625rem; text-indent: 1.3em;">播放全部</label>
          (共{{playlist.tracks.length}}首)
        </span>
      </dt>
      <dd v-for="(item, index) in playlist.tracks" :key="index" @click="playmusic(item.id,item.name,item.ar)">
        <div class="left">{{ index + 1 }}</div>
        <div class="top">{{ item.name }}</div>
        <div class="bottom" v-for="(key, index) in item.ar" :key="index" v-show="index < 3">
          {{ key.name }}&nbsp;&nbsp;
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getDetail } from "../../api/recommend";
export default {
  data() {
    return {
      playlist: {
        tracks: [],
      },
    };
  },
  methods: {
    getDetailFun() {
      let id = this.$route.query.id;
      if (!id) {
        return;
      }
      getDetail({ id:id }).then(data => {
        console.log(data);
        this.playlist = data.playlist;
      })
    },
      playmusic(id,name,ar){
        let playMusicData = {
          tracks:this.playlist.tracks,
          coverImgUrl:this.playlist.coverImgUrl,
          id,
          name,
          ar,
        }
        // 数据存储
        this.resetSetItem.save(playMusicData);
        console.log("play",playMusicData.tracks);
      }
  },
  created() {
    this.getDetailFun();
  },
};
</script>

<style lang="less">
.musiclist {
  border-radius: .1875rem;
  background-color: #fff;
  position: relative;
  top: -0.1875rem;
  height: .953125rem;
  line-height: .953125rem;
  // border-bottom: 1px solid #e2e2e2;
  font-size: .390625rem;
  color: #131615;
  text-indent: 1em;
  min-height: 3.125rem;

  span {
    font-size: .359375rem;
    color: #616262;
    display: flex;
    border-bottom: .015625rem solid #e2e2e2;
  }
  dd {
    height: 1.421875rem;
    line-height: 1.421875rem;
    border-bottom: .015625rem solid #e2e2e2;
    font-weight: normal;
    .left {
      width: 1.21875rem;
      height: 1.421875rem;
      line-height: 1.421875rem;
      float: left;
      font-size: .390625rem;
      color: #3a3c3c;
    }
    .top {
      width: calc(100% - 1.21875rem);
      height: .390625rem;
      line-height: .390625rem;
      color: #3a3c3c;
      float: right;
      margin-top: .28125rem;
      font-size: .390625rem;
      text-indent: 0.4em;
    }
    .bottom {
      height: .3125rem;
      line-height: .3125rem;
      color: #777878;
      float: left;
      margin-top: .078125rem;
      font-size: .3125rem;
      text-indent: 0.5em;
    }
  }
}

.topheader {
  width: 100%;
  height: 7.234375rem;
  position: relative;
  .img {
    width: 100%;
    height: 7.234375rem;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0;
    }
  }
  .title {
    position: absolute;
    left: .5rem;
    bottom: .65625rem;
    font-size: .5rem;
    font-weight: bold;
    color: #fff;
  }
  .button {
    position: absolute;
    left: .5rem;
    top: .5625rem;
    height: .625rem;
    line-height: .625rem;
    font-size: .546875rem;
    p {
      display: block;
      font-size: .546875rem;
      color: #fff;
    }
  }
}
</style>

