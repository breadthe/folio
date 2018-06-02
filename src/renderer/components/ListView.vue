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
                  <th>settings</th>
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
                      <span v-if="coin.qty && coin.qty > 0">{{ coin.qty }}</span>
                    </td>
                    <td class="tw-text-right tw-text-sm">
                      <span v-if="coin.qty && coin.qty > 0">${{ formatCurrency(USDValue(coin.qty, coin.lastTrade.details.price)) }}</span>
                    </td>
                    <td class="tw-text-right">
                      <i class="fa fa-gear edit-quantity" aria-hidden="true" title="Edit quantity" @click="openQtyModal(coin.market)"></i>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
  import numeral from 'numeral'

  export default {
    name: 'list-view',
    props: ['watchedCoins'],
    methods: {
      formatCurrency: function (amount) {
        return numeral(amount).format('0[,].00[00]')
      },
      openQtyModal: function (coinMarket) {
        this.$emit('openQtyModal', coinMarket)
      },
      USDValue: function (qty, price) {
        return parseFloat(qty) * parseFloat(price)
      },
      lastTradeString: function (lastTrade) {
        return lastTrade ? lastTrade.exchange + ' | ' + lastTrade.timestamp.date + ' | ' + lastTrade.timestamp.time : ''
      }
    },
    computed: {
    },
    mounted: function () {
    }
  }
</script>

<style>
  /**/
</style>
