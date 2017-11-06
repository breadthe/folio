<template>
  <div class="section">

    <the-hero :page-title="pageTitle"></the-hero>

    <div>
      <p v-if="isConnected">We're connected to the server!</p>
    </div>

    <section class="section" v-if="watchedCoins">
        <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical" v-for="coin in trades" :key="coin.coin">
                <article class="tile is-child notification is-light">
                    <p class="subtitle" :title="coin.details.long">{{ coin.coin }}</p>
                    <p>${{ coin.details.price }}</p>
                    <p><strong>24h:</strong>&nbsp;
                        <span
                            :class="{
                                'has-text-danger': (coin.details.cap24hrChange < 0),
                                'has-text-success': (coin.details.cap24hrChange > 0),
                                'has-text-primary': (coin.details.cap24hrChange === 0)
                            }">{{ coin.details.cap24hrChange }}%</span>
                    </p>
                    <p>{{ coin.exchange }}</p>
                </article>
            </div>
        </div>
    </section>
    <section class="section" v-else>
        Watchlist is empty
    </section>

  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
  import store from '../store'
  import TheHero from './TheHero'

  export default {
    name: 'watch-list-page',
    components: { TheHero },
    data: function () {
      return {
        pageTitle: 'Watchlist',
        isConnected: false,
        socketMessage: '',
        trades: [],
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
      allCoins: function () {
        return store.getters.allCoins
      },
      watchedCoins: function () {
        return store.getters.watchedCoins
      }
    },
    sockets: {
      // Fired when the socket connects.
      // connect () {
      //   this.isConnected = true
      //   console.log('socket connected')
      // },
      // disconnect () {
      //   this.isConnected = false
      //   console.log('socket disconnected')
      // },
      trades (tradeMsg) {
        // push only the watched coins
        if (_.find(this.watchedCoins, function (o) { return o.symbol === tradeMsg.message.coin })) {
          // if the coin is not yet in the array, insert it
          if (!_.find(this.trades, function (o) { return o.coin === tradeMsg.message.coin })) {
            this.trades.push({
              coin: tradeMsg.message.coin,
              exchange: tradeMsg.exchange_id,
              details: tradeMsg.message.msg
            })
          // if the coin is in the array, update the details
          } else {
            const idx = _.findIndex(this.trades, o => o.coin === tradeMsg.message.coin)
            this.trades[idx].details = tradeMsg.message.msg
            this.trades[idx].exchange = tradeMsg.exchange_id
          }
        }
      }
    },
    mounted: function () {
      /**/
      console.log('watchlist mounted')
      // this.$socket.connect()
      // this.$socket.emit('ping', 'PING')
      // this.$socket.emit('page', 'BTC')
      // this.$socket.onopen(() => {
      //   console.log('opening soecket')
      // })
    }
  }
</script>

<style>
  /**/
</style>
