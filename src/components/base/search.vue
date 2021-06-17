<template>
  <div>
    <!-- 搜索页 -->

    <div class="header">
      <!-- 返回 -->
      <div class="btn" @click="$router.go(-1)">
        <span class="iconfont icon-arrow-left-bold"></span>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <input
          type="text"
          placeholder="输入"
          @keydown.enter="search($event)"
          @keyup='inputfocus($event)'
          :value="val"
        />
      </div>
      <!-- 清空输入框 -->
      <div class="clear" @click = "remove">
        <span class="iconfont icon-guanbi6"></span>
      </div>
    </div>

    <!-- 内容 -->
    <div class="box">
      <!-- 未输入搜索内容，展示热搜歌曲 -->
      <div class="search_before" v-show = "flag">
        <!-- 热搜歌曲推荐 -->
        <div class="hotlist">
          <h3>热门搜索</h3>
          <span v-for="(item,index) in hots" :key= "index" @click="record($event)">{{item.first}}</span>
        </div>

        <!-- 搜索历史 -->
        <div class="history">
          <h3 class="clearfix">
            搜索历史
            <div class="fr icon" @click="dels">
              <span class="iconfont icon-ashbin"></span>
            </div>
          </h3>
          <!-- 历史记录 -->
          <ul>
            <li v-for="(item,index) in history" :key= "index">
              <div class="searchhistory">
                <span class="icon iconfont icon-history"></span>
                <div>{{item}}</div>
                <span class="icon iconfont icon-guanbi6" @click="del(index)"></span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--输入框已经输入了关键字，按下enter键展示搜索结果，隐藏上面歌曲热搜和历史记录 -->
      <div class="search_list" v-show="!flag">
        <h2>最佳匹配</h2>

        <div class="singer" @click="goto(item.id,'歌手')">
          <div class="img">
            <img :src='sing' alt />
          </div>
          <div class="text" @click="goto(item.id,'歌手')">歌手:{{singname}}</div>
        </div>

        <div class="singer">
          <div class="img">
            <img :src='song' alt />
          </div>
          <div class="text">{{songname}}</div>
        </div>

        <div class="songlist">
          <ul>
            <li v-for="(item,index) in searchList" :key="index + 'only'" @click="playmusic(item.al.picUrl,item.id,item.name,item.ar)">
              <p class="sing">{{item.name}}</p>
              <p class="song">
                <span v-for="(ele,i) in item.ar" :key='i'>{{ele.name}}&nbsp;&nbsp;</span>
              </p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 搜索过程中，还未按下enter键时，展示搜索的历史记录 -->
    <div class="search_ing" v-show="display" @click="record($event)">
    <h2>
        搜索:<span>{{val}}</span>
    </h2>
    <!-- 相同层级遍历的时候 key如果绑定的index值一样会报错 在index后面拼接一个字符串让这个index唯一就可以解决 -->
    <!-- 歌曲渲染 -->
    <div class="item item_songs" v-for="(item,index) in songs" :key="index+'a'">
        <span class="iconfont icon-search"></span>
        歌曲:{{item.name}}
    </div>
    <!-- 歌手渲染 -->
    <div class="item item_songs" v-for="(item,index) in artists" :key="index+'b'">
        <span class="iconfont icon-search"></span>
        歌手:{{item.name}}
    </div>
    <!-- 推荐渲染 -->
    <div class="item item_songs" v-for="(item,index) in playlists" :key="index+'c'">
        <span class="iconfont icon-search"></span>
        推荐:{{item.name}}
    </div>
      </div>

    </div>
  </div>
</template>
<script>
import { getHotSearch, getSearch, getSuggest } from "../../api/search";

