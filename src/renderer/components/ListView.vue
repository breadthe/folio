<template>
    <div class="tw-h-full">

        <table class="table is-fullwidth">
            <thead>
              <tr>
                  <th></th>
                  <th>coin</th>
                  <th>price</th>
                  <th>24h</th>
                  <th>my amount</th>
                  <th>my total USD</th>
                  <!-- <th>settings</th> -->
              </tr>
            </thead>
            <tbody>
                <tr v-for="coin in watchedCoins" :key="coin.market">
                    <td>
                      <div class="coin-sprite tw-mt-1 tw-mr-1" :class="coin.symbol" :title="coin.symbol"></div>
                    </td>
                    <td>
                      {{ coin.name }}
                    </td>
                    <td class="tw-text-right">
                      <div class="coin-price tw-text-lg" v-if="coin.lastTrade" :title="lastTradeString(coin.lastTrade)">${{ formatCurrency(coin.lastTrade.details.price) }}</div>
                      <div class="coin-price tw-text-lg" v-else>$--</div>
                    </td>
                    <td class="tw-text-sm">
                      <span v-if="coin.lastTrade"
                            :class="{
                                'has-text-danger': (coin.lastTrade.details.cap24hrChange < 0),
                                'has-text-success': (coin.lastTrade.details.cap24hrChange > 0),
                                'has-text-primary': (coin.lastTrade.details.cap24hrChange === 0)
                            }">
                          {{ coin.lastTrade.details.cap24hrChange }}%
                        </span>
                    </td>
                    <td class="tw-text-right tw-text-sm">
                      <span v-if="coin.lastTrade && consolidatedWalletAmounts[coin.symbol]">{{ totalAmountBySymbol(coin.symbol) }}</span>
                    </td>
                    <td class="tw-text-right tw-text-sm">
                      <span v-if="coin.lastTrade && consolidatedWalletAmounts[coin.symbol]">${{ formatCurrency(USDValue(totalAmountBySymbol(coin.symbol), coin.lastTrade.details.price)) }}</span>
                    </td>
                    <!-- <td class="tw-text-right">
                      <i class="fa fa-gear edit-quantity" aria-hidden="true" title="Edit quantity" @click="$emit('openQtyModal', coin.market)"></i>
                    </td> -->
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
  import * as functions from '../utils/functions'

  export default {
    name: 'list-view',
    props: ['watchedCoins'],
    methods: {
      totalAmountBySymbol: functions.totalAmountBySymbol,
      formatCurrency: functions.formatCurrency,
      USDValue: function (qty, price) {
        return parseFloat(qty) * parseFloat(price)
      },
      lastTradeString: function (lastTrade) {
        return lastTrade ? lastTrade.exchange + ' | ' + lastTrade.timestamp.date + ' | ' + lastTrade.timestamp.time : ''
      }
    },
    computed: {
      consolidatedWalletAmounts: functions.consolidatedWalletAmounts
    },
    mounted: function () {
    }
  }
</script>

<style>
  /**/
</style>
