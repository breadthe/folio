<template>
  <section class="section">

    <section class="tw-container tw-clearfix tw-w-full">
      
      <!-- ######## Theme ######## -->
      <h6 class="settings">Theme</h6>
      <div class="select tw-mt-1">
        <select v-model="selectedTheme">
          <option v-for="theme in themes" :key="theme" :selected="theme">{{theme}}</option>
        </select>
      </div>

      <!-- ######## Exchanges ######## -->
      <h6 class="settings">Exchanges</h6>
      <ul>
        <li v-for="exchange in exchanges" :key="exchange.name" class="tw-p-1">
          <input type="checkbox" :checked="exchange.watch" @change="toggleWatchedExchange(exchange.name)" disabled="disabled">
          {{ exchange.name }}
        </li>
      </ul>
    </section>
  
    <!-- ######## Coins ######## -->
    <section class="tw-container tw-clearfix tw-w-full">
      <h6 class="settings">Coins</h6>

      <p>Choose which coins to track. Prices for tracked coins will update in real time as trades happen.</p>
      <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
          <tr>
              <th><i class="fa fa-eye" aria-hidden="true" title="Watch this coin"></i></th>
              <th>name</th>
              <th>market</th>
          </tr>
          </thead>
          <tbody>
              <tr v-for="coin in watchedCoins" :key="coin.market">
                  <td><input type="checkbox" :checked="coin.watch" @change="toggleWatchedCoin(coin.market)" title="Watch this coin"></td>
                  <td>
                    <div class="coin-sprite tw-mt-1" :class="coin.symbol"></div>
                    <span class="tw-ml-2 tw-text-sm">{{ coin.symbol }} {{ coin.name }}</span>
                  </td>
                  <td class="tw-text-sm">{{ coin.market }}</td>
              </tr>
              <tr v-for="coin in unwatchedCoins" :key="coin.market">
                  <td><input type="checkbox" :checked="coin.watch" @change="toggleWatchedCoin(coin.market)" title="Watch this coin"></td>
                  <td>
                    <div class="coin-sprite tw-mt-1" :class="coin.symbol"></div>
                    <span class="tw-ml-2 tw-text-sm">{{ coin.symbol }} {{ coin.name }}</span>
                  </td>
                  <td class="tw-text-sm">{{ coin.market }}</td>
              </tr>
          </tbody>
      </table>

    </section>
  
  </section>
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
        },
        themes: ['light', 'dark']
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
      selectedTheme: {
        get: function () {
          return store.getters.theme
        },
        set: function (theme) {
          store.dispatch('setTheme', theme)
        }
      },
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
