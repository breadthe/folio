<template>
  <div class="wallets-wrapper">
    <div v-if="coinWallet.length" v-for="(coinWallet, symbol) in wallets" :key="symbol" class="wallet-wrapper">

        <div class="coin-wallet-header">
          <div class="coin-sprite tw-mt-1" :class="symbol"></div>
          <span class="tw-ml-2 tw-text-lg">{{ symbol }}</span>
          <span class="tw-text-lg tw-float-right" :title="totalAmountByCoin(coinWallet) || ''">{{ formatAmount(totalAmountByCoin(coinWallet) || '') }}</span>
        </div>

        <table class="table is-fullwidth">
          <tbody v-if="coinWallet.length" v-for="wallet in coinWallet" :key="wallet.address">
            <wallet-item :symbol="symbol" :wallet="wallet"></wallet-item>
          </tbody>
        </table>

    </div>
  </div>
</template>

<script>
  import store from '../store'
  import WalletItem from './WalletItem'
  import numeral from 'numeral'
  import * as functions from '../utils/functions'

  export default {
    name: 'wallets-wrapper',
    components: { WalletItem },
    data: function () {
      return {
      }
    },
    methods: {
      totalAmountByCoin: functions.totalAmountByCoin,
      formatAmount: function (amount) {
        return amount ? numeral(amount).format('0[,].[00000000]') : ''
      }
    },
    computed: {
      wallets: function () {
        return store.getters.wallets
      }
    }
  }
</script>

<style>
  /**/
</style>
