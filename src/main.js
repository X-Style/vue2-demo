import Vue from 'vue'
// import {Button} from 'element-ui'

import App from './App'
import router from './router'
import Mock from '@/api/mock'
import store from './store'
Mock.bootstrap()

import '@/common/stylus/reset.styl'

// Vue.config.productionTip = false

// Vue.use(Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
