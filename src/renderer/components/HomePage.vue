<template>
  <div class="section">
    <section class="container">

        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ pageTitle }}
                    </h1>
                    <h2 class="subtitle">
                        Hero subtitle
                    </h2>
                </div>
            </div>
        </section>

        <div class="tile is-ancestor">
            <div class="tile notification is-primary is-6">
                <article class="tile is-child notification is-primary">
                    <p class="title">Map contains</p>
                    <p class="subtitle"><strong>{{ mapSize }}</strong> items</p>
                </article>
            </div>
            <div class="tile">
                <!-- Add content or other tiles -->
            </div>
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
