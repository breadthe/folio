<template>
  <div class="section">
    <section class="container">
      <h1>{{ pageTitle }}</h1>

        <button
                @click="syncMap"
                class="button"
                :class="{ 'is-loading' : button.sync.loading, 'is-disabled' : button.sync.disabled }"
                v-html="button.sync.icon + button.sync.label"></button>
      <div>
        Map contains <strong>{{ mapSize }}</strong> items
      </div>
      <div>
        Last synced: {{ mapLastSynced || 'unknown' }}
      </div>
      <div>
        {{ message }}
      </div>

        <nav class="panel">
            <div class="panel-heading">
                <div class="columns level-item">
                    <div class="column">Tasks</div>
                    <div class="column is-half">
                        <div class="field has-addons is-pulled-right">
                            <p class="control">
                                <input class="input" type="text" placeholder="Add a task">
                            </p>
                            <p class="control">
                                <button class="button">butt</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-block">
                <div class="field has-addons">
                    <div class="control has-icons-left">
                        <input class="input is-small" type="text" placeholder="Search" v-model="filterStr" size="30">
                        <span class="icon is-small is-left">
                                <i class="fa fa-search"></i>
                            </span>
                    </div>
                    <div class="control level-item">
                        <button
                                :disabled="button.filter.disabled"
                                class="button is-small"
                                @click="removeFilter"
                                v-html="button.filter.icon"></button>
                        &nbsp;&nbsp;
                        <label class="checkbox">
                            <input v-model="button.filter.matchCase" type="checkbox"><span class="small-font">Match Case</span>
                        </label>
                    </div>
                    <div class="control">
                    </div>
                </div>
            </div>
        </nav>

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
        // button: {
        //   isLoading: false,
        //   isDisabled: false
        // },
        filterStr: '',
        button: {
          sync: {
            label: '&nbsp;&nbsp;Sync',
            icon: `
              <span class="icon is-small">
                  <i class="fa fa-circle-o-notch"></i>
              </span>
            `,
            disabled: false,
            loading: false
          },
          filter: {
            label: '',
            icon: `
              <span class="icon is-small">
                  <i class="fa fa-remove"></i>
              </span>
            `,
            disabled: true,
            matchCase: false
          }
        }
      }
    },
    methods: {
      syncMap: function () {
        // const url = 'http://socket.coincap.io/page/SC'
        const url = 'http://socket.coincap.io/map'
        this.message = 'Getting data'
        this.button.sync.disabled = true
        this.button.sync.loading = true

        this.$http.get(url)
          .then((response) => {
            this.message = 'Finished getting data'
            this.button.sync.disabled = false
            this.button.sync.loading = false

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
      },
      removeFilter: function () {
        this.filterStr = ''
      }
    },
    computed: {
      watchedCoins: function () {
        return store.getters.watchedCoins
      },
      unwatchedCoins: function () {
        return store.getters.unwatchedCoins
      },
      filteredCoins: function () {
        return store.getters.filteredCoins(this.filterStr)
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
    watch: {
      // Watch for text being entered in the Filter Task box
      filterStr: function () {
        this.button.filter.disabled = !this.filterStr.length
        // if (this.filterStr.length) {
        //   this.button.filter.disabled = false
        // } else {
        //   this.button.filter.disabled = true
        // }
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
