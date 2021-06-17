import Vue from 'vue'
// 要在app.vue前引入
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

import './assets/font/iconfont.css'   //引入图标

import 'vant/lib/index.css'           //引入所有组件
Vue.use(Vant);

import { Swipe, SwipeItem } from 'vant';
import "amfe-flexible"
Vue.use(Swipe);
Vue.use(SwipeItem);

import { Circle } from 'vant';
Vue.use(Circle);

import api from './api/api.js'
Vue.prototype.resetSetItem = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

