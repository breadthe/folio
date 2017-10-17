import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/HomePage')
    },
    {
      path: '/settings',
      name: 'settings-page',
      component: require('@/components/SettingsPage')
    },
    {
      path: '/about',
      name: 'about-page',
      component: require('@/components/AboutPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
