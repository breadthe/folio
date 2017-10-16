<template>
  <div id="app">
    <the-header></the-header>

    <router-view></router-view>

    <the-footer></the-footer>
  </div>
</template>

<script>
  import TheHeader from './components/TheHeader.vue'
  import TheFooter from './components/TheFooter.vue'

  export default {
    name: 'ledger',
    components: {
      'the-header': TheHeader,
      'the-footer': TheFooter
    }
  }
</script>

<style lang="sass" src="bulma"></style>
<style lang="sass">
  $fa-font-path: '../../node_modules/font-awesome/fonts/'
  @import '../../node_modules/font-awesome/scss/font-awesome'
</style>

<style>
  /* CSS */
</style>
