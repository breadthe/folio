<template>
    <div class="tw-h-full">

        <div class="watchlist-card-wrapper tw-w-1/2 tw-float-left" v-for="coin in watchedCoins" :key="coin.market">
            <div :id="coin.market" class="watchlist-card">

                    <div class="watchlist-card-thumb">
                        <div class="coin-sprite tw-mt-1 tw-mr-2" :class="coin.symbol"></div>
                        <div :title="coin.symbol" class="coin-name tw-text-base tw-float-left"><strong>{{ coin.name }}</strong></div>
                        <div v-if="coin.lastTrade && consolidatedWalletAmounts[coin.symbol]" title="My quantity">{{ totalAmountBySymbol(coin.symbol) }}</div>
                        <div v-if="coin.lastTrade && consolidatedWalletAmounts[coin.symbol]" title="Total USD value">${{ formatCurrency(USDValue(totalAmountBySymbol(coin.symbol), coin.lastTrade.details.price)) }}</div>
                    </div>

                    <div class="watchlist-card-details tw-relative">
                        <div class="coin-price tw-text-lg" v-if="coin.lastTrade" :title="lastTradeString(coin.lastTrade)">${{ formatCurrency(coin.lastTrade.details.price) }}</div>
                        <div class="coin-price tw-text-lg" v-else>$--</div>

                        <!-- <i class="fa fa-gear edit-quantity grid-view" aria-hidden="true" title="Edit quantity" @click="$emit('openQtyModal', coin.market)"></i> -->

                        <div v-if="coin.lastTrade">
                            <strong>24h:</strong>&nbsp;
                            <span
                                :class="{
                                    'has-text-danger': (coin.lastTrade.details.cap24hrChange < 0),
                                    'has-text-success': (coin.lastTrade.details.cap24hrChange > 0),
                                    'has-text-primary': (coin.lastTrade.details.cap24hrChange === 0)
                                }">
                              {{ coin.lastTrade.details.cap24hrChange }}%
                            </span>
                        </div>
                    </div>

            </div>
        </div>

    </div>
</template>

<script>
  import numeral from 'numeral'
  import * as functions from '../utils/functions'

  export default {
    name: 'grid-view',
    props: ['watchedCoins'],
    methods: {
      totalAmountBySymbol: functions.totalAmountBySymbol,
      formatCurrency: function (amount) {
        return numeral(amount).format('0[,].00') // 0[,].00[00]
      },
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
