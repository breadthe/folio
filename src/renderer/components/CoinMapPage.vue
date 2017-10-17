<template>
  <div class="section">
    <section class="container">
      <h1>{{ pageTitle }}</h1>

      <button @click="syncMap" class="button" :class="{ 'is-loading' : button.isLoading, 'is-disabled' : button.isDisabled }">
        <i class="fa fa-circle-o-notch" aria-hidden="true"></i>&nbsp;Sync
      </button>
      <div>
        Map contains <strong>{{ map.size }}</strong> items
      </div>
      <div>
        Last synced: {{ map.lastSynced || 'unknown' }}
      </div>
      <div>
        {{ message }}
      </div>

        <section v-if="map.size">
            <table class="table is-striped is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th><i class="fa fa-eye" aria-hidden="true" title="Watch this coin"></i></th>
                    <th>symbol</th>
                    <th>name</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="entry in map.data">
                    <td><input type="checkbox" v-model="entry.watch"></td>
                    <td>{{ entry.symbol }}</td>
                    <td>{{ entry.name }}</td>
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
            // this.page.sc = response.data
            this.map.data = response.data
            this.map.data.map(i => { i.watch = false })
            this.map.size = this.mapSize
            this.map.lastSynced = new Date()
            window.localStorage.setItem('mapData', JSON.stringify(this.map.data))
            window.localStorage.setItem('mapSize', this.map.size)
            window.localStorage.setItem('mapLastSynced', this.map.lastSynced)
          })
          .catch((error) => {
            this.message = 'There was an error' + error
          })
      }
    },
    computed: {
      mapSize: function () {
        return _.size(this.map.data)
      }
    },
    mounted: function () {
      // Get map of coins from local storage, if available
      if (localStorage.getItem('mapData')) {
        this.map.data = JSON.parse(localStorage.getItem('mapData'))
      }
      if (localStorage.getItem('mapSize')) {
        this.map.size = localStorage.getItem('mapSize')
      }
      if (localStorage.getItem('mapLastSynced')) {
        this.map.lastSynced = localStorage.getItem('mapLastSynced')
      }
    }
  }
</script>

<style>
  /**/
</style>
