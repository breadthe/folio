import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

import tailwind from 'tailwindcss'
import tailwindcss from '@/assets/tailwind.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

export const SocketInstance = socketio('http://socket.coincap.io')
Vue.use(VueSocketIO, SocketInstance)
SocketInstance.on('connect', function () {
  // SocketInstance.disconnect() // instantly disconnect
  store.dispatch('socket_connect', true)
})
SocketInstance.on('disconnect', function () {
  store.dispatch('socket_connect', false)
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  tailwind,
  tailwindcss,
  template: '<App/>'
}).$mount('#app')
