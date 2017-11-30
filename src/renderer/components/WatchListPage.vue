<template>
  <div class="section">

    <the-hero :page-title="pageTitle"></the-hero>

    <section class="tw-container tw-clearfix tw-w-full" v-if="watchedCoins && trades">
        <div class="watchlist-card-wrapper" v-for="coin in trades" :key="coin.coin">
            <div :id="coin.coin" class="watchlist-card">
                <div class="tw-clearfix">
                    <div class="watchlist-card-thumb">
                        <p :title="coin.details.long" class="tw-text-base"><strong>{{ coin.coin }}</strong></p>
                        <p>{{ coin.exchange }}</p>
                    </div>
                    <div class="watchlist-card-details">
                        <p class="tw-text-lg">${{ coin.details.price.toFixed(2) }}</p>
                        <p><strong>24h:</strong>&nbsp;
                            <span
                                    :class="{
                                        'has-text-danger': (coin.details.cap24hrChange < 0),
                                        'has-text-success': (coin.details.cap24hrChange > 0),
                                        'has-text-primary': (coin.details.cap24hrChange === 0)
                                    }">{{ coin.details.cap24hrChange }}%</span>
                        </p>
                    </div>
                </div>
                <div class="tw-bg-grey-light tw-px-1">
                    <p class="tw-float-right tw-mr-1">{{ coin.timestamp.date }}</p>
                    <p class="tw-float-left tw-ml-1" title="Last trade">{{ coin.timestamp.time }}</p>
                </div>
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
  import { TweenLite } from 'gsap'

  export default {
    name: 'watch-list-page',
    components: { TheHero },
    data: function () {
      return {
        pageTitle: 'Watchlist',
        socketMessage: '',
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
      removeFilter: function () {
        this.filterStr = ''
      }
    },
    computed: {
      trades: function () {
        return store.getters.trades.slice()
      },
      watchedCoins: function () {
        return store.getters.watchedCoins
      }
    },
    sockets: {
      // Fired when the socket connects.
      connect () {
      },
      disconnect () {
      },
      trades (tradeMsg) {
        // get trades from Vuex
        let trades = this.trades
        const date = moment().format('MMMM Do YYYY')
        const time = moment().format('h:mm:ss a')

        const newTrade = {
          timestamp: {
            date: date,
            time: time
          },
          coin: tradeMsg.message.coin,
          market: tradeMsg.market_id,
          exchange: tradeMsg.exchange_id,
          details: tradeMsg.message.msg
        }

        // push only the watched coins
        if (_.find(this.watchedCoins, function (o) { return o.symbol === tradeMsg.message.coin })) {
          const idx = _.findIndex(trades, o => o.coin === tradeMsg.message.coin)

          // if the coin is not yet in the array, insert it
          if (idx === -1) {
            trades.push(newTrade)
          // if the coin is in the array, update the details
          } else {
            trades[idx] = newTrade
          }

          // animate border of specific traded coin
          const coinId = document.getElementById(newTrade.coin)
          const blueBorderColor = '#3490dc'
          const originalBorderColor = 'rgb(218, 228, 233)'

          // If this proves to be buggy (stuck blue border), might want to try TimelineLite to create a sequence
          TweenLite.to(coinId, 0, { borderColor: blueBorderColor })
          TweenLite.to(coinId, 2, { borderColor: originalBorderColor })
        }

        // set trades to Vuex
        store.dispatch('setTrades', trades)
      }
    },
    mounted: function () {
      /**/
      // console.log('watchlist mounted')
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
