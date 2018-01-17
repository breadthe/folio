<template>
  <div class="section">
    <section class="container">

        <the-hero :page-title="pageTitle" :page-sub-title="pageSubTitle"></the-hero>

    <section class="tw-container tw-clearfix tw-w-full">
      <h6>Exchanges</h6>
      <ul>
        <li v-for="exchange in exchanges" :key="exchange.name">
          <input type="checkbox" :checked="exchange.watch">
          {{ exchange.name }}
        </li>
      </ul>
    </section>
  
    <section class="tw-container tw-clearfix tw-w-full">
      <h6>Coins</h6>

      <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
          <tr>
              <th><i class="fa fa-eye" aria-hidden="true" title="Watch this coin"></i></th>
              <th>market</th>
              <th>name</th>
          </tr>
          </thead>
          <tbody>
              <tr v-for="coin in watchedCoins" :key="coin.market">
                  <td><input type="checkbox" :checked="coin.watch" @change="toggleWatchedCoin(coin.market)" title="Watch this coin"></td>
                  <td>
                    <div class="coin-sprite" :class="coin.symbol"></div>
                    <span class="tw-ml-4 tw-text-sm">{{ coin.market }}</span>
                  </td>
                  <td>{{ coin.symbol }} {{ coin.name }}</td>
              </tr>
              <tr v-for="coin in unwatchedCoins" :key="coin.market">
                  <td><input type="checkbox" :checked="coin.watch" @change="toggleWatchedCoin(coin.market)" title="Watch this coin"></td>
                  <td>
                    <div class="coin-sprite" :class="coin.symbol"></div>
                    <span class="tw-ml-4 tw-text-sm">{{ coin.market }}</span>
                  </td>
                  <td>{{ coin.name }}</td>
              </tr>
          </tbody>
      </table>

    </section>
  
  </section>
  </div>
</template>

<script>
  import TheHero from './TheHero'
  import store from '../store'
  import _ from 'lodash'

  export default {
    name: 'settings-page',
    components: { TheHero },
    data: function () {
      return {
        pageTitle: 'Settings',
        pageSubTitle: 'Settings',
        message: '',
        filterStr: '',
        button: {
          isLoading: false,
          isDisabled: false
        }
      }
    },
    methods: {
      toggleWatchedExchange: function (name) {
        store.dispatch('toggleWatchedExchange', name)
      },
      toggleWatchedCoin: function (market) {
        store.dispatch('toggleWatchedCoin', market)
      }
    },
    computed: {
      exchanges: function () {
        return store.getters.exchanges
      },
      coins: function () {
        return store.getters.coins
      },
      watchedCoins: function () {
        const watchedCoins = _.sortBy(this.coins.filter(coin => coin.watch), ['symbol'])
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
        const unwatchedCoins = this.coins.filter(coin => !coin.watch)
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
      }
    }
  }
</script>

<style>
  /**/
</style>
