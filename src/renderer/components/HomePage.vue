<template>
  <div class="section">
    <section class="container tw-h-screen">

      <h6>Dashboard</h6>

    </section>
  </div>
</template>

<script>
  import store from '../store'
  import TheHero from './TheHero'

  export default {
    name: 'home-page',
    components: { TheHero },
    data: function () {
      return {
        pageTitle: 'Home',
        pageSubTitle: 'Home subtitle',
        map: {
          size: 0,
          lastSynced: '',
          data: {}
        }
      }
    },
    computed: {
      mapSize: {
        get: function () {
          return store.state.Map.mapSize
        },
        set: function (newValue) {
          store.commit('SET_MAP_SIZE', newValue)
        }
      },
      watchedCoinsCount: function () {
        return store.getters.watchedCoins.length
      }
    },
    mounted: function () {
    }
  }
</script>

<style>
  /**/
</style>
