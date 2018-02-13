<template>
  <div class="wallets-wrapper">
    <div v-if="coinWallet.length" v-for="(coinWallet, symbol) in wallets" :key="symbol" class="wallet-wrapper">

        <div class="coin-wallet-header">
          <div class="coin-sprite tw-mt-1" :class="symbol"></div>
          <span class="tw-ml-2 tw-text-lg">{{ symbol }}</span>
        </div>

        <table class="table is-fullwidth">
            <!-- <thead>
              <tr>
                  <th colspan="5" class="tw-text-right">
                    $total_USD_value
                    <p class="tw-text-right"><span class="tw-text-xl">${{ formatCurrency(portfolioSummary.totalUSDValue) }}</span></p>
                  </th>
              </tr>
            </thead> -->
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

  export default {
    name: 'wallets-wrapper',
    components: { WalletItem },
    data: function () {
      return {
      }
    },
    methods: {
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
