<template>
  <div class="section">

    <the-hero :page-title="pageTitle" :page-sub-title="pageSubTitle"></the-hero>

    <div>
        {{ message }}
    </div>

    <nav class="panel">
        <div class="panel-heading">
            <div class="columns level-item">
                <div class="column">
                    <strong>{{ mapSize }}</strong> items
                    <em class="is-size-7" v-if="filteredCount && filteredCount !== mapSize">(showing {{ filteredCount }})</em>
                </div>
                <div class="column is-half">
                    <div class="field has-addons is-pulled-right">
                        <p class="control">
                            <button
                                    @click="syncMap"
                                    class="button"
                                    :class="{ 'is-loading' : button.sync.loading, 'is-disabled' : button.sync.disabled }"
                                    v-html="button.sync.icon + button.sync.label"></button>
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
                <tr v-for="coin in watchedCoins" :key="coin.symbol">
                    <td><input type="checkbox" :checked="coin.watch" @change="toggleWatched(coin.symbol)" title="Watch this coin"></td>
                    <td>{{ coin.symbol }}</td>
                    <td>{{ coin.name }}</td>
                </tr>
                <tr v-for="coin in unwatchedCoins" :key="coin.symbol">
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

  </div>
</template>

<script>
  import moment from 'moment'
  import store from '../store'
  import TheHero from './TheHero'

  export default {
    name: 'coin-map-page',
    components: { TheHero },
    data: function () {
      return {
        pageTitle: 'Coin Map',
        message: '',
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
        this.mapLastSynced = moment().format('MMMM Do YYYY, h:mm:ss a')
      },
      toggleWatched: function (symbol) {
        store.dispatch('toggleWatchFlag', symbol)
      },
      removeFilter: function () {
        this.filterStr = ''
      }
    },
    computed: {
      pageSubTitle () {
        return ('Last synced: ' + (this.mapLastSynced || 'unknown'))
      },
      allCoins: function () {
        return store.getters.allCoins
      },
      watchedCoins: function () {
        const watchedCoins = this.allCoins.filter(coin => coin.watch)
        if (this.filterStr.length) {
          // Regex case sensitive/insensitive depending on the Match Case checkbox
          const params = this.button.filter.matchCase ? 'g' : 'ig'
          const re = new RegExp(this.filterStr, params)
          return watchedCoins.filter(coin => {
            if (typeof coin.name !== 'undefined') {
              return coin.name.match(re) || coin.symbol.match(re)
            } else {
              return coin.symbol.match(re)
            }
          })
        }
        return watchedCoins
      },
      unwatchedCoins: function () {
        const unwatchedCoins = this.allCoins.filter(coin => !coin.watch)
        if (this.filterStr.length) {
          // Regex case sensitive/insensitive depending on the Match Case checkbox
          const params = this.button.filter.matchCase ? 'g' : 'ig'
          const re = new RegExp(this.filterStr, params)
          return unwatchedCoins.filter(coin => {
            if (typeof coin.name !== 'undefined') {
              return coin.name.match(re) || coin.symbol.match(re)
            } else {
              return coin.symbol.match(re)
            }
          })
        }
        return unwatchedCoins
      },
      mapData: {
        get: function () {
          return store.state.Map.mapData
        },
        set: function (newValue) {
          store.dispatch('setMapData', newValue)
        }
      },
      mapSize: {
        get: function () {
          return store.state.Map.mapSize
        },
        set: function () {
          store.dispatch('setMapSize')
        }
      },
      mapLastSynced: {
        get: function () {
          return store.state.Map.mapLastSynced
        },
        set: function (newValue) {
          store.dispatch('setMapLastSynced', newValue)
        }
      },
      filteredCount () {
        return this.watchedCoins.length + this.unwatchedCoins.length
      }
    },
    watch: {
      // Watch for text being entered in the Filter Task box
      filterStr: function () {
        this.button.filter.disabled = !this.filterStr.length
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
