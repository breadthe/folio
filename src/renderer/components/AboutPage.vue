<template>
  <div class="section">
    <section class="container">
        <h1>{{ pageTitle }}</h1>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'about-page',
    components: { },
    data: function () {
      return {
        pageTitle: 'About',
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
