<template>
  <section>

    <table class="table is-fullwidth">
        <!-- <thead>
          <tr>
              <th colspan="5" class="tw-text-right">
                $total_USD_value
                <p class="tw-text-right"><span class="tw-text-xl">${{ formatCurrency(portfolioSummary.totalUSDValue) }}</span></p>
              </th>
          </tr>
        </thead> -->
        <tbody>
            <tr v-if="coinWallet.length" v-for="wallet in coinWallet" :key="wallet.address">
                <td>{{wallet.name}}</td>
                <td><a>{{wallet.address}}</a></td>
                <td class="tw-text-right">{{wallet.amount}}</td>
                <td><a class="add-wallet" @click="editWallet(wallet.address)"><i class="fa fa-pencil-square-o tw-text-blue" aria-hidden="true" title="Add wallet"></i></a></td>
                <td><a class="add-wallet" @click="deleteWallet(wallet.address)"><i class="fa fa-times tw-text-red" aria-hidden="true" title="Add wallet"></i></a></td>
            </tr>
            <tr v-else>
              <td colspan="5">no wallets</td>
            </tr>
        </tbody>
    </table>

  </section>
</template>

<script>
  import store from '../store'
  // import _ from 'lodash'
  import WalletItem from './WalletItem'

  export default {
    name: 'wallet-item',
    components: { WalletItem },
    props: ['symbol', 'coinWallet'],
    data: function () {
      return {
      }
    },
    methods: {
      deleteWallet: function (walletAddress) {
        store.dispatch('deleteWallet', { 'symbol': this.symbol, 'address': walletAddress })
      },
      editWallet: function (walletAddress) {
        console.log(this.symbol, walletAddress)
      }
    },
    computed: {
      // wallets: function () {
      //   return store.getters.coins.filter(c => c.market === this.coinMarket)[0].wallets
      // }
    }
  }
</script>

<style>
  /**/
</style>
