<template>
  <div class="section tw-h-screen">
    <section class="container">

      <pie-chart :data="datacollection.datasets.data" :width="200" :height="200"></pie-chart>
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
  import _ from 'lodash'
  import { Pie } from 'vue-chartjs'

  export default {
    name: 'home-page',
    components: { 'pieChart': Pie },
    extends: Pie,
    data: function () {
      return {
        pageTitle: 'Home',
        pageSubTitle: 'Home subtitle',
        datacollection: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        }
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
      // this.renderChart(this.datacollection.datasets.data, this.datacollection.datasets.options)
      this.renderChart([10, 20], null)
    }
  }
</script>

<style>
  /**/
</style>
