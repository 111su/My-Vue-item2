<template>
  <!-- 2 -->
  <div class="rank">
    <div>
      <div class="list">
        <div class="item" v-for="(item, index) in toplists" :key="index">
          <router-link :to="'/rank/ranklist?id='+item.id">
            <span>
              <img :src="item.coverImgUrl" />
            </span>
            <ul>
              <li v-for="(key, i) in item.getTopListsDetail" :key="i">
                {{ i + 1 }}. {{ key.name }} -- {{ key.ar[0].name }}
              </li>
            </ul>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopLists, getTopListsDetail } from "../api/rege";
export default {
  data() {
    return {
      toplists: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    getTopLists({ limit: 10 }).then((data) => {
      next((vm) => vm.getTopListsDetailFun(data.list));
    });
  },
  methods: {
    getTopListsDetailFun(toplistsData) {
      this.toplists = toplistsData;

      for (let item in toplistsData) {
        getTopListsDetail({ id: toplistsData[item].id }).then((data) => {
          if (data.playlist.tracks.length) {
            this.$set(
              this.toplists[item],
              "getTopListsDetail",
              data.playlist.tracks.slice(0, 3)
            );
          }
        });
      }
    },
    add() {
      console.log(this.toplists);
    },
  },
};
</script>

<style lang="less">
.list {
  padding: 15px;
  .item {
    height: 2.40625rem;
    padding: 4px 0;
    border-bottom: 2px solid #e3e4e4;
    position: relative;
    a{
      color: #030006
    }
    span {
      display: block;
      width: 2.40625rem;
      height: 2.40625rem;
      img {
        width: 2.40625rem;
        height: 2.40625rem;
      }
    }
    ul {
      width: calc(100% - 2.40625rem);
      padding-top: .15625rem;
      position: absolute;
      bottom: .09375rem;
      right: 0;
      top: .0625rem;
      // 设置隐藏过多的数据
      overflow: hidden;
      li {
        // 不设置高，否则数据大于3条时出错
        line-height: .749797rem;
        font-size: 0.3125rem;
        text-indent: 30px;
      }
    }
  }
}
</style>
