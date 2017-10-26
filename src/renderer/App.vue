<template>
    <div id="app" class="ledger">
        <div class="container is-fluid">

            <!--<the-header></the-header>-->

            <div class="tile is-ancestor">
                <div class="tile is-vertical is-parent is-3">
                    <div class="tile is-child">
                        <the-logo :theVersion="theVersion"></the-logo>

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
  // import TheHeader from './components/TheHeader.vue'
  // import TheFooter from './components/TheFooter.vue'
  import TheLogo from './components/TheLogo.vue'
  import TheMenu from './components/TheMenu.vue'
  import store from './store'

  export default {
    name: 'ledger',
    components: {
      // 'the-header': TheHeader,
      // 'the-footer': TheFooter
      'the-logo': TheLogo,
      'the-menu': TheMenu
    },
    data () {
      return {
        theVersion: 'v0.0.6'
      }
    },
    mounted () {
      console.log('app mounted ' + this.theVersion)

      const mapLastSynced = window.localStorage.getItem('mapLastSynced')
      // retrieve map data from localStorage, unserialize it
      const mapData = JSON.parse(window.localStorage.getItem('mapData'))

      // async write map data to Vuex store
      if (mapLastSynced !== null && mapLastSynced.length) {
        store.dispatch('setMapLastSynced', mapLastSynced)
      }
      if (mapData) {
        store.dispatch('setMapData', mapData)
        store.dispatch('setMapSize', mapData.length)
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
