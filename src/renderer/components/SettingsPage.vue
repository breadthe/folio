<template>
  <div class="section">
    <section class="container">

        <the-hero :page-title="pageTitle" :page-sub-title="pageSubTitle"></the-hero>

    </section>
  </div>
</template>

<script>
  import TheHero from './TheHero'

  export default {
    name: 'settings-page',
    components: { TheHero },
    data: function () {
      return {
        pageTitle: 'Settings',
        pageSubTitle: 'Settings',
        message: '',
        button: {
          isLoading: false,
          isDisabled: false
        }
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    computed: {
    }
  }
</script>

<style>
  /**/
</style>
