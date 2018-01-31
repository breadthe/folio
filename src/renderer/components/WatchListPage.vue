<template>
  <div class="section tw-h-screen">

    <div class="views-wrapper tw-mb-2">
      <div>
        <a :class="{'active': watchlistView === 'grid'}" @click="changeView('grid')"><i class="fa fa-th-large" aria-hidden="true"></i>
  &nbsp;<span class="tw-text-xl">Grid</span></a>
        <a :class="{'active': watchlistView === 'list'}" @click="changeView('list')"><i class="fa fa-list" aria-hidden="true"></i>
  &nbsp;<span class="tw-text-xl">List</span></a>
      </div>
    </div>

    <section class="tw-container tw-clearfix tw-w-full" v-if="watchedCoins.length">
        <grid-view :watched-coins="watchedCoins" v-if="watchlistView === 'grid'" @openQtyModal="openQtyModal($event)"></grid-view>
        <list-view :watched-coins="watchedCoins" v-if="watchlistView === 'list'" @openQtyModal="openQtyModal($event)"></list-view>
    </section>
    <section class="section" v-else>
        Watchlist is empty
    </section>

    <div class="modal" :class="{'is-active': qtyModal.isOpen}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <div class="coin-sprite tw-mr-2" :class="qtyModal.coinSymbol"></div>
          <p class="modal-card-title">{{qtyModal.coinName}}</p>
          <button class="delete" aria-label="close" @click="closeQtyModal"></button>
        </header>
        <section class="modal-card-body">
          <label class="label">Amount</label>
          <input class="input" type="text" v-model="qtyModal.coinQty" @keyup.enter="saveQty" placeholder="Asset quantity">
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
  import { TweenLite } from 'gsap'
  import GridView from './GridView'
  import ListView from './ListView'

  export default {
    name: 'watch-list-page',
    components: { GridView, ListView },
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
      changeView: function (view) {
        store.commit('SET_VIEW', view)
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
      },
      watchlistView: function () {
        return store.getters.watchlistView
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
          TweenLite.to(marketId, 5, { borderColor: store.getters.theme === 'light' ? originalBorderColorLight : originalBorderColorDark })
        }
        // set trades to Vuex
        store.dispatch('setTrade', newTrade)
      }
    },
    mounted: function () {
      // Close qty window on ESC
      document.addEventListener('keydown', (e) => {
        if (this.qtyModal.isOpen && e.keyCode === 27) {
          this.closeQtyModal()
        }
      })
    }
  }
</script>

<style>
  /**/
</style>
