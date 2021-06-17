import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from '../views/recommend.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    name: "recommend",
    component: recommend,
  },
  {
    path: "/recommend/musiclist",
    meta: { //对象
    headerflag: true, //可以设置参数 true显示
    },
    component: () => import('../components/recommend/musiclist.vue')
  },
  {
    path: "/login",
    meta: { //对象
    headerflag: true, //可以设置参数 true显示
    },
    component: () => import('../components/base/login.vue')
  },
  {
    path: "/search",
    meta: { //对象
    headerflag: true, //可以设置参数 true显示
    },
    component: () => import('../components/base/search.vue')
  },
  {
    path: "/singer",
    name: "singer",
    component: () => import('../views/singer.vue')
  },
  {
    path: "/singer/singerlist",
    meta: { 
    headerflag: true, 
    },
    component: () => import('../components/singer/singerlist.vue')
  },
  {
    path: "/rank",
    name: "rank",
    component: () => import('../views/rank.vue')
  },
  {
    path: "/rank/ranklist",
    meta: { 
    headerflag: true, 
    },
    component: () => import('../components/rank/ranklist.vue')
  },
  {
    path: "/newmv",
    name: "newmv",
    component: () => import('../views/newmv.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router