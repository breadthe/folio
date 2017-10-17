<template>
    <div id="app">
        <div class="container">

            <!--<the-header></the-header>-->

            <div class="columns">
                <div class="column is-3 is-desktop is-gapless">
                    <the-menu></the-menu>
                </div>
                <div class="column">
                    <router-view></router-view>
                </div>
            </div>

            <!--<the-footer></the-footer>-->

        </div>
    </div>
</template>

<script>
  // import TheHeader from './components/TheHeader.vue'
  // import TheFooter from './components/TheFooter.vue'
  import TheMenu from './components/TheMenu.vue'

  export default {
    name: 'ledger',
    components: {
      // 'the-header': TheHeader,
      // 'the-footer': TheFooter
      'the-menu': TheMenu
    }
  }
</script>

<style lang="sass">
    @import "assets/index"
</style>

<style>
  /* CSS */
</style>
