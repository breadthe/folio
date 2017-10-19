<template>
  <div class="section">
    <section class="container">
        <h1>{{ pageTitle }}</h1>

        <div>
            Map contains <strong>{{ mapSize }}</strong> items
        </div>

    </section>
  </div>
</template>

<script>
  import store from '../store'

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
    computed: {
      mapSize: {
        get: function () {
          return store.state.Map.mapSize
        },
        set: function (newValue) {
          store.commit('SET_MAP_SIZE', newValue)
        }
      }
    },
    mounted: function () {
    }
  }
</script>

<style>
  /**/
</style>
