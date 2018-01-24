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
                <tr v-for="coin in portfolio" :key="coin.market">
                    <td><div class="coin-sprite tw-mt-1 tw-mr-1" :class="coin.symbol"></div>&nbsp;{{ coin.name }}</td>
                    <td>{{ coin.qty }}</td>
                    <td class="tw-text-right">${{ formatCurrency(USDValue(coin.qty, coin.lastTrade.details.price)) }}</td>
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

  export default {
    name: 'home-page',
    data: function () {
      return {
        pageTitle: 'Home',
        pageSubTitle: 'Home subtitle'
      }
    },
    methods: {
      formatCurrency: function (amount) {
        return amount.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      },
      USDValue: function (qty, price) {
        return parseFloat(qty) * parseFloat(price)
      }
    },
    computed: {
      portfolio: function () {
        return store.getters.coins.filter(coin => parseFloat(coin.qty) > 0)
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
