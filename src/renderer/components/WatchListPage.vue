<template>
  <div class="section">

    <the-hero :page-title="pageTitle"></the-hero>

    <section class="tw-container tw-clearfix tw-w-full" v-if="watchedCoins.length">
        <div class="watchlist-card-wrapper" v-for="coin in watchedCoins" :key="coin.market">
            <div :id="coin.market" class="watchlist-card">
                <div class="tw-clearfix">
                    <div class="watchlist-card-thumb">
                        <div class="coin-sprite tw-mt-1 tw-mr-1" :class="coin.symbol"></div>
                        <div :title="coin.symbol" class="tw-text-base tw-float-left"><strong>{{ coin.name }}</strong></div>
                        <div>{{ coin.lastTrade.exchange }}</div>
                    </div>
                    <div class="watchlist-card-details">
                        <p class="tw-text-lg">${{ formatCurrency(coin.lastTrade.details.price) }}</p>
                        <p><strong>24h:</strong>&nbsp;
                            <span
                                :class="{
                                    'has-text-danger': (coin.lastTrade.details.cap24hrChange < 0),
                                    'has-text-success': (coin.lastTrade.details.cap24hrChange > 0),
                                    'has-text-primary': (coin.lastTrade.details.cap24hrChange === 0)
                                }">
                              {{ coin.lastTrade.details.cap24hrChange }}%
                            </span>
                        </p>
                    </div>
                </div>
                <div class="tw-bg-grey-light tw-px-1">
                    <p class="tw-float-right tw-mr-1">{{ coin.lastTrade.timestamp.date }}</p>
                    <p class="tw-float-left tw-ml-1" title="Last trade">{{ coin.lastTrade.timestamp.time }}</p>
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
        }
      }
    },
    methods: {
      removeFilter: function () {
        this.filterStr = ''
      },
      // Determines if the passed symbol/coin is watched
      isWatched: function (symbol) {
        // TODO: revisit this and see if it can be done better than with _.filter, maybe _.find
        return _.filter(this.watchedCoins, _.matches({'symbol': symbol})).length
      },
      formatCurrency: function (amount) {
        return amount.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      }
    },
    computed: {
      trades: function () {
        return store.getters.trades.slice()
      },
      watchedCoins: function () {
        // TODO: change this to getters.watchedCoins later
        // TODO: sort by order
        return store.getters.coins.filter(coin => coin.watch)
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
        // let trades = this.trades
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

        // animate border of specific traded coin
        // const coinId = document.getElementById(newTrade.coin)
        const marketId = document.getElementById(newTrade.market)
        const blueBorderColor = '#3490dc'
        const originalBorderColor = 'rgb(218, 228, 233)'

        // This fixes the "Uncaught Cannot tween a null target" error
        if (marketId) {
          // If this proves to be buggy (stuck blue border), might want to try TimelineLite to create a sequence
          TweenLite.to(marketId, 0, { borderColor: blueBorderColor })
          TweenLite.to(marketId, 2, { borderColor: originalBorderColor })
        }
        // set trades to Vuex
        store.dispatch('setTrade', newTrade)
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
