<template>
  <div class="section tw-h-full">
    <!-- <canvas id="piechart" width="200" height="200"></canvas> -->

    <section class="container">

      <pie-chart></pie-chart>

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
  import numeral from 'numeral'
  // import Chart from 'chart.js'
  import { Pie } from 'vue-chartjs'

  export default {
    name: 'home-page',
    extends: Pie,
    data: function () {
      return {
        pageTitle: 'Home',
        pageSubTitle: 'Home subtitle',
        chartData: [12, 19, 3, 5, 2, 3]
      }
    },
    methods: {
      formatCurrency: function (amount) {
        return numeral(amount).format('0[,].00')
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
      const data = {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      }

      this.renderChart(data, [])
      // const ctx = document.getElementById('piechart')
      // // const myChart =
      // /* eslint-disable no-new */
      // const myChart = new Chart(ctx, {
      //   type: 'doughnut',
      //   // data: this.chartData,
      //   data: [12, 19, 3, 5, 2, 3],
      //   options: [],
      //   labels: [
      //     'Red',
      //     'Yellow',
      //     'Blue'
      //   ]
      // })
      // console.log(myChart)
    }
  }
</script>

<style>
  /**/
</style>
