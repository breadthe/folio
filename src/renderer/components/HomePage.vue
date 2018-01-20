<template>
  <div class="section">
    <section class="container tw-h-screen">

        <div class="tile is-ancestor">
            <div class="tile is-parent is-6">
                <article class="tile is-child notification is-light">
                    <p class="subtitle">Map</p>
                    <p><strong>{{ mapSize }}</strong> items</p>
                </article>
            </div>
            <div class="tile is-parent is-6">
                <article class="tile is-child notification is-light">
                    <p class="subtitle">Watching</p>
                    <p><strong>{{ watchedCoinsCount }}</strong> items</p>
                </article>
            </div>
        </div>

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
