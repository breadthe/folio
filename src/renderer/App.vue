<template>
    <div id="app">
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

  export default {
    name: 'ledger',
    components: {
      // 'the-header': TheHeader,
      // 'the-footer': TheFooter
      'the-logo': TheLogo,
      'the-menu': TheMenu
    },
    data: function () {
      return {
        theVersion: 'v0.0.2'
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
