<template>
  <div>
    <!-- <div class="null"></div> -->
    <div class="player" v-show="showplayer">
      <div class="button" @click="showplayerFun(false)">
        <span class="iconfont icon-arrow-down-bold"></span>
      </div>
      <div class="title">
        <h2>{{ musicData.name }}</h2>
        <h3>
          <span
            v-for="(item, index) in musicData.ar"
            :key="index"
            v-show="index < 3"
          >
            {{ item.name }}
          </span>
        </h3>
      </div>
      <div class="content clearfix" @click="togglelyric = !togglelyric">
        <div
          v-show="togglelyric == true"
          :class="['img', 'play', { 'pause': iconplay }]"
        >
          <img :src="musicData.coverImgUrl" alt="" />
        </div>

        <div v-show="togglelyric != true" class="lyrics">
          <ul :style="{ 'top': lyricTop }">
            <li
              v-for="(item, index) in lyric"
              :class="{ 'con': currentRow === index }"
              :key="index"
            >
              {{ item.text }}
            </li>
          </ul>
        </div>
      </div>

      <div class="range">
        <div class="bar">
          <span class="timeLeft">{{ timeleft | playertime }}</span>
          <van-slider
            v-model="value"
            @click="sliderchange"
            bar-height="5px"
            active-color="#D4483D"
          >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <span class="timeRight">{{ timeright | playertime }}</span>
        </div>
      </div>

      <div class="buttons">
        <div
          v-if="playerType == 1"
          class="iconfont icon-xunhuan"
          @click="changeMode"
        ></div>
        <div v-else class="iconfont icon-user" @click.stop="changeMode"></div>
        <div class="iconfont icon-zuobofang" @click="startup"></div>
        <div class="iconbutton" @click.stop="toggleplay">
          <span v-if="iconplay" class="iconfont icon-bofang"></span>
          <span v-else class="iconfont icon-yk_fangkuai_fill"></span>
        </div>
        <div class="iconfont icon-youbofang" @click="lowerFun"></div>
        <div class="iconfont icon-ban"></div>
      </div>
    </div>

    <!-- 小播放器 -->
    <div class="mini-player" v-if="'coverImgUrl' in musicData">
      <div class="img" @click="showplayerFun(true)">
        <!-- 加上pause类就暂停旋转 -->
        <img
          :class="['play', { 'pause': iconplay }]"
          :src="musicData.coverImgUrl"
          alt=""
        />
      </div>
      <div class="text">
        <h2>{{ musicData.name }}</h2>
        <h3>
          <span v-for="(item, index) in musicData.ar" :key="index"  v-show="index < 3">
            {{ item.name }}
          </span>
        </h3>
      </div>
      <div class="control" @click.stop="toggleplay">
        <span v-if="iconplay" class="iconfont icon-bofang"></span>
        <span v-else class="iconfont icon-zanting"></span>
      </div>
    </div>
    <!-- controls  是否显示控件 -->
    <audio
      ref="audio"
      controls
      hidden
      :src="musicData.url"
      @canplay="canplayFun"
      @ended="endedFun"
    ></audio>
  </div>
</template>

