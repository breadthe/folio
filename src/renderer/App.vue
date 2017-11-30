<template>
    <div id="app" class="ledger">
        <div class="container is-fluid">

            <!--<the-header></the-header>-->

            <div class="tile is-ancestor">
                <div class="tile is-vertical is-parent is-3">
                    <div class="tile is-child">
                        <the-logo :the-version="theVersion"></the-logo>

                        <the-menu></the-menu>
                    </div>
                </div>
                <div class="tile is-parent">
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
  import theLogo from './components/TheLogo.vue'
  import theMenu from './components/TheMenu.vue'
  import store from './store'
  import localStorage from './store/localStorage'

  export default {
    name: 'ledger',
    components: {
      // 'the-header': theHeader,
      // 'the-footer': theFooter
      theLogo,
      theMenu
    },
    data () {
      return {
        theVersion: 'v0.0.11'
      }
    },
    mounted () {
      console.log('app mounted ' + this.theVersion)

      const mapLastSynced = localStorage.mapLastSynced.get()
      const mapData = localStorage.mapData.get()
      const trades = localStorage.trades.get()

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
