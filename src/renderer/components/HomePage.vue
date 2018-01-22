<template>
  <div class="section">
    <section class="container tw-h-screen">

      <h6>Dashboard</h6>

      <div>Total USD value: ${{ portfolioSummary.totalUSDValue }}</div>

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
    computed: {
      portfolioSummary: function () {
        // portfolio = coins for which I have an amount > 0
        const portfolio = store.getters.coins.filter(coin => parseFloat(coin.qty) > 0)
        let totalBTCValue = 0
        let totalUSDValue = 0

        portfolio.forEach(function (coin) {
          totalUSDValue += parseFloat(coin.qty) * parseFloat(coin.lastTrade.details.price)
        })
        console.log({
          totalCoinsWatched: portfolio.length,
          totalBTCValue: totalBTCValue,
          totalUSDValue: totalUSDValue
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
