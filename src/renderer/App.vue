<template>
    <div id="app" class="folio">
        <div class="container is-fluid">

            <!--<the-header></the-header>-->

            <div class="tile is-ancestor">
                <div class="tile is-vertical is-parent">
                    <div class="tile is-child">
                        <the-menu :the-version="theVersion"></the-menu>
                    </div>
                </div>
                <div class="tile is-parent is-9">
                    <div class="tile is-child">
                        <router-view></router-view>
                    </div>
                </div>
            </div>

            <!--<the-footer></the-footer>-->

        </div>
    </div>
</template>

<script>
  // import theHeader from './components/TheHeader.vue'
  // import theFooter from './components/TheFooter.vue'
  import theMenu from './components/TheMenu.vue'
  import store from './store'
  import localStorage from './store/localStorage'
  import deepDiff from 'deep-diff'

  export default {
    name: 'folio',
    components: {
      // 'the-header': theHeader,
      // 'the-footer': theFooter
      theMenu
    },
    data () {
      return {
        theVersion: 'v0.1.0'
      }
    },
    mounted () {
      console.log('app mounted ' + this.theVersion)

      const mapLastSynced = localStorage.mapLastSynced.get()
      const mapData = localStorage.mapData.get()
      const trades = localStorage.trades.get()

      // 1. Read exchanges from localStorage
      // 2. If it exists, update the store
      // 3. If it doesn't, read default exchanges from store, write to localStorage
      // 2 & 3 are done in the store
      const exchanges = localStorage.exchanges.get()
      store.dispatch('setExchanges', exchanges)

      // 1. Read coins from localStorage
      // 2. If it exists, update the store
      // 3. If it doesn't, read default coins from store, write to localStorage
      // 2 & 3 are done in the store
      const coins = localStorage.coins.get()
      const defaultCoins = store.getters.defaultCoins
      const diff = deepDiff(defaultCoins, coins)
      console.log(diff)
      store.dispatch('setCoins', coins)

      // const coins = localStorage.coins.get() || []

      // async write map data to Vuex store
      if (mapLastSynced !== null && mapLastSynced.length) {
        store.dispatch('setMapLastSynced', mapLastSynced)
      }
      if (mapData) {
        store.dispatch('setMapData', mapData)
        store.dispatch('setMapSize', mapData.length)
      }
      if (trades.length) {
        store.dispatch('setTrades', trades)
      }
    }
  }
</script>

<style lang="sass">
    @import "assets/index"
</style>

<style>
  /* CSS */
</style>
