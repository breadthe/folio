<template>
  <div class="section tw-h-full">

    <section class="grid tw-w-full" v-if="watchedCoins.length">
        <div class="grid-item watchlist-card-wrapper" v-for="coin in watchedCoins" :key="coin.market">
            <div :id="coin.market" class="watchlist-card">
                <div class="">
                    <div class="watchlist-card-thumb">
                        <div class="coin-sprite tw-mt-1 tw-mr-1" :class="coin.symbol"></div>
                        <div :title="coin.symbol" class="coin-name tw-text-base tw-float-left"><strong>{{ coin.name }}</strong></div>
                        <div v-if="coin.qty && coin.qty > 0" title="My quantity">{{ coin.qty }}</div>
                        <div v-if="coin.lastTrade && coin.qty && coin.qty > 0" title="Total USD value">${{ totalUSD(coin.lastTrade.details.price, coin.qty) }}</div>
                    </div>
                    <div class="watchlist-card-details tw-relative">
                        <div class="coin-price tw-text-lg" v-if="coin.lastTrade">${{ formatCurrency(coin.lastTrade.details.price) }}</div>
                        <div class="coin-price tw-text-lg" v-else>$--</div>

                        <i class="fa fa-gear edit-quantity" aria-hidden="true" title="Edit quantity" @click="openQtyModal(coin.market)"></i>

                        <div v-if="coin.lastTrade">
                            <strong>24h:</strong>&nbsp;
                            <span
                                :class="{
                                    'has-text-danger': (coin.lastTrade.details.cap24hrChange < 0),
                                    'has-text-success': (coin.lastTrade.details.cap24hrChange > 0),
                                    'has-text-primary': (coin.lastTrade.details.cap24hrChange === 0)
                                }">
                              {{ coin.lastTrade.details.cap24hrChange }}%
                            </span>
                        </div>

                    </div>
                </div>
                <div class="last-trade tw-px-1">
                    <div class="tw-float-right tw-mr-1" title="Last trade" v-if="coin.lastTrade">
                      <span>{{ coin.lastTrade.timestamp.date }}</span>
                      &nbsp;
                      <span>{{ coin.lastTrade.timestamp.time }}</span>
                    </div>
                    <div class="tw-float-right tw-mr-1" title="Last trade" v-else>
                      <span>--.--.----</span>
                      &nbsp;
                      <span>--:--:--</span>
                    </div>

                    <div class="tw-float-left tw-ml-1" title="Exchange" v-if="coin.lastTrade">{{ coin.lastTrade.exchange }}</div>
                </div>
            </div>
        </div>
    </section>
    <section class="section" v-else>
        Watchlist is empty
    </section>

    <div class="modal" :class="{'is-active': qtyModal.isOpen}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="coin-sprite tw-mt-1 tw-mr-1" :class="qtyModal.coinSymbol"></div>
          <p class="modal-card-title">{{qtyModal.coinName}}</p>
          <button class="delete" aria-label="close" @click="closeQtyModal"></button>
        </header>
        <section class="modal-card-body">
          <input class="input" type="text" v-model="qtyModal.coinQty" placeholder="Asset quantity">
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveQty">Save</button>
          <button class="button" @click="closeQtyModal">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
  import store from '../store'
  import TheHero from './TheHero'
  import { TweenLite } from 'gsap'
  import Masonry from 'masonry-layout'

  export default {
    name: 'watch-list-page',
    components: { TheHero },
    data: function () {
      return {
        pageTitle: 'Watchlist',
        socketMessage: '',
        message: '',
        filterStr: '',
        qtyModal: {
          isOpen: false,
          coinName: '',
          coinSymbol: '',
          market: '',
          coinQty: 0
        },
        msnry: null
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
      },
      openQtyModal: function (coinMarket) {
        const coin = this.watchedCoins.filter(coin => coin.market === coinMarket)[0]
        this.qtyModal.coinName = coin.name
        this.qtyModal.coinSymbol = coin.symbol
        this.qtyModal.coinQty = coin.qty
        this.qtyModal.market = coin.market
        this.qtyModal.isOpen = !this.qtyModal.isOpen
      },
      saveQty: function () {
        // TODO: validate qty
        store.dispatch('updateQty', {'market': this.qtyModal.market, 'qty': this.qtyModal.coinQty})
        this.closeQtyModal()
      },
      closeQtyModal: function () {
        this.qtyModal.isOpen = false
      },
      totalUSD: function (price, qty) {
        return (price > 0 && qty > 0) ? this.formatCurrency(price * qty) : 0
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
        const originalBorderColorLight = 'rgb(218, 228, 233)' // light theme
        const originalBorderColorDark = 'rgb(0, 0, 0)' // dark theme

        // This fixes the "Uncaught Cannot tween a null target" error
        if (marketId) {
          // If this proves to be buggy (stuck blue border), might want to try TimelineLite to create a sequence
          TweenLite.to(marketId, 0, { borderColor: blueBorderColor })
          TweenLite.to(marketId, 2, { borderColor: store.getters.theme === 'light' ? originalBorderColorLight : originalBorderColorDark })
        }
        // set trades to Vuex
        store.dispatch('setTrade', newTrade)
      }
    },
    mounted: function () {
      // see https://masonry.desandro.com/#initialize-with-vanilla-javascript
      this.msnry = new Masonry('.grid', {
        gutter: 5,
        fitWidth: true
      })
    }
  }
</script>

<style>
  /**/
</style>
