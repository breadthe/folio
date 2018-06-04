<template>
  <div class="section tw-h-screen">
    <section class="container">

      <div v-if="portfolioSummary.totalCoinsWatched">
        <table class="table is-fullwidth">
            <thead>
              <tr>
                  <th colspan="3">
                    <p class="tw-text-right"><span class="tw-text-xl">${{ formatCurrency(portfolioSummary.totalUSDValue) }}</span></p>
                  </th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="(coinWallet, symbol) in wallets" :key="symbol">
                    <td><div class="coin-sprite tw-mt-1 tw-mr-1" :class="symbol"></div>&nbsp;{{ coinNameFromSymbol(symbol) }}</td>
                    <td>{{ totalAmountByCoin(coinWallet) }}</td>
                    <td class="tw-text-right">
                      ${{ formatCurrency(USDValue(totalAmountByCoin(coinWallet), priceByCoin(symbol))) }}
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

      <div v-else>
        Your portfolio is empty. To see statistics, fill in amounts for your tracked coins.
      </div>

    </section>
  </div>
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
      portfolio: function () {
        const self = this
        const portfolio = store.getters.coins.filter(coin => parseFloat(coin.qty) > 0)
        return _.sortBy(portfolio, function (coin) {
          return self.USDValue(coin.qty, coin.lastTrade.details.price)
        }).reverse()
      },
      portfolioSummary: function () {
        const self = this
        // portfolio = coins for which I have an amount > 0
        const portfolio = this.portfolio
        let totalBTCValue = 0
        let totalUSDValue = 0

        portfolio.forEach(function (coin) {
          totalUSDValue += self.USDValue(coin.qty, coin.lastTrade.details.price)
        })

        return {
          totalCoinsWatched: portfolio.length,
          totalBTCValue: totalBTCValue,
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