export default {
  name: "search",
  data() {
    return {
      flag: true,
      display: false,
      hots: {},
      history:[],
      searchList: {},
      artists: "",
      playlists: [],
      songs: [],
      val: "",
      sing: "",
      song:"",
      singname: "",
      singid: "",
      songname: "",
      timer: null
    };
  },
  methods: {
    // 路由传入id
    goto(id,title){
      this.$router.push({path:'/songlist',query:{id,title}})
    },
    // 删除所有历史记录
    dels(){
      this.history =[];
    },

    // 删除下标的历史记录
    del(index){
      this.history.splice(index,1);
    },
    //记录历史记录
    record(event){
      // console.log(event.target.innerText);
      this.history.push(event.target.innerText);
      this.val=event.target.innerText;
      this.flag=false;
      this.display=false;
      this.getSearchFun(event.target.innerText);
    },

    // 删除输入框的关键词
    remove(){
      this.val='';
      this.flag=true;
      this.display=false;
    },
    //键盘输入关键字，但未按enter键，将输入的数据发送到getSuggestFun上获取搜索建议   
    inputfocus(event){
        // console.log("键盘松开")
        clearTimeout(this.timer);
        // console.log(event.target.value);
        this.timer =setTimeout(()=>{
            if(event.target.value.length>1){
              // console.log(event.target.value.length);
                this.val =event.target.value;
                this.getSuggestFun(event.target.value);
                if(event.keycode!=13){
                    this.display = true;
                }
            }
        },1000)
        if(event.keycode == 13){
            this.display =false;
        }
    },
    // 输入关键词查询
    search(event) {
      // console.log(event.target.value);
      if (event.target.value) {
        this.flag = false;
        this.display=false;
        this.getSearchFun(event.target.value);
      } else {
        this.flag = true;
      }
    },
    //获取建议
    getSuggestFun(val){
        getSuggest({keywords:val}).then(data=>{
          // console.log(data.result);
          // this.suglist =data.result;
          this.artists=data.result.artists;
          this.playlists=data.result.playlists;
          this.songs=data.result.songs;
        })
    },

    // 获取热歌的数据并渲染
    getHotSearchFun() {
      getHotSearch().then(data => {
        if (data.code == 200) {
          //   console.log(data.result.hots);
          this.hots = data.result.hots;
        }
      });
    },

    // 获取输入框输入数据 将关键词通过getSearch方法发送到url，并接受返回的数据处理
    getSearchFun(val) {
      getSearch({ keywords: val }).then(data => {
        if (data.code == 200) {
          // console.log("suggest", data);
          // this.suglist
          this.searchList = data.result.songs;
          // console.log("搜索后的列表数据", this.searchList);
          this.sing = this.searchList[0].al.picUrl;
          this.song = this.searchList[1].al.picUrl;
          this.singname = this.searchList[0].ar[0].name;
          this.singid = this.searchList[0].ar[0].id;
          this.songname = this.searchList[1].al.name;
        }
      });
    },

    // 存储数据进网页的session缓存
    playmusic(coverImgUrl,id,name,ar){
      let musicData = {
        coverImgUrl,
        id,
        name,
        ar,
        tracks:this.searchList
      }
      // console.log("1",musicData);
      // this.resetSetItem.save(playmusicData);
      this.$store.commit('setmusicData',musicData);
    }
    
  },
  created() {
    this.getHotSearchFun();
  }
};
</script>
<style lang='less'>
.header {
  padding: 0.15625rem 0.234375rem 0.234375rem;
  height: 1.09375rem;
  background-color: #d4473c;
  display: flex;
  .search {
    flex: 1;
    font-size: 0.46875rem;
    padding: 0.234375rem 0.3125rem;
    input {
      width: 100%;
      height: 0.625rem;
      font-size: 0.46875rem;
      margin-top: 0.002344rem;
      background-color: transparent;
      border: none;
      color: #fff;
      border-bottom: 2px solid #e7c5c2;
    }
  }

  .btn {
    flex: 0 0 0.46875rem;
    font-size: 0.46875rem;
    padding: 0.234375rem 0;
    span {
      display: block;
      height: 0.625rem;
      font-size: 0.625rem;
      margin-top: 0.002344rem;
    }
  }
  .clear {
    flex: 0 0 0.46875rem;
    font-size: 0.46875rem;
    padding: 0.234375rem 0;
    span {
      display: block;
      height: 0.625rem;
      font-size: 0.390625rem;
      margin-top: 0.203125rem;
    }
  }
}
.box {
  position: relative;
  padding: 10px 3% 0;
  width: 94%;
  min-height: 300px;
  .search_before {
    width: 100%;
    padding-top: 0.15625rem;
    padding-left: 0.15625rem;
    min-height: 200px;
    .hotlist {
      h3 {
        font-size: 0.3125rem;
        height: 0.3125rem;
        line-height: 0.3125rem;
        color: #9d9e9e;
        font-weight: normal;
        margin-bottom: 0.3125rem;
        .icon {
          width: 25px;
          height: 25px;
        }
      }
      span {
        display: inline-block;
        padding: 0.15625rem;
        font-size: 0.3125rem;
        color: #666666;
        border: 1px solid #cfcfcf;
        border-radius: 0.15625rem;
        margin: 0 0.3125rem 0.3125rem 0;
      }
    }

    .history {
      h3 {
        font-size: 0.3125rem;
        height: 0.3125rem;
        line-height: 0.3125rem;
        color: #9d9e9e;
        font-weight: normal;
        margin-bottom: 0.3125rem;
        .icon {
          width: 0.390625rem;
          height: 0.390625rem;
          background-size: 80%;
          span {
            display: block;
            font-size: 25px;
            color: #5e5f5f;
          }
        }
      }

      ul {
        li {
          height: 0.59375rem;
          //   color: #666666;
          .searchhistory {
            display: flex;

            span {
              width: 0.390625rem;
              height: 0.390625rem;
              margin: 0.15625rem 0;
              &.icon {
                flex: 0 0 0.390625rem;
                color: #9d9e9e;
                height: 0.390625rem;
                // margin-top: 0.078125rem;
                font-size: 0.390625rem;
              }
            }
            div {
              flex: 1;
              height: 0.703125rem;
              line-height: 0.703125rem;
              text-indent: 1em;
              color: #5e5f5f;

              // font-size: 0.3125rem;
              // span{
              //     height: .390625rem;
              //     line-height: .390625rem;
              // }
            }
          }
        }
      }
    }
  }
  .search_list {
    h2 {
      padding: 0.234375rem;
      font-size: 0.3125rem;
      color: #d4473c;
      font-weight: none;
    }
    .singer {
      display: flex;
      padding: 0.171875rem 0;
      border-bottom: 1px solid #e2e3e3;
      img {
        flex: 0 0 1.21875rem;
        height: 1.21875rem;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .text {
        flex: 1;
        font-size: 0.34375rem;
        padding-left: 0.3125rem;
        line-height: 1.21875rem;
      }
    }
    .songlist {
      ul {
        li {
          padding: 0.15625rem 0;
          border-bottom: 1px solid #e2e3e3;
          .sing {
            height: 38px;
            line-height: 38px;
            font-size: 0.34375rem;
            color: #545454;
          }
          .song {
            height: 38px;
            line-height: 38px;
            font-size: 0.3125rem;
            color: #989898;
          }
        }
      }
    }
  }

  .search_ing {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 600px;
    z-index: 999;
    background-color: #fff;
    h2 {
      height: 50px;
      line-height: 50px;
      color: #507daf;
      font-size: 15px;
      font-weight: normal;
      padding-left: 10px;
    }
    .item {
      height: 45px;
      line-height: 45px;
      font-size: 15px;
      color: #444;
      padding-left: 10px;
    }
  }
}
</style>