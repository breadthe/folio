<template>
    <div id="app" class="folio" :class="selectedTheme">

        <div class="columns">
            <div class="column is-narrow">
                <the-menu :the-version="theVersion"></the-menu>
            </div>
            <div class="column is-offset-1 is-offset-2-mobile">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<script>
  import theMenu from './components/TheMenu.vue'
  import store from './store'
  import localStorage from './store/localStorage'
  import _ from 'lodash'

  export default {
    name: 'folio',
    components: {
      theMenu
    },
    data () {
      return {
        theVersion: 'v0.5.2b'
      }
    },
    mounted () {
      console.log('app mounted ' + this.theVersion)

      // Try to find settings in localStorage
      const settings = localStorage.settings.get()
      // If the selected theme is located in the saved settings, set it in Vuex
      if (settings.theme) {
        store.dispatch('setTheme', settings.theme)
      }

      // 1. Read exchanges from localStorage
      // 2. If it exists, update the store
      // 3. If it doesn't, read default exchanges from store, write to localStorage
      // 2 & 3 are done in the store
      const exchanges = localStorage.exchanges.get()
      store.dispatch('setExchanges', exchanges)

      // 1. Read wallets from localStorage
      // 2. If it exists, update the store
      // 3. If it doesn't, read default wallets from store, write to localStorage
      // 2 & 3 are done in the store
      const wallets = localStorage.wallets.get()
      store.dispatch('setWallets', wallets)

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
    },
    computed: {
      selectedTheme: function () {
        return store.getters.theme
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
