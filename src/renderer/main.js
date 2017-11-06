import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

export const SocketInstance = socketio('http://socket.coincap.io')
Vue.use(VueSocketIO, SocketInstance)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
