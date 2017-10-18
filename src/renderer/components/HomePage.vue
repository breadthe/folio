<template>
  <div class="section">
    <section class="container">
        <h1>{{ pageTitle }}</h1>

        <div>
            Map contains <strong>{{ this.map.size }}</strong> items
        </div>

    </section>
  </div>
</template>

<script>
  export default {
    name: 'home-page',
    components: { },
    data: function () {
      return {
        pageTitle: 'Home',
        map: {
          size: 0,
          lastSynced: '',
          data: {}
        }
      }
    },
    mounted: function () {
      // if (localStorage.getItem('mapData')) {
      //   this.map.data = JSON.parse(localStorage.getItem('mapData'))
      // }
      if (localStorage.getItem('mapSize')) {
        this.map.size = localStorage.getItem('mapSize')
      }
      // if (localStorage.getItem('mapLastSynced')) {
      //   this.map.lastSynced = localStorage.getItem('mapLastSynced')
      // }
    }
  }
</script>

<style>
  /**/
</style>