<script>
import {getSongUrl,getSongLyric} from "../../api/base";
export default {
    data() {
        return {
            iconplay: true,
            musicData: {},
            showplayer:false,
            value:0,
            timeleft:0,
            timeright:0,
            clearset:null,
            playerType:1, //1 列表播放  2 随机播放
            lyric:[],//歌词对象
            currentRow:0,
            lyricTop:"300px",
            togglelyric:true
        }
    },
    watch:{
        musicData:{
            handler:function(){
                getSongUrl({id:this.musicData.id}).then(data=>{
                    this.iconplay = true;
                    this.$set(this.musicData,"url",data.data[0].url);
                    // 计算事件
                })
                // 调用歌词
                this.getSongLyricFun();
            },
            deep:true
        },
        timeleft:function(){
            for(let i = 0;i < this.lyric.length;i++){

                if(parseInt(this.timeleft) == this.lyric[i].time ){
                    this.currentRow = i; //文字选中切换
                    this.lyricTop = 300  - i * 50 +"px";
                    break;
                }
            }
        }
    },
    methods:{
        toggleplay(){
            if(this.iconplay){
                this.$refs.audio.play(); //播放
                clearInterval(this.clearset); //清除定时器
                // 设置定时器
                this.clearset = setInterval(()=>{
                    let currentTime = this.$refs.audio.currentTime
                    let duration = this.$refs.audio.duration;
                    this.timeleft = currentTime;
                    // 计算滑块位置
                    this.value = currentTime / duration * 100;

                    if(this.value == 100){
                        clearInterval(this.clearset);
                        this.$refs.audio.pause(); //暂停
                    }
                },999);
            }else{
                this.$refs.audio.pause(); //暂停
                clearInterval(this.clearset); //清除定时器
            }
            // 按钮切换
            this.iconplay = !this.iconplay;
        },
        showplayerFun(bol){
            this.showplayer = bol;
            
        },
        // 进度条
        sliderchange(){
            let duration = this.$refs.audio.duration * this.value / 100;
            this.timeleft = duration ;//百分比
            this.$refs.audio.currentTime = duration; //修改时间
        },
        // 上一曲
        startup(){
          console.log(this.musicData);
            let {id,tracks} = this.musicData;
            // 返回数组下标
            let index = tracks.findIndex(item=>{
                return item.id  == id;
            })
            index = index-1 < 0 ? tracks.length-1:index-1;
            this.$set(this.musicData,"id",tracks[index].id);
            this.$set(this.musicData,"name",tracks[index].name);
            this.$set(this.musicData,"ar",tracks[index].ar);
        },
        // 下一曲
        lowerFun(){
          console.log(1111)
            let {id,tracks} = this.musicData;
            // 返回数组下标
            console.log(2222)
            let index = tracks.findIndex(item=>{
              console.log(3333)
                return item.id  == id;
            })
            console.log(4444)
            index = index+1 > tracks.length-1 ? 0:index+1;
            console.log(5555)
            this.$set(this.musicData,"id",tracks[index].id);
            console.log(6666)
            this.$set(this.musicData,"name",tracks[index].name);
            console.log(7777)
            this.$set(this.musicData,"ar",tracks[index].ar);
            console.log(8888)

        },
        // 音乐加载完后调用
        canplayFun(){
            this.timeright = this.$refs.audio.duration;
            // this.timeleft = 0;
            this.iconplay = true; //播放
            this.toggleplay();
        },
        // 获取歌词
        getSongLyricFun(){
            this.lyricTop = "300px";
            this.currentRow = 0;
            getSongLyric({id:this.musicData.id}).then(data=>{
                this.formatLyric(data.lrc.lyric);
            })
        },
        // 处理歌词结构
        formatLyric(text){

            this.lyric = [];

            let arr = text.split("\n"); //把原歌曲字符串转数组
            let row = arr.length;//获取数组长度
            for(let i = 0;i < row;i++){
                let temp_row = arr[i];//获取数据"[00:00.000] 作词 : G.E.M.邓紫棋"
                let temp_arr = temp_row.split("]");//分成两个数组
                // [00:00.000      作词 : G.E.M.邓紫棋
                let text = temp_arr.pop();//删除数组最后以为，返回删除数据

                temp_arr.forEach(element=>{
                    let obj = {}
                    let time_arr = element.substr(1, element.length-1).split(":");  //02:00.000 获取时间数据
                    let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //得到当前秒数
                    obj.time = s;
                    obj.text = text;
                    if(text.length >0){
                        this.lyric.push(obj);//每一行处理好数据放入数组
                    }
                })


            }


        },
        // 音乐播放结束
        endedFun(){
            this.iconplay = true;
            this.$refs.audio.play(); //播放
            clearInterval(this.clearset); //清除定时器
            if(this.playerType ==  1){  //列表播放
                this.lowerFun();
                this.iconplay = false; 
            }else{  //随机播放
                let num = parseInt(Math.random() * this.musicData.tracks.length);
                
                let {tracks} = this.musicData;
                this.$set(this.musicData,"id",tracks[num].id);
                this.$set(this.musicData,"name",tracks[num].name);
                this.$set(this.musicData,"ar",tracks[num].ar);
            }
        },
        // 修改类型
        changeMode(){
            this.playerType = this.playerType == 1 ?2:1;
        }
    },
    created(){
        // 获取数据
        window.addEventListener("setItem",()=>{
            this.musicData = this.resetSetItem.fetch();
        })
    },
    filters:{
        playertime(data){
            let m = parseInt(data /60) ; //分钟
            let s = parseInt(data %60) ; //秒
            s = s < 10 ? "0"+ s:s;
            if(m == 0 && s == 0){
                return "0:00";
            }else{
                return m + ":" + s;
            }
        }
    },
    beforeDestroy(){
        // 销毁清除定时器
        clearInterval(this.clearset); //清除定时器
    }
}
</script>

