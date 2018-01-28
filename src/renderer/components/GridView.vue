<template>
    <div>
        <div class="watchlist-card-wrapper tw-w-1/2 tw-float-left" v-for="coin in watchedCoins" :key="coin.market">
            <div :id="coin.market" class="watchlist-card">

                    <div class="watchlist-card-thumb">
                        <div class="coin-sprite tw-mt-1 tw-mr-2" :class="coin.symbol"></div>
                        <div :title="coin.symbol" class="coin-name tw-text-base tw-float-left"><strong>{{ coin.name }}</strong></div>
                        <div v-if="coin.qty && coin.qty > 0" title="My quantity">{{ coin.qty }}</div>
                        <div v-if="coin.lastTrade && coin.qty && coin.qty > 0" title="Total USD value">${{ formatCurrency(USDValue(coin.qty, coin.lastTrade.details.price)) }}</div>
                    </div>

                    <div class="watchlist-card-details tw-relative">
                        <div class="coin-price tw-text-lg" v-if="coin.lastTrade" :title="lastTradeString(coin.lastTrade)">${{ formatCurrency(coin.lastTrade.details.price) }}</div>
                        <div class="coin-price tw-text-lg" v-else>$--</div>

                        <i class="fa fa-gear edit-quantity grid-view" aria-hidden="true" title="Edit quantity" @click="openQtyModal(coin.market)"></i>

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
  export default {
    name: 'grid-view',
    props: ['watchedCoins'],
    methods: {
      formatCurrency: function (amount) {
        return amount.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
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
