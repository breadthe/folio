<template>
  <section class="section tw-h-screen">
    <section class="tw-container tw-clearfix tw-w-full">

      <div v-if="portfolioSummary.totalCoinsWatched">
        <table class="table is-fullwidth">
            <thead>
              <tr>
                  <th>
                    <p><span class="tw-text-xl">{{ portfolioSummary.totalCoinsWatched }}</span> coins</p>
                  </th>
                  <th colspan="2">
                    <p class="tw-text-right"><span class="tw-text-xl">${{ formatCurrency(portfolioSummary.totalUSDValue) }}</span></p>
                  </th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(coinWallet, symbol) in wallets" :key="symbol">
                    <td>
                      <div class="coin-sprite tw-mt-1 tw-mr-1" :class="symbol"></div>
                      &nbsp;{{ coinNameFromSymbol(symbol) }}
                    </td>
                    <td>{{ totalAmountByCoin(coinWallet) }}</td>
                    <td class="tw-text-right">
                      ${{ formatCurrency(USDValue(totalAmountByCoin(coinWallet), priceByCoin(symbol))) }}
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

      <div v-else>
        Your portfolio is empty. To see statistics, add some wallets and fill in amounts.
      </div>

    </section>
  </section>
</template>

<script>
  import store from '../store'
  import _ from 'lodash'
  import * as functions from '../utils/functions'

  export default {
    name: 'home-page',
    data: function () {
      return {
        pageTitle: 'Home',
        pageSubTitle: 'Home subtitle'
      }
    },
    methods: {
      totalAmountByCoin: functions.totalAmountByCoin,
      coinNameFromSymbol: functions.coinNameFromSymbol,
      priceByCoin: functions.priceByCoin,
      formatCurrency: functions.formatCurrency,
      USDValue: function (qty, price) {
        return parseFloat(qty) * parseFloat(price)
      }
    },
    computed: {
      wallets: function () {
        return store.getters.wallets
      },
      portfolioSummary: function () {
        const self = this
        let totalCoinsWatched = 0
        let totalUSDValue = 0

        _.forIn(this.wallets, (wallet, symbol) => {
          totalCoinsWatched++
          totalUSDValue += self.USDValue(self.totalAmountByCoin(wallet), self.priceByCoin(symbol))
        })

        return {
          totalCoinsWatched: totalCoinsWatched,
          totalUSDValue: totalUSDValue
        }
      }
    },
    mounted: function () {
    }
  }
</script>

<style>
  /**/
</style>