<style lang="less">
.null {
  height: 1.421875rem;
}
.player {
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 10rem;
  height: 100%;
  margin: auto;
  background: #837f7d;
  z-index: 500;
  .button {
    position: absolute;
    top: 0.359375rem;
    left: 0.359375rem;
    font-size: 0.53125rem;
    width: 0.53125rem;
    height: 0.375rem;
    span {
      display: block;
      font-size: 0.53125rem;
      height: 0.53125rem;
      line-height: 0.53125rem;
      color: #fff;
      font-weight: bold;
    }
  }
  .title {
    text-align: center;
    color: #fff;
    h2 {
      font-size: 0.546875rem;
      margin: 0.0625rem 1.5625rem 0 1.5625rem;
    }
    h3 {
      font-size: 0.4375rem;
    }
  }
  .content {
    height: 10.40625rem;
    text-align: center;
    .img {
      float: left;
      margin-top: 2.34375rem;
      width: 100%;
      img {
        display: block;
        width: 7.3125rem;
        height: 7.3125rem;
        border: 0.375rem solid #878381;
        border-radius: 50%;
        background-color: #fff;
        margin: 0 auto;
      }
    }
      .lyrics {
        width: 100%;
        height: 535px;
        position: relative;
        overflow: hidden;
        ul {
          position: absolute;
          width: 100%;
          min-height: 1000px;
          top: 300px;
          left: 0px;
          li {
            width: 100%;
            color: #4f4b49;
            text-align: center;
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            &.con {
              color: #fff;
              font-size: 22px;
            }
          }
        }
      }
    }

  .range {
    text-align: center;
    .bar {
      width: 6.5625rem;
      margin: 0 auto;
      position: relative;
      top: 3.125rem;
      font-size: 0.28125rem;
      color: #fff;
    }
    .timeLeft {
      position: absolute;
      left: -26px;
      bottom: -4px;
      font-size: 0.28125rem;
    }
    .timeRight {
      position: absolute;
      right: -26px;
      bottom: -4px;
      font-size: 0.28125rem;
    }
  }
}
.buttons {
  display: flex;
  margin-top: 3.65625rem;
  .iconfont {
    flex: 1;
    text-align: center;
    font-size: 0.53125rem;
    color: #fff;
    height: 1.03125rem;
    line-height: 1.03125rem;
  }
  .iconbutton {
    flex: 1;
    text-align: center;
    color: #fff;
    height: 1.03125rem;
    .iconfont {
      display: block;
      border: 5px solid #fff;
      border-radius: 50%;
      height: 1.03125rem;
      width: 1.03125rem;
      line-height: 1.03125rem;
      margin: 0 auto;
    }
  }
}

.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 1.421875rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  .img {
    flex: 0 0 1.703125rem;
    img {
      width: 0.984375rem;
      height: 0.984375rem;
      margin: 0.203125rem 0 0 0.46875rem;
      border-radius: 50%;
    }
  }
  .text {
    flex: 1;
    h2 {
      margin-top: 0.34375rem;
      font-size: 0.34375rem;
      color: #3a3c3e;
    }
    h3 {
      font-size: 0.28125rem;
      color: #3a3c3e;
    }
  }
  .control {
    flex: 0 0 0.78125rem;
    margin: 0.3125rem 0.3125rem 0 0;
    span {
      display: block;
      font-size: 0.3125rem;
      width: 0.65625rem;
      height: 0.65625rem;
      line-height: 0.65625rem;
      text-align: center;
      border: 4px solid #646565;
      color: #646565;
      border-radius: 50%;
    }
  }
}

&.play {
  //   旋转20秒   匀速   不重复
  animation: rotate 20s linear infinite;
}
&.pause {
  //停止
  animation-play-state: paused;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.custom-button {
  width: 0.125rem;
  height: 0.125rem;
  color: #837f7d;
  font-size: 0.15625rem;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 50%;
  border: 0.125rem solid #fff;
}
</style>