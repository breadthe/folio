<template>
  <div class="section">
    <section class="container">
      <h1>{{ pageTitle }}</h1>

      <button @click="syncMap" class="button" :class="{ 'is-loading' : button.isLoading, 'is-disabled' : button.isDisabled }">
        <i class="fa fa-circle-o-notch" aria-hidden="true"></i>&nbsp;Sync
      </button>
      <div>
        Map contains <strong>{{ mapSize }}</strong> items
      </div>
      <div>
        Last synced: {{ mapLastSynced || 'unknown' }}
      </div>
      <div>
        {{ message }}
      </div>

        <section v-if="mapSize">
            <table class="table is-striped is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th><i class="fa fa-eye" aria-hidden="true" title="Watch this coin"></i></th>
                    <th>symbol</th>
                    <th>name</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="coin in watchedCoins">
                        <td><input type="checkbox" :checked="coin.watch" @change="toggleWatched(coin.symbol)" title="Watch this coin"></td>
                        <td>{{ coin.symbol }}</td>
                        <td>{{ coin.name }}</td>
                    </tr>
                    <tr v-for="coin in unwatchedCoins">
                        <td><input type="checkbox" :checked="coin.watch" @change="toggleWatched(coin.symbol)" title="Watch this coin"></td>
                        <td>{{ coin.symbol }}</td>
                        <td>{{ coin.name }}</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section v-else>
            <p>The coin map is empty. <a @click="syncMap">Sync now?</a></p>
        </section>

    </section>
  </div>
</template>

<script>
  import _ from 'lodash'
  import store from '../store'

  export default {
    name: 'coin-map-page',
    components: { },
    data: function () {
      return {
        pageTitle: 'Coin Map',
        message: '',
        button: {
          isLoading: false,
          isDisabled: false
        },
        map: {
          size: 0,
          lastSynced: '',
          data: {}
        },
        page: {
          sc: {}
        }
      }
    },
    methods: {
      syncMap: function () {
        // const url = 'http://socket.coincap.io/page/SC'
        const url = 'http://socket.coincap.io/map'
        this.message = 'Getting data'
        this.button = {
          isLoading: true,
          isDisabled: true
        }

        this.$http.get(url)
          .then((response) => {
            this.message = 'Finished getting data'
            this.button = {
              isLoading: false,
              isDisabled: false
            }

            this.saveMapToStore(response.data)
          })
          .catch((error) => {
            this.message = 'There was an error' + error
          })
      },
      saveMapToStore: function (data) {
        data.map(i => { i.watch = false })
        this.mapData = data
        this.mapSize = _.size(data)
        this.mapLastSynced = new Date()
      },
      toggleWatched: function (symbol) {
        store.dispatch('setWatchFlag', symbol)
      }
    },
    computed: {
      watchedCoins: function () {
        return store.getters.watchedCoins
      },
      unwatchedCoins: function () {
        return store.getters.unwatchedCoins
      },
      mapData: {
        get: function () {
          return store.state.Map.mapData
        },
        set: function (newValue) {
          store.commit('SET_MAP_DATA', newValue)
        }
      },
      mapSize: {
        get: function () {
          return store.state.Map.mapSize
        },
        set: function (newValue) {
          store.commit('SET_MAP_SIZE', newValue)
        }
      },
      mapLastSynced: {
        get: function () {
          return store.state.Map.mapLastSynced
        },
        set: function (newValue) {
          store.commit('SET_MAP_LAST_SYNCED', newValue)
        }
      }
    },
    mounted: function () {
      /**/
    }
  }
</script>

<style>
  /**/
</style>
