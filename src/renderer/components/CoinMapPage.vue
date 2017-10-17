<template>
  <div class="section">
    <section class="container">
      <h1>{{ pageTitle }}</h1>

      <button @click="clickButton" class="button" :class="{ 'is-loading' : button.isLoading, 'is-disabled' : button.isDisabled }">
        <i class="fa fa-circle-o-notch" aria-hidden="true"></i>&nbsp;Sync
      </button>
      <div>
        Map contains <strong>{{ objSize }}</strong> items
      </div>
      <div>
        Last synched: {{ mapLastSynced || 'unknown' }}
      </div>
      <div>
        {{ message }}
      </div>
      <ul>
        <li v-for="entry in map">
          {{ entry }}
        </li>
      </ul>
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
        mapLastSynced: '',
        map: {},
        page: {
          sc: {}
        }
      }
    },
    methods: {
      clickButton: function () {
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
            this.map = response.data
            localStorage.setItem('map', JSON.stringify(this.map))
            const now = new Date()
            this.mapLastSynched = now
            localStorage.setItem('mapLastSynced', now)
          })
          .catch((error) => {
            this.message = 'There was an error' + error
          })
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    computed: {
      objSize: function () {
        return _.size(this.map)
      }
    },
    mounted: function () {
      // Get map of coins from local storage, if available
      if (localStorage.getItem('map')) {
        this.map = JSON.parse(localStorage.getItem('map'))
      }
      if (localStorage.getItem('mapLastSynced')) {
        this.mapLastSynced = localStorage.getItem('mapLastSynced')
      }
    }
  }
</script>

<style>
  /**/
</style>
