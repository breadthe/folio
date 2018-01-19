<template>
    <div id="app" class="folio">
        <div class="container is-fluid">

            <!--<the-header></the-header>-->

            <div class="columns">
                <div class="column is-2">
                    <the-menu :the-version="theVersion"></the-menu>
                </div>
                <div class="column is-10">
                    <router-view></router-view>
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
  import _ from 'lodash'

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

      // Check if new coins have been added to default coins (find diff)
      const defaultCoins = store.getters.defaultCoins
      defaultCoins.forEach(coin => {
        if (!_.find(coins, {market: coin.market})) {
          // Add the new coins to the existing coins in localStorage
          coins.push(coin)
        }
      })
      store.dispatch('setCoins', coins)

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
