<template>
  <div class="section tw-h-screen">
    <section class="container">

      <h6>About</h6>

    </section>
  </div>
</template>

<script>
  import TheHero from './TheHero'

  export default {
    name: 'about-page',
    components: { TheHero },
    data: function () {
      return {
        pageTitle: 'About',
        pageSubTitle: '',
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
