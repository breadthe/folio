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
      path: '/coin-map',
      name: 'coin-map-page',
      component: require('@/components/CoinMapPage')
    },
    {
      path: '/news',
      name: 'news-page',
      component: require('@/components/NewsPage')
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
