<template>
  <div class="section">
    <section class="container">
      <h1>Settings</h1>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'settings-page',
    components: { },
    data: function () {
      return {
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