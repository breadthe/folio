<template>
  <div class="wallets-wrapper">
    <div v-if="coinWallet.length" v-for="(coinWallet, symbol) in wallets" :key="symbol" class="wallet-wrapper">

        <div class="coin-wallet-header tw-py-1 tw-px-3">
          <div class="coin-sprite tw-mt-1" :class="symbol"></div>
          <span class="tw-ml-2 tw-text-lg">{{ symbol }}</span>
        </div>

        <wallet-item :symbol="symbol" :coin-wallet="coinWallet"></wallet-item>

    </div>
  </div>
</template>

<script>
  import store from '../store'
  // import _ from 'lodash'
  import WalletItem from './WalletItem'

  export default {
    name: 'wallets-wrapper',
    components: { WalletItem },
    data: function () {
      return {
        // showAddWallet: false,
        // newWallet: {
        //   name: '',
        //   address: '',
        //   amount: 0
        // }
      }
    },
    methods: {
      // openAddWallet: function () {
      //   this.showAddWallet = !this.showAddWallet
      // },
      // saveWallet: function () {
      //   console.log(this.newWallet)
      //   this.showAddWallet = false
      // }
    },
    computed: {
      wallets: function () {
        return store.getters.wallets
      }
      // ,
      // unwatchedCoins: function () {
      //   const unwatchedCoins = this.coins.filter(coin => !coin.watch)
      //   if (this.filterStr.length) {
      //     // Regex case sensitive/insensitive depending on the Match Case checkbox
      //     const params = this.button.filter.matchCase ? 'g' : 'ig'
      //     const re = new RegExp(this.filterStr, params)
      //     return unwatchedCoins.filter(coin => {
      //       if (typeof coin.name !== 'undefined') {
      //         return coin.name.match(re) || coin.symbol.match(re)
      //       } else {
      //         return coin.symbol.match(re)
      //       }
      //     })
      //   }
      //   return unwatchedCoins
      // }
    }
  }
</script>

<style>
  /**/
</style>
